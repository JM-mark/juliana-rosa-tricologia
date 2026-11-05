import { bySlug } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { ServicePage } from "@/components/ServicePage";

const s = bySlug("reconstrucao-de-fios");

export const metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.href, og: "reconstrucao" });

export default function Page() {
  return <ServicePage s={s} />;
}
