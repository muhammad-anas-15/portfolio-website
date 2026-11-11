import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { profile } from "../data/portfolio";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

const links = [
  { name: "About", id: "about" },
  { name: "Expertise", id: "expertise" },
  { name: "Stack", id: "stack" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Education", id: "education" },
  { name: "Contact", id: "contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // Highlight the section under the middle of the screen. Measured on every
  // scroll/resize, so it stays right even when a section changes height
  // (e.g. switching project categories).
  useEffect(() => {
    const ids = ["home", ...links.map((l) => l.id)];
    let frame;
    const update = () => {
      frame = null;
      setScrolled(window.scrollY > 24);
      const line = window.innerHeight * 0.45;
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // glides down into place on load
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.from("[data-nav]", { yPercent: -140, autoAlpha: 0, duration: 1, delay: 0.2, ease: "power4.out" });
    });
    return () => mm.revert();
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
      />

      <header data-nav className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4">
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-[920px] items-center justify-between rounded-full border px-3 py-2 transition-[background-color,border-color,box-shadow] duration-500 sm:px-4 ${
            scrolled || open
              ? "border-line-strong bg-ink/80 shadow-float backdrop-blur-xl"
              : "border-line bg-ink/30 backdrop-blur-md"
          }`}
        >
          <a href="#home" className="px-2 font-display text-lg font-bold tracking-tight text-cream" onClick={() => setOpen(false)}>
            {profile.initials}
            <span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id} className="relative">
                  <a
                    href={`#${link.id}`}
                    className={`relative z-10 block rounded-full px-4 py-2 text-sm transition-colors ${
                      isActive ? "text-accent-bright" : "text-soft/80 hover:text-cream"
                    }`}
                  >
                    {link.name}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-accent/30 bg-accent/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a href="#contact" data-magnetic="0.3" className="btn-ghost hidden !min-h-10 !px-5 !py-2 text-sm sm:inline-flex">
              Get in touch
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-xl text-cream lg:hidden"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mx-auto mt-2 max-w-[920px] rounded-3xl border border-line-strong bg-ink/95 p-3 backdrop-blur-xl lg:hidden"
            >
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-xl ${
                    active === link.id ? "bg-accent/10 text-accent-bright" : "text-cream"
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
                Get in touch
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
