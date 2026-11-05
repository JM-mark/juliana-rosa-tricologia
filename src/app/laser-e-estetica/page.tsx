import { bySlug } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { ServicePage } from "@/components/ServicePage";

const s = bySlug("laser-e-estetica");

export const metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.href, og: "laser" });

export default function Page() {
  return <ServicePage s={s} />;
}
