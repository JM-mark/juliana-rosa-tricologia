import { LIVEBASE_CATEGORY, livebaseUrl, whatsappUrl } from "@/config";
import { pageMeta } from "@/lib/seo";
import { Button, Eyebrow } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { FAQ, Section, Steps } from "@/components/sections";
import { LensPhoto } from "@/components/LensPhoto";
import { JsonLd } from "@/components/JsonLd";
import { faqLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Método Fio Real: primeiro a verdade do seu caso | Juliana Rosa",
  description:
    "O Método Fio Real, da Juliana Rosa em Nova Odessa: avaliar primeiro, indicar depois. Etapas, para quem é e perguntas frequentes.",
  path: "/metodo-fio-real/",
  og: "home",
});

// TODO confirmar as etapas do método com a Juliana (texto neutro, baseado no que ela publica).
const FAQS = [
  { q: "O que é o Método Fio Real?", a: "É a forma de trabalhar da Juliana: primeiro entender a verdade do seu caso, depois indicar o procedimento que faz sentido. Quando a melhor indicação é outra, ela diz." },
  { q: "Preciso decidir o procedimento antes de vir?", a: "Não. A avaliação existe justamente para isso. Você conta o que deseja e saímos com um plano." },
  { q: "O método vale para tricologia e sobrancelha?", a: "Sim. O mesmo olhar cuidadoso vale para a queda de cabelo e para as sobrancelhas." },
  { q: "E se eu não precisar de nenhum procedimento?", a: "Também é um resultado possível da avaliação. A indicação é honesta." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqLd(FAQS)} />
      <PageHero
        image="cabelo-macro"
        eyebrow="Método Fio Real"
        title={<>Primeiro, <em>a verdade</em> do seu caso.</>}
        lead="Antes de qualquer procedimento, olhamos de perto, ouvimos você e só então indicamos. É assim que cuidamos de queda de cabelo e de sobrancelha."
        crumbs={[{ name: "Início", path: "/" }, { name: "Método Fio Real", path: "/metodo-fio-real/" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={livebaseUrl()} event="agendar-metodo">Agendar avaliação</Button>
          <Button href={whatsappUrl()} variant="secondary" event="whatsapp-metodo">Falar no WhatsApp</Button>
        </div>
      </PageHero>

      <Section tone="cream" className="!pt-0">
        <div className="grid-12 items-center gap-y-8">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Lente de análise</Eyebrow>
            <h2 className="t-h2 mt-5">Olhar de perto muda a indicação.</h2>
            <p className="t-body mt-5 max-w-sm">Passe o mouse sobre a foto para analisar o fio de perto, como no tricoscópio. No celular, a lente passeia sozinha.</p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <LensPhoto name="micro-no-dia" alt="Olhar frontal com sobrancelhas recém micropigmentadas, em detalhe" />
            <p className="t-cap mt-3 text-forest/75">Resultado real, no dia do procedimento. Os resultados variam de pessoa para pessoa.</p>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <div className="mb-10 max-w-2xl"><Eyebrow>Etapas</Eyebrow><h2 className="t-h2 mt-5">Do primeiro olhar ao acompanhamento.</h2></div>
        <Steps items={[
          { title: "Avaliação", text: "Conversa e análise do seu caso: fios, pele, histórico e desejo." },
          { title: "Plano", text: "Indicamos o que faz sentido, na ordem certa e sem pressa." },
          { title: "Procedimento", text: "Executado com precisão e atenção aos detalhes." },
          { title: "Acompanhamento", text: "Revemos a evolução e ajustamos com você." },
        ]} />
      </Section>

      <Section tone="cream">
        <div className="grid-12 gap-y-8">
          <div className="col-span-12 lg:col-span-5"><Eyebrow>Para quem é</Eyebrow><h2 className="t-h2 mt-5">Para quem quer entender antes de decidir.</h2></div>
          <ul className="prose-jr t-body col-span-12 grid gap-4 lg:col-span-6 lg:col-start-7">
            <li>Para quem nota queda de cabelo e quer saber a causa antes de começar qualquer tratamento.</li>
            <li>Para quem quer uma sobrancelha natural e tem receio de ficar artificial.</li>
            <li>Para quem já teve uma experiência ruim e quer recomeçar com segurança.</li>
          </ul>
        </div>
      </Section>

      <Section tone="forest"><FAQ items={FAQS} dark /></Section>

      <Section tone="mist">
        <div className="grid-12 items-center gap-y-6">
          <h2 className="t-h1 col-span-12 lg:col-span-7">Comece pela avaliação.</h2>
          <div className="col-span-12 flex flex-wrap gap-3 lg:col-span-5 lg:justify-self-end">
            <Button href={livebaseUrl(LIVEBASE_CATEGORY.tricologia)}>Queda de cabelo</Button>
            <Button href={livebaseUrl(LIVEBASE_CATEGORY.micropigmentacao)} variant="secondary">Micropigmentação</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
