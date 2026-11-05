// Dados reais e URLs centralizados. Nada de URL espalhada pelos componentes.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://jm-mark.github.io/juliana-rosa-tricologia").replace(/\/$/, "");
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE === "true";

export const SITE = {
  name: "Juliana Rosa · Tricologia e Sobrancelha",
  short: "Juliana Rosa",
  tagline: "Queda de cabelo e sobrancelha fio a fio realista",
  method: "Método Fio Real: primeiro a verdade do seu caso",
  phoneDisplay: "(19) 97166-9001",
  whatsappNumber: "5519971669001",
  address: {
    street: "R. Independência, 637, sala 09",
    district: "Bela Vista",
    city: "Nova Odessa",
    state: "SP",
    zip: "13380-025",
    lat: -22.7826434,
    lng: -47.2972202,
  },
  // TODO confirmar horário completo (a ficha do Google mostra só "Fecha às 19:00").
  hours: "Atendimento com hora marcada. Fecha às 19h.",
  instagram: "https://www.instagram.com/julianarosa.tricologia/",
  facebook: "https://www.facebook.com/julianarosa.tricologia",
  livebase: "https://app.livebase.com.br/juliana-rosa-tricologia-e-sobrancelha",
} as const;

// IDs de categoria do Livebase (?category=category:ID), conferidos na página de agendamento.
export const LIVEBASE_CATEGORY = {
  tricologia: 1359,
  design: 1360,
  micropigmentacao: 1361,
  laser: 1362,
  limpeza: 1363,
  despigmentacao: 1364,
  reconstrucao: 1365,
  depilacaoLinha: 1397,
  labios: 1407,
  linhaOuCera: 1479,
} as const;

export const livebaseUrl = (id?: number) => (id ? `${SITE.livebase}?category=category%3A${id}` : SITE.livebase);

export const whatsappUrl = (service?: string) => {
  const msg = `Olá, Juliana! Vim pelo site e gostaria de agendar uma avaliação${service ? ` de ${service}` : ""}.`;
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(msg)}`;
};

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${SITE.address.lat},${SITE.address.lng}`;
export const mapsRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${SITE.address.lat},${SITE.address.lng}`;
