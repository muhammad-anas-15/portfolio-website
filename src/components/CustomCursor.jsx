"use client";
import React, { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let isHovering = false;

    const DOT_SMOOTHNESS = 0.2;
    const RING_SMOOTHNESS = 0.1;

    const interactiveElements = document.querySelectorAll(
      "a, button, img, input, textarea, select"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => (isHovering = true));
      el.addEventListener("mouseleave", () => (isHovering = false));
    });

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      dot.x = lerp(dot.x, mouse.x, DOT_SMOOTHNESS);
      dot.y = lerp(dot.y, mouse.y, DOT_SMOOTHNESS);

      ring.x = lerp(ring.x, mouse.x, RING_SMOOTHNESS);
      ring.y = lerp(ring.y, mouse.y, RING_SMOOTHNESS);

      if (dotRef.current && ringRef.current) {
        dotRef.current.style.transform = `translate(${dot.x - 4}px, ${dot.y - 4}px)`;
        ringRef.current.style.transform = `translate(${ring.x - (isHovering ? 22 : 14)}px, ${
          ring.y - (isHovering ? 22 : 14)
        }px)`;
        ringRef.current.style.width = isHovering ? "44px" : "28px";
        ringRef.current.style.height = isHovering ? "44px" : "28px";
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div
        ref={dotRef}
        className="absolute bg-white rounded-full"
        style={{ width: "8px", height: "8px" }}
      />
      <div
        ref={ringRef}
        className="absolute border border-white rounded-full"
        style={{ width: "28px", height: "28px" }}
      />
    </div>
  );
};

export default CustomCursor;
