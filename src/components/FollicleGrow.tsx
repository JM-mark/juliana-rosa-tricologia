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

/** Corte do couro cabeludo: os fios crescem a partir dos folículos, ligados ao scroll. */
export function FollicleGrow() {
  const root = useRef<HTMLDivElement>(null);

  const strands = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => {
        const x = 70 + i * 46;
        const h = 150 + ((i * 53) % 90);
        const lean = (i % 2 ? 1 : -1) * (10 + ((i * 17) % 26));
        return {
          x,
          h,
          d: `M${x} 312 C${x + lean * 0.2} ${312 - h * 0.4} ${x + lean} ${312 - h * 0.75} ${x + lean * 1.4} ${312 - h}`,
          fol: `M${x} 312 L${x} 372 C${x} 392 ${x - 10} 402 ${x - 10} 418 C${x - 10} 436 ${x + 10} 436 ${x + 10} 418 C${x + 10} 402 ${x} 392 ${x} 372`,
        };
      }),
    [],
  );

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const hairs = Array.from(el.querySelectorAll<SVGPathElement>("[data-strand]"));
    const bulbs = Array.from(el.querySelectorAll<SVGPathElement>("[data-bulb]"));
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
      gsap.set(bulbs, { opacity: 0.35 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 65%", end: "bottom 70%", scrub: 0.7 },
        defaults: { ease: "none" },
      });
      tl.to(bulbs, { opacity: 1, duration: 0.2, stagger: 0.02 }, 0);
      tl.to(hairs, { strokeDashoffset: 0, duration: 0.7, stagger: 0.03 }, 0.15);
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
      <div className="col-span-12 lg:col-span-6">
        <svg viewBox="0 0 600 470" className="w-full" role="img" aria-label="Corte do couro cabeludo com fios crescendo a partir dos folículos">
          <rect x="20" y="312" width="560" height="140" rx="26" fill="#f4ece3" opacity="0.1" />
          <path d="M20 312 H580" stroke="#f4ece3" strokeOpacity="0.5" strokeWidth="1.5" />
          <path d="M20 338 H580" stroke="#f4ece3" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 7" />
          {strands.map((s, i) => (
            <g key={i}>
              <path data-bulb d={s.fol} fill="none" stroke="#e38e72" strokeWidth="2" strokeLinecap="round" />
              <path data-strand d={s.d} fill="none" stroke="#f4ece3" strokeWidth="2" strokeLinecap="round" />
            </g>
          ))}
        </svg>
      </div>
      <ol className="relative col-span-12 grid gap-7 lg:col-span-5 lg:col-start-8">
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
