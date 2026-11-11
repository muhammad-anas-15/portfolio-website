import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight, FiInfo } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import SectionHeading from "../components/SectionHeading";
import ProjectCover from "../components/ProjectCover";
import { projectCategories, projects } from "../data/portfolio";
import { asset } from "../lib/helpers";
import useMedia from "../lib/useMedia";

const catName = (id) => projectCategories.find((c) => c.id === id)?.name || id;
const pad = (n) => String(n).padStart(2, "0");

const tabs = [
  { id: "all", name: "All", count: projects.length },
  ...projectCategories
    .map((c) => ({ ...c, count: projects.filter((p) => p.category === c.id).length }))
    .filter((c) => c.count > 0),
];

/* ───────────────────────── building blocks ───────────────────────── */

function Media({ project, compact }) {
  if (!project.image) return <ProjectCover kind={project.cover} title={project.title} />;
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-[#0b1324] ${compact ? "p-4" : "p-6 xl:p-8"}`}>
      {/* blurred copy fills the frame so every screenshot looks full-size */}
      <img aria-hidden src={asset(project.image)} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-violet/20" />
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
          className="block h-auto max-h-full w-auto max-w-full rounded-xl border border-white/15 object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </a>
      {project.imageNote && (
        <span className="absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-lg bg-ink/75 px-3 py-2 font-mono text-[10.5px] leading-snug text-soft backdrop-blur-md">
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
          <span className="font-mono text-[11px] text-muted">
            {pad(index + 1)} / {pad(total)}
          </span>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{project.label}</p>
        <h3 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-cream xl:text-4xl">{project.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-soft">{project.description}</p>

        {project.metrics?.length > 0 && (
          <div className="mt-5 grid grid-cols-3 gap-2 [@media(max-height:820px)]:hidden">
            {project.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-line bg-white/[0.03] px-3 py-2.5">
                <p className="break-words font-display text-[13px] font-bold text-gradient sm:text-lg">{m.value}</p>
                <p className="text-[11px] leading-tight text-muted">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        <ul className="mt-5 space-y-2">
          {project.points.slice(0, 3).map((p) => (
            <li key={p} className="flex gap-3 text-[14px] leading-relaxed text-soft/85">
              <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent to-violet" />
              {p}
            </li>
          ))}
        </ul>

        {project.tech.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full border border-line bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-soft">
                {t}
              </span>
            ))}
          </div>
        )}

        {(github || live) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {live && (
              <a href={live} target="_blank" rel="noopener noreferrer" className="btn-primary !px-5 !py-2.5 text-sm">
                Live demo <FiArrowUpRight />
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-5 !py-2.5 text-sm">
                <SiGithub /> Source code
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
        className="group card relative grid h-[calc(100vh-220px)] w-full origin-top grid-cols-[0.95fr_1.25fr] gap-6 overflow-hidden !bg-[#0f1729]/95 p-5 xl:p-6"
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
  const [active, setActive] = useState("all");
  const deckRef = useRef(null);
  const stacked = useMedia("(min-width: 1024px) and (min-height: 680px)");
  const items = active === "all" ? projects : projects.filter((p) => p.category === active);

  const choose = (id) => {
    setActive(id);
    // bring the first project of that category onto the screen
    requestAnimationFrame(() => {
      const top = deckRef.current.getBoundingClientRect().top + window.scrollY - (stacked ? 0 : 150);
      if (Math.abs(window.scrollY - top) > 4) window.scrollTo({ top, behavior: "smooth" });
    });
  };

  return (
    <section id="projects" className="section-frost relative pt-24 pb-16 sm:pt-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Projects"
          title="Projects I've"
          accent="shipped"
          subtitle="From multi-agent AI systems to SaaS products and Shopify stores. Pick a category, then scroll through the work."
          align="center"
        />
      </div>

      {/* Category toggle — stays pinned under the navbar while you scroll the projects */}
      <div className="sticky top-[76px] z-30 sm:top-[84px]">
        <div className="container-page flex justify-center">
          <div className="-mx-5 max-w-[calc(100%+2.5rem)] overflow-x-auto px-5 py-1 sm:mx-0 sm:max-w-full sm:px-0">
            <div role="tablist" aria-label="Project categories" className="flex w-max gap-1 rounded-full border border-line-strong bg-ink/80 p-1.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              {tabs.map((tab) => {
                const isActive = active === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => choose(tab.id)}
                    className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${isActive ? "text-white" : "text-soft hover:text-cream"}`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="project-tab"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-deep via-blue to-violet"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span className="relative">
                      {tab.name} <span className={`font-mono text-[11px] ${isActive ? "text-white/80" : "text-muted"}`}>{tab.count}</span>
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
