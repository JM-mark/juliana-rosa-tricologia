import { Container, Eyebrow } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { Atmos, type AtmosName } from "@/components/BgMedia";
import { breadcrumb } from "@/lib/seo";

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  image,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  crumbs?: { name: string; path: string }[];
  image?: AtmosName;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-[calc(var(--section-y)*0.8)] pt-[140px] lg:pt-[180px]">
      {crumbs && <JsonLd data={breadcrumb(crumbs)} />}
      {image && (
        <>
          <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[64%]"><Atmos name={image} eager className="h-full w-full object-cover" /></div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cream via-cream/90 to-cream/15" aria-hidden="true" />
          <div className="veil-cream-b absolute inset-0 -z-10" aria-hidden="true" />
        </>
      )}
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="t-h1 mt-6 max-w-5xl">{title}</h1>
        {lead && <p className="t-lead fx fx-1 mt-8 max-w-2xl">{lead}</p>}
        {children && <div className="fx fx-2 mt-10">{children}</div>}
      </Container>
    </section>
  );
}
