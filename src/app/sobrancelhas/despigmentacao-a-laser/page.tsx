import { bySlug } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { ServicePage } from "@/components/ServicePage";

const s = bySlug("despigmentacao-a-laser");

export const metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.href, og: "despigmentacao" });

export default function Page() {
  return <ServicePage s={s} />;
}
