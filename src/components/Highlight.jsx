/** Render "**word**" segments as highlighted spans. */
const Highlight = ({ text, className = "text-cream font-medium" }) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <span key={i} className={className}>
        {part.slice(2, -2)}
      </span>
    ) : (
      part
    )
  );

export default Highlight;
