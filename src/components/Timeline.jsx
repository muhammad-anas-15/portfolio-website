import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

/** Timeline in the style of ref #5: big date on the left, details on the right,
 *  and a solid accent line that draws itself as you scroll (GSAP scrub).
 *  Used by Experience and Education. */
const Timeline = ({ items, renderBody }) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-line-fill]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 60%", scrub: 0.5 } }
        );
        // each node lights up as the line reaches it
        gsap.utils.toArray("[data-node]", ref.current).forEach((node) => {
          gsap.to(node, {
            backgroundColor: "var(--color-accent)",
            scale: 1.15,
            duration: 0.4,
            scrollTrigger: { trigger: node, start: "top 62%", toggleActions: "play none none reverse" },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-line-strong" />
      <div aria-hidden data-line-fill className="absolute bottom-0 left-[6px] top-0 w-[3px] origin-top rounded-full bg-accent" />

      {items.map((item, i) => (
        <article
          key={item.label + i}
          data-reveal
          className="group relative grid grid-cols-1 gap-4 pb-20 pl-10 last:pb-0 md:grid-cols-[280px_minmax(0,1fr)] md:gap-10 md:pl-14"
        >
          <span data-node className="absolute left-0 top-3 h-[15px] w-[15px] rounded-full border-2 border-ink bg-line-strong ring-1 ring-line-strong" />
          <div className="md:sticky md:top-32 md:self-start">
            <h3 className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-cream/25 transition-colors duration-500 group-hover:text-cream/90 sm:text-5xl">
              {item.label}
            </h3>
          </div>
          <div>{renderBody(item)}</div>
        </article>
      ))}
    </div>
  );
};

export default Timeline;
