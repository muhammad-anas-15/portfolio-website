import { useEffect, useRef, useState } from "react";
import { expertise } from "../data/portfolio";
import { reveal } from "../lib/helpers";
import { gsap, ScrollTrigger, MOTION_OK } from "../lib/gsap";

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
  const arcRef = useRef(null);
  const needleRef = useRef(null);
  const textRef = useRef(null);

  // Every click (`run` changes) drops the needle to 0, then GSAP sweeps it up
  // to the skill's value with a small overshoot, like a real speedometer.
  useEffect(() => {
    const state = { v: 0 };
    const draw = () => {
      const v = state.v;
      arcRef.current.style.strokeDashoffset = String(1 - Math.max(0.001, v / 100));
      const [nx, ny] = polar(START + (SWEEP * v) / 100, R - 34);
      needleRef.current.setAttribute("x2", nx);
      needleRef.current.setAttribute("y2", ny);
      textRef.current.textContent = `${Math.round(v)}%`;
    };
    draw();
    if (!value) return;
    if (!window.matchMedia(MOTION_OK).matches) {
      state.v = value;
      draw();
      return;
    }
    const tween = gsap.to(state, { v: value, duration: 1.3, delay: 0.1, ease: "back.out(1.6)", onUpdate: draw });
    return () => tween.kill();
  }, [value, run]);

  return (
    <div className="relative mx-auto w-full max-w-[400px]">
      <svg viewBox="0 0 320 250" className="w-full" role="img" aria-label={label ? `${label}: ${value}%` : "Skill gauge"}>
        {/* track */}
        <path d={ARC} fill="none" className="stroke-white/[0.07]" strokeWidth="18" strokeLinecap="round" />
        {/* progress, one solid accent */}
        <path
          ref={arcRef}
          d={ARC}
          fill="none"
          pathLength="1"
          className="stroke-accent"
          strokeWidth="18"
          strokeLinecap="round"
          style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
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
              <line x1={x1} y1={y1} x2={x2} y2={y2} className={major ? "stroke-soft/50" : "stroke-soft/20"} strokeWidth={major ? 2 : 1} />
              {major && (
                <text x={lx} y={ly + 4} textAnchor="middle" className="fill-muted text-[11px] tabular-nums">
                  {t}
                </text>
              )}
            </g>
          );
        })}

        {/* needle */}
        <line ref={needleRef} x1={CX} y1={CY} x2={CX} y2={CY} className="stroke-cream" strokeWidth="3" strokeLinecap="round" />
        <circle cx={CX} cy={CY} r="9" className="fill-ink stroke-accent" strokeWidth="3" />

        <text ref={textRef} x={CX} y={CY + 52} textAnchor="middle" className="fill-cream font-display text-[34px] font-bold tabular-nums">
          0%
        </text>
      </svg>

      <div className="-mt-1 flex justify-center">
        <span className={`rounded-lg px-4 py-1.5 text-sm transition-colors ${label ? "bg-accent font-bold text-on-accent" : "bg-white/[0.06] text-muted"}`}>
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

  // Demo the first skill once the section scrolls into view.
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 55%",
      once: true,
      onEnter: () => {
        if (!touched.current) setSelected(expertise.skills[0]);
      },
    });
    return () => st.kill();
  }, []);

  const pick = (skill) => {
    touched.current = true;
    setSelected(skill);
    setRun((n) => n + 1);
  };

  return (
    <section id="expertise" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <h2 data-split className="heading-xl">
            Where I’m expert
          </h2>
          <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {expertise.text}
          </p>

          <div data-reveal className="mt-8 flex flex-wrap gap-2.5">
            {expertise.skills.map((skill) => {
              const active = selected?.name === skill.name;
              return (
                <button
                  key={skill.name}
                  type="button"
                  data-pop
                  onClick={() => pick(skill)}
                  aria-pressed={active}
                  className={`min-h-11 rounded-lg border px-4 text-sm transition-[background-color,border-color,color] duration-200 ${
                    active
                      ? "border-accent bg-accent font-bold text-on-accent"
                      : "border-accent/35 text-accent-bright hover:border-accent hover:bg-accent/10"
                  }`}
                >
                  {skill.name}
                </button>
              );
            })}
          </div>
        </div>

        <div {...reveal()} className="card p-6 sm:p-10">
          <Gauge value={selected?.level ?? 0} label={selected?.name} run={run} />
        </div>
      </div>
    </section>
  );
};

export default Expertise;
