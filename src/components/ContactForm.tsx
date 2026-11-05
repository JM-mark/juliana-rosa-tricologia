"use client";

import { useState } from "react";
import { SITE } from "@/config";
import { SERVICES } from "@/content/services";
import { Button } from "@/components/ui";
import { TLink } from "@/components/Nav";

type Errors = Partial<Record<"nome" | "servico" | "consent", string>>;

/** Sem servidor: o formulário monta a mensagem e abre o WhatsApp da Juliana. */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nome = String(f.get("nome") ?? "").trim();
    const servico = String(f.get("servico") ?? "");
    const msg = String(f.get("mensagem") ?? "").trim();
    const consent = f.get("consent") === "on";
    const err: Errors = {};
    if (nome.length < 2) err.nome = "Conte o seu nome para a Juliana saber com quem fala.";
    if (!servico) err.servico = "Escolha o serviço de interesse.";
    if (!consent) err.consent = "Precisamos do seu consentimento para abrir a conversa.";
    setErrors(err);
    if (Object.keys(err).length) return;
    const text = `Olá, Juliana! Sou ${nome}. Vim pelo site e gostaria de agendar uma avaliação de ${servico}.${msg ? ` ${msg}` : ""}`;
    window.open(`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5" aria-describedby="form-help">
      <p id="form-help" className="t-cap text-forest/75">Ao enviar, a conversa abre no WhatsApp com a sua mensagem pronta. Nada fica salvo neste site.</p>
      <div className="field">
        <label htmlFor="nome">Seu nome</label>
        <input id="nome" name="nome" className="input" autoComplete="given-name" aria-invalid={!!errors.nome} aria-describedby={errors.nome ? "e-nome" : undefined} placeholder="Como podemos te chamar?" />
        {errors.nome && <p id="e-nome" className="err" role="alert">{errors.nome}</p>}
      </div>
      <div className="field">
        <label htmlFor="servico">Serviço de interesse</label>
        <select id="servico" name="servico" className="input" defaultValue="" aria-invalid={!!errors.servico} aria-describedby={errors.servico ? "e-servico" : undefined}>
          <option value="" disabled>Escolha uma opção</option>
          {SERVICES.map((s) => <option key={s.slug} value={s.waName}>{s.name}</option>)}
        </select>
        {errors.servico && <p id="e-servico" className="err" role="alert">{errors.servico}</p>}
      </div>
      <div className="field">
        <label htmlFor="mensagem">Mensagem (opcional)</label>
        <textarea id="mensagem" name="mensagem" rows={4} className="input" placeholder="Conte um pouco do que você procura." />
      </div>
      <div>
        <label className="check">
          <input type="checkbox" name="consent" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "e-consent" : undefined} />
          <span>Concordo em abrir uma conversa no WhatsApp e em compartilhar as informações acima com a Juliana. Veja a <TLink className="link-jr !text-[14px]" href="/privacidade/">política de privacidade</TLink>.</span>
        </label>
        {errors.consent && <p id="e-consent" className="err mt-2" role="alert">{errors.consent}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn" data-event="contato-enviar"><span>Abrir conversa no WhatsApp</span><span className="arr" aria-hidden="true">→</span></button>
        <Button href={`tel:+${SITE.whatsappNumber}`} variant="link" noArrow event="contato-ligar">Ou ligue {SITE.phoneDisplay}</Button>
      </div>
      {sent && <p role="status" className="t-body card p-4">Conversa aberta em outra aba. Se não abriu, chame direto no WhatsApp {SITE.phoneDisplay}.</p>}
    </form>
  );
}
