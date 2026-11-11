import { useEffect, useRef } from "react";
import { gsap, MOTION_OK, FINE_POINTER } from "../lib/gsap";

/**
 * Chromatic halo cursor (original component).
 * Three soft rings of red, green and blue light follow the pointer with
 * slightly different lag. At rest they overlap and screen to a clean white
 * ring; in motion they split into a chromatic fringe. Over links and buttons
 * the halo opens up; on press it contracts. The system cursor stays visible.
 * Mouse and trackpad only, and never under reduced motion.
 */
const INTERACTIVE = "a, button, input, textarea, select, label, [role='button'], [data-magnetic]";
const RINGS = [
  { color: "var(--color-halo-r)", lag: 0.18 },
  { color: "var(--color-halo-g)", lag: 0.26 },
  { color: "var(--color-halo-b)", lag: 0.34 },
];

const ChromaHalo = () => {
  const rootRef = useRef(null);
  const ringRefs = useRef([]);
  const dotRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia(`${MOTION_OK} and ${FINE_POINTER}`).matches) return;
    const root = rootRef.current;
    const rings = ringRefs.current;
    const dot = dotRef.current;

    gsap.set([...rings, dot], { xPercent: -50, yPercent: -50 });
    const movers = rings.map((ring, i) => ({
      x: gsap.quickTo(ring, "x", { duration: RINGS[i].lag * 2.2, ease: "power3.out" }),
      y: gsap.quickTo(ring, "y", { duration: RINGS[i].lag * 2.2, ease: "power3.out" }),
    }));
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });

    let visible = false;
    let hovering = false;

    const setHover = (next) => {
      if (next === hovering) return;
      hovering = next;
      gsap.to(rings, { scale: next ? 1.75 : 1, borderWidth: next ? 1.5 : 2, duration: 0.45, ease: "power3.out", overwrite: "auto" });
      gsap.to(dot, { scale: next ? 0 : 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
    };

    const onMove = (e) => {
      if (!visible) {
        visible = true;
        gsap.set([...rings, dot], { x: e.clientX, y: e.clientY });
        gsap.to(root, { autoAlpha: 1, duration: 0.3 });
      }
      movers.forEach((m) => {
        m.x(e.clientX);
        m.y(e.clientY);
      });
      dotX(e.clientX);
      dotY(e.clientY);
      setHover(Boolean(e.target.closest?.(INTERACTIVE)));
    };
    const onLeave = () => {
      visible = false;
      gsap.to(root, { autoAlpha: 0, duration: 0.3 });
    };
    const onDown = () => gsap.to(rings, { scale: hovering ? 1.4 : 0.7, duration: 0.15, ease: "power2.out", overwrite: "auto" });
    const onUp = () => gsap.to(rings, { scale: hovering ? 1.75 : 1, duration: 0.5, ease: "elastic.out(1, 0.5)", overwrite: "auto" });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf([root, ...rings, dot]);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="chroma-halo pointer-events-none invisible fixed inset-0 z-[100] opacity-0">
      {RINGS.map((ring, i) => (
        <span
          key={ring.color}
          ref={(el) => (ringRefs.current[i] = el)}
          className="absolute left-0 top-0 h-9 w-9 rounded-full border-2 mix-blend-screen blur-[0.6px]"
          style={{ borderColor: ring.color, boxShadow: `0 0 14px -2px ${ring.color}` }}
        />
      ))}
      <span ref={dotRef} className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-cream" />
    </div>
  );
};

export default ChromaHalo;
