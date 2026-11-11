import { useEffect, useRef } from "react";

/**
 * Fixed page backdrop — the original moving star particles (white dots with a
 * soft glow drifting in every direction), plus cyan / purple blurred glows.
 */
const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let particles = [];
    let frame;
    let width = 0;
    let height = 0;

    const createParticles = () => {
      // A light sprinkle: ~35 particles on a 1440×900 screen, ~15 on a phone
      const count = Math.max(14, Math.round((width * height) / 37000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        a: Math.random() * 0.5 + 0.45,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.shadowBlur = 5;
      ctx.shadowColor = "#ffffff";
      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          // wrap around the edges
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.a})`;
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    // Pause the animation while the tab is hidden
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reduceMotion) frame = requestAnimationFrame(loop);
    };

    resize();
    draw();
    if (!reduceMotion) frame = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* soft brand glows */}
      <div className="absolute -left-40 -top-40 h-[620px] w-[620px] rounded-full bg-accent/[0.10] blur-[150px]" />
      <div className="absolute -right-48 top-1/3 h-[560px] w-[560px] rounded-full bg-violet/[0.12] blur-[150px]" />
      <div className="absolute -bottom-48 left-1/4 h-[520px] w-[520px] rounded-full bg-blue/[0.08] blur-[150px]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
};

export default Background;
