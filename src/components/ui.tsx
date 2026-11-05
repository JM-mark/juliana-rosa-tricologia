import { ArrowRight } from "lucide-react";
import { asset } from "@/lib/asset";
import { photoData } from "@/content/photo-data";
import { TLink } from "@/components/Nav";

export const SW = 1.25; // espessura única dos ícones (traço fino)

type BtnProps = {
  href: string;
  variant?: "primary" | "secondary" | "link";
  size?: "md" | "sm";
  event?: string;
  className?: string;
  children: React.ReactNode;
  noArrow?: boolean;
};

const isExternal = (href: string) => !href.startsWith("/");

/** Único sistema de botões do site: primário, secundário e link. */
export function Button({ href, variant = "primary", size = "md", event, className = "", children, noArrow }: BtnProps) {
  const cls =
    variant === "link"
      ? `link-jr ${className}`
      : `btn ${variant === "secondary" ? "btn-secondary" : ""} ${size === "sm" ? "btn-sm" : ""} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {!noArrow && <ArrowRight className="arr" size={16} strokeWidth={SW} aria-hidden="true" />}
    </>
  );
  if (isExternal(href)) {
    return (
      <a className={cls} href={href} {...(/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})} data-event={event}>
        {inner}
      </a>
    );
  }
  return (
    <TLink className={cls} href={href} data-event={event}>
      {inner}
    </TLink>
  );
}

export type PhotoName = keyof typeof photoData;

/** Foto com o mesmo tratamento de cor, cantos e LQIP. Nunca recorta o rosto: use `focus`. */
export function Photo({
  name,
  alt,
  ratio,
  focus = "50% 40%",
  sizes = "(min-width: 1024px) 40vw, 90vw",
  reveal = false,
  className = "",
  priority = false,
}: {
  name: PhotoName;
  alt: string;
  ratio?: string;
  focus?: string;
  sizes?: string;
  reveal?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const d = photoData[name];
  return (
    <div
      className={`photo-wrap ${reveal ? "reveal-photo" : ""} ${className}`}
      style={{ aspectRatio: ratio ?? `${d.w} / ${d.h}`, backgroundImage: `url(${d.lqip})`, backgroundSize: "cover" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(`/photos/${name}-lg.webp`)}
        srcSet={`${asset(`/photos/${name}-sm.webp`)} 800w, ${asset(`/photos/${name}-lg.webp`)} ${d.w}w`}
        sizes={sizes}
        width={d.w}
        height={d.h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={{ objectPosition: focus }}
      />
    </div>
  );
}

/** Sublinhado desenhado à mão (no máximo um por seção). */
/** Destaque editorial: uma palavra em itálico na cor de acento (sem sublinhado). */
export function Scribble({ children }: { children: React.ReactNode }) {
  return <em>{children}</em>;
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`t-label accent-text inline-flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="inline-block h-px w-6 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`container-jr ${className}`}>{children}</div>;
}
