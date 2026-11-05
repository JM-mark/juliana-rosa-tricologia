"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { n: "01", t: "Avaliação", d: "Olhamos o couro cabeludo e os fios de perto, e ouvimos o seu histórico." },
  { n: "02", t: "Plano", d: "Um tratamento capilar pensado para o seu caso, explicado etapa por etapa." },
  { n: "03", t: "Tratamento", d: "Sessões e cuidados em casa, com orientação sobre produtos e rotina." },
  { n: "04", t: "Acompanhamento mensal", d: "Todo mês revemos a evolução e ajustamos o plano com você." },
];

const SURFACE = 330; // linha da pele

/** Corte do couro cabeludo (epiderme e derme), 14 folículos em coral, fios que crescem com o scroll e partículas de estímulo subindo. */
export function FollicleGrow() {
  const root = useRef<HTMLDivElement>(null);

  const strands = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const x = 52 + i * 41.5;
        const h = 150 + ((i * 53) % 110);
        const lean = (i % 2 ? 1 : -1) * (10 + ((i * 17) % 34));
        const dep = 70 + ((i * 29) % 40);
        return {
          x,
          d: `M${x} ${SURFACE} C${x + lean * 0.15} ${SURFACE - h * 0.4} ${x + lean * 0.9} ${SURFACE - h * 0.74} ${x + lean * 1.5} ${SURFACE - h}`,
          fol: `M${x} ${SURFACE} L${x} ${SURFACE + dep} C${x} ${SURFACE + dep + 22} ${x - 12} ${SURFACE + dep + 34} ${x - 12} ${SURFACE + dep + 52} C${x - 12} ${SURFACE + dep + 74} ${x + 12} ${SURFACE + dep + 74} ${x + 12} ${SURFACE + dep + 52} C${x + 12} ${SURFACE + dep + 34} ${x} ${SURFACE + dep + 22} ${x} ${SURFACE + dep}`,
          bulb: [x, SURFACE + dep + 50] as const,
        };
      }),
    [],
  );

  const particles = useMemo(
    () => Array.from({ length: 26 }, (_, i) => ({ x: 40 + ((i * 97) % 560), y: SURFACE + 60 + ((i * 61) % 150), r: 1.1 + (i % 3) * 0.6 })),
    [],
  );

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const hairs = Array.from(el.querySelectorAll<SVGPathElement>("[data-strand]"));
    const bulbs = Array.from(el.querySelectorAll<SVGPathElement>("[data-bulb]"));
    const dots = Array.from(el.querySelectorAll<SVGCircleElement>("[data-dot]"));
    const steps = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
    const bar = el.querySelector<HTMLElement>("[data-bar]");
    if (prefersReducedMotion()) {
      steps.forEach((s) => s.setAttribute("data-on", "1"));
      return;
    }
    const ctx = gsap.context(() => {
      hairs.forEach((p) => {
        const l = p.getTotalLength();
        gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
      });
      gsap.set(bulbs, { opacity: 0.3 });
      dots.forEach((d, i) => {
        gsap.to(d, { y: -(60 + (i % 5) * 26), opacity: 0, duration: 3.2 + (i % 4) * 0.7, repeat: -1, delay: (i % 7) * 0.45, ease: "sine.in", startAt: { opacity: 0.85, y: 0 } });
      });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 65%", end: "bottom 70%", scrub: 0.7 }, defaults: { ease: "none" } });
      tl.to(bulbs, { opacity: 1, duration: 0.2, stagger: 0.015 }, 0);
      tl.to(hairs, { strokeDashoffset: 0, duration: 0.7, stagger: 0.025 }, 0.15);
      if (bar) tl.to(bar, { scaleY: 1, duration: 1 }, 0);
      steps.forEach((s, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: `top+=${(i / steps.length) * 62 + 6}% 65%`,
          onEnter: () => s.setAttribute("data-on", "1"),
          onLeaveBack: () => s.removeAttribute("data-on"),
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="grid-12 items-center gap-y-12">
      <div className="col-span-12 lg:col-span-7">
        <svg viewBox="0 0 640 560" className="w-full" role="img" aria-label="Corte do couro cabeludo com folículos, fios crescendo e partículas de estímulo subindo">
          {/* camadas: derme e epiderme */}
          <path d={`M0 ${SURFACE} H640 V560 H0 Z`} fill="#f4ece3" opacity="0.07" />
          <path d={`M0 ${SURFACE} H640 V${SURFACE + 34} H0 Z`} fill="#f4ece3" opacity="0.13" />
          <path d={`M0 ${SURFACE} Q80 ${SURFACE - 5} 160 ${SURFACE} T320 ${SURFACE} T480 ${SURFACE} T640 ${SURFACE}`} fill="none" stroke="#f4ece3" strokeOpacity="0.55" strokeWidth="1.5" />
          <path d={`M0 ${SURFACE + 34} H640`} stroke="#f4ece3" strokeOpacity="0.2" strokeDasharray="2 7" />
          <path d={`M0 ${SURFACE + 250} Q160 ${SURFACE + 236} 320 ${SURFACE + 250} T640 ${SURFACE + 250}`} fill="none" stroke="#f4ece3" strokeOpacity="0.14" strokeDasharray="2 9" />
          <text x="14" y={SURFACE + 22} fill="#f4ece3" fillOpacity="0.55" fontFamily="var(--font-body)" fontSize="11" letterSpacing="2.4">EPIDERME</text>
          <text x="14" y={SURFACE + 80} fill="#f4ece3" fillOpacity="0.4" fontFamily="var(--font-body)" fontSize="11" letterSpacing="2.4">DERME</text>
          {strands.map((s, i) => (
            <g key={i}>
              <path data-bulb d={s.fol} fill="none" stroke="#e38e72" strokeWidth="2" strokeLinecap="round" />
              <circle cx={s.bulb[0]} cy={s.bulb[1]} r="3.2" fill="#e38e72" opacity="0.8" />
              <path data-strand d={s.d} fill="none" stroke="#f4ece3" strokeWidth={1.6 + (i % 3) * 0.4} strokeLinecap="round" />
            </g>
          ))}
          {particles.map((p, i) => (
            <circle key={i} data-dot cx={p.x} cy={p.y} r={p.r} fill="#e38e72" opacity="0.7" />
          ))}
        </svg>
      </div>
      <ol className="relative col-span-12 grid gap-8 lg:col-span-5">
        <span aria-hidden="true" className="absolute bottom-2 left-[15px] top-2 w-px bg-cream/25" />
        <span data-bar aria-hidden="true" className="absolute bottom-2 left-[15px] top-2 w-px origin-top scale-y-0 bg-coral" />
        {STEPS.map((s) => (
          <li key={s.n} data-step className="group relative pl-12 opacity-60 transition-opacity duration-500 data-[on=1]:opacity-100">
            <span className="t-num t-label absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border border-cream/40 bg-forest text-[11px] transition-colors duration-500 group-data-[on=1]:border-coral group-data-[on=1]:text-coral">{s.n}</span>
            <h3 className="t-h4">{s.t}</h3>
            <p className="t-body mt-1 text-cream/80">{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
