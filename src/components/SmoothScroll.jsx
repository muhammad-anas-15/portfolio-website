import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, MOTION_OK } from "../lib/gsap";
import { setLenis } from "../lib/scroll";

/**
 * Smooth, inertial page scrolling (Lenis) driven by GSAP's ticker, so every
 * ScrollTrigger animation stays in lock-step with the scroll. Off under
 * reduced motion: the page then scrolls natively.
 */
const SmoothScroll = () => {
  useEffect(() => {
    if (!window.matchMedia(MOTION_OK).matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
      smoothWheel: true,
      anchors: { offset: -88 }, // in-page links land below the fixed navbar
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
};

export default SmoothScroll;
