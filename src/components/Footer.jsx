import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowUp, FiArrowUpRight, FiFileText, FiMail } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { profile } from "../data/portfolio";
import { asset } from "../lib/helpers";

const nav = [
  { name: "About", id: "about" },
  { name: "Expertise", id: "expertise" },
  { name: "Tech Stack", id: "stack" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Education", id: "education" },
  { name: "Contact", id: "contact" },
];

const social = [
  { name: "GitHub", href: profile.socials.github, icon: SiGithub },
  { name: "LinkedIn", href: profile.socials.linkedin, icon: FaLinkedinIn },
  { name: "Email", href: `mailto:${profile.email}`, icon: FiMail },
  { name: "Resume", href: asset(profile.resume), icon: FiFileText },
];

/** Live local time in Islamabad (Pakistan Standard Time). */
function LocalTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true, timeZone: "Asia/Karachi" }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const t = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="font-mono tabular-nums text-cream">{time}</span>;
}

const heading = "font-mono text-[11px] uppercase tracking-[0.25em] text-muted";

const Footer = () => {
  const wordmark = profile.name.toUpperCase();

  return (
    <footer className="relative mt-10 overflow-hidden bg-[#080c18]/70 pb-24 backdrop-blur-sm sm:pb-10">
      {/* shimmering gradient line on top */}
      <div
        aria-hidden
        className="h-px w-full animate-shimmer bg-[linear-gradient(90deg,transparent,#22d3ee,#3b82f6,#8b5cf6,transparent)] bg-[length:200%_100%]"
      />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60%] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="container-page relative grid gap-12 pt-16 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* brand */}
        <div>
          <p className="font-display text-2xl font-bold text-cream">
            {profile.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-sm leading-relaxed text-muted">
            AI engineer & full-stack developer building agents, RAG systems and SaaS products.
          </p>
          <a href={`mailto:${profile.email}`} className="group mt-6 inline-flex items-center gap-2 text-cream">
            <span className="relative">
              {profile.email}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-accent to-violet transition-transform duration-500 group-hover:scale-x-100" />
            </span>
            <FiArrowUpRight className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <div className="mt-6 flex items-center gap-3 text-sm text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 [animation:ping-soft_2s_ease-out_infinite]" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Islamabad · <LocalTime />
          </div>
        </div>

        {/* navigate */}
        <nav aria-label="Footer">
          <p className={heading}>Navigate</p>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="group inline-flex items-center gap-2 text-soft transition-colors hover:text-cream">
                  <FiArrowRight className="-ml-5 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:text-accent group-hover:opacity-100" />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* connect */}
        <div>
          <p className={heading}>Connect</p>
          <ul className="mt-5 space-y-3">
            {social.map(({ name, href, icon: Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-soft transition-colors hover:text-cream"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-white/[0.03] text-sm transition-all duration-300 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-violet group-hover:text-white">
                    <Icon />
                  </span>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* giant name — letters slide up into view */}
      <div className="container-page relative mt-16 select-none" aria-hidden>
        {/* the parent watches the viewport (the hidden letters can't — they're clipped) */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.045 }}
          className="flex justify-between overflow-hidden font-display text-[7vw] leading-[0.95] font-bold tracking-tight lg:text-[5.9rem]"
        >
          {wordmark.split("").map((ch, i) => (
            <motion.span
              key={i}
              variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block bg-gradient-to-b from-[#7dd3fc]/55 via-[#818cf8]/30 to-transparent bg-clip-text pb-2 text-transparent"
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* bottom bar */}
      <div className="container-page relative mt-6 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
        <p className="font-mono text-[11px] text-muted">
          © {new Date().getFullYear()} {profile.name} · Designed & built with React, Tailwind & Framer Motion
        </p>
        <a href="#home" className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-soft hover:text-cream">
          Back to top
          <span className="grid h-9 w-9 place-items-center rounded-full border border-line-strong transition-all duration-300 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-violet group-hover:text-white">
            <FiArrowUp className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
