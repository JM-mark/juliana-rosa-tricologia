import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config";

export const dynamic = "force-static";

const PATHS = [
  "/", "/metodo-fio-real/", "/tricologia/", "/sobrancelhas/", "/sobrancelhas/micropigmentacao-fio-a-fio/",
  "/sobrancelhas/reconstrucao-de-fios/", "/sobrancelhas/despigmentacao-a-laser/", "/sobrancelhas/design/",
  "/laser-e-estetica/", "/resultados/", "/sobre/", "/avaliacoes/", "/agendar/", "/contato/", "/privacidade/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: new Date(), priority: p === "/" ? 1 : p.includes("tricologia") || p.includes("micropigmentacao") ? 0.9 : 0.7 }));
}
