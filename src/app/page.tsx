import { LIVEBASE_CATEGORY, livebaseUrl, whatsappUrl } from "@/config";
import { OTHERS } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { Button, Container, Eyebrow, Photo } from "@/components/ui";
import { Section } from "@/components/sections";
import { FollicleGrow } from "@/components/FollicleGrow";
import { BeforeAfter } from "@/components/BeforeAfter";
import { LensPhoto } from "@/components/LensPhoto";
import { Reviews } from "@/components/Reviews";
import { MapCard } from "@/components/MapCard";
import { Marquee } from "@/components/Marquee";
import { Showcase } from "@/components/Showcase";
import { ServiceList } from "@/components/ServiceList";
import { BgVideo, type AtmosName } from "@/components/BgMedia";
import { TLink } from "@/components/Nav";

export const metadata = pageMeta({
  title: "Tricologia e micropigmentação fio a fio em Nova Odessa | Juliana Rosa",
  description:
    "Tratamento para queda de cabelo e micropigmentação de sobrancelha fio a fio realista em Nova Odessa. Método Fio Real: primeiro a verdade do seu caso.",
  path: "/",
  og: "home",
});

const LINE = (i: number) => ({ ["--i" as string]: i }) as React.CSSProperties;

const SVC_IMG: Record<string, AtmosName> = {
  "reconstrucao-de-fios": "cabelo-dourado",
  "despigmentacao-a-laser": "equipamento",
  "design-de-sobrancelha": "escova",
  "laser-e-estetica": "clinica-clara",
};

