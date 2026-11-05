"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { LIVEBASE_CATEGORY, livebaseUrl } from "@/config";
import { prefersReducedMotion } from "@/lib/motion";
import { Button, Eyebrow, Photo, SW } from "@/components/ui";
import { Atmos } from "@/components/BgMedia";
import { TLink } from "@/components/Nav";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    n: "01",
    eyebrow: "Tricologia",
    title: <>Queda de <em>cabelo</em></>,
    href: "/tricologia/",
    cat: LIVEBASE_CATEGORY.tricologia,
    cta: "Avaliação de queda de cabelo",
    benefits: ["Avaliação do couro cabeludo", "Plano individual de cuidado", "Acompanhamento mensal"],
    steps: "Avaliação · Plano e tratamento · Acompanhamento mensal",
  },
  {
    n: "02",
    eyebrow: "Sobrancelhas",
    title: <>Micropigmentação <em>fio a fio</em></>,
    href: "/sobrancelhas/micropigmentacao-fio-a-fio/",
    cat: LIVEBASE_CATEGORY.micropigmentacao,
    cta: "Avaliação de micropigmentação",
    benefits: ["Desenho pensado para o seu rosto", "Resultado cicatrizado natural", "Renovação e retoque"],
    steps: "Avaliação · Procedimento fio a fio · Cicatrização e retoque",
  },
] as const;

function Visual({ i }: { i: 0 | 1 }) {
  return i === 0 ? (
    <div className="photo-wrap h-full w-full">
      <Atmos name="cabelo-macro" className="h-full w-full object-cover" />
    </div>
  ) : (
    <div className="relative h-full w-full">
      <Photo name="fio-a-fio-resultado" alt="Resultado real de micropigmentação fio a fio, olhar frontal, com a marca Juliana Rosa" ratio="1 / 1" focus="50% 38%" className="!h-full !w-full" sizes="(min-width:1024px) 45vw, 90vw" />
    </div>
  );
}

function Copy({ s }: { s: (typeof SLIDES)[number] }) {
  return (
    <div>
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <h3 className="t-h1 mt-5" style={{ fontSize: "clamp(40px, 4.4vw, 66px)" }}>{s.title}</h3>
      <ul className="mt-7 grid gap-2.5">
        {s.benefits.map((b) => (
          <li key={b} className="t-body flex items-center gap-3"><Check size={18} strokeWidth={SW} className="flex-none text-coral-text" aria-hidden="true" />{b}</li>
        ))}
      </ul>
      <p className="t-label mt-7 text-forest/70">{s.steps}</p>
      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Button href={livebaseUrl(s.cat)} event={`agendar-vitrine-${s.n}`}>{s.cta}</Button>
        <TLink href={s.href} className="link-jr">Saiba mais <span className="arr">→</span></TLink>
      </div>
    </div>
  );
}

/** Vitrine dos 2 destaques: presa no scroll (desktop), troca Tricologia → Micropigmentação. No celular, 2 blocos empilhados. */
export function Showcase() {
  const [pinned, setPinned] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setPinned(mq.matches && !prefersReducedMotion());
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!pinned || !el) return;
    const ctx = gsap.context(() => {
      const t0 = el.querySelector<HTMLElement>("[data-t='0']")!;
      const t1 = el.querySelector<HTMLElement>("[data-t='1']")!;
      const i0 = el.querySelector<HTMLElement>("[data-i='0']")!;
      const i1 = el.querySelector<HTMLElement>("[data-i='1']")!;
      const odo = el.querySelector<HTMLElement>("[data-odo]")!;
      const bar = el.querySelector<HTMLElement>("[data-prog]");
      gsap.set(t1, { autoAlpha: 0, y: 50 });
      gsap.set(i1, { clipPath: "inset(50% 50% 50% 50% round 60px)" });
      const tl = gsap.timeline({ defaults: { ease: "expo.inOut" }, scrollTrigger: { trigger: el, start: "top top", end: "+=170%", pin: true, scrub: 0.7 } });
      tl.to({}, { duration: 0.6 }) // segura o primeiro
        .to(t0, { autoAlpha: 0, y: -50, duration: 0.7 }, 0.6) // o título sai antes de o próximo entrar
        .to(odo, { yPercent: -50, duration: 0.9 }, 0.6)
        .to(i1, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1 }, 0.7)
        .to(t1, { autoAlpha: 1, y: 0, duration: 0.7 }, 1.45)
        .to({}, { duration: 0.6 });
      if (bar) tl.to(bar, { scaleX: 1, ease: "none", duration: 3.3 }, 0);
      void i0;
    }, el);
    return () => ctx.revert();
  }, [pinned]);

  if (!pinned) {
    return (
      <div className="grid gap-16">
        {SLIDES.map((s, i) => (
          <article key={s.n} className="grid-12 items-center gap-y-8">
            <div className="col-span-12 lg:col-span-5"><p className="t-num t-display accent-text">{s.n}<span className="text-forest/30"> / 02</span></p><Copy s={s} /></div>
            <div className="col-span-12 aspect-[8/7] overflow-hidden rounded-[28px] lg:col-span-6 lg:col-start-7"><Visual i={i as 0 | 1} /></div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div ref={root} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <div className="grid-12 h-full items-center">
        <div className="relative col-span-5 h-[72%]">
          <div className="t-display absolute left-0 top-0 h-[1em] overflow-hidden leading-none accent-text t-num" style={{ fontSize: "clamp(56px, 6.2vw, 92px)" }} aria-hidden="true">
            <div data-odo><div className="h-[1em]">01</div><div className="h-[1em]">02</div></div>
          </div>
          <span className="t-display absolute left-[1.5em] top-0 leading-none text-forest/30 t-num" style={{ fontSize: "clamp(56px, 6.2vw, 92px)" }} aria-hidden="true">/ 02</span>
          <div data-t="0" className="absolute inset-x-0" style={{ top: "clamp(88px, 8.4vw, 124px)" }}><Copy s={SLIDES[0]} /></div>
          <div data-t="1" className="absolute inset-x-0" style={{ top: "clamp(88px, 8.4vw, 124px)" }}><Copy s={SLIDES[1]} /></div>
        </div>
        <div className="col-span-6 col-start-7 grid h-full place-items-center">
          <div className="relative" style={{ aspectRatio: "8 / 7", width: "min(100%, calc(80svh * 1.1428))" }}>
            <div data-i="0" className="absolute inset-0 overflow-hidden rounded-[28px]"><Visual i={0} /></div>
            <div data-i="1" className="absolute inset-0 overflow-hidden"><Visual i={1} /></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 mx-auto h-px max-w-[1184px] bg-forest/15" aria-hidden="true"><span data-prog className="block h-px origin-left scale-x-0 bg-coral" /></div>
    </div>
  );
}
