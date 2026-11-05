import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/sections";
import { Reviews } from "@/components/Reviews";
import { MapCard } from "@/components/MapCard";

export const metadata = pageMeta({
  title: "Avaliações de clientes | Juliana Rosa em Nova Odessa",
  description: "O que clientes dizem do atendimento da Juliana Rosa, direto da ficha no Google, e como chegar ao estúdio em Nova Odessa.",
  path: "/avaliacoes/",
  og: "home",
});

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Avaliações" title="Quem já passou por aqui conta." lead="Avaliações reais, direto da ficha do Google." crumbs={[{ name: "Início", path: "/" }, { name: "Avaliações", path: "/avaliacoes/" }]} />
      <Section tone="cream" className="!pt-0">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-6"><Reviews /></div>
          <div className="col-span-12 lg:col-span-6"><MapCard /></div>
        </div>
      </Section>
    </>
  );
}