export default function Home() {
  return (
    <>
      {/* 1 · Hero em tela cheia, com vídeo (fios desenhados) */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-14 pt-[120px] sm:pb-20">
        <BgVideo name="hero" poster="hero-poster.webp" mobile="hero-m.mp4" />
        <div className="veil-cream absolute inset-0" aria-hidden="true" />
        <div className="veil-cream-b absolute inset-0" aria-hidden="true" />
        <Container className="relative">
          <div className="grid-12 items-end gap-y-12">
            <div className="col-span-12 lg:col-span-8">
              <Eyebrow>Nova Odessa · Tricologia e sobrancelha</Eyebrow>
              <h1 className="t-display mt-7">
                <span className="line" style={LINE(0)}><span>Queda de cabelo</span></span>
                <span className="line" style={LINE(1)}><span>e sobrancelha</span></span>
                <span className="line" style={LINE(2)}><span><em className="shine">fio a fio</em> realista.</span></span>
              </h1>
              <p className="t-lead rv mt-9" data-d={400}>
                <span className="font-medium">Método Fio Real:</span> primeiro a verdade do seu caso, depois a indicação do que realmente faz sentido para você.
              </p>
              <div className="rv mt-10 flex flex-wrap gap-3" data-d={500}>
                <Button href={livebaseUrl(LIVEBASE_CATEGORY.tricologia)} event="agendar-hero-tricologia">Avaliação de queda de cabelo</Button>
                <Button href={livebaseUrl(LIVEBASE_CATEGORY.micropigmentacao)} variant="secondary" event="agendar-hero-micro">Avaliação de micropigmentação</Button>
              </div>
              <p className="rv mt-6" data-d={600}>
                <a className="link-jr" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" data-event="whatsapp-hero">Prefere o WhatsApp? Chame a Juliana <span aria-hidden="true">→</span></a>
              </p>
            </div>
            <div className="relative col-span-12 mx-auto w-full max-w-[360px] lg:col-span-4 lg:mx-0 lg:justify-self-end">
              <Photo name="juliana-retrato" alt="Juliana Rosa, tricologista e especialista em sobrancelhas, entre folhagens" reveal priority ratio="3 / 4" focus="55% 30%" sizes="360px" />
              <p className="sig mt-5 text-center text-[54px]" aria-label="Juliana Rosa">Juliana Rosa</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 2 · Marquee */}
      <Marquee />

      {/* 3 · Os 2 destaques: vitrine fixa */}
      <section className="bg-mist-s py-[calc(var(--section-y)*0.7)]" id="destaques" aria-label="Os dois destaques: tricologia e micropigmentação">
        <Container>
          <Showcase />
        </Container>
      </section>

      {/* 4 · Método com a lente de análise */}
      <Section tone="cream">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 lg:col-span-8">
            <Eyebrow>Método Fio Real</Eyebrow>
            <h2 className="t-h2 mt-5">Primeiro, <em>a verdade</em> do seu caso.</h2>
          </div>
          <p className="t-lead col-span-12 lg:col-span-4">Antes de indicar qualquer procedimento, olhamos de perto. Às vezes o melhor caminho é outro, e a gente conta.</p>
        </div>
        <div className="mt-12">
          <LensPhoto name="micro-no-dia" alt="Olhar com sobrancelhas recém micropigmentadas, em detalhe, para análise com lente" />
          <p className="t-cap mt-3 text-forest/75">Resultado real, no dia do procedimento. Passe o mouse para analisar. Os resultados variam de pessoa para pessoa.</p>
        </div>
        <ol className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Avaliação", "Entender o seu caso: fios, pele, histórico e o que você deseja."],
            ["Plano", "Indicar o que faz sentido, na ordem certa e sem pressa."],
            ["Procedimento", "Executar com precisão, fio a fio, e com atenção a cada detalhe."],
            ["Acompanhamento", "Rever, ajustar e cuidar do resultado ao longo do tempo."],
          ].map(([t, d], i) => (
            <li key={t} className="rv border-t border-forest/25 pt-6" data-d={i * 90}>
              <span className="t-num t-display italic accent-text" style={{ fontStyle: "italic", fontSize: "clamp(56px,6vw,88px)" }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="t-h4 mt-3">{t}</h3>
              <p className="t-body mt-2 text-forest/85">{d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-12"><TLink href="/metodo-fio-real/" className="link-jr">Conheça o Método Fio Real <span className="arr">→</span></TLink></p>
      </Section>

      {/* 5 · Resultados reais em largura total */}
      <section className="bg-mist-s py-[var(--section-y)]">
        <Container>
          <Eyebrow>Resultados reais</Eyebrow>
          <h2 className="t-h2 mt-5 max-w-4xl">No dia e <em>um ano</em> depois.</h2>
          <div className="mt-12">
            <BeforeAfter before="micro-no-dia" after="micro-um-ano" beforeLabel="No dia" afterLabel="Um ano após" alt="Comparação de micropigmentação no dia e um ano após" />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button href="/resultados/" variant="secondary" event="ver-resultados">Ver mais resultados</Button>
            <p className="t-cap text-forest/70">Arraste a divisória para comparar.</p>
          </div>
        </Container>
      </section>

      {/* 6 · Tricologia em profundidade (seção escura) */}
      <Section tone="forest">
        <div className="mb-14 grid-12 items-end gap-y-6">
          <div className="col-span-12 lg:col-span-8">
            <Eyebrow>Tricologia em profundidade</Eyebrow>
            <h2 className="t-h2 mt-5">Cuidar do fio começa <em>pela raiz</em>.</h2>
          </div>
          <p className="t-lead col-span-12 lg:col-span-4">Acompanhamento mensal do couro cabeludo, com plano individual. Quando necessário, indicamos a avaliação de um médico dermatologista.</p>
        </div>
        <FollicleGrow />
        <div className="mt-14 flex flex-wrap gap-3">
          <Button href={livebaseUrl(LIVEBASE_CATEGORY.tricologia)} event="agendar-home-tricologia">Avaliação de queda de cabelo</Button>
          <Button href="/tricologia/" variant="secondary">Entender a tricologia</Button>
        </div>
      </Section>

      {/* 7 · Outros serviços: lista editorial */}
      <Section tone="cream">
        <div className="mb-12 max-w-3xl">
          <Eyebrow>Outros serviços</Eyebrow>
          <h2 className="t-h2 mt-5">Complementos para <em>o seu cuidado</em>.</h2>
        </div>
        <ServiceList items={OTHERS.map((s) => ({ href: s.href, name: s.name, text: s.summary, image: SVC_IMG[s.slug] }))} />
      </Section>

      {/* 8 · Sobre, sobre folhagem ao sol */}
      <section className="relative isolate overflow-hidden py-[var(--section-y)]">
        <BgVideo name="folhagem" poster="folhagem-poster.webp" />
        <div className="absolute inset-0 bg-cream/80" aria-hidden="true" />
        <Container className="relative">
          <div className="grid-12 items-center gap-y-12">
            <div className="col-span-12 lg:col-span-6">
              <Eyebrow>Sobre a Juliana</Eyebrow>
              <blockquote className="t-h1 mt-6"><em>Ouvir, avaliar</em> e só então indicar.</blockquote>
              <p className="t-lead mt-8">Juliana Rosa atende em Nova Odessa com um jeito simples de trabalhar. Cada caso é um caso, e cada indicação começa pela verdade do que você tem.</p>
              <p className="sig mt-6 text-[72px]" aria-label="Juliana Rosa">Juliana Rosa</p>
              <div className="mt-6"><Button href="/sobre/" event="sobre-home">Conhecer a Juliana</Button></div>
            </div>
            <div className="col-span-12 mx-auto w-full max-w-[520px] lg:col-span-5 lg:col-start-8">
              <Photo name="juliana-blazer" alt="Juliana Rosa sorrindo, de blazer rosa, diante de parede de tijolos" reveal ratio="4 / 4.6" focus="50% 18%" sizes="(min-width:1024px) 40vw, 90vw" />
            </div>
          </div>
        </Container>
      </section>

      {/* 9 · Avaliações + mapa */}
      <Section tone="cream">
        <div className="mb-12 max-w-3xl">
          <Eyebrow>Avaliações</Eyebrow>
          <h2 className="t-h2 mt-5">Quem já passou por aqui <em>conta</em>.</h2>
        </div>
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-6"><Reviews /></div>
          <div className="col-span-12 lg:col-span-6"><MapCard /></div>
        </div>
      </Section>

      {/* 10 · CTA final em tela cheia sobre a folhagem */}
      <section className="on-dark relative isolate grid min-h-[100svh] place-items-center overflow-hidden py-[var(--section-y)] text-cream">
        <BgVideo name="folhagem" poster="folhagem-poster.webp" />
        <div className="veil-forest absolute inset-0" aria-hidden="true" />
        <Container className="relative text-center">
          <h2 className="t-display mx-auto max-w-5xl">Vamos olhar o seu caso <em>com calma</em>?</h2>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Button href="/agendar/" event="agendar-cta-final">Agendar avaliação</Button>
            <Button href={whatsappUrl()} variant="secondary" event="whatsapp-cta-final">WhatsApp</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
