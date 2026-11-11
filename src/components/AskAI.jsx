import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUp, FiX } from "react-icons/fi";
import BotAvatar from "./BotAvatar";
import { assistant } from "../data/portfolio";
import { askAssistant } from "../lib/assistant";

/** Tiny, safe markdown: **bold**, [text](url), "- " bullets, line breaks. */
function Inline({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} className="font-bold text-cream">{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link && /^(https?:|mailto:|\/)/.test(link[2])) {
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className="text-accent-bright underline decoration-accent/40 underline-offset-2 hover:decoration-accent">
          {link[1]}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function RichText({ text }) {
  const blocks = [];
  let list = null;
  text.split("\n").forEach((line, i) => {
    if (/^\s*[-•]\s+/.test(line)) {
      if (!list) blocks.push((list = { type: "ul", items: [], key: i }));
      list.items.push(line.replace(/^\s*[-•]\s+/, ""));
    } else {
      list = null;
      if (line.trim()) blocks.push({ type: "p", text: line, key: i });
    }
  });
  return blocks.map((b) =>
    b.type === "ul" ? (
      <ul key={b.key} className="my-1.5 space-y-1 pl-1">
        {b.items.map((item, j) => (
          <li key={j} className="flex gap-2">
            <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span><Inline text={item} /></span>
          </li>
        ))}
      </ul>
    ) : (
      <p key={b.key} className="my-1 first:mt-0 last:mb-0"><Inline text={b.text} /></p>
    )
  );
}

const readFlag = (key) => {
  try { return sessionStorage.getItem(key) === "1"; } catch { return false; }
};
const writeFlag = (key) => {
  try { sessionStorage.setItem(key, "1"); } catch { /* storage unavailable */ }
};

const AskAI = () => {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: assistant.greeting }]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Friendly teaser bubble once per session
  useEffect(() => {
    if (readFlag("askai-teased")) return;
    const show = setTimeout(() => setTeaser(true), 4000);
    const hide = setTimeout(() => setTeaser(false), 16000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openChat = () => {
    setOpen(true);
    setTeaser(false);
    writeFlag("askai-teased");
  };
  const dismissTeaser = () => {
    setTeaser(false);
    writeFlag("askai-teased");
  };

  const send = async (text) => {
    const question = text.trim().slice(0, 500);
    if (!question || loading) return;
    const next = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      // Only send real turns (skip the canned greeting) to the model.
      const reply = await askAssistant(next.slice(1));
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } finally {
      setLoading(false);
    }
  };

  const showStarters = messages.length === 1 && !loading;

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={`Chat with ${assistant.name}`}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[min(600px,calc(100svh-7rem))] w-[calc(100vw-2rem)] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-line-strong bg-panel/95 shadow-float backdrop-blur-2xl sm:w-[400px]"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-line bg-accent/[0.06] px-4 py-3.5">
              <BotAvatar size={44} mood={loading ? "thinking" : "idle"} />
              <div className="min-w-0 flex-1">
                <p className="font-display text-[15px] font-bold text-cream">{assistant.name}</p>
                <p className="flex items-center gap-1.5 text-xs text-muted">
                  {loading ? "Typing…" : "Ask me anything about my work"}
                </p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="grid h-9 w-9 place-items-center rounded-full text-soft transition-[background-color,color] duration-200 hover:bg-white/5 hover:text-cream">
                <FiX />
              </button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
              {messages.map((m, i) =>
                m.role === "assistant" ? (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-2">
                    <BotAvatar size={26} ring={false} />
                    <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-line bg-card px-4 py-3 text-[14px] leading-relaxed text-soft">
                      <RichText text={m.content} />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-[14px] leading-relaxed text-on-accent">{m.content}</div>
                  </motion.div>
                )
              )}

              {loading && (
                <div className="flex items-end gap-2">
                  <BotAvatar size={26} ring={false} mood="thinking" />
                  <div className="flex gap-1 rounded-2xl rounded-bl-md border border-line bg-card px-4 py-3.5">
                    {[0, 1, 2].map((d) => (
                      <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-accent" animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.7, repeat: Infinity, delay: d * 0.15 }} />
                    ))}
                  </div>
                </div>
              )}

              {showStarters && (
                <div className="flex flex-wrap gap-2 pl-8">
                  {assistant.starters.map((s) => (
                    <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-accent/30 bg-accent/[0.06] px-3 py-1.5 text-left text-xs text-accent-bright transition-[border-color,background-color] duration-200 hover:border-accent hover:bg-accent/15">
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-line p-3"
            >
              <div className="flex items-center gap-2 rounded-2xl border border-line bg-white/[0.03] py-1.5 pl-4 pr-1.5 focus-within:border-accent/50">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={500}
                  placeholder="Ask about projects, skills…"
                  aria-label="Your question"
                  className="min-w-0 flex-1 bg-transparent text-sm text-cream placeholder:text-muted/70 focus:outline-none focus-visible:outline-none"
                />
                <button type="submit" disabled={!input.trim() || loading} aria-label="Send" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-on-accent transition-[background-color] duration-200 hover:bg-accent-bright disabled:opacity-55">
                  <FiArrowUp />
                </button>
              </div>
              <p className="mt-2 text-center text-xs text-muted">I’m an AI version of Anas and can make mistakes. For anything important, email me.</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {teaser && !open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              className="absolute bottom-full right-0 mb-3 w-max max-w-[240px] rounded-2xl rounded-br-md border border-line-strong bg-panel/95 py-2.5 pl-4 pr-8 text-sm text-soft backdrop-blur-xl"
            >
              Hi! Ask me anything 👋
              <button type="button" onClick={dismissTeaser} aria-label="Dismiss" className="absolute right-2 top-2 text-muted hover:text-cream">
                <FiX size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => (open ? setOpen(false) : openChat())}
          data-magnetic="0.25"
          aria-expanded={open}
          aria-label={open ? "Close chat" : "Ask me"}
          className="flex items-center gap-2 rounded-full border border-line-strong bg-panel/90 py-1 pl-1 pr-3.5 shadow-float backdrop-blur-xl transition-[border-color] duration-200 hover:border-accent/50"
        >
          <span className="relative">
            <BotAvatar size={36} mood={loading ? "thinking" : "idle"} />
          </span>
          <span className="text-sm font-bold text-cream">{open ? "Close" : "Ask me"}</span>
        </button>
      </div>
    </div>
  );
};

export default AskAI;
