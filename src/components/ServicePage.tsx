import { Check } from "lucide-react";
import { LIVEBASE_CATEGORY, livebaseUrl, whatsappUrl } from "@/config";
import { SERVICES, type Service } from "@/content/services";
import { breadcrumb, faqLd, serviceLd } from "@/lib/seo";
import { Button, Container, Eyebrow, Photo, SW } from "@/components/ui";
import { FAQ, Section, Steps } from "@/components/sections";
import { Atmos, type AtmosName } from "@/components/BgMedia";
import { FollicleGrow } from "@/components/FollicleGrow";
import { LensPhoto } from "@/components/LensPhoto";
import { BeforeAfter } from "@/components/BeforeAfter";
import { JsonLd } from "@/components/JsonLd";
import { TLink } from "@/components/Nav";

const HERO_IMG: Record<string, AtmosName> = {
  tricologia: "cabelo-macro",
  "micropigmentacao-fio-a-fio": "samambaia",
  "despigmentacao-a-laser": "equipamento",
  "laser-e-estetica": "clinica-clara",
};

// Heros com foto real da Juliana (resultado de micropigmentação fio a fio), com legenda de transparência.
const HERO_PHOTO: Record<string, "fio-a-fio-resultado" | "resultado-avulso"> = {
  "reconstrucao-de-fios": "fio-a-fio-resultado",
  "design-de-sobrancelha": "resultado-avulso",
};

export function BookCta({ s, id }: { s: Service; id: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button href={livebaseUrl(LIVEBASE_CATEGORY[s.category])} event={`agendar-${s.slug}-${id}`}>Agendar avaliação</Button>
      <Button href={whatsappUrl(s.waName)} variant="secondary" event={`whatsapp-${s.slug}-${id}`}>Falar no WhatsApp</Button>
    </div>
  );
}

/** Coloca em itálico as últimas palavras do título (uma por título, na cor de acento). */
function italicLast(t: string) {
  const m = t.match(/^(.*?)(S+.?)$/);
  if (!m) return t;
  const word = m[2].replace(/.$/, "");
  return (<>{m[1]}<em>{word}</em>{m[2].endsWith(".") ? "." : ""}</>);
}

