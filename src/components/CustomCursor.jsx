import { useEffect, useRef } from "react";

/**
 * The original custom cursor: a small dot that follows the mouse closely and a
 * ring that trails behind it and grows over links and buttons.
 * Hidden automatically on touch devices (see .custom-cursor in index.css).
 */
const INTERACTIVE = "a, button, input, textarea, select, label, [role='button']";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { ...mouse };
    const ring = { ...mouse };
    let hovering = false;
    let visible = false;
    let frame;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // event delegation: works for elements added later too
      hovering = Boolean(e.target.closest?.(INTERACTIVE));
      if (!visible) {
        visible = true;
        dotRef.current.style.opacity = "1";
        ringRef.current.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      dotRef.current.style.opacity = "0";
      ringRef.current.style.opacity = "0";
    };

    const animate = () => {
      dot.x = lerp(dot.x, mouse.x, 0.35);
      dot.y = lerp(dot.y, mouse.y, 0.35);
      ring.x = lerp(ring.x, mouse.x, 0.14);
      ring.y = lerp(ring.y, mouse.y, 0.14);
      const size = hovering ? 46 : 30;
      dotRef.current.style.transform = `translate3d(${dot.x - 4}px, ${dot.y - 4}px, 0)`;
      ringRef.current.style.transform = `translate3d(${ring.x - size / 2}px, ${ring.y - size / 2}px, 0)`;
      ringRef.current.style.width = `${size}px`;
      ringRef.current.style.height = `${size}px`;
      ringRef.current.style.borderColor = hovering ? "rgba(34, 211, 238, 0.9)" : "rgba(255, 255, 255, 0.7)";
      ringRef.current.style.backgroundColor = hovering ? "rgba(34, 211, 238, 0.08)" : "transparent";
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="custom-cursor pointer-events-none fixed inset-0 z-[100]">
      <div ref={dotRef} className="absolute left-0 top-0 h-2 w-2 rounded-full bg-white opacity-0 transition-opacity duration-300" />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 rounded-full border opacity-0 transition-[opacity,width,height,background-color,border-color] duration-200"
        style={{ width: 30, height: 30 }}
      />
    </div>
  );
};

export default CustomCursor;
