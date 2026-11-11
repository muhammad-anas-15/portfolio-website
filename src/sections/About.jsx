import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { FiCode, FiCpu, FiEye, FiLayers } from "react-icons/fi";
import SectionHeading from "../components/SectionHeading";
import { about, stats } from "../data/portfolio";
import { reveal, resolveStat } from "../lib/helpers";

const icons = { cpu: FiCpu, code: FiCode, eye: FiEye, layers: FiLayers };

function Counter({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="font-display text-5xl font-bold tracking-tight text-cream sm:text-6xl">
      {value}
      <span className="text-gradient">{suffix}</span>
    </span>
  );
}

const About = () => (
  <section id="about" className="section-frost relative py-24 sm:py-32">
    <div className="container-page">
      <SectionHeading eyebrow="About" title={about.heading} subtitle={about.text} />

      {/* Highlight cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {about.highlights.map((item, i) => {
          const Icon = icons[item.icon];
          return (
            <motion.div
              key={item.title}
              {...reveal(i * 0.08)}
              className="card group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/[0.04] text-lg text-accent transition group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-violet group-hover:text-white">
                  <Icon />
                </span>
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-cream">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Stats */}
      <motion.div
        {...reveal()}
        className="card mt-16 grid grid-cols-2 gap-y-10 px-6 py-10 sm:px-10 md:grid-cols-5 md:divide-x md:divide-line"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-2 md:px-6 ${i === 0 ? "md:pl-0" : ""} ${i === stats.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
          >
            <Counter to={resolveStat(stat.value)} suffix={stat.suffix} />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default About;