/** Template único das páginas de serviço (alimentado por src/content/services.ts). */
export function ServicePage({ s }: { s: Service }) {
  const related = s.related.map((r) => SERVICES.find((x) => x.slug === r)!).filter(Boolean);
  const crumbs = [
    { name: "Início", path: "/" },
    ...(s.href.startsWith("/sobrancelhas/") ? [{ name: "Sobrancelhas", path: "/sobrancelhas/" }] : []),
    { name: s.name, path: s.href },
  ];
  return (
    <>
      <JsonLd data={serviceLd(s.name, s.metaDescription, s.href)} />
      <JsonLd data={breadcrumb(crumbs)} />
      <JsonLd data={faqLd(s.faq)} />

      {/* Hero */}
      <section className="pt-[132px] pb-[var(--section-y)] lg:pt-[168px]">
        <Container>
          <div className="grid-12 items-center gap-y-10">
            <div className="col-span-12 lg:col-span-7">
              <nav aria-label="Você está em" className="t-cap mb-6 flex flex-wrap gap-2 text-forest/70">
                {crumbs.map((c, i) => (
                  <span key={c.path} className="flex gap-2">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    {i < crumbs.length - 1 ? <TLink href={c.path} className="link-jr !text-[13px] !font-normal">{c.name}</TLink> : <span aria-current="page">{c.name}</span>}
                  </span>
                ))}
              </nav>
              <Eyebrow>{s.eyebrow}</Eyebrow>
              <h1 className="t-h1 mt-5 !text-[clamp(40px,5.2vw,82px)]">{italicLast(s.title)}</h1>
              <p className="t-lead fx fx-1 mt-7 max-w-xl">{s.lead}</p>
              <div className="fx fx-2 mt-9"><BookCta s={s} id="topo" /></div>
              <ul className="fx fx-3 mt-10 flex flex-wrap gap-x-7 gap-y-3">
                {s.benefits.map((b) => (
                  <li key={b} className="t-cap flex items-center gap-2 text-forest/85"><Check size={16} strokeWidth={SW} className="text-coral-text" aria-hidden="true" />{b}</li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 lg:col-span-5">
              {HERO_PHOTO[s.slug] ? (
                <figure className="fx fx-2">
                  <Photo name={HERO_PHOTO[s.slug]} alt="Resultado real de micropigmentação fio a fio, olhar frontal, com a marca Juliana Rosa" priority ratio="1 / 1" focus="50% 38%" sizes="(min-width:1024px) 40vw, 90vw" />
                  <figcaption className="t-cap mt-3 text-forest/80">Resultado real de micropigmentação fio a fio. Os resultados variam de pessoa para pessoa.</figcaption>
                </figure>
              ) : (
                <div className="photo-wrap fx fx-2 aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
                  <Atmos name={HERO_IMG[s.slug] ?? "folhas"} eager className="h-full w-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* O que é */}
      <Section tone="cream" className="!pt-0">
        <div className="grid-12 items-start gap-y-10">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow>Como funciona</Eyebrow>
            <h2 className="t-h2 rv mt-5">{s.what.title}</h2>
            <div className="prose-jr t-body rv mt-6" data-d={100}>{s.what.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
          </div>
          {s.photo && s.photo !== "fio-a-fio-resultado" ? (
            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <Photo name={s.photo} alt="Juliana Rosa, tricologista e especialista em sobrancelhas, em Nova Odessa" reveal ratio="4 / 3.4" focus="50% 22%" />
            </div>
          ) : s.photo ? (
            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <LensPhoto alt="Resultado real de micropigmentação fio a fio, com a marca da Juliana Rosa" />
              <p className="t-cap mt-3 text-forest/75">Resultado real. Passe o mouse para analisar o fio de perto. Os resultados variam de pessoa para pessoa.</p>
            </div>
          ) : null}
        </div>
      </Section>

      {/* Para quem é */}
      <Section tone="mist">
        <div className="grid-12 gap-y-8">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Para quem é</Eyebrow>
            <h2 className="t-h2 mt-5">Este cuidado é para você se…</h2>
          </div>
          <ul className="col-span-12 grid gap-4 lg:col-span-7 lg:col-start-6">
            {s.forWhom.map((f, i) => (
              <li key={f} className="rv flex gap-4 border-t border-forest/20 py-5" data-d={i * 70}>
                <Check size={20} strokeWidth={SW} className="mt-1 flex-none text-coral-text" aria-hidden="true" />
                <span className="t-body">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Como é: etapas (seção escura da página) */}
      <Section tone="forest">
        <div className="mb-12 max-w-2xl">
          <Eyebrow>Etapas</Eyebrow>
          <h2 className="t-h2 mt-5">Do primeiro olhar ao acompanhamento.</h2>
        </div>
        {s.slug === "tricologia" ? <FollicleGrow /> : <Steps items={s.how} dark />}
        <div className="mt-12"><BookCta s={s} id="meio" /></div>
      </Section>

      {s.slug === "micropigmentacao-fio-a-fio" && (
        <Section tone="cream">
          <div className="grid-12 items-center gap-y-8">
            <div className="col-span-12 lg:col-span-4">
              <Eyebrow>Resultado cicatrizado</Eyebrow>
              <h2 className="t-h2 mt-5">No dia e um ano depois.</h2>
              <p className="t-body mt-5 max-w-sm">Arraste a divisória para comparar. É o mesmo olhar, com o resultado já assentado.</p>
              <TLink href="/resultados/" className="link-jr mt-6">Ver mais resultados <span className="arr">→</span></TLink>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <BeforeAfter before="micro-no-dia" after="micro-um-ano" beforeLabel="No dia" afterLabel="Um ano após" alt="Comparação de micropigmentação no dia e um ano após" />
            </div>
          </div>
        </Section>
      )}

      {s.extra?.map((e, i) => (
        <Section key={e.title} tone={i % 2 ? "mist" : "cream"}>
          <div className="grid-12 gap-y-6">
            <div className="col-span-12 lg:col-span-5"><h2 className="t-h2">{e.title}</h2></div>
            <div className="prose-jr t-body col-span-12 lg:col-span-6 lg:col-start-7">{e.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
          </div>
        </Section>
      ))}

      {s.note && (
        <section className="bg-mist-s py-[calc(var(--section-y)*0.5)]">
          <Container>
            <p className="t-lead mx-auto max-w-3xl text-center">{s.note}</p>
          </Container>
        </section>
      )}

      <Section tone="cream">
        <FAQ items={s.faq} />
      </Section>

      {/* CTA final */}
      <Section tone="sage">
        <div className="grid-12 items-center gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="t-h2">Vamos olhar o seu caso com calma?</h2>
            <p className="t-lead mt-5 max-w-xl">A avaliação é o primeiro passo. Você escolhe o horário e vê os valores direto no agendamento.</p>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:justify-self-end"><BookCta s={s} id="fim" /></div>
        </div>
      </Section>

      {/* Combina com */}
      <Section tone="cream">
        <Eyebrow>Combina com</Eyebrow>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {related.map((r) => (
            <TLink key={r.slug} href={r.href} className="card card-lift block p-7">
              <p className="t-label accent-text">{r.eyebrow}</p>
              <h3 className="t-h3 mt-3">{r.name}</h3>
              <p className="t-body mt-3 text-forest/80">{r.summary}</p>
              <span className="link-jr mt-5">Saiba mais <span className="arr">→</span></span>
            </TLink>
          ))}
        </div>
      </Section>
    </>
  );
}
