import { pageMeta } from "@/lib/seo";
import { Button, Container, Eyebrow, Photo } from "@/components/ui";
import { Section } from "@/components/sections";
import { whatsappUrl, livebaseUrl } from "@/config";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumb } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Sobre Juliana Rosa | Tricologia e sobrancelha em Nova Odessa",
  description:
    "Conheça a Juliana Rosa, especialista em tricologia e sobrancelhas em Nova Odessa: um jeito de atender que começa ouvindo e avaliando o seu caso.",
  path: "/sobre/",
  og: "home",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: "Início", path: "/" }, { name: "Sobre", path: "/sobre/" }])} />
      <section className="pb-[var(--section-y)] pt-[132px] lg:pt-[168px]">
        <Container>
          <div className="grid-12 items-center gap-y-10">
            <div className="col-span-12 lg:col-span-6">
              <Eyebrow>Sobre a Juliana</Eyebrow>
              <h1 className="t-h1 mt-5">Quem cuida de você olha de perto.</h1>
              <p className="t-lead rv mt-7 max-w-xl">
                Juliana Rosa é especialista em tricologia e sobrancelhas, em Nova Odessa. O jeito de atender é simples: ouvir, avaliar e só depois indicar.
              </p>
              <p className="t-body rv mt-5 max-w-xl" data-d={100}>
                {/* TODO confirmar com a Juliana: tempo de atuação ("mais de 15 anos" aparece nos posts dela) e formação/certificações. */}
                O trabalho é guiado por uma ideia, o Método Fio Real: primeiro a verdade do seu caso. Por isso toda avaliação é feita com calma, com tempo para perguntas e sem promessa de resultado.
              </p>
              <div className="rv mt-9 flex flex-wrap gap-3" data-d={180}>
                <Button href={livebaseUrl()} event="agendar-sobre">Agendar avaliação</Button>
                <Button href={whatsappUrl()} variant="secondary" event="whatsapp-sobre">Falar no WhatsApp</Button>
              </div>
            </div>
            <div className="col-span-12 mx-auto w-full max-w-[520px] lg:col-span-5 lg:col-start-8 lg:mx-0">
              <Photo name="juliana-retrato" alt="Retrato de Juliana Rosa entre folhagens, de olhos fechados e sorrindo" ratio="4 / 5" reveal priority />
            </div>
          </div>
        </Container>
      </section>

      <Section tone="mist">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-4"><Eyebrow>Como atendemos</Eyebrow><h2 className="t-h2 mt-5">Três princípios.</h2></div>
          <ul className="col-span-12 grid gap-5 md:grid-cols-3 lg:col-span-8">
            {[
              ["Primeiro avaliar", "Nenhum procedimento é indicado antes de entendermos o seu caso."],
              ["Naturalidade", "O objetivo é um resultado leve, que combine com o seu rosto."],
              ["Honestidade", "Quando a melhor indicação é outra, dizemos. Sem promessas de resultado."],
            ].map(([t, d], i) => (
              <li key={t} className="rv card p-6" data-d={i * 80}>
                <h3 className="t-h4">{t}</h3>
                <p className="t-body mt-3 text-forest/85">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid-12 gap-y-6">
          <div className="col-span-12 lg:col-span-5"><Eyebrow>O espaço</Eyebrow><h2 className="t-h2 mt-5">Privativo, moderno e acolhedor.</h2></div>
          <p className="t-body col-span-12 max-w-xl lg:col-span-6 lg:col-start-7">
            {/* TODO: trocar por fotos do estúdio (Google "Do proprietário" / ensaio no consultório) quando aprovadas. */}
            O estúdio fica na R. Independência, 637, sala 09, no bairro Bela Vista, em Nova Odessa. É um espaço pensado para a cliente se sentir à vontade durante todo o atendimento.
          </p>
        </div>
      </Section>
    </>
  );
}
