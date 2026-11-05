"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { BrowSketch } from "@/components/BrowSketch";

type Props = { name: "hero" | "folhagem"; poster: string; mobile?: string; lazy?: boolean; desktopOnly?: boolean };

/**
 * Vídeo de fundo que toca sozinho no iPhone: `muted` e `playsinline` desde o HTML, ordem das fontes (MP4 H.264 antes do WebM),
 * play() reforçado por JS, nova tentativa no 1º toque/rolagem e plano B (poster com Ken Burns, sem ícone de play)
 * quando o iOS bloqueia o autoplay (Modo de Pouca Energia). Pausa fora da tela.
 */
export function AutoVideo({ name, poster, mobile, lazy = false, desktopOnly = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [fallback, setFallback] = useState(false);
  // desktopOnly: no celular (≤767px) o fundo é só o poster estático, sem vídeo e sem animação
  const [enabled, setEnabled] = useState(!desktopOnly);

  useEffect(() => {
    if (!desktopOnly) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setEnabled(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [desktopOnly]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !enabled) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.controls = false;

    let started = !lazy;
    const play = () => v.play().then(() => setFallback(false)).catch(() => {});
    const inject = () => {
      if (started) return;
      started = true;
      const add = (src: string, type: string, media?: string) => {
        const s = document.createElement("source");
        s.src = src; s.type = type;
        if (media) s.media = media;
        v.appendChild(s);
      };
      add(asset(`/video/${name}.mp4`), "video/mp4");
      add(asset(`/video/${name}.webm`), "video/webm");
      v.load();
    };

    const onPlaying = () => setFallback(false);
    v.addEventListener("playing", onPlaying);
    if (!lazy) play();
    // se em ~2s o vídeo não estiver tocando (iOS em Pouca Energia), mostra o poster com Ken Burns
    const t = window.setTimeout(() => { if (v.paused || v.currentTime === 0) setFallback(true); }, 2200);
    const retry = () => { play(); };
    window.addEventListener("touchstart", retry, { once: true, passive: true });
    window.addEventListener("scroll", retry, { once: true, passive: true });
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { inject(); play(); } else v.pause();
    }, { rootMargin: lazy ? "400px 0px" : "0px" });
    io.observe(v);
    return () => {
      window.clearTimeout(t);
      v.removeEventListener("playing", onPlaying);
      window.removeEventListener("touchstart", retry);
      window.removeEventListener("scroll", retry);
      io.disconnect();
    };
  }, [lazy, name, enabled]);

  return (
    <div className="bg-video-wrap" data-fallback={fallback ? "1" : undefined} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(`/video/${poster}`)} alt="" className="bg-video" {...(lazy ? { loading: "lazy" as const } : { fetchPriority: "high" as const })} decoding="async" />
      {/* Plano B (iOS bloqueou o vídeo): a sobrancelha se desenha sobre o poster, então nunca fica parado */}
      {enabled && fallback && !lazy && (
        <div className="pointer-events-none absolute inset-y-0 right-[-8%] flex w-[120%] items-center justify-center opacity-70 sm:right-0 sm:w-[70%]">
          <BrowSketch className="w-full" label={false} />
        </div>
      )}
      {enabled && (
      <video
        ref={ref}
        className="bg-video"
        autoPlay={!lazy}
        muted
        loop
        playsInline
        preload={lazy ? "none" : "auto"}
        poster={asset(`/video/${poster}`)}
        disablePictureInPicture
        disableRemotePlayback
        {...{ "webkit-playsinline": "" }}
      >
        {!lazy && mobile && <source src={asset(`/video/${mobile}`)} type="video/mp4" media="(max-width: 767px)" />}
        {!lazy && <source src={asset(`/video/${name}.mp4`)} type="video/mp4" />}
        {!lazy && <source src={asset(`/video/${name}.webm`)} type="video/webm" />}
      </video>
      )}
    </div>
  );
}
