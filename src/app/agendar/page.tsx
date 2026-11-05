import { ArrowUpRight } from "lucide-react";
import { LIVEBASE_CATEGORY, SITE, livebaseUrl, whatsappUrl } from "@/config";
import { pageMeta } from "@/lib/seo";
import { Button, SW } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/sections";

export const metadata = pageMeta({
  title: "Agendar avaliação | Juliana Rosa em Nova Odessa",
  description: "Agende sua avaliação de queda de cabelo, micropigmentação, sobrancelhas, laser ou estética com a Juliana Rosa, em Nova Odessa.",
  path: "/agendar/",
  og: "home",
});

const CATS = [
  { id: LIVEBASE_CATEGORY.tricologia, name: "Tricologia", text: "Avaliação tricológica e acompanhamento mensal do couro cabeludo.", wa: "queda de cabelo", featured: true },
  { id: LIVEBASE_CATEGORY.micropigmentacao, name: "Micropigmentação de sobrancelha", text: "Fio a fio realista: avaliação, renovação e retoque.", wa: "micropigmentação de sobrancelha", featured: true },
  { id: LIVEBASE_CATEGORY.design, name: "Design de sobrancelha", text: "Henna, tintura, planos mensais e spa de sobrancelhas.", wa: "design de sobrancelha" },
  { id: LIVEBASE_CATEGORY.reconstrucao, name: "Reconstrução de fios", text: "Estímulo a novos fios para quem perdeu pelos.", wa: "reconstrução de fios da sobrancelha" },
  { id: LIVEBASE_CATEGORY.despigmentacao, name: "Despigmentação a laser", text: "Para micropigmentações antigas, azuladas ou fora do formato.", wa: "despigmentação de micropigmentação" },
  { id: LIVEBASE_CATEGORY.laser, name: "Depilação a laser", text: "Redução progressiva dos pelos, várias áreas.", wa: "depilação a laser" },
  { id: LIVEBASE_CATEGORY.limpeza, name: "Limpeza de pele", text: "Limpeza profunda para cuidar da pele do rosto.", wa: "limpeza de pele" },
  { id: LIVEBASE_CATEGORY.labios, name: "Micropigmentação labial", text: "Retoque e avaliação.", wa: "micropigmentação labial" },
  { id: LIVEBASE_CATEGORY.linhaOuCera, name: "Depilação com linha ou cera", text: "Buço e rosto.", wa: "depilação com linha ou cera" },
];

export default function Page() {
  return (
    <>
      <PageHero
        image="sala"
        eyebrow="Agendamento"
        title={<>Escolha o que você quer <em>agendar</em>.</>}
        lead="Você escolhe o serviço, vê os horários e os valores direto na agenda da Juliana. Se preferir, chame no WhatsApp."
        crumbs={[{ name: "Início", path: "/" }, { name: "Agendar", path: "/agendar/" }]}
      />
      <Section tone="mist" className="!pt-0">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CATS.map((c, i) => (
            <article key={c.id} className={`rv card flex flex-col p-7 ${c.featured ? "lg:col-span-1 md:col-span-1 !bg-forest !text-cream border-forest" : ""}`} data-d={(i % 3) * 70}>
              <p className={`t-label ${c.featured ? "text-coral" : "accent-text"}`}>{c.featured ? "Destaque" : "Serviço"}</p>
              <h2 className="t-h3 mt-3">{c.name}</h2>
              <p className={`t-body mt-3 flex-1 ${c.featured ? "text-cream/85" : "text-forest/85"}`}>{c.text}</p>
              <div className={`mt-6 flex flex-wrap items-center gap-4 ${c.featured ? "on-dark" : ""}`}>
                <Button href={livebaseUrl(c.id)} size="sm" event={`agendar-${c.id}`}>Ver horários</Button>
                <a className="link-jr text-[13px]" href={whatsappUrl(c.wa)} target="_blank" rel="noopener noreferrer" data-event={`whatsapp-${c.id}`}>
                  WhatsApp <ArrowUpRight size={14} strokeWidth={SW} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="t-body mt-10 text-forest/85">
          O agendamento abre em nova aba, no sistema da Juliana.{" "}
          <a className="link-jr" href={SITE.livebase} target="_blank" rel="noopener noreferrer" data-event="agenda-completa">Abrir a agenda completa <ArrowUpRight size={14} strokeWidth={SW} aria-hidden="true" /></a>
        </p>
      </Section>
    </>
  );
}
