import { LIVEBASE_CATEGORY, livebaseUrl } from "@/config";
import { pageMeta } from "@/lib/seo";
import { Button } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/sections";
import { ResultsGallery } from "@/components/ResultsGallery";

export const metadata = pageMeta({
  title: "Resultados reais de micropigmentação em Nova Odessa",
  description:
    "Resultados reais publicados pela Juliana Rosa: micropigmentação fio a fio no dia e um ano depois. Os resultados variam de pessoa para pessoa.",
  path: "/resultados/",
  og: "micropigmentacao",
});

export default function Page() {
  return (
    <>
      <PageHero
        image="folhas"
        eyebrow="Resultados"
        title={<>Resultados <em>reais</em>, publicados pela Juliana.</>}
        lead="Resultado real. Os resultados variam de pessoa para pessoa."
        crumbs={[{ name: "Início", path: "/" }, { name: "Resultados", path: "/resultados/" }]}
      />
      <Section tone="cream" className="!pt-0">
        <ResultsGallery />
      </Section>
      <Section tone="mist">
        <div className="grid-12 items-center gap-y-6">
          <h2 className="t-h2 col-span-12 lg:col-span-7">Quer saber o que é possível no seu caso?</h2>
          <div className="col-span-12 lg:col-span-5 lg:justify-self-end">
            <Button href={livebaseUrl(LIVEBASE_CATEGORY.micropigmentacao)} event="agendar-resultados">Avaliação de micropigmentação</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
