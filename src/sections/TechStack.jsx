import { useEffect, useMemo, useRef, useState } from "react";
import {
  SiClaude, SiCplusplus, SiCss3, SiDart, SiDjango, SiDocker, SiExpress, SiFastapi, SiFigma, SiFirebase,
  SiFlutter, SiGit, SiGithub, SiGooglegemini, SiHtml5, SiHuggingface, SiJavascript, SiLangchain, SiMongodb,
  SiMysql, SiNetlify, SiNextdotjs, SiNodedotjs, SiNumpy, SiOpencv, SiPandas, SiPostgresql, SiPostman,
  SiPython, SiPytorch, SiReact, SiScikitlearn, SiShopify, SiSocketdotio, SiStreamlit, SiTailwindcss,
  SiTypescript, SiVercel,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import SectionHeading from "../components/SectionHeading";
import { techStack } from "../data/portfolio";
import { reveal } from "../lib/helpers";

const LIGHT = "#f4f0e9";
const ICONS = {
  python: [SiPython, "#3776AB"], cplusplus: [SiCplusplus, "#00599C"], java: [FaJava, "#E76F00"],
  javascript: [SiJavascript, "#F7DF1E"], typescript: [SiTypescript, "#3178C6"], dart: [SiDart, "#0175C2"],
  langchain: [SiLangchain, "#1C9C8C"], gemini: [SiGooglegemini, "#8E75FF"], pytorch: [SiPytorch, "#EE4C2C"],
  scikitlearn: [SiScikitlearn, "#F7931E"], opencv: [SiOpencv, "#5C3EE8"], huggingface: [SiHuggingface, "#FFD21E"],
  pandas: [SiPandas, "#9B8CFF"], numpy: [SiNumpy, "#4DABCF"], streamlit: [SiStreamlit, "#FF4B4B"],
  react: [SiReact, "#61DAFB"], nextjs: [SiNextdotjs, LIGHT], tailwind: [SiTailwindcss, "#38BDF8"],
  html: [SiHtml5, "#E34F26"], css: [SiCss3, "#1572B6"], flutter: [SiFlutter, "#54C5F8"],
  nodejs: [SiNodedotjs, "#5FA04E"], express: [SiExpress, LIGHT], fastapi: [SiFastapi, "#009688"],
  django: [SiDjango, "#44B78B"], socketio: [SiSocketdotio, LIGHT], postgresql: [SiPostgresql, "#4169E1"],
  mongodb: [SiMongodb, "#47A248"], mysql: [SiMysql, "#4479A1"], firebase: [SiFirebase, "#FFCA28"],
  docker: [SiDocker, "#2496ED"], git: [SiGit, "#F05032"], github: [SiGithub, LIGHT], vercel: [SiVercel, LIGHT],
  netlify: [SiNetlify, "#32E6E2"], postman: [SiPostman, "#FF6C37"], figma: [SiFigma, "#F24E1E"],
  shopify: [SiShopify, "#95BF47"], claude: [SiClaude, "#D97757"],
};

/** Evenly spread n points over a unit sphere. */
function fibonacciSphere(n) {
  const accenten = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = accenten * i;
    return [Math.cos(theta) * r, y, Math.sin(theta) * r];
  });
}

