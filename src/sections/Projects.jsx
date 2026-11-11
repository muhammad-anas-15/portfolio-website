import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { FiInfo } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import SectionHeading from "../components/SectionHeading";
import ProjectCover from "../components/ProjectCover";
import { projectCategories, projects } from "../data/portfolio";
import { asset } from "../lib/helpers";
import useMedia from "../lib/useMedia";
import { scrollToTarget } from "../lib/scroll";
import { ScrollTrigger } from "../lib/gsap";

const catName = (id) => projectCategories.find((c) => c.id === id)?.name || id;
const pad = (n) => String(n).padStart(2, "0");

// One tab per category that has projects, in the order set in portfolio.js
const tabs = projectCategories
  .map((c) => ({ ...c, count: projects.filter((p) => p.category === c.id).length }))
  .filter((c) => c.count > 0);

/* ───────────────────────── building blocks ───────────────────────── */

function Media({ project, compact }) {
  if (!project.image) return <ProjectCover kind={project.cover} title={project.title} />;
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-panel ${compact ? "p-4" : "p-6 xl:p-8"}`}>
      {/* blurred copy fills the frame so every screenshot looks full-size */}
      <img aria-hidden src={asset(project.image)} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl" />
      <a
        href={asset(project.image)}
        target="_blank"
        rel="noopener noreferrer"
        title="Open full-size screenshot"
        className="relative flex h-full w-full items-center justify-center"
      >
        <img
          src={asset(project.image)}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="block h-auto max-h-full w-auto max-w-full rounded-xl border border-white/15 object-contain shadow-float"
        />
      </a>
      {project.imageNote && (
        <span className="absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-lg bg-ink/80 px-3 py-2 text-xs leading-snug text-soft backdrop-blur-md">
          <FiInfo className="shrink-0 text-accent" /> {project.imageNote}
        </span>
      )}
    </div>
  );
}

function Details({ project, index, total }) {
  const { github, live } = project.links || {};
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <span className="font-display text-5xl font-bold leading-none text-cream/90 xl:text-6xl">{pad(index + 1)}</span>
        <div className="flex flex-col items-end gap-2 text-right">
          <span className="chip">{catName(project.category)}</span>
          <span className="label tabular-nums">
            {pad(index + 1)} of {pad(total)}
          </span>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <p className="text-sm font-medium text-accent">{project.label}</p>
        <h3 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-cream xl:text-4xl">{project.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-soft">{project.description}</p>

        {project.metrics?.length > 0 && (
          <dl className="mt-5 grid grid-cols-3 divide-x divide-line border-y border-line py-3 [@media(max-height:820px)]:hidden">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse px-3 first:pl-0 last:pr-0">
                <dt className="text-xs leading-tight text-muted">{m.label}</dt>
                <dd className="break-words font-display text-sm font-bold text-accent tabular-nums sm:text-lg">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-5 list-disc space-y-2 pl-5 marker:text-accent">
          {project.points.slice(0, 3).map((p) => (
            <li key={p} className="pl-1 text-[15px] leading-relaxed text-soft/85">
              {p}
            </li>
          ))}
        </ul>

        {project.tech.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full border border-line bg-white/[0.04] px-2.5 py-1 text-xs text-soft">
                {t}
              </span>
            ))}
          </div>
        )}

        {(github || live) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {live && (
              <a href={live} target="_blank" rel="noopener noreferrer" data-magnetic="0.25" className="btn-primary !px-5 !py-2.5 text-sm">
                Live demo
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" data-magnetic="0.25" className="btn-ghost !px-5 !py-2.5 text-sm">
                <SiGithub aria-hidden /> Source code
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────── desktop: full-screen cards that stack on scroll ─────────────── */

function StackCard({ project, index, total, progress }) {
  const isLast = index === total - 1;
  const scale = useTransform(progress, [index / total, 1], [1, isLast ? 1 : 1 - (total - index) * 0.035]);
  const dim = useTransform(progress, [index / total, Math.min(1, (index + 1) / total)], [0, isLast ? 0 : 0.45]);

  return (
    <div className="sticky top-0 flex h-screen items-start justify-center pt-[148px] pb-6">
      <motion.article
        style={{ scale, top: `${Math.min(index, 5) * 12}px` }}
        className="group card relative grid h-[calc(100vh-220px)] w-full origin-top grid-cols-[0.95fr_1.25fr] gap-6 overflow-hidden !bg-panel/95 p-5 xl:p-6"
      >
        <div className="min-h-0 overflow-hidden p-4 xl:p-6">
          <Details project={project} index={index} total={total} />
        </div>
        <div className="min-h-0">
          <Media project={project} />
        </div>
        {/* darken cards as they move behind the next one */}
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 rounded-3xl bg-ink" />
      </motion.article>
    </div>
  );
}

function StackDeck({ items }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="relative">
      {items.map((project, i) => (
        <StackCard key={project.title} project={project} index={i} total={items.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}

/* ─────────────── mobile / short screens: simple list ─────────────── */

function ListDeck({ items }) {
  return (
    <div className="flex flex-col gap-6">
      {items.map((project, i) => (
        <motion.article
          key={project.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="group card overflow-hidden p-3 sm:p-4"
        >
          <div className="h-[260px] sm:h-[360px]">
            <Media project={project} compact />
          </div>
          <div className="p-3 pt-6 sm:p-5">
            <Details project={project} index={i} total={items.length} />
          </div>
        </motion.article>
      ))}
    </div>
  );
}

/* ───────────────────────── section ───────────────────────── */

const Projects = () => {
  const [active, setActive] = useState(tabs[0].id); // opens on the first category (SaaS)
  const deckRef = useRef(null);
  const stacked = useMedia("(min-width: 1024px) and (min-height: 680px)");
  const items = projects.filter((p) => p.category === active);

  const choose = (id) => {
    setActive(id);
    // the deck changed height: re-measure every scroll animation, then bring
    // the first project of that category onto the screen (smooth, via Lenis)
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const top = deckRef.current.getBoundingClientRect().top + window.scrollY - (stacked ? 0 : 150);
      if (Math.abs(window.scrollY - top) > 4) scrollToTarget(top);
    });
  };

  return (
    <section id="projects" className="section-frost relative pt-24 pb-16 sm:pt-32">
      <div className="container-page">
        <SectionHeading
          title="Projects I’ve"
          accent="shipped"
          subtitle="From multi-agent AI systems to SaaS products and Shopify stores. Pick a category, then scroll through the work."
          align="center"
        />
      </div>

      {/* Category toggle: stays pinned under the navbar while you scroll the projects */}
      <div className="sticky top-[76px] z-30 sm:top-[84px]">
        <div className="container-page flex justify-center">
          <div className="-mx-5 max-w-[calc(100%+2.5rem)] overflow-x-auto px-5 py-1 sm:mx-0 sm:max-w-full sm:px-0">
            <div role="tablist" aria-label="Project categories" className="flex w-max gap-1 rounded-full border border-line-strong bg-ink/85 p-1.5 shadow-float backdrop-blur-xl">
              {tabs.map((tab) => {
                const isActive = active === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => choose(tab.id)}
                    className={`relative min-h-11 whitespace-nowrap rounded-full px-4 text-sm transition-colors ${isActive ? "font-bold text-on-accent" : "text-soft hover:text-cream"}`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="project-tab"
                        className="absolute inset-0 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span className="relative">
                      {tab.name} <span className={`text-xs tabular-nums ${isActive ? "text-on-accent/70" : "text-muted"}`}>{tab.count}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div ref={deckRef} className={`container-page ${stacked ? "-mt-[60px]" : "mt-10"}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-${stacked}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {stacked ? <StackDeck items={items} /> : <ListDeck items={items} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
