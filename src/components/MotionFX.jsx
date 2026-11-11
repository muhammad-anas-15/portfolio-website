import { useEffect } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK, FINE_POINTER } from "../lib/gsap";

/**
 * Page-wide GSAP layer, mounted once after every section.
 *
 * Scroll (ScrollTrigger):
 *   [data-reveal]            rises into place once, batched and staggered
 *   [data-split]             a heading whose words rise out of a mask, once
 *   [data-scrub="hero-copy"] / [data-scrub="hero-photo"]  drift apart as the hero leaves
 *   [data-scrub="marquee-l"] / [data-scrub="marquee-r"]   contact lines slide with the scroll
 *
 * Micro-interactions (pointer: fine only):
 *   [data-magnetic]  leans toward the pointer and settles back
 *   [data-tilt]      tilts in 3D under the pointer
 *   [data-pop]       a short pop on click
 *   every button and .btn-*  presses in on pointer down
 *
 * Everything is skipped under prefers-reduced-motion: the page is already complete.
 */
const PRESSABLE = "button, .btn-primary, .btn-ghost, [data-press]";

const MotionFX = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ── Scroll animations ────────────────────────────────────────────
    mm.add(MOTION_OK, () => {
      // 1) reveal-once, batched so neighbours stagger together
      const items = gsap.utils.toArray("[data-reveal]");
      gsap.set(items, { autoAlpha: 0, y: 36 });
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, overwrite: true, clearProps: "transform" }),
      });

      // 2) headings: words rise out of a line mask
      gsap.utils.toArray("[data-split]").forEach((head) => {
        const split = SplitText.create(head, { type: "words,lines", mask: "lines", linesClass: "split-line" });
        gsap.from(split.words, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.045,
          ease: "power4.out",
          scrollTrigger: { trigger: head, start: "top 85%", once: true },
        });
      });

      // 3) the hero drifts apart as you scroll past it (scrubbed, smooth)
      const hero = document.getElementById("home");
      if (hero) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
        });
        tl.to('[data-scrub="hero-copy"]', { y: -90, autoAlpha: 0.15, ease: "none" }, 0)
          .to('[data-scrub="hero-photo"]', { y: 70, scale: 0.94, autoAlpha: 0.35, ease: "none" }, 0);
      }

      // 4) the two contact lines slide against each other with the scroll
      const contact = document.getElementById("contact");
      if (contact) {
        const st = { trigger: contact, start: "top bottom", end: "bottom top", scrub: 0.8 };
        gsap.fromTo('[data-scrub="marquee-l"]', { xPercent: 6 }, { xPercent: -10, ease: "none", scrollTrigger: st });
        gsap.fromTo('[data-scrub="marquee-r"]', { xPercent: -10 }, { xPercent: 6, ease: "none", scrollTrigger: { ...st } });
      }
    });

    // ── Micro-interactions ───────────────────────────────────────────
    mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
      const cleanups = [];
      const on = (el, type, fn) => {
        el.addEventListener(type, fn);
        cleanups.push(() => el.removeEventListener(type, fn));
      };

      // magnetic: the element leans toward the pointer, its icon a little more
      gsap.utils.toArray("[data-magnetic]").forEach((el) => {
        const strength = Number(el.dataset.magnetic) || 0.3;
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        const icon = el.querySelector("svg");
        const ixTo = icon && gsap.quickTo(icon, "x", { duration: 0.5, ease: "power3.out" });
        const iyTo = icon && gsap.quickTo(icon, "y", { duration: 0.5, ease: "power3.out" });
        on(el, "pointermove", (e) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          xTo(dx * strength);
          yTo(dy * strength);
          ixTo?.(dx * strength * 0.5);
          iyTo?.(dy * strength * 0.5);
        });
        on(el, "pointerleave", () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.45)" });
          if (icon) gsap.to(icon, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.45)" });
        });
      });

      // tilt: cards lean in 3D under the pointer
      gsap.utils.toArray("[data-tilt]").forEach((el) => {
        gsap.set(el, { transformPerspective: 900 });
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
        on(el, "pointermove", (e) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          rx(-py * 7);
          ry(px * 7);
        });
        on(el, "pointerleave", () => {
          rx(0);
          ry(0);
        });
      });

      // press: every button sinks a touch while held (delegated, covers later elements)
      const down = (e) => {
        const el = e.target.closest?.(PRESSABLE);
        if (el && !el.disabled) gsap.to(el, { scale: 0.96, duration: 0.12, ease: "power2.out", overwrite: "auto" });
      };
      const up = () => {
        gsap.utils.toArray(PRESSABLE).forEach((el) => {
          if (gsap.getProperty(el, "scale") !== 1) gsap.to(el, { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
        });
      };
      // pop: a quick bump on click
      const click = (e) => {
        const el = e.target.closest?.("[data-pop]");
        if (el) gsap.fromTo(el, { scale: 0.9 }, { scale: 1, duration: 0.6, ease: "elastic.out(1.1, 0.4)", overwrite: "auto" });
      };
      on(document, "pointerdown", down);
      on(document, "pointerup", up);
      on(document, "pointercancel", up);
      on(document, "click", click);

      return () => cleanups.forEach((fn) => fn());
    });

    return () => mm.revert();
  });

  // Keep every ScrollTrigger accurate when the page height changes
  // (fonts loading, a project category switched, images arriving).
  useEffect(() => {
    let t;
    const refresh = () => {
      clearTimeout(t);
      t = setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    const ro = new ResizeObserver(refresh);
    ro.observe(document.body);
    document.fonts?.ready.then(refresh);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, []);

  return null;
};

export default MotionFX;
