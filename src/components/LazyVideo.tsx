"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

/** Vídeo de fundo que só começa a baixar quando a seção chega perto da tela (economiza dados no celular). */
export function LazyVideo({ name, poster }: { name: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        v.innerHTML = "";
        for (const [ext, type] of [["webm", "video/webm"], ["mp4", "video/mp4"]]) {
          const s = document.createElement("source");
          s.src = asset(`/video/${name}.${ext}`);
          s.type = type;
          v.appendChild(s);
        }
        v.load();
        v.play().catch(() => {});
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [name]);
  return <video ref={ref} className="bg-video motion-reduce:hidden" muted loop playsInline preload="none" poster={asset(`/video/${poster}`)} aria-hidden="true" />;
}
