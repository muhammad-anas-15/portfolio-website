import { assistant, education, experience, expertise, profile, projects, techStack } from "../data/portfolio";

/**
 * "Ask me" client.
 * - If VITE_ASK_AI_URL is set (the Cloudflare Worker URL), questions go to the
 *   real LLM there.
 * - Otherwise — or if the worker is unreachable — a built-in offline assistant
 *   answers from src/data/portfolio.js, so the chat always works.
 * Either way the assistant speaks in the first person, as Anas.
 */
const API_URL = import.meta.env.VITE_ASK_AI_URL;

export const isLive = Boolean(API_URL);

export async function askAssistant(history) {
  if (API_URL) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-10) }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.reply) return data.reply;
      if (res.status === 429) return `I'm getting a lot of questions right now — try again in a minute, or just email me at **${profile.email}**.`;
    } catch {
      // fall through to the offline assistant
    }
  }
  await new Promise((r) => setTimeout(r, 450 + Math.random() * 450));
  return localAnswer(history[history.length - 1]?.content || "");
}

// ───────────────────────── offline assistant ─────────────────────────

const resumeUrl = `${import.meta.env.BASE_URL}${profile.resume}`;
const firstSentence = (text) => text.split(/(?<=[.!?])\s/)[0];
// Lower-case the first letter unless it starts an acronym ("AI", "RAG").
const lowerFirst = (s) => (/^[A-Z]{2}/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1));
const has = (q, words) => words.some((w) => q.includes(w));

const projectKeywords = {
  "Agentic Clinical Intelligence Partner": ["agentic clinical", "clinical", "triage", "medical triage", "hospital", "emergency", "x-ray", "xray"],
  "RAG-based Document AI Assistant": ["document ai", "pdf", "document", "rag project", "rag-based", "rag chatbot", "multimodal"],
  "Payment Screenshot Fraud Detection": ["fraud", "receipt", "payment screenshot", "forged", "forensic"],
  HealthVoiceAI: ["healthvoice", "health voice", "medivoice", "voice doctor", "voice assistant", "voice agent", "vapi"],
  Genima: ["genima", "text-to-image", "text to image", "image generation"],
  MsgIn: ["msgin", "msg in", "chat app", "real-time chat", "realtime chat", "socket"],
  Estrone: ["estrone"],
  Holex: ["holex"],
  "Zentrix-AI": ["zentrix", "trading", "forex", "signals", "commodit"],
};

const intros = {
  "ai-agents": "That's one of my favourite AI builds!",
  "ml-vision": "That's a computer-vision project I really enjoyed building.",
  saas: "That's one of my SaaS products.",
  "full-stack": "That's one of my full-stack projects.",
  apps: "That's an app I've been building.",
};

function describeProject(p) {
  const parts = [`${intros[p.category] || "Happy to tell you about it!"} **${p.title}** — ${lowerFirst(firstSentence(p.description))}`];
  if (p.metrics?.length) parts.push(`A few numbers I'm proud of: ${p.metrics.map((m) => `**${m.value}** ${m.label.toLowerCase()}`).join(", ")}.`);
  parts.push("What I built:\n" + p.points.map((pt) => `- ${pt}`).join("\n"));
  if (p.tech?.length) parts.push(`I built it with ${p.tech.slice(0, -1).join(", ")}${p.tech.length > 1 ? " and " : ""}${p.tech[p.tech.length - 1]}.`);
  if (p.imageNote) parts.push("The store isn't live anymore, but the brand ran on it for a good while.");
  if (p.links?.github) parts.push(`You can check out the code on [GitHub](${p.links.github}).`);
  if (p.links?.live) parts.push(`Try it live [here](${p.links.live}).`);
  return parts.join("\n\n");
}

function listProjects(filter = () => true) {
  return projects
    .filter(filter)
    .map((p) => `- **${p.title}** — ${lowerFirst(p.label)}`)
    .join("\n");
}

