import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/** Timeline in the style of ref #5: big date on the left, details on the right,
 *  and a vertical line that fills up as you scroll. Used by Experience and Education. */
const Timeline = ({ items, renderBody }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-line-strong" />
      <motion.div
        aria-hidden
        style={{ scaleY: fill }}
        className="absolute bottom-0 left-[6px] top-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-accent-bright via-accent to-violet shadow-[0_0_12px_rgba(34,211,238,0.5)]"
      />

      {items.map((item, i) => (
        <motion.article
          key={item.label + i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="group relative grid grid-cols-1 gap-4 pb-20 pl-10 last:pb-0 md:grid-cols-[280px_minmax(0,1fr)] md:gap-10 md:pl-14"
        >
          <span className="absolute left-0 top-3 h-[15px] w-[15px] rounded-full border-2 border-ink bg-line-strong ring-1 ring-line-strong transition-colors duration-500 group-hover:bg-accent" />
          <div className="md:sticky md:top-32 md:self-start">
            <h3 className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-cream/25 transition-colors duration-500 group-hover:text-cream/90 sm:text-5xl">
              {item.label}
            </h3>
          </div>
          <div>{renderBody(item)}</div>
        </motion.article>
      ))}
    </div>
  );
};

export default Timeline;
