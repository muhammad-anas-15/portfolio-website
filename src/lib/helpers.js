import { projects, experience, techStack } from "../data/portfolio";

/** Resolve a /public path against Vite's base ("/portfolio-website/"). */
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

/** Resolve "auto:*" stat values from the data. */
export function resolveStat(value) {
  if (value === "auto:projects") return projects.length;
  if (value === "auto:ai") return projects.filter((p) => p.ai).length;
  if (value === "auto:internships") return experience.length;
  if (value === "auto:tech") return Math.floor(techStack.length / 5) * 5;
  return value;
}

export const article = (word) => (/^[aeiou]/i.test(word) ? "an" : "a");

/** Marks an element for the GSAP reveal-once (components/MotionFX.jsx). */
export const reveal = () => ({ "data-reveal": "" });