export function localAnswer(raw) {
  const q = ` ${raw.toLowerCase().trim()} `;

  if (!raw.trim()) return assistant.greeting;

  if (has(q, ["phone", "number", "whatsapp", "address", "salary", " pay ", "package", "ctc", "married", "girlfriend", "religion"])) {
    return `That's something I'd rather discuss directly 🙂 Drop me an email at **${profile.email}** and we can talk.`;
  }

  if (/^\s*(hi|hello|hey|salam|assalam|aoa|yo)\b/.test(q) && q.length < 28) {
    return "Hey! 👋 Great to have you here. Ask me about my projects, the tech I use, my experience — or how to reach me.";
  }

  if (has(q, ["thank", "thanks", "great", "awesome", "cool "]) && q.length < 40) {
    return "Glad I could help! Anything else you'd like to know?";
  }

  if (has(q, ["fyp", "final year"])) {
    return "I'm building my **Final Year Project** at FAST-NUCES right now — I'll share it here once it's ready. Meanwhile, want to hear about my AI projects?";
  }

  for (const [title, words] of Object.entries(projectKeywords)) {
    if (has(q, words)) return describeProject(projects.find((p) => p.title === title));
  }

  if (has(q, ["contact", "reach", "email", "linkedin", "github", "get in touch", "message you", "talk to you"])) {
    return `The quickest way is email — **${profile.email}**. You can also connect with me on [LinkedIn](${profile.socials.linkedin}) or browse my code on [GitHub](${profile.socials.github}). Or just use the contact form at the bottom of this page!`;
  }

  if (has(q, ["open to", "available", "availability", "hiring", "hire", " job", "freelance", "opportunit", " role", "work with"])) {
    return `Yes! I'm open to internships, AI engineering roles and freelance projects. I'm based in ${profile.location} and happy to work remotely. Send me a note at **${profile.email}** and let's talk.`;
  }

  if (has(q, ["experience", "intern", "worked", "company", "career", "petalnex", "cimt", "bit build", "work now", "working", "currently", "where do you work", "employ"])) {
    const current = experience.find((e) => /present/i.test(e.period));
    const list = experience.map((e) => `- **${e.role}** at ${e.company} (${e.period})`).join("\n");
    return `I've done ${experience.length} internships so far:\n${list}${current ? `\n\nRight now I'm a **${current.role}** at **${current.company}** — ${lowerFirst(current.summary)}` : ""}`;
  }

  if (has(q, ["shopify", "ecommerce", "e-commerce", "online store", "tiktok", "meta ads", "facebook ads", "marketing", " ads", "advertis"])) {
    return "Besides software, I've built Shopify stores for local Pakistani brands — **Estrone** (watches, earbuds and glasses) and **Holex** (digital watches, chains and rings) — and ran their ad campaigns on **Meta** and **TikTok** to drive sales. Ask me about either one!";
  }

  if (has(q, ["ai project", "ai work", "machine learning", " ml ", "agent", "llm", " rag", "computer vision", "deep learning", "artificial intelligence"])) {
    return `AI is where I spend most of my time. Here's what I've built:\n${listProjects((p) => p.ai)}\n\nAsk me about any of them and I'll walk you through it.`;
  }

  if (has(q, ["project", "work", "built", "build", "portfolio", "made", "saas", " app"])) {
    return `I've built **${projects.length} projects** so far, across AI agents, ML, SaaS, full-stack and apps:\n${listProjects()}\n\nWhich one should I tell you about?`;
  }

  if (has(q, ["skill", "stack", "tech", "strong", "best at", "expert", "good at", "language", "framework", "tools", "know"])) {
    const top = [...expertise.skills].sort((a, b) => b.level - a.level).slice(0, 5).map((s) => s.name);
    const ai = techStack.filter((t) => t.group === "AI & ML").slice(0, 5).map((t) => t.name);
    return `I'm strongest in applied AI — agentic pipelines and RAG systems — and I ship them as real products with React, Next.js and Node.js on the full-stack side.\n\nMy top skills right now: **${top.join(", ")}**. For AI work I mostly reach for ${ai.join(", ")}, and for data I use PostgreSQL, MongoDB and vector stores like FAISS.`;
  }

  if (has(q, ["educat", "university", "degree", "study", "studies", "fast", "college", "school", "cgpa", "gpa", "semester"])) {
    const uni = education[education.length - 1];
    const earlier = education.slice(0, -1).map((e) => e.degree).join(" and ");
    return `I'm doing my **${uni.degree} at ${uni.school}** (${uni.label.replace(/\s+/g, " ")}). Before that I completed ${earlier} in Mansehra.`;
  }

  if (has(q, ["where", "location", "based", "city", "country", " from"])) {
    return `I'm based in **${profile.location}**, and happy to work remotely with teams anywhere.`;
  }

  if (has(q, ["resume", " cv"])) {
    return `Sure — here's my CV: [Download my resume](${resumeUrl})`;
  }

  if (has(q, ["who", "about", "yourself", "anas", "tell me", "introduce"])) {
    return "I'm Anas — a CS student at FAST-NUCES who loves building AI that actually ships: multi-agent systems, RAG assistants and full-stack SaaS products. Ask me about my projects, skills or experience!";
  }

  return `Hmm, I'm not sure about that one — I can only talk about my own work. Try asking about my **projects**, **skills** or **experience**, or email me at **${profile.email}**.`;
}
