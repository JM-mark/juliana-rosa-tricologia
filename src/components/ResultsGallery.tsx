"use client";

import { useId, useState } from "react";
import { RESULTS, RESULT_CATEGORIES, type ResultCategory } from "@/content/results";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Photo } from "@/components/ui";

export function ResultsGallery() {
  const [cat, setCat] = useState<ResultCategory | "Todos">("Todos");
  const id = useId();
  const tabs = ["Todos", ...RESULT_CATEGORIES] as const;
  const items = RESULTS.filter((r) => cat === "Todos" || r.category === cat);
  return (
    <div>
      <div role="tablist" aria-label="Filtrar resultados" className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={cat === t}
            aria-controls={`${id}-panel`}
            onClick={() => setCat(t)}
            className={`h-11 rounded-full border px-5 text-[14px] font-medium tracking-[0.03em] transition-colors duration-200 ${cat === t ? "border-forest bg-forest text-cream" : "border-forest/30 hover:bg-sage-mist"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div id={`${id}-panel`} role="tabpanel" className="mt-10 grid gap-8 md:grid-cols-2">
        {items.map((r) =>
          r.kind === "slider" ? (
            <div key={r.id} className="md:col-span-2">
              <BeforeAfter before={r.before} after={r.after} beforeLabel={r.beforeLabel} afterLabel={r.afterLabel} alt={r.alt} />
            </div>
          ) : (
            <figure key={r.id}>
              <Photo name={r.photo} alt={r.alt} ratio="1 / 1" focus="50% 38%" sizes="(min-width:768px) 40vw, 90vw" />
              <figcaption className="t-cap mt-3 text-forest/75">Resultado real. {r.caption} Os resultados variam de pessoa para pessoa.</figcaption>
            </figure>
          ),
        )}
        {items.length === 0 && (
          <p className="t-lead card col-span-full p-8 text-center">Novos resultados reais de {cat.toLowerCase()} entram aqui em breve. Enquanto isso, veja a categoria Micropigmentação.</p>
        )}
      </div>
    </div>
  );
}
