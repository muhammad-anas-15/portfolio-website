import { useRef } from "react";
import { FiCode, FiCpu, FiEye, FiLayers } from "react-icons/fi";
import SectionHeading from "../components/SectionHeading";
import { about, stats } from "../data/portfolio";
import { reveal, resolveStat } from "../lib/helpers";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

const icons = { cpu: FiCpu, code: FiCode, eye: FiEye, layers: FiLayers };

/** Real figures only: counts up from zero once, when scrolled into view (GSAP). */
function Counter({ to, suffix }) {
  const ref = useRef(null);
  useGSAP(() => {
    const el = ref.current;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const state = { v: 0 };
      el.textContent = "0";
      gsap.to(state, {
        v: to,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => (el.textContent = String(Math.round(state.v))),
      });
    });
    return () => mm.revert();
  });

  return (
    <span className="font-display text-5xl font-bold tracking-tight text-cream tabular-nums sm:text-6xl">
      <span ref={ref}>{to}</span>
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

const About = () => (
  <section id="about" className="section-frost relative py-24 sm:py-32">
    <div className="container-page">
      <SectionHeading title={about.heading} subtitle={about.text} />

      {/* What I work on: icon inline with each heading, cards tilt under the pointer */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {about.highlights.map((item) => {
          const Icon = icons[item.icon];
          return (
            <div
              key={item.title}
              {...reveal()}
              data-tilt
              className="card group relative p-6 transition-[border-color] duration-300 hover:border-accent/40"
            >
              <h3 className="flex items-center gap-3 font-display text-lg font-bold leading-snug text-cream">
                <Icon className="shrink-0 text-xl text-accent transition-transform duration-300 group-hover:scale-110" aria-hidden />
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
            </div>
          );
        })}
      </div>

      {/* Figures, parted by hairlines */}
      <div
        {...reveal()}
        className="card mt-16 grid grid-cols-2 gap-y-10 px-6 py-10 sm:px-10 md:grid-cols-5 md:divide-x md:divide-line"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-2 md:px-6 ${i === 0 ? "md:pl-0" : ""} ${i === stats.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
          >
            <Counter to={resolveStat(stat.value)} suffix={stat.suffix} />
            <span className="label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
