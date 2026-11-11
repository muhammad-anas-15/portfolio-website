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

/** Shared reveal-on-scroll animation props for framer-motion. */
export const reveal = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});
