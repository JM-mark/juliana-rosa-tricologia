import { asset } from "@/lib/asset";
import { LazyVideo } from "@/components/LazyVideo";

/** Vídeo de fundo (loop, mudo). Com prefers-reduced-motion o vídeo some e fica o poster. */
export function BgVideo({ name, poster, mobile }: { name: "hero" | "folhagem"; poster: string; mobile?: string }) {
  const lazy = name !== "hero";
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(`/video/${poster}`)} alt="" aria-hidden="true" className="bg-video" {...(lazy ? { loading: "lazy" as const } : { fetchPriority: "high" as const })} decoding="async" />
      {lazy ? (
        <LazyVideo name={name} poster={poster} />
      ) : (
        <video className="bg-video motion-reduce:hidden" autoPlay muted loop playsInline preload="metadata" poster={asset(`/video/${poster}`)} aria-hidden="true">
          {mobile && <source src={asset(`/video/${mobile}`)} type="video/mp4" media="(max-width: 767px)" />}
          <source src={asset(`/video/${name}.webm`)} type="video/webm" />
          <source src={asset(`/video/${name}.mp4`)} type="video/mp4" />
        </video>
      )}
    </>
  );
}

export type AtmosName = "cabelo-macro" | "cabelo-dourado" | "escova" | "folha" | "samambaia" | "folhas" | "clinica-clara" | "equipamento" | "sala" | "salao-claro";

/** Foto de atmosfera (banco, tratada com a cor da marca). Decorativa: alt vazio, sem apresentar como cliente. */
export function Atmos({ name, className = "", sm = false, eager = false }: { name: AtmosName; className?: string; sm?: boolean; eager?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={asset(`/atmos/${name}${sm ? "-sm" : ""}.webp`)} alt="" aria-hidden="true" loading={eager ? "eager" : "lazy"} {...(eager ? { fetchPriority: "high" as const } : {})} decoding="async" className={className} />;
}
