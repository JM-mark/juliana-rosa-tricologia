import { Clock, MapPin } from "lucide-react";
import { SITE, mapsRouteUrl, whatsappUrl } from "@/config";
import { asset } from "@/lib/asset";
import { Button, SW } from "@/components/ui";

/** Mapa ilustrado (SVG) com o pino do monograma. O iframe do Google não aceita nossa tipografia nem a paleta. */
export function MapCard() {
  return (
    <div className="card grid overflow-hidden md:grid-cols-[1.1fr_1fr]">
      <div className="relative min-h-[280px] bg-sage-mist">
        <svg viewBox="0 0 480 360" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mapa ilustrado da região, com o pino do estúdio na Rua Independência">
          <rect width="480" height="360" fill="#dde9d3" />
          <g fill="none" stroke="#f4ece3" strokeLinecap="round">
            <path d="M-20 90 C120 70 220 130 500 80" strokeWidth="22" />
            <path d="M-20 270 C140 250 260 300 500 250" strokeWidth="18" />
            <path d="M90 -20 C110 120 70 220 120 380" strokeWidth="16" />
            <path d="M330 -20 C300 120 360 240 320 380" strokeWidth="16" />
            <path d="M-20 180 L500 190" strokeWidth="30" />
          </g>
          <g fill="none" stroke="#a7d39c" strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round">
            <path d="M-20 180 L500 190" />
          </g>
          <g fill="#c8dcc0">
            <rect x="130" y="205" width="70" height="42" rx="10" />
            <rect x="215" y="205" width="90" height="42" rx="10" />
            <rect x="130" y="112" width="60" height="50" rx="10" />
            <rect x="350" y="112" width="80" height="50" rx="10" />
            <rect x="350" y="205" width="90" height="42" rx="10" />
            <rect x="140" y="275" width="150" height="48" rx="10" />
          </g>
          <text x="150" y="176" fill="#1f3a2b" fontFamily="var(--font-body)" fontSize="11" fontWeight="500" letterSpacing="1.5">R. INDEPENDÊNCIA</text>
        </svg>
        <div className="absolute left-[44%] top-[50%] -translate-x-1/2 -translate-y-full">
          <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-coral bg-cream shadow-[0_14px_30px_-10px_rgba(31,58,43,0.6)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/brand/jr-marca.png")} alt="" width={598} height={380} className="h-7 w-auto" />
          </div>
          <span aria-hidden="true" className="mx-auto block h-3 w-px bg-coral" />
        </div>
      </div>
      <div className="p-7 md:p-9">
        <p className="t-label accent-text">Onde estamos</p>
        <address className="t-h4 mt-4 not-italic">
          {SITE.address.street}
        </address>
        <p className="t-body mt-1">{SITE.address.district}, {SITE.address.city}/{SITE.address.state} · <span className="t-num">{SITE.address.zip}</span></p>
        <p className="t-body mt-5 flex items-start gap-3"><Clock size={18} strokeWidth={SW} className="mt-1 flex-none" aria-hidden="true" />{SITE.hours}</p>
        <p className="t-body mt-2 flex items-start gap-3"><MapPin size={18} strokeWidth={SW} className="mt-1 flex-none" aria-hidden="true" />Procure pela sala 09.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href={mapsRouteUrl} size="sm" event="mapa-como-chegar">Como chegar</Button>
          <Button href={whatsappUrl()} size="sm" variant="secondary" event="whatsapp-mapa">WhatsApp</Button>
        </div>
      </div>
    </div>
  );
}
