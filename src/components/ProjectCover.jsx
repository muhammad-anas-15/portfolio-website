import { motion } from "framer-motion";
import { FiFileText, FiMic, FiTrendingUp } from "react-icons/fi";

/**
 * Designed cover art for projects that don't have a screenshot yet.
 * kind: "voice" (AI voice assistant) | "trading" (AI trading signals)
 * Solid colours only; motion is transform and opacity.
 */
const ProjectCover = ({ kind, title }) => {
  if (kind === "trading") return <TradingCover title={title} />;
  return <VoiceCover title={title} />;
};

function Frame({ children }) {
  return (
    <div className="relative flex h-full min-h-[280px] w-full items-center justify-center overflow-hidden rounded-2xl bg-card-2">
      {children}
    </div>
  );
}

function VoiceCover({ title }) {
  const bars = [0.35, 0.6, 0.9, 0.55, 1, 0.7, 0.4, 0.8, 0.5, 0.95, 0.6, 0.35];
  return (
    <Frame>
      <div className="relative flex flex-col items-center gap-8 px-6 text-center">
        {/* mic with pulsing rings */}
        <div className="relative grid h-32 w-32 place-items-center">
          {[0, 1, 2].map((r) => (
            <motion.span
              key={r}
              className="absolute inset-0 rounded-full border border-accent/40"
              animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: r * 0.8, ease: "easeOut" }}
            />
          ))}
          <span className="grid h-24 w-24 place-items-center rounded-full bg-accent text-4xl text-on-accent">
            <FiMic aria-hidden />
          </span>
        </div>

        {/* live sound wave: bars scale on Y, never animate height */}
        <div className="flex h-14 items-center gap-1.5" aria-hidden>
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className="h-full w-1.5 origin-center rounded-full bg-accent"
              animate={{ scaleY: [h * 0.2, h, h * 0.35] }}
              transition={{ duration: 1.1, repeat: Infinity, repeatType: "mirror", delay: i * 0.08 }}
              style={{ scaleY: h * 0.6 }}
            />
          ))}
        </div>

        <div>
          <p className="font-display text-3xl font-bold text-cream">{title}</p>
          <p className="mt-2 text-sm text-accent-bright">Live AI voice consultation</p>
        </div>

        <span className="absolute -right-2 top-0 hidden items-center gap-2 rounded-xl border border-line-strong bg-ink/60 px-3 py-2 text-xs text-soft backdrop-blur-md sm:flex">
          <FiFileText className="text-accent" aria-hidden /> Report generated
        </span>
      </div>
    </Frame>
  );
}

function TradingCover({ title }) {
  const candles = [
    [40, 70, 50, 62], [55, 80, 60, 74], [50, 76, 70, 56], [45, 66, 52, 60], [58, 88, 62, 84],
    [70, 96, 80, 92], [66, 90, 88, 72], [62, 84, 70, 80], [76, 104, 82, 100], [90, 118, 98, 112],
  ]; // [low, high, open, close] in chart units
  const line = "M0 150 C 60 140, 90 160, 140 120 S 230 110, 270 80 S 350 70, 400 30";
  return (
    <Frame>
      <div className="relative w-full max-w-[460px] px-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2 font-display text-2xl font-bold text-cream">
            <FiTrendingUp className="text-success" aria-hidden /> {title}
          </span>
          <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success">Buy signal</span>
        </div>

        <svg viewBox="0 0 400 180" className="w-full" aria-hidden>
          {candles.map(([lo, hi, o, c], i) => {
            const x = 20 + i * 38;
            const up = c >= o;
            const y = (v) => 175 - v * 1.4;
            const tone = up ? "stroke-success fill-success" : "stroke-danger fill-danger";
            return (
              <g key={i} opacity="0.85" className={tone}>
                <line x1={x} x2={x} y1={y(hi)} y2={y(lo)} strokeWidth="1.5" />
                <rect x={x - 6} width="12" y={y(Math.max(o, c))} height={Math.max(3, Math.abs(c - o) * 1.4)} rx="2" stroke="none" />
              </g>
            );
          })}
          <motion.path
            d={line}
            fill="none"
            className="stroke-accent"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          {["Forex", "Gold and oil", "AI signals"].map((t) => (
            <span key={t} className="rounded-lg border border-line-strong bg-white/[0.04] px-2 py-2 text-center text-soft">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export default ProjectCover;
