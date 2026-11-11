import { useEffect, useRef } from "react";

/**
 * Portrait with a "read the source" lens (inspired by ref #1):
 * move the mouse (or a finger) over the photo and a soft circular lens follows
 * it, re-drawing the face as lines of glowing code · brighter where the face is
 * brighter. Built with one <canvas> layered over the <img>.
 */

// The code shown inside the lens: snippets from my own projects.
const CODE = [
  'from langchain.agents import AgentExecutor, create_react_agent',
  'pipeline = Sequential([intake, vitals, triage, imaging, rag, planner])',
  'risk = xgb.predict_proba(features)[0]  # 5-class triage, 89.97%',
  'heatmap = grad_cam(densenet121, xray, layer="features.denseblock4")',
  'docs = faiss_index.similarity_search(query, k=5)',
  'answer = gemini.generate(context=docs, question=user_q)',
  'def detect_forgery(img): return xgb(ela(img) + lbp(img) + dct(img))',
  'const call = await vapi.start({ assistant: "doctor", voice: "nova" })',
  'const report = await generateReport(session.transcript)',
  'socket.on("message", (msg) => io.to(msg.room).emit("message", msg))',
  'app.post("/api/chat", async (req, res) => res.json(await agent(req)))',
  'const signal = await zentrix.analyze({ pair: "XAU/USD", tf: "4h" })',
  'if (signal.trend === "bullish") notify(trader, "BUY", signal.entry)',
  'export default function Portfolio() { return <Anas ships="fast" /> }',
  'const embeddings = new HuggingFaceEmbeddings({ model: "all-MiniLM" })',
  'await db.collection("sessions").insertOne({ user, report, createdAt })',
];

const KEYWORDS = new Set([
  "from", "import", "def", "return", "const", "await", "async", "if", "export", "default",
  "function", "new", "true", "false", "for", "in",
]);

/** Pre-colour every character: 0 plain, 1 keyword, 2 string, 3 number, 4 punctuation, 5 comment */
const TOKENS = CODE.map((line) => {
  const kinds = new Array(line.length).fill(0);
  let i = 0;
  while (i < line.length) {
    const ch = line[i];
    if (ch === "#") { for (let j = i; j < line.length; j++) kinds[j] = 5; break; }
    if (ch === '"') {
      const end = line.indexOf('"', i + 1);
      const stop = end === -1 ? line.length : end + 1;
      for (let j = i; j < stop; j++) kinds[j] = 2;
      i = stop;
      continue;
    }
    if (/[0-9]/.test(ch)) { kinds[i] = 3; i++; continue; }
    if (/[A-Za-z_]/.test(ch)) {
      let j = i;
      while (j < line.length && /[A-Za-z0-9_]/.test(line[j])) j++;
      if (KEYWORDS.has(line.slice(i, j))) for (let k = i; k < j; k++) kinds[k] = 1;
      i = j;
      continue;
    }
    if (ch !== " ") kinds[i] = 4;
    i++;
  }
  return kinds;
});

// rgb per token kind
const COLORS = [
  [238, 242, 249], // plain · cream
  [34, 211, 238], // keyword · cyan
  [167, 139, 250], // string · violet
  [103, 232, 249], // number · light cyan
  [139, 151, 173], // punctuation · muted
  [100, 116, 139], // comment · slate
];

const FONT_SIZE = 13;
const LINE_H = 17;

