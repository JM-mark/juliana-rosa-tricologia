import { Container, Eyebrow } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumb } from "@/lib/seo";

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  crumbs?: { name: string; path: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="pb-[calc(var(--section-y)*0.7)] pt-[132px] lg:pt-[168px]">
      {crumbs && <JsonLd data={breadcrumb(crumbs)} />}
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="t-h1 mt-5 max-w-4xl">{title}</h1>
        {lead && <p className="t-lead rv mt-7 max-w-2xl">{lead}</p>}
        {children && <div className="rv mt-9" data-d={120}>{children}</div>}
      </Container>
    </section>
  );
}
