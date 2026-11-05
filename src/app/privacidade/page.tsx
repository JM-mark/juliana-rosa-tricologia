import { SITE } from "@/config";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/sections";

export const metadata = pageMeta({
  title: "Política de privacidade | Juliana Rosa",
  description: "Como o site da Juliana Rosa trata os seus dados pessoais, em linha com a LGPD.",
  path: "/privacidade/",
  og: "home",
});

const BLOCKS: [string, string][] = [
  ["Quem somos", "Este site é da Juliana Rosa · Tricologia e Sobrancelha, em Nova Odessa/SP, e apresenta os serviços do estúdio."],
  ["Quais dados tratamos", "Quando você usa o formulário de contato, o nome, o serviço de interesse e a mensagem que você escrever são usados só para montar a conversa no WhatsApp. O site não guarda esses dados em servidor próprio."],
  ["Para que usamos", "Para responder o seu contato e organizar o seu atendimento. Não vendemos nem compartilhamos dados para publicidade."],
  ["Serviços de terceiros", "O agendamento é feito no sistema Livebase e a conversa acontece no WhatsApp. Cada serviço tem a sua própria política de privacidade."],
  ["Resultados e fotos", "As fotos de resultados exibidas são publicadas pela Juliana nas redes sociais dela, com autorização das clientes."],
  ["Seus direitos", "Pela LGPD, você pode pedir acesso, correção ou exclusão dos seus dados. Escreva pelo WhatsApp " + SITE.phoneDisplay + "."],
  ["Atualizações", "Esta política pode mudar. A versão vigente é sempre a desta página."],
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Privacidade" title="Política de privacidade." lead="Texto simples, em linha com a LGPD." crumbs={[{ name: "Início", path: "/" }, { name: "Privacidade", path: "/privacidade/" }]} />
      <Section tone="cream" className="!pt-0">
        <div className="prose-jr max-w-3xl">
          {BLOCKS.map(([t, d]) => (
            <div key={t} className="mb-10">
              <h2 className="t-h3">{t}</h2>
              <p className="t-body mt-3">{d}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