const CodePortrait = ({ src, alt, mask, className = "" }) => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const label = labelRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const state = {
      w: 0, h: 0, dpr: 1,
      lum: null, // Float32Array of brightness (0–1) per pixel at display size
      target: { x: 0, y: 0 }, pos: { x: 0, y: 0 },
      active: false, radius: 0, maxRadius: 120,
      charW: 8, scroll: 0,
    };
    let frame;

    // Draw the photo off-screen exactly like CSS object-cover + object-top,
    // then keep its brightness so the code can glow where the face is lit.
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;

    const measure = () => {
      const rect = wrap.getBoundingClientRect();
      state.w = Math.round(rect.width);
      state.h = Math.round(rect.height);
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.maxRadius = Math.max(80, Math.min(140, state.w * 0.3));
      canvas.width = state.w * state.dpr;
      canvas.height = state.h * state.dpr;
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      ctx.font = `500 ${FONT_SIZE}px "JetBrains Mono", ui-monospace, monospace`;
      state.charW = ctx.measureText("M").width;
      if (image.complete && image.naturalWidth) sample();
    };

    const sample = () => {
      const { w, h } = state;
      if (!w || !h) return;
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d", { willReadFrequently: true });
      const scale = Math.max(w / image.naturalWidth, h / image.naturalHeight);
      const dw = image.naturalWidth * scale;
      const dh = image.naturalHeight * scale;
      octx.drawImage(image, (w - dw) / 2, 0, dw, dh); // object-top
      const data = octx.getImageData(0, 0, w, h).data;
      const lum = new Float32Array(w * h);
      for (let i = 0; i < lum.length; i++) {
        lum[i] = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255;
      }
      state.lum = lum;
    };
    image.onload = sample;

    const draw = () => {
      const { w, h, pos, radius, lum, charW } = state;
      ctx.clearRect(0, 0, w, h);
      if (radius < 1 || !lum) return;

      // 1) darken the photo inside the lens (soft edge)
      const g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius);
      g.addColorStop(0, "rgba(8, 12, 24, 0.94)");
      g.addColorStop(0.7, "rgba(8, 12, 24, 0.85)");
      g.addColorStop(1, "rgba(8, 12, 24, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // 2) code glyphs, brightness taken from the photo underneath
      ctx.textBaseline = "middle";
      const rowStart = Math.max(0, Math.floor((pos.y - radius) / LINE_H));
      const rowEnd = Math.min(Math.ceil(h / LINE_H), Math.ceil((pos.y + radius) / LINE_H));
      const colStart = Math.max(0, Math.floor((pos.x - radius) / charW));
      const colEnd = Math.min(Math.ceil(w / charW), Math.ceil((pos.x + radius) / charW));
      const shift = Math.floor(state.scroll);

      for (let row = rowStart; row <= rowEnd; row++) {
        const y = row * LINE_H + LINE_H / 2;
        const li = (row + shift) % CODE.length;
        const line = CODE[li];
        const kinds = TOKENS[li];
        const indent = (li * 7) % 11; // stagger the lines a little
        for (let col = colStart; col <= colEnd; col++) {
          const x = col * charW + charW / 2;
          const d = Math.hypot(x - pos.x, y - pos.y);
          if (d > radius) continue;
          const ci = (col + indent) % (line.length + 2);
          const ch = line[ci];
          if (!ch || ch === " ") continue;
          const px = Math.min(w - 1, Math.max(0, Math.round(x)));
          const py = Math.min(h - 1, Math.max(0, Math.round(y)));
          const l = lum[py * w + px];
          const edge = 1 - Math.pow(d / radius, 3); // fade toward the rim
          const a = Math.min(1, (0.08 + l * 1.25) * edge);
          if (a < 0.04) continue;
          const [r, gg, b] = COLORS[kinds[ci]];
          ctx.fillStyle = `rgba(${r}, ${gg}, ${b}, ${a})`;
          ctx.fillText(ch, x - charW / 2, y);
        }
      }
    };

    const tick = () => {
      const target = state.active ? state.maxRadius : 0;
      state.radius += (target - state.radius) * 0.14;
      state.pos.x += (state.target.x - state.pos.x) * 0.2;
      state.pos.y += (state.target.y - state.pos.y) * 0.2;
      if (!reduce) state.scroll += 0.02; // code drifts slowly upward
      draw();
      label.style.transform = `translate3d(${state.pos.x + 16}px, ${state.pos.y - 12}px, 0)`;
      label.style.opacity = state.active ? "1" : "0";
      frame = state.radius > 0.5 || state.active ? requestAnimationFrame(tick) : null;
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      state.target.x = e.clientX - rect.left;
      state.target.y = e.clientY - rect.top;
      if (!state.active) {
        // open the lens where the pointer entered, without sliding in
        state.pos.x = state.target.x;
        state.pos.y = state.target.y;
      }
      state.active = true;
      start();
    };
    const onLeave = () => {
      state.active = false;
      start();
    };
    const onUp = (e) => {
      if (e.pointerType === "touch") onLeave();
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    document.fonts?.ready.then(measure);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerdown", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointercancel", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointercancel", onLeave);
    };
  }, [src]);

  const maskStyle = mask
    ? { maskImage: mask, WebkitMaskImage: mask, maskComposite: "intersect", WebkitMaskComposite: "source-in" }
    : undefined;

  return (
    <div className={className}>
      <div ref={wrapRef} className="relative h-full w-full touch-pan-y select-none">
        <img
          src={src}
          alt={alt}
          width="865"
          height="1280"
          fetchPriority="high"
          draggable="false"
          className="absolute inset-0 h-full w-full object-cover object-top mix-blend-lighten [filter:saturate(0.92)_contrast(1.04)]"
          style={maskStyle}
        />
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" style={maskStyle} />
        <span
          ref={labelRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 rounded-md border border-line-strong bg-ink/85 px-2 py-1 text-xs text-cream opacity-0 backdrop-blur-md transition-opacity duration-300"
        >
          read source
        </span>
      </div>
    </div>
  );
};

export default CodePortrait;
