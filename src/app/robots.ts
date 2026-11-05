import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/config";

export const dynamic = "force-static";

// Enquanto for prévia (NEXT_PUBLIC_INDEXABLE != "true"), bloqueia tudo.
export default function robots(): MetadataRoute.Robots {
  return INDEXABLE
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
