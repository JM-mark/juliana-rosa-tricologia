"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { asset } from "@/lib/asset";
import { prefersReducedMotion } from "@/lib/motion";
import { photoData } from "@/content/photo-data";

type Name = keyof typeof photoData;

/** Antes e depois com divisória arrastável (ponteiro + teclado). Só pares reais. */
export function BeforeAfter({
  before,
  after,
  beforeLabel,
  afterLabel,
  alt,
}: {
  before: Name;
  after: Name;
  beforeLabel: string;
  afterLabel: string;
  alt: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const pos = useRef(50);
  const d = photoData[before];

  const apply = useCallback((p: number) => {
    pos.current = Math.max(2, Math.min(98, p));
    if (top.current) top.current.style.clipPath = `inset(0 ${100 - pos.current}% 0 0)`;
    if (handle.current) {
      handle.current.style.left = `${pos.current}%`;
      handle.current.setAttribute("aria-valuenow", String(Math.round(pos.current)));
    }
  }, []);

  useEffect(() => {
    apply(50);
    const b = box.current;
    if (!b || prefersReducedMotion()) return;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const o = { p: 50 };
      gsap.timeline({ delay: 0.3, defaults: { ease: "power2.inOut" } })
        .to(o, { p: 22, duration: 0.9, onUpdate: () => apply(o.p) })
        .to(o, { p: 78, duration: 1.2, onUpdate: () => apply(o.p) })
        .to(o, { p: 50, duration: 0.8, onUpdate: () => apply(o.p) });
    }, { threshold: 0.5 });
    io.observe(b);
    return () => io.disconnect();
  }, [apply]);

  const fromEvent = (e: React.PointerEvent) => {
    const r = box.current!.getBoundingClientRect();
    apply(((e.clientX - r.left) / r.width) * 100);
  };

  const img = (n: Name) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={asset(`/photos/${n}-lg.webp`)} alt="" width={d.w} height={d.h} loading="lazy" decoding="async" draggable={false} className="h-full w-full object-cover" />
  );

  return (
    <figure>
      <div
        ref={box}
        className="photo-wrap relative touch-pan-y select-none"
        style={{ aspectRatio: `${d.w} / ${d.h}`, backgroundImage: `url(${photoData[after].lqip})`, backgroundSize: "cover" }}
        onPointerDown={(e) => { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); fromEvent(e); }}
        onPointerMove={(e) => { if (e.buttons || e.pointerType === "touch") fromEvent(e); }}
        role="group"
        aria-label={alt}
      >
        <div className="absolute inset-0">{img(after)}</div>
        <div ref={top} className="absolute inset-0" style={{ clipPath: "inset(0 50% 0 0)" }}>{img(before)}</div>
        <span className="t-label absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1.5 text-[11px] text-forest">{beforeLabel}</span>
        <span className="t-label absolute right-4 top-4 rounded-full bg-cream/90 px-3 py-1.5 text-[11px] text-forest">{afterLabel}</span>
        <div
          ref={handle}
          role="slider"
          tabIndex={0}
          aria-label={`Comparar: ${beforeLabel} e ${afterLabel}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
          aria-valuetext={`${Math.round(pos.current)}% de ${beforeLabel}`}
          className="absolute top-0 z-10 h-full w-11 -translate-x-1/2 cursor-ew-resize outline-offset-0"
          style={{ left: "50%" }}
          onKeyDown={(e) => {
            const step = e.shiftKey ? 10 : 4;
            if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); apply(pos.current - step); }
            if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); apply(pos.current + step); }
            if (e.key === "Home") { e.preventDefault(); apply(2); }
            if (e.key === "End") { e.preventDefault(); apply(98); }
          }}
        >
          <span aria-hidden="true" className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-coral" />
          <span aria-hidden="true" className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-coral bg-cream shadow-[0_10px_24px_-10px_rgba(31,58,43,0.6)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/brand/jr-marca.png")} alt="" width={598} height={380} className="h-5 w-auto" />
          </span>
        </div>
      </div>
      <figcaption className="t-cap mt-3 text-forest/75">Resultado real. {beforeLabel} e {afterLabel.toLowerCase()}. Os resultados variam de pessoa para pessoa.</figcaption>
    </figure>
  );
}
