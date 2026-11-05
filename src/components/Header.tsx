"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { asset } from "@/lib/asset";
import { TLink } from "@/components/Nav";
import { Button, SW } from "@/components/ui";
import { MobileMenu } from "@/components/MobileMenu";

const OTHER = [
  { href: "/sobrancelhas/reconstrucao-de-fios/", label: "Reconstrução de fios" },
  { href: "/sobrancelhas/despigmentacao-a-laser/", label: "Despigmentação a laser" },
  { href: "/sobrancelhas/design/", label: "Design de sobrancelha" },
  { href: "/laser-e-estetica/", label: "Laser e estética" },
  { href: "/metodo-fio-real/", label: "Método Fio Real" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
    setSub(false);
  }


  useEffect(() => {
    if (!sub) return;
    const close = (e: PointerEvent) => {
      if (!subRef.current?.contains(e.target as Node)) setSub(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setSub(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [sub]);

  const active = (p: string) => pathname.startsWith(p);
  const plain = (p: string) =>
    `nav-link inline-flex h-11 items-center gap-2 whitespace-nowrap px-2 text-[11px] font-medium uppercase tracking-[0.16em] ${active(p) ? "text-coral-text" : ""}`;
  const pill = plain;
  const dot = <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-coral" />;

  return (
    <header
      style={{ paddingTop: "env(safe-area-inset-top)" }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-500 ${
        scrolled || open ? "bg-cream/90 shadow-[0_1px_0_rgba(31,58,43,0.1)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-jr flex h-[76px] items-center justify-between gap-6">
        <TLink href="/" className="flex min-h-11 min-w-11 shrink-0 items-center gap-3 py-1" aria-label="Juliana Rosa, página inicial">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/brand/jr-marca.png")} alt="" width={598} height={380} className="h-10 w-auto" />
          <span className="hidden leading-none sm:block">
            <span className="t-h4 block whitespace-nowrap !text-[22px] text-forest">Juliana Rosa</span>
            <span className="t-label mt-1 hidden whitespace-nowrap text-[9.5px] 2xl:block tracking-[0.2em] text-forest/70">Tricologia e Sobrancelha</span>
          </span>
        </TLink>

        <nav aria-label="Principal" className="hidden items-center gap-1 xl:flex">
          <TLink href="/tricologia/" className={pill("/tricologia")}>{dot}Queda de cabelo</TLink>
          <TLink href="/sobrancelhas/micropigmentacao-fio-a-fio/" className={pill("/sobrancelhas/micropigmentacao")}>{dot}Micropigmentação</TLink>
          <div ref={subRef} className="relative">
            <button
              type="button"
              className={`${plain("/sobrancelhas/r")} gap-1`}
              aria-expanded={sub}
              aria-haspopup="true"
              onClick={() => setSub((v) => !v)}
              onMouseEnter={() => setSub(true)}
            >
              Outros serviços
              <ChevronDown size={16} strokeWidth={SW} className={`transition-transform duration-500 ${sub ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            <div
              className={`absolute left-0 top-full w-72 pt-2 transition-all duration-500 ${sub ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
              onMouseLeave={() => setSub(false)}
            >
              <ul className="card p-2 shadow-[0_28px_60px_-30px_rgba(31,58,43,0.5)]">
                {OTHER.map((o) => (
                  <li key={o.href}>
                    <TLink href={o.href} className="block rounded-2xl px-4 py-3 text-[15px] transition-colors hover:bg-sage-mist" tabIndex={sub ? 0 : -1}>
                      {o.label}
                    </TLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <TLink href="/resultados/" className={plain("/resultados")}>Resultados</TLink>
          <TLink href="/sobre/" className={plain("/sobre")}>Sobre</TLink>
          <TLink href="/contato/" className={plain("/contato")}>Contato</TLink>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <Button href="/agendar/" size="sm" event="agendar-header">Agendar avaliação</Button>
          </div>
          <button
            ref={menuBtn}
            type="button"
            className="grid h-12 w-12 place-items-center rounded-full border border-forest/30 xl:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} strokeWidth={SW} /> : <Menu size={22} strokeWidth={SW} />}
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} returnFocus={menuBtn} />
    </header>
  );
}
