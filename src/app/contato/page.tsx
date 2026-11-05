import { MessageCircle } from "lucide-react";
import { Facebook, Instagram } from "@/components/Social";
import { SITE, whatsappUrl } from "@/config";
import { pageMeta } from "@/lib/seo";
import { Eyebrow, SW } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/sections";
import { MapCard } from "@/components/MapCard";
import { ContactForm } from "@/components/ContactForm";

export const metadata = pageMeta({
  title: "Contato e endereço | Juliana Rosa em Nova Odessa",
  description: "R. Independência, 637, sala 09, Bela Vista, Nova Odessa/SP. WhatsApp (19) 97166-9001, Instagram e Facebook da Juliana Rosa.",
  path: "/contato/",
  og: "home",
});

export default function Page() {
  return (
    <>
      <PageHero image="clinica-clara" eyebrow="Contato" title={<>Fale com a <em>Juliana</em>.</>} lead="Chame no WhatsApp, passe aqui ou deixe sua mensagem. A resposta chega pela conversa no WhatsApp." crumbs={[{ name: "Início", path: "/" }, { name: "Contato", path: "/contato/" }]} />
      <Section tone="cream" className="!pt-0">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow>Canais</Eyebrow>
            <ul className="mt-6 grid gap-4">
              {[
                { h: whatsappUrl(), l: "WhatsApp", t: SITE.phoneDisplay, I: MessageCircle },
                { h: SITE.instagram, l: "Instagram", t: "@julianarosa.tricologia", I: Instagram },
                { h: SITE.facebook, l: "Facebook", t: "julianarosa.tricologia", I: Facebook },
              ].map(({ h, l, t, I }) => (
                <li key={l}>
                  <a href={h} target="_blank" rel="noopener noreferrer" className="card card-lift flex items-center gap-4 p-5" data-event={`contato-${l.toLowerCase()}`}>
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-sage"><I size={20} strokeWidth={SW} aria-hidden="true" /></span>
                    <span><span className="t-label block text-forest/70">{l}</span><span className="t-h4 block">{t}</span></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Eyebrow>Mensagem</Eyebrow>
            <div className="mt-6"><ContactForm /></div>
          </div>
        </div>
      </Section>
      <Section tone="mist"><MapCard /></Section>
    </>
  );
}
