"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { REVIEWS } from "@/content/reviews";
import { GOOGLE_REVIEWS_URL } from "@/content/reviews";
import { prefersReducedMotion } from "@/lib/motion";
import { SW } from "@/components/ui";

const EVERY = 7000;

/** Uma avaliação grande por vez: troca a cada 7s, setas e barra de progresso. */
export function Reviews() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const bar = useRef<HTMLSpanElement>(null);
  const n = REVIEWS.length;

  useEffect(() => {
    const b = bar.current;
    if (!b) return;
    b.style.transition = "none";
    b.style.transform = "scaleX(0)";
    if (paused || prefersReducedMotion()) return;
    void b.offsetWidth;
    b.style.transition = `transform ${EVERY}ms linear`;
    b.style.transform = "scaleX(1)";
    const t = window.setTimeout(() => setI((v) => (v + 1) % n), EVERY);
    return () => window.clearTimeout(t);
  }, [i, paused, n]);

  const r = REVIEWS[i];
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <div className="flex min-h-[260px] flex-col justify-between" aria-live="polite">
        <blockquote key={i} className="t-h2 rv is-in !text-[clamp(26px,3.3vw,46px)]" style={{ transition: "none" }}>
          <span aria-hidden="true" className="accent mr-1 select-none">“</span>
          {r.text}
          <span aria-hidden="true" className="accent ml-1 select-none">”</span>
        </blockquote>
        <p className="t-label mt-8 text-forest/80">{r.name} · avaliação no Google</p>
      </div>
      <div className="mt-8 flex items-center gap-5">
        <div className="flex gap-2">
          <button type="button" className="grid h-12 w-12 place-items-center rounded-full border border-forest/30 transition-colors duration-200 hover:bg-forest hover:text-cream" aria-label="Avaliação anterior" onClick={() => setI((v) => (v - 1 + n) % n)}>
            <ArrowLeft size={18} strokeWidth={SW} />
          </button>
          <button type="button" className="grid h-12 w-12 place-items-center rounded-full border border-forest/30 transition-colors duration-200 hover:bg-forest hover:text-cream" aria-label="Próxima avaliação" onClick={() => setI((v) => (v + 1) % n)}>
            <ArrowRight size={18} strokeWidth={SW} />
          </button>
        </div>
        <div className="h-px flex-1 bg-forest/20" aria-hidden="true">
          <span ref={bar} className="block h-px origin-left bg-coral" style={{ transform: "scaleX(0)" }} />
        </div>
        <span className="t-num t-cap text-forest/70">{i + 1} / {n}</span>
      </div>
      <a className="link-jr mt-6" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" data-event="google-reviews">
        Ver na ficha do Google <ArrowRight className="arr" size={16} strokeWidth={SW} aria-hidden="true" />
      </a>
    </div>
  );
}
