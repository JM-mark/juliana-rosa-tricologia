import { bySlug } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { ServicePage } from "@/components/ServicePage";

const s = bySlug("micropigmentacao-fio-a-fio");

export const metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.href, og: "micropigmentacao" });

export default function Page() {
  return <ServicePage s={s} />;
}
