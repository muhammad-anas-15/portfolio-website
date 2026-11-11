import { useEffect, useRef, useState } from "react";
import { FiFileText, FiMail } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { profile } from "../data/portfolio";
import { asset } from "../lib/helpers";
import { gsap, SplitText, useGSAP, MOTION_OK } from "../lib/gsap";

const nav = [
  { name: "About", id: "about" },
  { name: "Expertise", id: "expertise" },
  { name: "Tech stack", id: "stack" },
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
  return <span className="tabular-nums text-cream">{time}</span>;
}

const linkClass = "inline-flex min-h-8 items-center text-soft transition-colors duration-200 hover:text-cream";

const Footer = () => {
  const scope = useRef(null);

  // the top rule draws across, then the name rises letter by letter
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo("[data-footer-rule]", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power3.inOut", scrollTrigger: { trigger: scope.current, start: "top 90%", once: true } });
        const split = SplitText.create("[data-wordmark]", { type: "chars", mask: "chars" });
        gsap.from(split.chars, {
          yPercent: 110,
          duration: 1,
          stagger: 0.04,
          ease: "power4.out",
          scrollTrigger: { trigger: "[data-wordmark]", start: "top 98%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope }
  );

  return (
    <footer ref={scope} className="relative mt-10 overflow-hidden bg-panel/70 pb-24 backdrop-blur-sm sm:pb-10">
      <div aria-hidden data-footer-rule className="h-px w-full origin-left bg-accent/70" />

      <div className="container-page relative grid gap-12 pt-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
        {/* brand */}
        <div>
          <p className="font-display text-2xl font-bold text-cream">
            {profile.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-sm leading-relaxed text-muted">
            AI engineer and full-stack developer building agents, RAG systems and SaaS products.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-block border-b border-line-strong pb-0.5 text-cream transition-[border-color,color] duration-200 hover:border-accent hover:text-accent-bright"
          >
            {profile.email}
          </a>
          <p className="mt-6 text-sm text-muted">
            Local time in Islamabad: <LocalTime />
          </p>
        </div>

        {/* navigate */}
        <nav aria-label="Footer">
          <p className="label">Navigate</p>
          <ul className="mt-4 space-y-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={linkClass}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* connect */}
        <div>
          <p className="label">Connect</p>
          <ul className="mt-4 space-y-2">
            {social.map(({ name, href, icon: Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-10 items-center gap-3 text-soft transition-colors duration-200 hover:text-cream"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white/[0.03] text-sm transition-[background-color,border-color,color] duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                    <Icon aria-hidden />
                  </span>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* giant name, rising letter by letter (GSAP SplitText) */}
      <div className="container-page relative mt-16 select-none" aria-hidden>
        <p
          data-wordmark
          className="whitespace-nowrap text-center font-display text-[7vw] leading-[0.95] font-bold tracking-tight text-accent/25 lg:text-[5.9rem]"
        >
          {profile.name.toUpperCase()}
        </p>
      </div>

      {/* bottom bar */}
      <div className="container-page relative mt-6 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. Designed and built with React, Tailwind and GSAP.
        </p>
        <a href="#home" data-magnetic="0.4" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-soft transition-[border-color,color] duration-200 hover:border-accent hover:text-cream">
          Back to top
        </a>
      </div>
    </footer>
  );
};

export default Footer;
