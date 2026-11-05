import { LIVEBASE_CATEGORY, livebaseUrl } from "@/config";
import { SERVICES } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { Button } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/sections";
import { ServiceArt } from "@/components/Art";
import { TLink } from "@/components/Nav";

export const metadata = pageMeta({
  title: "Sobrancelhas em Nova Odessa: fio a fio, design e laser",
  description:
    "Micropigmentação fio a fio, reconstrução de fios, despigmentação a laser e design de sobrancelha em Nova Odessa, com avaliação do seu caso.",
  path: "/sobrancelhas/",
  og: "micropigmentacao",
});

export default function Page() {
  const items = SERVICES.filter((s) => s.href.startsWith("/sobrancelhas/"));
  return (
    <>
      <PageHero
        eyebrow="Sobrancelhas"
        title="Cada sobrancelha começa pela avaliação."
        lead="Micropigmentação fio a fio, reconstrução, despigmentação e design. Primeiro entendemos o seu caso, depois indicamos o caminho."
        crumbs={[{ name: "Início", path: "/" }, { name: "Sobrancelhas", path: "/sobrancelhas/" }]}
      >
        <Button href={livebaseUrl(LIVEBASE_CATEGORY.micropigmentacao)} event="agendar-sobrancelhas">Avaliação de micropigmentação</Button>
      </PageHero>
      <Section tone="mist">
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((s, i) => (
            <TLink key={s.slug} href={s.href} className={`rv card card-lift group block overflow-hidden p-7 ${s.featured ? "md:col-span-2" : ""}`} data-d={i * 60}>
              <div className={`grid items-center gap-6 ${s.featured ? "md:grid-cols-[1.2fr_1fr]" : ""}`}>
                <div>
                  <p className="t-label accent-text">{s.featured ? "Destaque" : s.eyebrow}</p>
                  <h2 className="t-h2 mt-3">{s.name}</h2>
                  <p className="t-body mt-4 max-w-lg">{s.summary}</p>
                  <span className="link-jr mt-6">Saiba mais <span className="arr">→</span></span>
                </div>
                {s.featured && (
                  <div className="rounded-3xl bg-sage p-5"><ServiceArt visual="brow" className="w-full" /></div>
                )}
              </div>
            </TLink>
          ))}
        </div>
      </Section>
    </>
  );
}
