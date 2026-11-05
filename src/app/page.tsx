import { Check } from "lucide-react";
import { LIVEBASE_CATEGORY, livebaseUrl, whatsappUrl } from "@/config";
import { OTHERS } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { asset } from "@/lib/asset";
import { Button, Container, Eyebrow, Photo, SW, Scribble } from "@/components/ui";
import { Section, SectionHead, Steps } from "@/components/sections";
import { BrowSketch } from "@/components/BrowSketch";
import { FollicleGrow } from "@/components/FollicleGrow";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Reviews } from "@/components/Reviews";
import { MapCard } from "@/components/MapCard";
import { ServiceArt } from "@/components/Art";
import { TLink } from "@/components/Nav";

export const metadata = pageMeta({
  title: "Tricologia e micropigmentação fio a fio em Nova Odessa | Juliana Rosa",
  description:
    "Tratamento para queda de cabelo e micropigmentação de sobrancelha fio a fio realista em Nova Odessa. Método Fio Real: primeiro a verdade do seu caso.",
  path: "/",
  og: "home",
});

const SPLIT = [
  {
    key: "tricologia",
    eyebrow: "Tricologia",
    title: "Queda de cabelo",
    href: "/tricologia/",
    cat: LIVEBASE_CATEGORY.tricologia,
    wa: "queda de cabelo",
    cta: "Avaliação de queda de cabelo",
    benefits: ["Avaliação do couro cabeludo", "Plano individual de cuidado", "Acompanhamento mensal"],
    steps: ["Avaliação tricológica", "Plano e tratamento", "Acompanhamento mensal"],
    photo: "juliana-blazer" as const,
    alt: "Juliana Rosa, tricologista, sorrindo de blazer rosa diante de parede de tijolos",
    focus: "50% 20%",
    tone: "bg-paper",
  },
  {
    key: "micro",
    eyebrow: "Sobrancelhas",
    title: "Micropigmentação fio a fio",
    href: "/sobrancelhas/micropigmentacao-fio-a-fio/",
    cat: LIVEBASE_CATEGORY.micropigmentacao,
    wa: "micropigmentação de sobrancelha",
    cta: "Avaliação de micropigmentação",
    benefits: ["Desenho pensado para o seu rosto", "Resultado cicatrizado natural", "Renovação e retoque"],
    steps: ["Avaliação do seu caso", "Procedimento fio a fio", "Cicatrização e retoque"],
    photo: "fio-a-fio-resultado" as const,
    alt: "Resultado real de micropigmentação fio a fio, olhar frontal, com a marca Juliana Rosa",
    focus: "50% 35%",
    tone: "bg-sage",
  },
];

