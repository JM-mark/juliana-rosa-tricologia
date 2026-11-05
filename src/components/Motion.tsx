"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { asset } from "@/lib/asset";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** Rolagem suave (Lenis) ligada ao GSAP, observador de revelação e intro de abertura. */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    (window as unknown as { __lenis: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // Revelação por seção: cada elemento .rv entra com atraso próprio (data-d em ms).
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv, .reveal-photo, .scribble"));
    if (prefersReducedMotion()) {
      els.forEach((e) => e.classList.add("is-in"));
      return;
    }
    // ScrollTrigger (já sincronizado com o Lenis) dispara cada revelação uma vez. Fotos com máscara fechada usam o pai como gatilho.
    const triggers = els.map((e) => {
      const watch = e.classList.contains("reveal-photo") && e.parentElement ? e.parentElement : e;
      return ScrollTrigger.create({
        trigger: watch,
        start: "top 90%",
        once: true,
        onEnter: () => {
          const d = e.dataset.d;
          if (d) e.style.transitionDelay = `${d}ms`;
          e.classList.add("is-in");
        },
      });
    });
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      triggers.forEach((tr) => tr.kill());
      window.clearTimeout(t);
      window.removeEventListener("load", onLoad);
    };
  }, [pathname]);

  // Intro de marca: as animações são CSS (ver globals.css). Aqui só seguramos a rolagem até a cortina subir.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.ready = "1";
    if (root.dataset.intro !== "1") return;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    lenis?.stop();
    const t = window.setTimeout(() => lenis?.start(), 1200);
    return () => window.clearTimeout(t);
  }, []);


  return (
    <>
      <div className="intro" aria-hidden="true">
        <div className="intro-stack">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/brand/jr-marca.png")} alt="" />
          <span className="sig">Juliana Rosa</span>
        </div>
      </div>
    </>
  );
}
