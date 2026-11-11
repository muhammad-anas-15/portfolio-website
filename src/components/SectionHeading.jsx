/**
 * Section opening (Hallmark craft § 7): the heading announces itself, no
 * eyebrow label above it, one weight and one colour. GSAP raises its words
 * out of a mask as it scrolls in ([data-split], components/MotionFX.jsx).
 */
const SectionHeading = ({ title, accent, subtitle, align = "left" }) => {
  const centered = align === "center";
  return (
    <div className={`mb-14 flex flex-col gap-5 ${centered ? "items-center text-center" : "items-start"}`}>
      <h2 data-split className="heading-xl max-w-[22ch]">
        {title} {accent}
      </h2>
      {subtitle && (
        <p data-reveal className={`max-w-2xl text-lg leading-relaxed text-muted ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
