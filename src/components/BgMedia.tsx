import { asset } from "@/lib/asset";
import { AutoVideo } from "@/components/AutoVideo";

/** Vídeo de fundo (loop, mudo). Se o iOS bloquear o autoplay, entra o plano B animado (ver AutoVideo). */
export function BgVideo({ name, poster, mobile }: { name: "hero" | "folhagem"; poster: string; mobile?: string }) {
  return <AutoVideo name={name} poster={poster} mobile={mobile} lazy={name !== "hero"} />;
}

export type AtmosName = "cabelo-macro" | "cabelo-dourado" | "escova" | "folha" | "samambaia" | "folhas" | "clinica-clara" | "equipamento" | "sala" | "salao-claro";

/** Foto de atmosfera (banco, tratada com a cor da marca). Decorativa: alt vazio, sem apresentar como cliente. */
export function Atmos({ name, className = "", sm = false, eager = false }: { name: AtmosName; className?: string; sm?: boolean; eager?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={asset(`/atmos/${name}${sm ? "-sm" : ""}.webp`)} alt="" aria-hidden="true" loading={eager ? "eager" : "lazy"} {...(eager ? { fetchPriority: "high" as const } : {})} decoding="async" className={className} />;
}
