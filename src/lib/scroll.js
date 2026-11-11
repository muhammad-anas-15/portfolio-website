/** Smooth-scroll helpers shared by the app (Lenis when it runs, native otherwise). */
let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

/** Scroll the page to a Y position (or an element), offset for the fixed navbar. */
export function scrollToTarget(target, { offset = 0, immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { offset, immediate, duration: 1.2 });
    return;
  }
  const y = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: y + offset, behavior: immediate ? "auto" : "smooth" });
}
