"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/asset";
import { canHover, prefersReducedMotion } from "@/lib/motion";
import { TLink } from "@/components/Nav";
import { SW } from "@/components/ui";

export interface SvcItem { href: string; name: string; text: string; image: string }

/** Lista editorial: cada serviço numa linha grande; no hover, a imagem segue o mouse com leve rotação pela velocidade. */
export function ServiceList({ items }: { items: SvcItem[] }) {
  const float = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const f = float.current;
    if (!f || !canHover() || prefersReducedMotion() || window.innerWidth < 1024) return;
    let x = 0, y = 0, cx = 0, cy = 0, rot = 0, raf = 0, active = false;
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      const dx = x - cx;
      cx += dx * 0.14; cy += (y - cy) * 0.14;
      rot += (Math.max(-9, Math.min(9, dx * 0.06)) - rot) * 0.12;
      f.style.transform = `translate3d(${cx + 36}px, ${cy - 160}px, 0) rotate(${rot}deg) scale(${active ? 1 : 0.86})`;
      f.style.opacity = active ? "1" : "0";
      raf = requestAnimationFrame(loop);
    };
    const rows = Array.from(document.querySelectorAll<HTMLElement>("[data-svc]"));
    const enter = (e: Event) => {
      const src = (e.currentTarget as HTMLElement).dataset.img!;
      if (img.current) img.current.src = src;
      active = true;
    };
    const leave = () => { active = false; };
    f.style.transition = "opacity 300ms cubic-bezier(.16,1,.3,1)";
    rows.forEach((r) => { r.addEventListener("pointerenter", enter); r.addEventListener("pointerleave", leave); });
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      rows.forEach((r) => { r.removeEventListener("pointerenter", enter); r.removeEventListener("pointerleave", leave); });
    };
  }, []);

  return (
    <div>
      {items.map((s, i) => (
        <TLink key={s.href} href={s.href} data-svc data-img={asset(`/atmos/${s.image}-sm.webp`)} className="svc-row">
          <span className="t-num t-label accent-text">{String(i + 1).padStart(2, "0")}</span>
          <span>
            <span className="nm t-h2 block">{s.name}</span>
            <span className="t-body mt-2 block text-forest/80">{s.text}</span>
          </span>
          <ArrowUpRight className="ar hidden self-center sm:block" size={34} strokeWidth={SW} aria-hidden="true" />
        </TLink>
      ))}
      <div ref={float} className="svc-float" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={img} alt="" src={asset(`/atmos/${items[0].image}-sm.webp`)} />
      </div>
    </div>
  );
}
