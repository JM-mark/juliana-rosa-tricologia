"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { X } from "lucide-react";
import { asset } from "@/lib/asset";
import { prefersReducedMotion } from "@/lib/motion";
import { TLink } from "@/components/Nav";
import { Button, SW } from "@/components/ui";

export const MENU_LINKS: { href: string; label: string; big?: boolean }[] = [
  { href: "/tricologia/", label: "Queda de cabelo", big: true },
  { href: "/sobrancelhas/micropigmentacao-fio-a-fio/", label: "Micropigmentação", big: true },
  { href: "/sobrancelhas/reconstrucao-de-fios/", label: "Reconstrução de fios" },
  { href: "/sobrancelhas/despigmentacao-a-laser/", label: "Despigmentação a laser" },
  { href: "/sobrancelhas/design/", label: "Design de sobrancelha" },
  { href: "/laser-e-estetica/", label: "Laser e estética" },
  { href: "/metodo-fio-real/", label: "Método Fio Real" },
  { href: "/resultados/", label: "Resultados" },
  { href: "/sobre/", label: "Sobre" },
  { href: "/contato/", label: "Contato" },
];

/** Menu em tela cheia, renderizado num portal direto no <body> (fora do header, que tem backdrop-filter). */
export function MobileMenu({ open, onClose, returnFocus }: { open: boolean; onClose: () => void; returnFocus: React.RefObject<HTMLButtonElement | null> }) {
  const panel = useRef<HTMLDivElement>(null);

  // Trava rolagem (html + Lenis), anima os links e prende o foco no painel.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    lenis?.stop();
    const el = panel.current;
    const focusables = () => Array.from(el?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();
    if (el && !prefersReducedMotion()) {
      gsap.from(el.querySelectorAll("[data-stagger]"), { y: 26, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.05, delay: 0.05, clearProps: "all" });
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    const btn = returnFocus.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prev;
      lenis?.start();
      btn?.focus({ preventScroll: true });
    };
  }, [open, onClose, returnFocus]);

  if (!open || typeof document === "undefined") return null;
  return createPortal(
    <div ref={panel} className="menu-panel" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="flex h-[60px] items-center justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/brand/jr-marca.png")} alt="Juliana Rosa" width={280} height={178} className="h-10 w-auto" />
        <button type="button" className="grid h-12 w-12 place-items-center rounded-full border border-forest/30" aria-label="Fechar menu" onClick={onClose}>
          <X size={22} strokeWidth={SW} aria-hidden="true" />
        </button>
      </div>
      <nav aria-label="Menu principal" className="mt-6">
        <ul className="grid">
          {MENU_LINKS.map((l) => (
            <li key={l.href} data-stagger>
              <TLink href={l.href} onClick={onClose} className={`t-h2 block border-b border-forest/15 py-3 text-forest ${l.big ? "" : "!text-[28px] opacity-90"}`}>
                {l.label}
              </TLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8" data-stagger>
        <Button href="/agendar/" event="agendar-menu">Agendar avaliação</Button>
      </div>
    </div>,
    document.body,
  );
}
