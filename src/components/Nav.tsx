"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { asset } from "@/lib/asset";
import { EASE_IN, EASE_OUT, prefersReducedMotion } from "@/lib/motion";

type NavCtx = { go: (href: string) => void };
const Ctx = createContext<NavCtx>({ go: () => {} });
export const useNav = () => useContext(Ctx);

/** Cortina creme com o monograma entre páginas (≤ 700ms no total: 350 + 350). */
export function NavProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const target = useRef<string | null>(null);

  const go = useCallback(
    (href: string) => {
      const el = curtain.current;
      if (prefersReducedMotion() || !el || busy.current) {
        router.push(href);
        return;
      }
      busy.current = true;
      target.current = href;
      const img = el.querySelector("img");
      el.animate([{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)" }], { duration: 350, easing: EASE_OUT, fill: "forwards" });
      img?.animate([{ opacity: 0, transform: "scale(.9)" }, { opacity: 1, transform: "scale(1)" }], { duration: 300, delay: 120, easing: EASE_OUT, fill: "forwards" });
      window.setTimeout(() => router.push(href), 360);
      // Rede de segurança: se a rota não mudar (mesmo caminho), abre a cortina.
      window.setTimeout(() => {
        if (busy.current) open();
      }, 2500);
    },
    [router],
  );

  function open() {
    const el = curtain.current;
    if (!el) return;
    const img = el.querySelector("img");
    el.animate([{ clipPath: "inset(0% 0 0 0)" }, { clipPath: "inset(0 0 100% 0)" }], { duration: 350, easing: EASE_IN, fill: "forwards" }).finished.then(() => {
      el.style.clipPath = "inset(100% 0 0 0)";
      el.getAnimations().forEach((a) => a.cancel());
      img?.getAnimations().forEach((a) => a.cancel());
      busy.current = false;
    });
  }

  useEffect(() => {
    if (busy.current) {
      window.scrollTo(0, 0);
      (window as unknown as { __lenis?: { scrollTo: (n: number, o: object) => void } }).__lenis?.scrollTo(0, { immediate: true });
      open();
    }
  }, [pathname]);

  const value = useMemo(() => ({ go }), [go]);
  return (
    <Ctx.Provider value={value}>
      {children}
      <div ref={curtain} className="curtain" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/brand/jr-marca.png")} alt="" />
      </div>
    </Ctx.Provider>
  );
}

type LinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & { href: string };

/** Link interno com a cortina. Externos, âncoras e cliques com modificador seguem o padrão. */
export function TLink({ href, onClick, children, ...rest }: LinkProps) {
  const { go } = useNav();
  const pathname = usePathname();
  const internal = href.startsWith("/") && !href.startsWith("//");
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || !internal) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        const path = href.split("#")[0];
        if (href.includes("#") && (path === "" || path === pathname)) return;
        if (path === pathname) return;
        e.preventDefault();
        go(href);
      }}
    >
      {children}
    </Link>
  );
}
