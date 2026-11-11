// "Ask my AI" backend — a Cloudflare Worker that keeps the API key secret,
// limits abuse, and forwards questions to Gemini (default) or Claude.
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "./knowledge.js";

const MAX_TURNS = 10; // messages of history sent to the model
const MAX_CHARS = 600; // per message
const RATE_LIMIT = { requests: 15, windowMs: 60_000 }; // per IP, best effort

const REFUSAL_TEXT = "I can't help with that one — but I'm happy to tell you about my projects, skills or experience!";

class UpstreamError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// ── helpers ──────────────────────────────────────────────────
const json = (data, status, headers) =>
  new Response(JSON.stringify(data), { status, headers: { ...headers, "Content-Type": "application/json" } });

// Simple in-memory limiter. Each Worker instance has its own memory, so this is
// best-effort; add a Cloudflare rate-limiting rule for a hard limit.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT.requests;
}

/** Keep only well-formed, recent turns, starting with a user message and ending with one. */
function sanitize(raw) {
  if (!Array.isArray(raw)) return null;
  const messages = raw
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }))
    .filter((m) => m.content)
    .slice(-MAX_TURNS);
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return null;
  return messages;
}

// ── providers ────────────────────────────────────────────────
async function askGemini(env, messages) {
  if (!env.GEMINI_API_KEY) throw new UpstreamError(500, "GEMINI_API_KEY is not set");
  const model = env.GEMINI_MODEL || "gemini-2.5-flash";
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: messages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
      generationConfig: { maxOutputTokens: 2048 },
    }),
  });
  if (!res.ok) throw new UpstreamError(res.status, `Gemini ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("").trim();
  return text || REFUSAL_TEXT;
}

async function askClaude(env, messages) {
  if (!env.ANTHROPIC_API_KEY) throw new UpstreamError(500, "ANTHROPIC_API_KEY is not set");
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  const model = env.CLAUDE_MODEL || "claude-opus-5-5";
  const params = {
    model,
    max_tokens: 4096,
    output_config: { effort: "low" }, // short chat answers don't need deep reasoning
    system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    messages,
  };

  // Models that support server-side refusal fallbacks get them by default.
  const supportsFallbacks = /^claude-(opus-5|sonnet-5-5|fable-5)/.test(model);
  const response = supportsFallbacks
    ? await client.beta.messages.create({ ...params, betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" })
    : await client.messages.create(params);

  if (response.stop_reason === "refusal") return REFUSAL_TEXT;
  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();
  return text || REFUSAL_TEXT;
}

// ── handler ──────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
    const cors = {
      "Access-Control-Allow-Origin": allowed.includes(origin) ? origin : allowed[0] || "",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin",
    };

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, cors);
    if (!allowed.includes(origin)) return json({ error: "Origin not allowed" }, 403, cors);

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (rateLimited(ip)) return json({ error: "Too many requests" }, 429, cors);

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400, cors);
    }
    const messages = sanitize(body?.messages);
    if (!messages) return json({ error: "Invalid messages" }, 400, cors);

    const provider = (env.PROVIDER || "gemini").toLowerCase();
    try {
      const reply = provider === "claude" ? await askClaude(env, messages) : await askGemini(env, messages);
      return json({ reply }, 200, cors);
    } catch (err) {
      // Most specific first: rate limits → 429, everything else → 502.
      if (err instanceof Anthropic.RateLimitError || err?.status === 429) {
        return json({ error: "Rate limited upstream" }, 429, cors);
      }
      if (err instanceof Anthropic.AuthenticationError) {
        console.error("Claude API key rejected");
      } else if (err instanceof Anthropic.APIError) {
        console.error(`Claude API error ${err.status}: ${err.message}`);
      } else {
        console.error(err?.message || err);
      }
      return json({ error: "Upstream error" }, 502, cors);
    }
  },
};
