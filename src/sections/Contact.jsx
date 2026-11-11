import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FiArrowUpRight, FiCheckCircle, FiLoader, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { contact, profile } from "../data/portfolio";
import { reveal } from "../lib/helpers";

// EmailJS (public, browser-side keys — same as before)
const EMAILJS = { service: "service_d3wxdth", template: "template_39ulbti", publicKey: "NN9ZxD2dmoHmrUHtr" };

function Marquee({ text, reverse, className, duration = 40 }) {
  const items = Array.from({ length: 4 }, (_, i) => (
    <span key={i} className="shrink-0 pr-[0.6em]" aria-hidden={i > 0}>
      {text}
    </span>
  ));
  return (
    <div className="mask-x flex overflow-hidden">
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} ${className}`}
        style={{ "--marquee-duration": `${duration}s` }}
      >
        {items}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3.5 text-cream placeholder:text-muted/60 transition focus:border-accent/60 focus:bg-white/[0.05] focus:outline-none";

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
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Name</span>
          <input name="user_name" required placeholder="Your name" className={inputClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Email</span>
          <input name="user_email" type="email" required placeholder="you@company.com" className={inputClass} />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Message</span>
        <textarea name="message" rows={5} required placeholder="Tell me about the role or project…" className={`${inputClass} resize-none`} />
      </label>
      <button type="submit" disabled={status === "sending"} className="btn-primary mt-2 w-full !py-3.5 disabled:opacity-70">
        {status === "sending" && (<><FiLoader className="animate-spin" /> Sending…</>)}
        {status === "sent" && (<><FiCheckCircle /> Message sent — thank you!</>)}
        {(status === "idle" || status === "error") && (<><FiSend /> Send message</>)}
      </button>
      {status === "error" && (
        <p role="alert" className="text-center text-sm text-red-300">
          Couldn't send right now — please email me directly at {profile.email}.
        </p>
      )}
    </form>
  );
}

const Contact = () => {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 95%", "start 35%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  const links = [
    { icon: FiMail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: FaLinkedinIn, label: "LinkedIn", value: "in/muhammad-anaspk", href: profile.socials.linkedin },
    { icon: SiGithub, label: "GitHub", value: "muhammad-anas-15", href: profile.socials.github },
    { icon: FiMapPin, label: "Based in", value: profile.location },
  ];

  return (
    <section id="contact" className="relative overflow-hidden pt-24 pb-16 sm:pt-32">
      {/* Giant scrolling lines */}
      <div className="select-none">
        <Marquee
          text={contact.marqueeTop}
          duration={45}
          className="font-sans text-[15vw] leading-[1.05] font-medium tracking-[-0.045em] text-cream sm:text-[10vw]"
        />
        <div ref={lineRef} className="container-page my-2 sm:my-4">
          <div className="relative h-px w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0_3px,transparent_3px_7px)]">
            <motion.div style={{ scaleX: lineScale }} className="absolute inset-0 origin-left bg-cream/80" />
          </div>
        </div>
        <Marquee
          text={contact.marqueeBottom}
          reverse
          duration={50}
          className="font-serif text-[15vw] leading-[1.15] italic text-gradient sm:text-[10vw]"
        />
      </div>

      <div className="container-page">
        <motion.div {...reveal()} className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-muted">{contact.text}</p>
          <a href={`mailto:${profile.email}`} className="group mt-6 inline-flex items-center gap-3 text-cream">
            <span className="border-b border-dotted border-cream/40 pb-0.5 transition group-hover:border-accent group-hover:text-accent-bright">
              Get in touch
            </span>
            <FiArrowUpRight className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </a>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.div {...reveal()}>
            <ContactForm />
          </motion.div>
          <motion.div {...reveal(0.1)} className="flex flex-col gap-3">
            {links.map(({ icon: Icon, label, value, href }) => {
              const Tag = href ? "a" : "div";
              return (
                <Tag
                  key={label}
                  {...(href ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" } : {})}
                  className={`card group flex items-center gap-4 p-5 ${href ? "transition hover:border-accent/40" : ""}`}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-lg text-accent transition group-hover:bg-accent group-hover:text-ink">
                    <Icon />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{label}</span>
                    <span className="block truncate text-cream">{value}</span>
                  </span>
                  {href && <FiArrowUpRight className="ml-auto shrink-0 text-muted transition group-hover:text-accent" />}
                </Tag>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
