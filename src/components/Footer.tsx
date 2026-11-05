import { MapPin, MessageCircle } from "lucide-react";
import { Facebook, Instagram } from "@/components/Social";
import { SITE, mapsUrl, whatsappUrl } from "@/config";
import { asset } from "@/lib/asset";
import { TLink } from "@/components/Nav";
import { Button, SW } from "@/components/ui";

const COLS = [
  {
    title: "Serviços",
    links: [
      ["/tricologia/", "Queda de cabelo"],
      ["/sobrancelhas/micropigmentacao-fio-a-fio/", "Micropigmentação fio a fio"],
      ["/sobrancelhas/reconstrucao-de-fios/", "Reconstrução de fios"],
      ["/sobrancelhas/despigmentacao-a-laser/", "Despigmentação a laser"],
      ["/sobrancelhas/design/", "Design de sobrancelha"],
      ["/laser-e-estetica/", "Laser e estética"],
    ],
  },
  {
    title: "O estúdio",
    links: [
      ["/metodo-fio-real/", "Método Fio Real"],
      ["/resultados/", "Resultados"],
      ["/sobre/", "Sobre a Juliana"],
      ["/avaliacoes/", "Avaliações"],
      ["/agendar/", "Agendar"],
      ["/contato/", "Contato"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="on-dark bg-forest-s pb-28 pt-20 lg:pb-12">
      <div className="container-jr">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <div className="inline-block rounded-3xl bg-cream px-5 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/brand/jr-logo-completa.png")} alt="Juliana Rosa, clínica de tricologia e estética" width={706} height={521} className="h-16 w-auto" />
            </div>
            <p className="t-h4 mt-8 max-w-md text-cream/90">{SITE.tagline}.</p>
            <p className="t-body mt-3 max-w-md text-cream/75">{SITE.method}.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={whatsappUrl()} variant="secondary" event="whatsapp-footer">Falar no WhatsApp</Button>
            </div>
          </div>

          {COLS.map((c) => (
            <nav key={c.title} aria-label={c.title} className="col-span-6 lg:col-span-2 lg:col-start-auto">
              <h2 className="t-label text-cream/60">{c.title}</h2>
              <ul className="mt-5 grid gap-3">
                {c.links.map(([h, l]) => (
                  <li key={h}>
                    <TLink href={h} className="link-jr text-[15px] font-normal">{l}</TLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-12 lg:col-span-3">
            <h2 className="t-label text-cream/60">Onde estamos</h2>
            <address className="mt-5 grid gap-1 text-[15px] not-italic text-cream/90">
              <span>{SITE.address.street}</span>
              <span>{SITE.address.district}, {SITE.address.city}/{SITE.address.state}</span>
              <span className="t-num">{SITE.address.zip}</span>
            </address>
            <p className="mt-3 text-[15px] text-cream/75">{SITE.hours}</p>
            <a className="link-jr mt-4 text-[15px]" href={mapsUrl} target="_blank" rel="noopener noreferrer" data-event="mapa-footer">
              <MapPin size={16} strokeWidth={SW} aria-hidden="true" /> Como chegar
            </a>
            <div className="mt-6 flex gap-3">
              {[
                { h: SITE.instagram, l: "Instagram", I: Instagram },
                { h: SITE.facebook, l: "Facebook", I: Facebook },
                { h: whatsappUrl(), l: "WhatsApp", I: MessageCircle },
              ].map(({ h, l, I }) => (
                <a key={l} href={h} target="_blank" rel="noopener noreferrer" aria-label={l} className="grid h-12 w-12 place-items-center rounded-full border border-cream/40 transition-colors duration-200 hover:bg-cream hover:text-forest">
                  <I size={20} strokeWidth={SW} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream/20 pt-6 text-[13px] text-cream/65 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Juliana Rosa · Tricologia e Sobrancelha · Nova Odessa/SP</p>
          <TLink href="/privacidade/" className="link-jr text-[13px]">Política de privacidade</TLink>
        </div>
      </div>
    </footer>
  );
}
