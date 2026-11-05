import type { Metadata } from "next";
import { INDEXABLE, SITE, SITE_URL } from "@/config";

export interface PageMetaInput {
  title: string;
  description: string;
  path: string; // com barra final, ex.: "/tricologia/"
  og?: string; // nome do arquivo em /og/
}

/** Metadados por página: título, descrição, canonical, Open Graph e noindex enquanto for prévia. */
export function pageMeta({ title, description, path, og = "default" }: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const image = `${SITE_URL}/og/${og}.png`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url,
      siteName: SITE.name,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.path}`,
  })),
});

export const faqLd = (faq: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const businessLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Clínica Juliana Rosa / Tricologia e Estética",
  url: SITE_URL,
  telephone: "+5519971669001",
  image: `${SITE_URL}/og/default.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Independência, 637, sala 09, Bela Vista",
    addressLocality: "Nova Odessa",
    addressRegion: "SP",
    postalCode: "13380-025",
    addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", latitude: SITE.address.lat, longitude: SITE.address.lng },
  // TODO confirmar horário completo com a Juliana antes de publicar openingHoursSpecification.
  sameAs: [SITE.instagram, SITE.facebook, SITE.livebase],
  hasMap: `https://www.google.com/maps/search/?api=1&query=${SITE.address.lat},${SITE.address.lng}`,
};

export const serviceLd = (name: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: `${SITE_URL}${path}`,
  areaServed: "Nova Odessa, SP",
  provider: { "@type": "BeautySalon", name: "Clínica Juliana Rosa / Tricologia e Estética", url: SITE_URL },
});
