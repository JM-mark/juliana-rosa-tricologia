"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Gerador determinístico (mesmo desenho no servidor e no cliente).
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = { x: number; y: number };
const bez = (t: number, p: Pt[]) => {
  const u = 1 - t;
  return {
    x: u * u * u * p[0].x + 3 * u * u * t * p[1].x + 3 * u * t * t * p[2].x + t * t * t * p[3].x,
    y: u * u * u * p[0].y + 3 * u * u * t * p[1].y + 3 * u * t * t * p[2].y + t * t * t * p[3].y,
  };
};
const tan = (t: number, p: Pt[]) => {
  const u = 1 - t;
  const x = 3 * u * u * (p[1].x - p[0].x) + 6 * u * t * (p[2].x - p[1].x) + 3 * t * t * (p[3].x - p[2].x);
  const y = 3 * u * u * (p[1].y - p[0].y) + 6 * u * t * (p[2].y - p[1].y) + 3 * t * t * (p[3].y - p[2].y);
  const l = Math.hypot(x, y) || 1;
  return { x: x / l, y: y / l };
};

const CENTER: Pt[] = [
  { x: 36, y: 176 },
  { x: 150, y: 70 },
  { x: 330, y: 44 },
  { x: 488, y: 150 },
];

export function BrowSketch({ className = "", label = true }: { className?: string; label?: boolean }) {
  const root = useRef<SVGSVGElement>(null);

  const hairs = useMemo(() => {
    const r = rng(20240917);
    const out: { d: string; w: number; o: number; t: number }[] = [];
    const N = 86;
    for (let i = 0; i < N; i++) {
      const t = 0.02 + (i / (N - 1)) * 0.96 + (r() - 0.5) * 0.012;
      const c = bez(t, CENTER);
      const tg = tan(t, CENTER);
      const nrm = { x: -tg.y, y: tg.x };
      const half = 25 * (1 - 0.62 * t) + 3;
      const off = (r() * 2 - 1) * half;
      const sx = c.x + nrm.x * off;
      const sy = c.y + nrm.y * off;
      // Cabeça: fios sobem em ângulo; corpo e cauda seguem a tangente.
      const lift = (1 - Math.min(1, t * 2.4)) * 0.85;
      const dir = { x: tg.x + nrm.x * -lift * 0.55, y: tg.y + nrm.y * -lift * 0.55 };
      const dl = Math.hypot(dir.x, dir.y) || 1;
      const len = 24 + r() * 16 + (1 - t) * 6;
      const ex = sx + (dir.x / dl) * len;
      const ey = sy + (dir.y / dl) * len;
      const bend = (r() - 0.5) * 7;
      const cx = (sx + ex) / 2 + nrm.x * bend;
      const cy = (sy + ey) / 2 + nrm.y * bend;
      out.push({
        d: `M${sx.toFixed(1)} ${sy.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,
        w: 1.2 + r() * 0.9,
        o: 0.55 + r() * 0.45,
        t,
      });
    }
    return out;
  }, []);

  useEffect(() => {
    const svg = root.current;
    if (!svg) return;
    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("[data-hair]"));
    const guide = svg.querySelector<SVGPathElement>("[data-guide]");
    const sheen = svg.querySelector<SVGRectElement>("[data-sheen]");
    if (prefersReducedMotion()) {
      guide?.setAttribute("opacity", "0");
      return;
    }
    const ctx = gsap.context(() => {
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      if (guide) {
        const gl = guide.getTotalLength();
        gsap.set(guide, { strokeDasharray: gl, strokeDashoffset: gl, opacity: 1 });
      }
      const tl = gsap.timeline({ delay: 0.5 });
      if (guide) tl.to(guide, { strokeDashoffset: 0, duration: 0.9, ease: "expo.out" });
      tl.to(paths, { strokeDashoffset: 0, duration: 0.5, ease: "expo.out", stagger: { each: 0.026, from: "start" } }, 0.4);
      if (guide) tl.to(guide, { opacity: 0, duration: 0.5 }, "-=1.1");
      if (sheen) tl.fromTo(sheen, { x: -120, opacity: 0 }, { x: 560, opacity: 0.9, duration: 0.9, ease: "expo.inOut" }, "-=0.2").to(sheen, { opacity: 0, duration: 0.3 }, "-=0.2");
    }, svg);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={root} viewBox="0 0 520 240" className={className} role="img" aria-label="Sobrancelha sendo desenhada fio a fio">
      <defs>
        <linearGradient id="sheen-g" x1="0" x2="1">
          <stop offset="0" stopColor="#f4ece3" stopOpacity="0" />
          <stop offset="0.5" stopColor="#f4ece3" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f4ece3" stopOpacity="0" />
        </linearGradient>
        <clipPath id="brow-clip">
          {hairs.map((h, i) => (
            <path key={i} d={h.d} fill="none" />
          ))}
        </clipPath>
      </defs>
      <path
        data-guide
        d={`M${CENTER[0].x} ${CENTER[0].y} C${CENTER[1].x} ${CENTER[1].y} ${CENTER[2].x} ${CENTER[2].y} ${CENTER[3].x} ${CENTER[3].y}`}
        fill="none"
        stroke="#c39c83"
        strokeWidth="1"
        strokeDasharray="3 5"
      />
      <g fill="none" strokeLinecap="round" stroke="#1f3a2b">
        {hairs.map((h, i) => (
          <path key={i} data-hair d={h.d} strokeWidth={h.w} opacity={h.o} />
        ))}
      </g>
      <rect data-sheen x="0" y="20" width="90" height="200" fill="url(#sheen-g)" opacity="0" style={{ mixBlendMode: "soft-light" }} />
      {label && (
        <text x="36" y="226" fill="#a8472f" fontFamily="var(--font-body)" fontSize="11" fontWeight="500" letterSpacing="1.6">
          FIO A FIO · DESENHO PARA O SEU ROSTO
        </text>
      )}
    </svg>
  );
}
