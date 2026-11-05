import { Container } from "@/components/ui";
import { Button } from "@/components/ui";
import { BrowSketch } from "@/components/BrowSketch";

export const metadata = { title: "Página não encontrada | Juliana Rosa", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="grid min-h-[100svh] place-items-center pb-[var(--section-y)] pt-[140px]">
      <Container>
        <div className="grid-12 items-center gap-y-10">
          <div className="col-span-12 lg:col-span-6">
            <p className="t-label accent-text">Erro 404</p>
            <h1 className="t-display mt-5">Esse fio se perdeu.</h1>
            <p className="t-lead mt-6 max-w-lg">A página que você procura não existe ou mudou de lugar. Vamos reencontrar o caminho.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/">Voltar ao início</Button>
              <Button href="/agendar/" variant="secondary">Agendar avaliação</Button>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <div className="rounded-[32px] bg-sage p-8"><BrowSketch label={false} className="w-full" /></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
