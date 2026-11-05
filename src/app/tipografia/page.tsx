import type { Metadata } from "next";
import { Bodoni_Moda, Fraunces, Mrs_Saint_Delafield, Monsieur_La_Doulaise, Playfair_Display } from "next/font/google";
import { Photo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tipografia (laboratório) | Juliana Rosa",
  robots: { index: false, follow: false },
};

// Laboratório de tipografia (revisão 1). Fora do menu e do sitemap. Remover depois da escolha.
const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], axes: ["SOFT", "WONK", "opsz"], variable: "--lab-fraunces", display: "swap" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--lab-bodoni", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], weight: ["400"], variable: "--lab-playfair", display: "swap" });
const sigA = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400", variable: "--lab-sig-a", display: "swap" });
const sigB = Monsieur_La_Doulaise({ subsets: ["latin"], weight: "400", variable: "--lab-sig-b", display: "swap" });

type Opt = { id: string; name: string; why: string; cls: string; sig: string; sigName: string };
const OPTS: Opt[] = [
  { id: "a", name: "A · Fraunces afiada (recomendada)", why: "Fraunces com SOFT 0, WONK 0 e opsz 144, peso 300; destaque em Fraunces Italic 300.", cls: "lab-a", sig: "var(--lab-sig-a)", sigName: "Mrs Saint Delafield" },
  { id: "b", name: "B · Bodoni Moda", why: "Bodoni Moda (opsz alto) 400 + itálico 400. O máximo de contraste e luxo clássico.", cls: "lab-b", sig: "var(--lab-sig-b)", sigName: "Monsieur La Doulaise" },
  { id: "c", name: "C · Playfair Display", why: "Playfair Display 400 + itálico 400. Mais encorpada, lê bem em tamanhos médios.", cls: "lab-c", sig: "var(--lab-sig-a)", sigName: "Mrs Saint Delafield" },
];

export default function Page() {
  return (
    <div className={`${fraunces.variable} ${bodoni.variable} ${playfair.variable} ${sigA.variable} ${sigB.variable} lab`}>
      <style>{`
        .lab .d{font-weight:300;letter-spacing:-.02em;line-height:.95;text-wrap:balance}
        .lab .lab-a .d,.lab .lab-a .d2{font-family:var(--lab-fraunces),serif;font-variation-settings:"SOFT" 0,"WONK" 0,"opsz" 144}
        .lab .lab-a em{font-family:var(--lab-fraunces),serif;font-style:italic;font-variation-settings:"SOFT" 0,"WONK" 0,"opsz" 144;font-weight:300}
        .lab .lab-b .d,.lab .lab-b .d2{font-family:var(--lab-bodoni),serif;font-weight:400;font-variation-settings:"opsz" 96;letter-spacing:-.025em}
        .lab .lab-b em{font-family:var(--lab-bodoni),serif;font-style:italic;font-weight:400}
        .lab .lab-c .d,.lab .lab-c .d2{font-family:var(--lab-playfair),serif;font-weight:400;letter-spacing:-.03em}
        .lab .lab-c em{font-family:var(--lab-playfair),serif;font-style:italic;font-weight:400}
        .lab em{color:var(--color-coral-text)}
        .lab .lbl{font-size:11.5px;font-weight:500;text-transform:uppercase;letter-spacing:.22em}
        .lab .bt{display:inline-flex;align-items:center;height:52px;padding:0 28px;border-radius:999px;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:.16em}
        .lab .sig{font-size:clamp(44px,5vw,72px);line-height:1;color:#c39c83}
      `}</style>

      <header className="container-jr pt-[130px]">
        <p className="t-label accent-text">Laboratório · revisão 1</p>
        <h1 className="t-h1 mt-4">Tipografia: 3 opções</h1>
        <p className="t-lead mt-4 max-w-2xl">Hero e uma seção do split em cada opção, com a assinatura manuscrita. Texto em Figtree 400/500 nas três. Escala do hero: clamp(56px, 9vw, 136px).</p>
      </header>

      {OPTS.map((o) => (
        <section key={o.id} id={o.id} className={`${o.cls} mt-16 border-t border-forest/20 pt-12`}>
          <div className="container-jr">
            <h2 className="t-h4">{o.name}</h2>
            <p className="t-cap mt-1 text-forest/75">{o.why} Assinatura: {o.sigName}.</p>
          </div>

          {/* Hero */}
          <div className="mt-8 bg-cream">
            <div className="container-jr grid min-h-[720px] items-center gap-10 py-20 lg:grid-cols-[1.4fr_0.6fr]">
              <div>
                <p className="lbl accent-text">Nova Odessa · Tricologia e sobrancelha</p>
                <h3 className="d mt-7 text-[clamp(56px,9vw,136px)] text-forest">
                  Queda de cabelo e sobrancelha <em>fio a fio</em> realista.
                </h3>
                <p className="mt-8 max-w-[34em] text-[18px] leading-[1.6]"><strong className="font-medium">Método Fio Real:</strong> primeiro a verdade do seu caso, depois a indicação do que faz sentido para você.</p>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <span className="bt bg-forest text-cream">Avaliação de queda de cabelo</span>
                  <span className="bt border border-forest text-forest">Avaliação de micropigmentação</span>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[360px]">
                <Photo name="juliana-retrato" alt="Retrato de Juliana Rosa entre folhagens" ratio="3 / 4" />
                <span className="sig absolute -bottom-6 -left-10" style={{ fontFamily: o.sig }}>Juliana Rosa</span>
              </div>
            </div>
          </div>

          {/* Seção do split */}
          <div className="bg-sage-mist py-20">
            <div className="container-jr grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="lbl accent-text">01 / 02 · Sobrancelhas</p>
                <h3 className="d mt-6 text-[clamp(44px,6vw,96px)] text-forest">Micropigmentação <em>fio a fio</em></h3>
                <ul className="mt-8 grid gap-2 text-[17px]">
                  <li>Desenho pensado para o seu rosto</li>
                  <li>Resultado cicatrizado natural</li>
                  <li>Renovação e retoque</li>
                </ul>
                <p className="mt-10 text-[clamp(26px,3vw,40px)] text-forest"><span className="d2"><em>Primeiro, a verdade</em> do seu caso.</span></p>
                <div className="mt-8"><span className="bt bg-forest text-cream">Avaliação de micropigmentação</span></div>
              </div>
              <Photo name="fio-a-fio-resultado" alt="Resultado real de micropigmentação fio a fio" ratio="4 / 3" />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
