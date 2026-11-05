"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { LIVEBASE_CATEGORY, livebaseUrl, whatsappUrl } from "@/config";
import { TLink } from "@/components/Nav";
import { SW } from "@/components/ui";

/** Barra fixa do celular, só depois do hero. "Agendar avaliação" abre a escolha entre os 2 destaques e outro serviço. */
export function MobileBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [sheet, setSheet] = useState(false);
  const first = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const limit = () => (pathname === "/" ? window.innerHeight * 0.85 : 320);
    const on = () => setShow(window.scrollY > limit());
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [pathname]);

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setSheet(false);
  }
  useEffect(() => {
    if (!sheet) return;
    first.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setSheet(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [sheet]);

  const opt = "flex min-h-[56px] items-center justify-between rounded-2xl border border-forest/20 bg-paper px-5 text-left text-[16px] font-medium transition-colors duration-200 hover:bg-sage-mist";

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-4 transition-transform duration-500 lg:hidden ${show ? "translate-y-0" : "translate-y-[140%]"}`}
        style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
      >
        <div className="flex gap-2 rounded-full bg-forest p-2 shadow-[0_18px_40px_-14px_rgba(31,58,43,0.7)]">
          <button type="button" className="flex h-12 flex-1 items-center justify-center rounded-full bg-cream text-[14px] font-medium tracking-[0.04em] text-forest" onClick={() => setSheet(true)} data-event="agendar-barra">
            Agendar avaliação
          </button>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp" className="grid h-12 w-12 place-items-center rounded-full border border-cream/40 text-cream" data-event="whatsapp-barra">
            <MessageCircle size={20} strokeWidth={SW} />
          </a>
        </div>
      </div>

      <div className={`fixed inset-0 z-[60] lg:hidden ${sheet ? "visible" : "invisible"}`} role="dialog" aria-modal="true" aria-label="Escolha o que agendar">
        <button type="button" className={`absolute inset-0 bg-forest/50 transition-opacity duration-500 ${sheet ? "opacity-100" : "opacity-0"}`} aria-label="Fechar" onClick={() => setSheet(false)} />
        <div className={`absolute inset-x-0 bottom-0 rounded-t-[32px] bg-cream p-6 pb-10 transition-transform duration-500 ${sheet ? "translate-y-0" : "translate-y-full"}`}>
          <div className="flex items-center justify-between">
            <h2 className="t-h4">O que você quer agendar?</h2>
            <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-forest/30" onClick={() => setSheet(false)} aria-label="Fechar">
              <X size={20} strokeWidth={SW} />
            </button>
          </div>
          <div className="mt-5 grid gap-3">
            <a ref={first} className={opt} href={livebaseUrl(LIVEBASE_CATEGORY.tricologia)} target="_blank" rel="noopener noreferrer" data-event="agendar-tricologia-sheet">
              Avaliação de queda de cabelo <span aria-hidden="true">→</span>
            </a>
            <a className={opt} href={livebaseUrl(LIVEBASE_CATEGORY.micropigmentacao)} target="_blank" rel="noopener noreferrer" data-event="agendar-micro-sheet">
              Avaliação de micropigmentação <span aria-hidden="true">→</span>
            </a>
            <TLink className={opt} href="/agendar/">
              Outro serviço <span aria-hidden="true">→</span>
            </TLink>
          </div>
        </div>
      </div>
    </>
  );
}
