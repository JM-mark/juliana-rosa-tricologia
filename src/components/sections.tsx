import { Plus } from "lucide-react";
import { Container, Eyebrow, SW } from "@/components/ui";

export function FAQ({ items, title = "Perguntas frequentes", dark = false }: { items: { q: string; a: string }[]; title?: string; dark?: boolean }) {
  return (
    <div className={`faq ${dark ? "on-dark" : ""}`}>
      <div className="grid-12 gap-y-8">
        <div className="col-span-12 lg:col-span-4">
          <Eyebrow>Dúvidas</Eyebrow>
          <h2 className="t-h2 mt-5">{title}</h2>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          {items.map((f) => (
            <details key={f.q}>
              <summary>
                <span className="t-h4 !text-[clamp(19px,1.7vw,24px)]">{f.q}</span>
                <span className="plus" aria-hidden="true"><Plus size={18} strokeWidth={SW} /></span>
              </summary>
              <div className="ans t-body">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Steps({ items, dark = false }: { items: { title: string; text: string }[]; dark?: boolean }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))]" style={{ ["--n" as string]: items.length }}>
      {items.map((s, i) => (
        <li key={s.title} className={`rv relative rounded-[24px] border p-6 ${dark ? "border-cream/25" : "border-forest/15 bg-paper"}`} data-d={i * 80}>
          <span className="t-num t-label text-[12px] accent-text">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="t-h4 mt-3">{s.title}</h3>
          <p className="t-body mt-2 opacity-85">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function SectionHead({ eyebrow, title, lead, className = "" }: { eyebrow: string; title: React.ReactNode; lead?: string; className?: string }) {
  return (
    <div className={`grid-12 gap-y-4 ${className}`}>
      <div className="col-span-12 lg:col-span-7">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="t-h2 rv mt-5">{title}</h2>
      </div>
      {lead && <p className="t-lead rv col-span-12 max-w-xl lg:col-span-4 lg:col-start-9 lg:self-end" data-d={120}>{lead}</p>}
    </div>
  );
}

export function Section({ tone = "cream", children, className = "", id }: { tone?: "cream" | "mist" | "sage" | "forest"; children: React.ReactNode; className?: string; id?: string }) {
  const bg = { cream: "bg-cream-s", mist: "bg-mist-s", sage: "bg-sage-s", forest: "bg-forest-s on-dark" }[tone];
  return (
    <section id={id} className={`section ${bg} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
