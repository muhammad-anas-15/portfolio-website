import { motion } from "framer-motion";
import { reveal } from "../lib/helpers";

const SectionHeading = ({ eyebrow, title, accent, subtitle, align = "left" }) => {
  const centered = align === "center";
  return (
    <motion.div
      {...reveal()}
      className={`mb-14 flex flex-col gap-5 ${centered ? "items-center text-center" : "items-start"}`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="heading-xl max-w-4xl">
        {title} {accent && <span className="text-gradient">{accent}</span>}
      </h2>
      {subtitle && (
        <p className={`max-w-2xl text-lg leading-relaxed text-muted ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
