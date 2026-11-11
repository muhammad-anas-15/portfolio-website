import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { expertise } from "../data/portfolio";
import { reveal } from "../lib/helpers";

// Gauge geometry (SVG units). Angle 0 = straight up; the dial spans -120° → +120°.
const CX = 160;
const CY = 160;
const R = 124;
const START = -120;
const SWEEP = 240;

const polar = (angleDeg, radius) => {
  const a = (angleDeg * Math.PI) / 180;
  return [CX + radius * Math.sin(a), CY - radius * Math.cos(a)];
};
const [ax, ay] = polar(START, R);
const [bx, by] = polar(START + SWEEP, R);
const ARC = `M ${ax} ${ay} A ${R} ${R} 0 1 1 ${bx} ${by}`;
const ticks = Array.from({ length: 21 }, (_, i) => i * 5);

function Gauge({ value, label, run }) {
  const spring = useMotionValue(0);

  // Every click (`run` changes) drops the needle to 0, then sweeps it up to the
  // skill's value with a small overshoot — like a real speedometer.
  useEffect(() => {
    spring.jump(0);
    if (!value) return;
    const controls = animate(spring, value, { duration: 1.25, ease: [0.34, 1.3, 0.64, 1], delay: 0.12 });
    return () => controls.stop();
  }, [value, run, spring]);

  const progress = useTransform(spring, (v) => Math.max(0.001, v / 100));
  const needleX = useTransform(spring, (v) => polar(START + (SWEEP * v) / 100, R - 34)[0]);
  const needleY = useTransform(spring, (v) => polar(START + (SWEEP * v) / 100, R - 34)[1]);
  const display = useTransform(spring, (v) => `${Math.round(v)}%`);

  return (
    <div className="relative mx-auto w-full max-w-[400px]">
      <svg viewBox="0 0 320 250" className="w-full" role="img" aria-label={label ? `${label}: ${value}%` : "Skill gauge"}>
        <defs>
          <linearGradient id="gauge-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="55%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
          <filter id="gauge-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* track */}
        <path d={ARC} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="18" strokeLinecap="round" />
        {/* progress */}
        <motion.path
          d={ARC}
          fill="none"
          stroke="url(#gauge-grad)"
          strokeWidth="18"
          strokeLinecap="round"
          filter="url(#gauge-glow)"
          style={{ pathLength: progress }}
        />

        {/* ticks + labels */}
        {ticks.map((t) => {
          const angle = START + (SWEEP * t) / 100;
          const major = t % 20 === 0;
          const [x1, y1] = polar(angle, R - 16);
          const [x2, y2] = polar(angle, R - (major ? 26 : 21));
          const [lx, ly] = polar(angle, R - 40);
          return (
            <g key={t}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={major ? "rgba(244,240,233,0.45)" : "rgba(244,240,233,0.18)"} strokeWidth={major ? 2 : 1} />
              {major && (
                <text x={lx} y={ly + 4} textAnchor="middle" className="fill-muted font-mono text-[10px]">
                  {t}
                </text>
              )}
            </g>
          );
        })}

        {/* needle */}
        <motion.line x1={CX} y1={CY} x2={needleX} y2={needleY} stroke="#f4f0e9" strokeWidth="3" strokeLinecap="round" />
        <circle cx={CX} cy={CY} r="9" fill="#08070a" stroke="#22d3ee" strokeWidth="3" />

        <motion.text x={CX} y={CY + 52} textAnchor="middle" className="fill-cream font-display text-[34px] font-bold">
          {display}
        </motion.text>
      </svg>

      <div className="-mt-1 flex justify-center">
        <span className={`rounded-lg px-4 py-1.5 font-mono text-xs transition-colors ${label ? "bg-accent text-ink" : "bg-white/[0.06] text-muted"}`}>
          {label || "Click a skill tag"}
        </span>
      </div>
    </div>
  );
}

const Expertise = () => {
  const [selected, setSelected] = useState(null);
  const [run, setRun] = useState(0); // bumps on every click so the needle restarts from 0
  const touched = useRef(false);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.5 });

  // Demo the first skill once the section scrolls into view.
  useEffect(() => {
    if (!inView || touched.current) return;
    const t = setTimeout(() => !touched.current && setSelected(expertise.skills[0]), 500);
    return () => clearTimeout(t);
  }, [inView]);

  const pick = (skill) => {
    touched.current = true;
    setSelected(skill);
    setRun((n) => n + 1);
  };

  return (
    <section id="expertise" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div {...reveal()}>
          <span className="eyebrow">Expertise</span>
          <h2 className="heading-xl mt-5">
            Where I'm <span className="text-gradient">expert?</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{expertise.text}</p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {expertise.skills.map((skill) => {
              const active = selected?.name === skill.name;
              return (
                <button
                  key={skill.name}
                  type="button"
                  onClick={() => pick(skill)}
                  aria-pressed={active}
                  className={`rounded-lg border px-3.5 py-2 font-mono text-[13px] transition-all duration-200 ${
                    active
                      ? "border-accent bg-accent text-ink shadow-[0_0_24px_-6px_rgba(34,211,238,0.8)]"
                      : "border-accent/35 text-accent-bright hover:border-accent hover:bg-accent/10"
                  }`}
                >
                  {skill.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div {...reveal(0.15)} className="relative">
          {/* hand-drawn arrow pointing at the tags */}
          <svg aria-hidden viewBox="0 0 130 60" className="absolute -left-20 bottom-6 hidden w-32 text-muted/70 lg:block">
            <path
              d="M125 30 C 95 32, 85 10, 70 18 C 55 26, 72 45, 82 34 C 92 22, 60 20, 10 38"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M18 30 L 8 39 L 21 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="card p-6 sm:p-10">
            <Gauge value={selected?.level ?? 0} label={selected?.name} run={run} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Expertise;