export default function Home() {
  return (
    <>
      {/* 1 · Hero */}
      <section className="min-h-[100svh] pt-[120px] pb-[var(--section-y)] lg:pt-[150px]">
        <Container>
          <div className="grid-12 items-center gap-y-12">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow>Nova Odessa · Tricologia e sobrancelha</Eyebrow>
              <h1 className="t-display mt-6">
                Queda de cabelo e sobrancelha <Scribble><span className="accent">fio a fio</span></Scribble> realista.
              </h1>
              <p className="t-lead rv mt-8 max-w-xl">
                <span className="font-medium">Método Fio Real:</span> primeiro a verdade do seu caso, depois a indicação do que realmente faz sentido para você.
              </p>
              <div className="rv mt-10 flex flex-wrap gap-3" data-d={120}>
                <Button href={livebaseUrl(LIVEBASE_CATEGORY.tricologia)} event="agendar-hero-tricologia">Avaliação de queda de cabelo</Button>
                <Button href={livebaseUrl(LIVEBASE_CATEGORY.micropigmentacao)} variant="secondary" event="agendar-hero-micro">Avaliação de micropigmentação</Button>
              </div>
              <p className="rv mt-6" data-d={200}>
                <a className="link-jr" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" data-event="whatsapp-hero">Prefere falar no WhatsApp? Chame a Juliana →</a>
              </p>
            </div>
            <div className="relative col-span-12 mx-auto w-full max-w-[560px] lg:col-span-5 lg:mx-0 lg:justify-self-end">
              <Photo name="juliana-retrato" alt="Juliana Rosa, tricologista e especialista em sobrancelhas, entre folhagens" reveal priority ratio="4 / 5" sizes="(min-width:1024px) 40vw, 90vw" />
              <div className="rv absolute -bottom-6 -left-4 w-[78%] rounded-[24px] border border-forest/10 bg-paper p-4 shadow-[0_28px_60px_-30px_rgba(31,58,43,0.6)] sm:-left-10" data-d={300}>
                <BrowSketch className="w-full" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2 · Os dois destaques (split 50/50) */}
      <Section tone="mist" id="destaques">
        <SectionHead eyebrow="Duas especialidades" title={<>O que a Juliana faz de <Scribble>melhor</Scribble>.</>} lead="Dois cuidados, o mesmo método: entender o seu caso antes de indicar qualquer procedimento." />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {SPLIT.map((s, i) => (
            <article key={s.key} className={`rv overflow-hidden rounded-[32px] ${s.tone} p-5 sm:p-7 ${s.key === "micro" ? "text-forest" : ""}`} data-d={i * 120}>
              <Photo name={s.photo} alt={s.alt} ratio="4 / 3" focus={s.focus} reveal sizes="(min-width:1024px) 40vw, 90vw" />
              <div className="px-1 pt-7">
                <Eyebrow>{s.eyebrow}</Eyebrow>
                <h3 className="t-h2 mt-4">{s.title}</h3>
                <ul className="mt-5 grid gap-2">
                  {s.benefits.map((b) => (
                    <li key={b} className="t-body flex items-center gap-3"><Check size={18} strokeWidth={SW} className="flex-none text-coral-text" aria-hidden="true" />{b}</li>
                  ))}
                </ul>
                <p className="t-label mt-7 text-forest/70">Como funciona</p>
                <ol className="mt-3 grid gap-2">
                  {s.steps.map((t, n) => (
                    <li key={t} className="t-body flex items-baseline gap-4 border-t border-forest/15 pt-2"><span className="t-num t-label accent-text">{String(n + 1).padStart(2, "0")}</span>{t}</li>
                  ))}
                </ol>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button href={livebaseUrl(s.cat)} event={`agendar-split-${s.key}`}>{s.cta}</Button>
                  <TLink href={s.href} className="link-jr">Saiba mais <span className="arr">→</span></TLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 3 · Método */}
      <Section tone="cream">
        <SectionHead eyebrow="Método Fio Real" title="Primeiro, a verdade do seu caso." lead="Antes de indicar qualquer procedimento, olhamos de perto. Às vezes o melhor caminho é outro, e a gente conta." />
        <div className="mt-12">
          <Steps
            items={[
              { title: "Avaliação", text: "Entender o seu caso: fios, pele, histórico e o que você deseja." },
              { title: "Plano", text: "Indicar o que faz sentido, na ordem certa e sem pressa." },
              { title: "Procedimento", text: "Executar com precisão, fio a fio, e com atenção a cada detalhe." },
              { title: "Acompanhamento", text: "Rever, ajustar e cuidar do resultado ao longo do tempo." },
            ]}
          />
        </div>
        <p className="mt-10"><TLink href="/metodo-fio-real/" className="link-jr">Conheça o Método Fio Real <span className="arr">→</span></TLink></p>
      </Section>

      {/* 4 · Resultados reais */}
      <Section tone="mist">
        <div className="grid-12 items-center gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Resultados reais</Eyebrow>
            <h2 className="t-h2 mt-5">No dia e um ano depois.</h2>
            <p className="t-body mt-5 max-w-sm">Arraste a divisória para comparar. Resultado cicatrizado, sem retoque de imagem.</p>
            <div className="mt-8"><Button href="/resultados/" variant="secondary" event="ver-resultados">Ver resultados</Button></div>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <BeforeAfter before="micro-no-dia" after="micro-um-ano" beforeLabel="No dia" afterLabel="Um ano após" alt="Comparação de micropigmentação no dia e um ano após" />
          </div>
        </div>
      </Section>

      {/* 5 · Tricologia em profundidade (seção escura da Home) */}
      <Section tone="forest">
        <div className="mb-14 grid-12 gap-y-4">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow>Tricologia em profundidade</Eyebrow>
            <h2 className="t-h2 mt-5">Cuidar do fio começa pela raiz.</h2>
          </div>
          <p className="t-lead col-span-12 max-w-xl lg:col-span-4 lg:col-start-9 lg:self-end">Acompanhamento mensal do couro cabeludo, com plano individual. Quando necessário, indicamos a avaliação de um médico dermatologista.</p>
        </div>
        <FollicleGrow />
        <div className="mt-14 flex flex-wrap gap-3">
          <Button href={livebaseUrl(LIVEBASE_CATEGORY.tricologia)} event="agendar-home-tricologia">Avaliação de queda de cabelo</Button>
          <Button href="/tricologia/" variant="secondary">Entender a tricologia</Button>
        </div>
      </Section>

      {/* 6 · Outros serviços */}
      <Section tone="cream">
        <SectionHead eyebrow="Outros serviços" title="Complementos para o seu cuidado." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OTHERS.map((s, i) => (
            <TLink key={s.slug} href={s.href} className="rv card card-lift group flex flex-col p-6" data-d={i * 70}>
              <div className="overflow-hidden rounded-2xl bg-sage-mist p-3 transition-colors duration-500 group-hover:bg-sage">
                <ServiceArt visual={s.visual === "brow" ? "follicle" : s.visual} className="h-24 w-full opacity-80 transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-110" />
              </div>
              <p className="t-label accent-text mt-5">{s.eyebrow}</p>
              <h3 className="t-h4 mt-2">{s.name}</h3>
              <p className="t-cap mt-2 flex-1 text-forest/80">{s.summary}</p>
              <span className="link-jr mt-5">Ver detalhes <span className="arr">→</span></span>
            </TLink>
          ))}
        </div>
      </Section>

      {/* 7 · Sobre */}
      <Section tone="sage">
        <div className="grid-12 items-center gap-y-8">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow>Sobre a Juliana</Eyebrow>
            <h2 className="t-h2 mt-5">Quem cuida de você olha de perto.</h2>
            <p className="t-lead mt-6 max-w-xl">Juliana Rosa atende em Nova Odessa com um jeito simples de trabalhar: ouvir, avaliar e só então indicar. Cada caso é um caso.</p>
            <div className="mt-8"><Button href="/sobre/" event="sobre-home">Conhecer a Juliana</Button></div>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <div className="rv rounded-[32px] bg-cream p-10 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/brand/jr-logo-completa.png")} alt="Juliana Rosa, clínica de tricologia e estética" width={706} height={521} className="mx-auto h-36 w-auto" />
            </div>
          </div>
        </div>
      </Section>

      {/* 8 · Avaliações + mapa */}
      <Section tone="cream">
        <SectionHead eyebrow="Avaliações" title="Quem já passou por aqui conta." />
        <div className="mt-12 grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-6"><Reviews /></div>
          <div className="col-span-12 lg:col-span-6"><MapCard /></div>
        </div>
      </Section>

      {/* 9 · CTA */}
      <Section tone="mist">
        <div className="grid-12 items-center gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="t-h1">Vamos olhar o seu caso com calma?</h2>
          </div>
          <div className="col-span-12 flex flex-wrap gap-3 lg:col-span-5 lg:justify-self-end">
            <Button href="/agendar/" event="agendar-cta-final">Agendar avaliação</Button>
            <Button href={whatsappUrl()} variant="secondary" event="whatsapp-cta-final">WhatsApp</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
