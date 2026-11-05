"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { asset } from "@/lib/asset";
import { canHover, prefersReducedMotion } from "@/lib/motion";

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

  // Intro de marca (≤ 1,6s, 1ª visita da sessão): monograma e assinatura se revelam, a cortina sobe e o título entra por linhas.
  useEffect(() => {
    const root = document.documentElement;
    const ready = () => { root.dataset.ready = "1"; };
    if (root.dataset.intro !== "1") { ready(); return; }
    const el = document.querySelector<HTMLElement>(".intro");
    const img = el?.querySelector("img");
    const sig = el?.querySelector<HTMLElement>(".sig");
    if (!el || !img || !sig) { ready(); return; }
    try { sessionStorage.setItem("jr-intro", "1"); } catch {}
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    lenis?.stop();
    const out = "cubic-bezier(.16,1,.3,1)";
    img.animate([{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }], { duration: 700, easing: out, fill: "forwards" });
    const w = sig.animate([{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }], { duration: 650, delay: 380, easing: out, fill: "forwards" });
    w.finished.then(() => {
      el.animate([{ clipPath: "inset(0 0 0 0)" }, { clipPath: "inset(0 0 100% 0)" }], { duration: 450, delay: 60, easing: "cubic-bezier(.7,0,.84,1)", fill: "forwards" });
      window.setTimeout(ready, 180);
      window.setTimeout(() => { delete root.dataset.intro; lenis?.start(); }, 520);
    });
  }, []);

  // Cursor: ponto coral + anel com lerp, em um único elemento por peça (translate3d, sem setState).
  useEffect(() => {
    if (!canHover() || prefersReducedMotion() || window.innerWidth < 1024) return;
    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");
    if (!dot || !ring) return;
    document.body.classList.add("cursor-on");
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0, shown = false;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; rx = x; ry = y; }
      const lens = (e.target as HTMLElement | null)?.closest?.("[data-cursor='lens']");
      ring.classList.toggle("lens", !!lens);
      const sys = (e.target as HTMLElement | null)?.closest?.("input, textarea, select");
      document.body.classList.toggle("cursor-system", !!sys);
    };
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      dot.style.transform = `translate3d(${x}px,${y}px,0)`;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.body.classList.remove("cursor-on", "cursor-system");
    };
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
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true"><span>análise</span></div>
    </>
  );
}
