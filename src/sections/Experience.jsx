import { FiCheck, FiMapPin } from "react-icons/fi";
import SectionHeading from "../components/SectionHeading";
import Timeline from "../components/Timeline";
import { experience } from "../data/portfolio";
import { asset } from "../lib/helpers";

const ExperienceBody = (job) => (
  <div className="card p-6 sm:p-8">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h4 className="font-display text-2xl font-bold text-cream">{job.role}</h4>
        <p className="mt-1 text-lg text-accent-bright">{job.company}</p>
      </div>
      <span className="rounded-full border border-line-strong px-3 py-1 font-mono text-[11px] text-soft">{job.period}</span>
    </div>
    {job.location && (
      <p className="mt-2 flex items-center gap-1.5 font-mono text-xs text-muted">
        <FiMapPin /> {job.location}
      </p>
    )}
    <p className="mt-5 leading-relaxed text-soft">{job.summary}</p>

    {job.images?.length > 0 && (
      <div className={`mt-6 grid gap-3 ${job.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {job.images.map((src) => (
          <img key={src} src={asset(src)} alt={`${job.company} work`} loading="lazy" className="w-full rounded-xl border border-line object-cover" />
        ))}
      </div>
    )}

    <ul className="mt-6 space-y-3">
      {job.points.map((p) => (
        <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-soft/90">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
            <FiCheck size={12} strokeWidth={3} />
          </span>
          {p}
        </li>
      ))}
    </ul>

    <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
      {job.tech.map((t) => (
        <span key={t} className="chip">
          {t}
        </span>
      ))}
    </div>
  </div>
);

const Experience = () => (
  <section id="experience" className="relative py-24 sm:py-32">
    <div className="container-page">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've"
        accent="worked"
        subtitle="Internships where I shipped real features with real teams."
      />
      <Timeline items={experience} renderBody={ExperienceBody} />
    </div>
  </section>
);

export default Experience;
