import { bySlug } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { ServicePage } from "@/components/ServicePage";

const s = bySlug("design-de-sobrancelha");

export const metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.href, og: "design" });

export default function Page() {
  return <ServicePage s={s} />;
}
