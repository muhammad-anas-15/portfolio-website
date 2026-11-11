import { useRef, useState } from "react";
import { FiCheckCircle, FiLoader, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { contact, profile } from "../data/portfolio";
import { reveal } from "../lib/helpers";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

// EmailJS (public, browser-side keys, same as before)
const EMAILJS = { service: "service_d3wxdth", template: "template_39ulbti", publicKey: "NN9ZxD2dmoHmrUHtr" };

/** A line that loops sideways; pauses on hover and focus (Hallmark 18).
 *  The outer wrapper also slides with the scroll ([data-scrub], MotionFX). */
function Marquee({ text, reverse, className, duration = 40, scrub }) {
  const items = Array.from({ length: 4 }, (_, i) => (
    <span key={i} className="shrink-0 pr-[0.6em]" aria-hidden={i > 0}>
      {text}
    </span>
  ));
  return (
    <div className="mask-x group/marquee flex overflow-hidden" tabIndex={-1}>
      <div data-scrub={scrub} className="flex w-max">
        <div
          className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] ${className}`}
          style={{ "--marquee-duration": `${duration}s` }}
        >
          {items}
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-field-edge bg-white/[0.03] px-4 py-3.5 text-cream placeholder:text-muted transition-[border-color,background-color] duration-200 focus:border-accent focus:bg-white/[0.05]";

function ContactForm() {
  const form = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm(EMAILJS.service, EMAILJS.template, form.current, EMAILJS.publicKey);
      setStatus("sent");
      form.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form ref={form} onSubmit={submit} className="card flex flex-col gap-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="label">Name</span>
          <input name="user_name" autoComplete="name" required placeholder="Your name" className={inputClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="label">Email</span>
          <input name="user_email" type="email" autoComplete="email" required placeholder="you@company.com" className={inputClass} />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="label">Message</span>
        <textarea name="message" rows={5} required placeholder="Tell me about the role or project…" className={`${inputClass} resize-none`} />
      </label>
      <button type="submit" disabled={status === "sending"} className="btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-55">
        {status === "sending" && (<><FiLoader className="animate-spin" aria-hidden /> Sending…</>)}
        {status === "sent" && (<><FiCheckCircle aria-hidden /> Message sent. Thank you.</>)}
        {(status === "idle" || status === "error") && (<><FiSend aria-hidden /> Send message</>)}
      </button>
      {status === "error" && (
        <p role="alert" className="text-center text-sm text-danger">
          Couldn’t send right now. Please email me at {profile.email}.
        </p>
      )}
    </form>
  );
}

const Contact = () => {
  const scope = useRef(null);

  // the divider draws itself across as the section scrolls in
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-divider]",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-divider]", start: "top 95%", end: "top 40%", scrub: 0.6 } }
        );
      });
      return () => mm.revert();
    },
    { scope }
  );

  const links = [
    { icon: FiMail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: FaLinkedinIn, label: "LinkedIn", value: "in/muhammad-anaspk", href: profile.socials.linkedin },
    { icon: SiGithub, label: "GitHub", value: "muhammad-anas-15", href: profile.socials.github },
    { icon: FiMapPin, label: "Based in", value: profile.location },
  ];

  return (
    <section id="contact" ref={scope} className="relative overflow-hidden pt-24 pb-16 sm:pt-32">
      {/* Giant scrolling lines */}
      <div className="select-none">
        <Marquee
          text={contact.marqueeTop}
          duration={45}
          scrub="marquee-l"
          className="font-sans text-[15vw] leading-[1.05] font-medium tracking-[-0.045em] text-cream sm:text-[10vw]"
        />
        <div className="container-page my-2 sm:my-4">
          <div className="relative border-t border-dashed border-line-strong">
            <div data-divider className="absolute -top-px left-0 h-px w-full origin-left bg-cream/80" />
          </div>
        </div>
        <Marquee
          text={contact.marqueeBottom}
          reverse
          duration={50}
          scrub="marquee-r"
          className="font-serif text-[15vw] leading-[1.15] italic text-accent sm:text-[10vw]"
        />
      </div>

      <div className="container-page">
        <div {...reveal()} className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-muted">{contact.text}</p>
          <a
            href={`mailto:${profile.email}`}
            data-magnetic="0.3"
            className="mt-6 inline-block border-b border-dotted border-cream/40 pb-0.5 text-cream transition-[border-color,color] duration-200 hover:border-accent hover:text-accent-bright"
          >
            Get in touch
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
          <div {...reveal()}>
            <ContactForm />
          </div>
          <div className="flex flex-col gap-3">
            {links.map(({ icon: Icon, label, value, href }) => {
              const Tag = href ? "a" : "div";
              return (
                <Tag
                  key={label}
                  {...reveal()}
                  {...(href ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer", "data-tilt": "" } : {})}
                  className={`card group flex items-center gap-4 p-5 ${href ? "transition-[border-color] duration-200 hover:border-accent/40" : ""}`}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-lg text-accent transition-[background-color,color] duration-200 group-hover:bg-accent group-hover:text-on-accent">
                    <Icon aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="label block">{label}</span>
                    <span className="block truncate text-cream">{value}</span>
                  </span>
                </Tag>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
