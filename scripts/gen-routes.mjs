// Gera as rotas finas de serviço (cada uma só liga metadados + template ServicePage).
import fs from "node:fs";
const routes = [
  ["tricologia", "tricologia", "tricologia"],
  ["sobrancelhas/micropigmentacao-fio-a-fio", "micropigmentacao-fio-a-fio", "micropigmentacao"],
  ["sobrancelhas/reconstrucao-de-fios", "reconstrucao-de-fios", "reconstrucao"],
  ["sobrancelhas/despigmentacao-a-laser", "despigmentacao-a-laser", "despigmentacao"],
  ["sobrancelhas/design", "design-de-sobrancelha", "design"],
  ["laser-e-estetica", "laser-e-estetica", "laser"],
];
for (const [dir, slug, og] of routes) {
  const p = `src/app/${dir}`;
  fs.mkdirSync(p, { recursive: true });
  fs.writeFileSync(
    `${p}/page.tsx`,
    `import { bySlug } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { ServicePage } from "@/components/ServicePage";

const s = bySlug("${slug}");

export const metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.href, og: "${og}" });

export default function Page() {
  return <ServicePage s={s} />;
}
`,
  );
}
console.log("ok");
