import { asset } from "@/lib/asset";

const ITEMS = ["Tricologia", "Micropigmentação fio a fio", "Reconstrução de fios", "Despigmentação a laser", "Design de sobrancelha", "Nova Odessa"];

/** Faixa lenta com os serviços, em Fraunces itálica, separada pelo monograma. Pausa no hover. */
export function Marquee() {
  const row = (k: string) => (
    <div className="flex shrink-0 items-center" key={k} aria-hidden={k === "b" ? "true" : undefined}>
      {ITEMS.map((t) => (
        <span key={t} className="flex items-center">
          <span className="t-h3 italic whitespace-nowrap px-8 text-forest" style={{ fontStyle: "italic" }}>{t}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/brand/jr-marca.png")} alt="" width={598} height={380} className="h-7 w-auto opacity-80" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-y border-forest/15 bg-cream py-6" role="marquee" aria-label="Serviços: tricologia, micropigmentação fio a fio, reconstrução de fios, despigmentação a laser, design de sobrancelha">
      <div className="marquee">{row("a")}{row("b")}</div>
    </div>
  );
}
