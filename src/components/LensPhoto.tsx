"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { asset } from "@/lib/asset";
import { canHover, prefersReducedMotion } from "@/lib/motion";
import { photoData } from "@/content/photo-data";

const ZOOM = 2.2;
const SIZE = 176;

/** Lente de análise (como um tricoscópio): amplia 2× a área sob o mouse. No celular, passeia sozinha. */
export function LensPhoto({ name = "fio-a-fio-resultado" as keyof typeof photoData, alt }: { name?: keyof typeof photoData; alt: string }) {
  const box = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const d = photoData[name];
  const src = asset(`/photos/${name}-lg.webp`);

  useEffect(() => {
    const b = box.current;
    const l = lens.current;
    if (!b || !l) return;
    const place = (x: number, y: number) => {
      const r = b.getBoundingClientRect();
      const cx = Math.max(0, Math.min(r.width, x));
      const cy = Math.max(0, Math.min(r.height, y));
      l.style.transform = `translate3d(${cx - SIZE / 2}px, ${cy - SIZE / 2}px, 0)`;
      l.style.backgroundSize = `${r.width * ZOOM}px ${r.height * ZOOM}px`;
      l.style.backgroundPosition = `${-(cx * ZOOM - SIZE / 2)}px ${-(cy * ZOOM - SIZE / 2)}px`;
    };
    place(b.clientWidth * 0.28, b.clientHeight * 0.4);

    if (prefersReducedMotion()) {
      l.style.opacity = "1";
      return;
    }
    let raf = 0;
    let tw: gsap.core.Timeline | null = null;
    const hover = canHover() && window.innerWidth >= 1024;
    if (hover) {
      let tx = 0, ty = 0, cx = b.clientWidth * 0.28, cy = b.clientHeight * 0.4, inside = false;
      const move = (e: PointerEvent) => {
        const r = b.getBoundingClientRect();
        tx = e.clientX - r.left; ty = e.clientY - r.top;
      };
      const enter = () => { inside = true; gsap.to(l, { opacity: 1, scale: 1, duration: 0.5, ease: "expo.out" }); };
      const leave = () => { inside = false; gsap.to(l, { opacity: 0, scale: 0.8, duration: 0.5, ease: "expo.out" }); };
      const loop = () => {
        if (inside) { cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2; place(cx, cy); }
        raf = requestAnimationFrame(loop);
      };
      gsap.set(l, { opacity: 0, scale: 0.8 });
      b.addEventListener("pointermove", move);
      b.addEventListener("pointerenter", enter);
      b.addEventListener("pointerleave", leave);
      raf = requestAnimationFrame(loop);
      return () => {
        b.removeEventListener("pointermove", move);
        b.removeEventListener("pointerenter", enter);
        b.removeEventListener("pointerleave", leave);
        cancelAnimationFrame(raf);
      };
    }
    // Toque / telas pequenas: a lente percorre as sobrancelhas devagar quando entra na tela.
    const pos = { x: b.clientWidth * 0.28, y: b.clientHeight * 0.4 };
    gsap.set(l, { opacity: 1 });
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !tw) {
        const w = b.clientWidth, h = b.clientHeight;
        tw = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut", duration: 3.2 }, onUpdate: () => place(pos.x, pos.y) });
        tw.to(pos, { x: w * 0.74, y: h * 0.39 }).to(pos, { x: w * 0.5, y: h * 0.52 });
      } else if (!en.isIntersecting && tw) {
        tw.kill(); tw = null;
      }
    });
    io.observe(b);
    return () => { io.disconnect(); tw?.kill(); };
  }, []);

  return (
    <div
      ref={box}
      data-cursor="lens"
      className="photo-wrap relative touch-pan-y select-none"
      style={{ aspectRatio: `${d.w} / ${d.h}`, backgroundImage: `url(${d.lqip})`, backgroundSize: "cover" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={d.w} height={d.h} loading="lazy" decoding="async" style={{ objectPosition: "50% 40%" }} />
      <div
        ref={lens}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 rounded-full border-[1.5px] border-coral shadow-[0_18px_40px_-14px_rgba(31,58,43,0.55)]"
        style={{ width: SIZE, height: SIZE, backgroundImage: `url(${src})`, backgroundRepeat: "no-repeat", willChange: "transform" }}
      >
        <span className="t-label absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-cream px-3 py-1 text-[10px] text-forest">análise</span>
      </div>
    </div>
  );
}