function Globe({ items }) {
  const wrapRef = useRef(null);
  const nodeRefs = useRef([]);
  const meridianRefs = useRef([]);
  const [size, setSize] = useState(460);
  const [hovered, setHovered] = useState(null);
  const hoveredRef = useRef(null);
  const points = useMemo(() => fibonacciSphere(items.length), [items.length]);

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  // Responsive globe size
  useEffect(() => {
    const el = wrapRef.current;
    const ro = new ResizeObserver(([entry]) => setSize(Math.min(entry.contentRect.width, 540)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Animation loop: auto-spin + drag with inertia, paused when offscreen.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { rotY: 0, rotX: -0.25, vy: reduce ? 0 : 0.0035, vx: 0, dragging: false, lastX: 0, lastY: 0, visible: true };
    const radius = size * 0.4;
    let frame;

    const render = () => {
      const cosY = Math.cos(state.rotY), sinY = Math.sin(state.rotY);
      const cosX = Math.cos(state.rotX), sinX = Math.sin(state.rotX);
      points.forEach(([x, y, z], i) => {
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const depth = (z2 + 1) / 2; // 0 back → 1 front
        const el = nodeRefs.current[i];
        if (!el) return;
        el.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y2 * radius}px, 0) scale(${0.55 + depth * 0.65})`;
        el.style.opacity = String(0.18 + depth * 0.82);
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.filter = depth < 0.4 ? "grayscale(0.7) blur(0.5px)" : "";
      });
      meridianRefs.current.forEach((m, k) => {
        if (!m) return;
        const angle = state.rotY + (k * Math.PI) / meridianRefs.current.length;
        m.setAttribute("rx", String(Math.abs(Math.cos(angle)) * radius));
      });
    };

    const tick = () => {
      if (state.visible) {
        if (!state.dragging) {
          const target = hoveredRef.current ? 0.0008 : reduce ? 0 : 0.0035;
          state.vy += (target - state.vy) * 0.03;
          state.vx *= 0.94;
          state.rotX = Math.max(-1, Math.min(1, state.rotX + state.vx));
        }
        state.rotY += state.vy;
        render();
      }
      frame = requestAnimationFrame(tick);
    };

    const el = wrapRef.current;
    const down = (e) => {
      state.dragging = true;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      el.setPointerCapture?.(e.pointerId);
    };
    const move = (e) => {
      if (!state.dragging) return;
      const dx = e.clientX - state.lastX;
      const dy = e.clientY - state.lastY;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      state.vy = dx * 0.006;
      state.vx = -dy * 0.004;
      state.rotX = Math.max(-1, Math.min(1, state.rotX + state.vx));
    };
    const up = () => (state.dragging = false);
    const io = new IntersectionObserver(([entry]) => (state.visible = entry.isIntersecting));

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    io.observe(el);
    render();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      io.disconnect();
    };
  }, [points, size]);

  const radius = size * 0.4;
  const iconSize = Math.max(26, Math.round(size * 0.075));

  return (
    <div ref={wrapRef} className="relative mx-auto aspect-square w-full max-w-[540px] cursor-grab touch-pan-y select-none active:cursor-grabbing">
      {/* wireframe sphere */}
      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}>
        <circle r={radius} className="fill-accent/[0.04] stroke-accent/25" />
        {[-0.66, -0.33, 0, 0.33, 0.66].map((lat) => (
          <ellipse key={lat} cy={lat * radius} rx={Math.sqrt(1 - lat * lat) * radius} ry={Math.sqrt(1 - lat * lat) * radius * 0.22} fill="none" className="stroke-accent/10" />
        ))}
        {Array.from({ length: 6 }, (_, k) => (
          <ellipse key={k} ref={(el) => (meridianRefs.current[k] = el)} rx={radius} ry={radius} fill="none" className="stroke-accent/10" />
        ))}
      </svg>

      {items.map((item, i) => {
        const [Icon, color] = ICONS[item.icon] || [SiGithub, LIGHT];
        return (
          <button
            key={item.name}
            type="button"
            ref={(el) => (nodeRefs.current[i] = el)}
            onMouseEnter={() => setHovered(item.name)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(item.name)}
            onBlur={() => setHovered(null)}
            aria-label={item.name}
            className="group/logo absolute left-1/2 top-1/2 grid place-items-center rounded-full p-1.5 hover:!opacity-100"
            style={{ color }}
          >
            <Icon size={iconSize} className="transition-transform duration-200 group-hover/logo:scale-125" />
          </button>
        );
      })}

      <div className="pointer-events-none absolute inset-x-0 bottom-[3%] text-center text-sm text-accent-bright">
        {hovered || <span className="text-muted">Drag to spin, hover a logo</span>}
      </div>
    </div>
  );
}

const TechStack = () => {
  const groups = useMemo(() => {
    const map = new Map();
    techStack.forEach((t) => map.set(t.group, [...(map.get(t.group) || []), t.name]));
    return [...map.entries()];
  }, []);

  return (
    <section id="stack" className="section-frost relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          title="The tools I"
          accent="build with"
          subtitle="Languages, AI frameworks and platforms I use to take ideas from notebook to production."
          align="center"
        />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* Categories, left */}
          <div className="order-2 flex flex-col gap-3 lg:order-1">
            {groups.map(([group, names]) => (
              <div key={group} {...reveal()} data-tilt className="card p-5 transition-[border-color] duration-300 hover:border-accent/40">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-base font-bold text-cream">{group}</h3>
                  <span className="label">{names.length} tools</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-soft/80">{names.join(", ")}</p>
              </div>
            ))}
          </div>

          {/* 3D globe, right */}
          <div {...reveal()} className="order-1 lg:order-2">
            <Globe items={techStack} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
