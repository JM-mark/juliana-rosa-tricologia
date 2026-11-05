---
name: Juliana Rosa · Tricologia e Sobrancelha
family: S06 Wellness Orgânico (base) + acabamento S01 (grid limpo, fotos em retângulo arredondado)
colors:
  cream: "#F4ECE3"        # fundo principal (posts: #F7E9D9 / #EBE2D7)
  paper: "#FBF7F1"        # cartões
  sage: "#A7D39C"         # fundos de destaque (posts: #A7D39C a #B3D9A6)
  sage-mist: "#DDE9D3"    # fundo suave (sage a ~35% sobre creme)
  sage-deep: "#7AA787"    # apoio e scrollbar
  forest: "#1F3A2B"       # texto de título, seções escuras, botões
  ink: "#1E2A23"          # corpo
  coral: "#E38E72"        # SÓ detalhes, ícones, traços e texto grande sobre forest
  coral-text: "#A8472F"   # texto pequeno sobre claro (5,0:1 sobre creme)
  rose: "#C39C83"         # monograma e filetes
typography:
  display: "Fraunces 300, eixo SOFT 100, opsz automático"
  body: "Figtree 400 e 500"
  rule: "Só estas duas famílias, em TODO o site (menu, botões, formulários, placeholders, erros, FAQ, mapa, 404, privacidade). font: inherit em button/input/select/textarea."
scale:
  display: "clamp(46px,7.2vw,108px) / 0.98 / -0.03em"
  h1: "clamp(40px,5.6vw,84px) / 1 / -0.028em"
  h2: "clamp(32px,4.2vw,60px) / 1.04 / -0.024em"
  h3: "clamp(26px,2.8vw,38px) / 1.1 / -0.02em"
  h4: "clamp(21px,1.9vw,26px) / 1.2 / -0.015em"
  lead: "Figtree 400, clamp(18px,1.5vw,21px) / 1.55"
  body: "Figtree 400, clamp(16px,1.1vw,17.5px) / 1.65"
  caption: "Figtree 400, 13px / 1.5"
  button: "Figtree 500, 13.5px, tracking 0.06em, altura 52px, pílula"
  label: "Figtree 500, 12px, caixa alta, tracking 0.14em"
  numbers: "tabular-nums lining-nums (.t-num)"
radius: { card: 24px, photo: 28px, pill: 999px }
---

# Overview
Clínica de tricologia e sobrancelha, calma e precisa, com a identidade que a Juliana já usa no Instagram: verde-sálvia, verde-floresta, coral e creme, serifa fina e traço de fio. A estrutura é orgânica (S06: ritmo de fundos, traço de fio em SVG, textura de papel) e o acabamento é de clínica confiável (S01: grid de 12 colunas, informação organizada, fotos em retângulo arredondado). Não usa a estrutura da OS Clínica: hero com sobrancelha desenhada, split 50/50 dos dois destaques, lente de análise e fios crescendo.

Dois serviços em destaque: **Tricologia (queda de cabelo)** e **Micropigmentação fio a fio**. Os demais são complementares, com menos peso visual.

# Colors
Marca primeiro. Pares de contraste verificados:

| Texto | Fundo | Razão |
|---|---|---|
| forest `#1F3A2B` | cream `#F4ECE3` | 10,6:1 |
| ink `#1E2A23` | cream | 12,7:1 |
| coral-text `#A8472F` | cream | 5,0:1 (texto pequeno) |
| cream | forest | 10,6:1 |
| coral `#E38E72` | forest | 4,8:1 (permitido em texto grande e detalhes sobre forest) |
| coral | cream | 2,1:1: **nunca texto**; só ícones, traços, sublinhado e pontos |
| sage | cream | **nunca como cor de texto** |

Ritmo de fundos por página: cream, sage-mist, cream, **forest (uma seção escura por página)**, cream, sage. O rodapé é forest.

# Typography
Uma escala só (ver YAML). No máximo 2 pesos por família: Fraunces 300 (títulos) e Figtree 400/500. Títulos com tracking levemente negativo e `text-wrap: balance`; rótulos em caixa alta com 0,14em. Nenhuma fonte do sistema: `button, input, select, textarea { font: inherit }`, placeholders na fonte do corpo.

# Layout
Container 1280px, grid de 12 colunas (`.grid-12`), gutter fluido. Espaçamento vertical fixo entre seções (`--section-y`: clamp(72px, 10vw, 136px)). Hero com `min-height: 100svh`.

# Elevation & Depth
Quase plana: bordas de 1px a 10% de forest, sombra só no hover dos cartões (translateY -6px) e em elementos flutuantes (cartão da sobrancelha no hero, pino do mapa).

# Shapes
Cantos de 24px (cartões) e 28px (fotos), pílulas nos botões. Traço de fio em SVG (sobrancelha, folículo, laser) com `stroke-linecap: round`.

# Components
- **Botões (um sistema só):** primário (forest), secundário (contorno) e link (sublinhado que cresce). Altura 52px, pílula, Figtree 500 13,5px. Hover: preenchimento deslizando da esquerda (500ms) e seta que se move 4px; foco visível; ativo `scale(.98)`; desabilitado a 55%.
- **Formulários:** campos de 52px, cantos 16px, foco com anel sálvia, erro com coral-text e anel coral; checkbox customizado; `select` com seta desenhada.
- **Fotos:** componente `Photo` com mesmo tratamento (`saturate .94, contrast 1.02, sepia .05` + véu sálvia em soft-light), LQIP, cantos 28px, máscara que abre de dentro para fora. Sem corte de rosto (`objectPosition` por foto).
- **Antes e depois:** divisória arrastável (`role="slider"`, setas, Home/End), linha coral, puxador com o monograma; demonstra uma vez ao entrar.
- **Mapa:** cartão em volta de um mapa ilustrado em SVG com o pino do monograma (o iframe do Google não aceita a nossa tipografia). Botões "Como chegar" e "WhatsApp".
- **Ícones:** lucide-react com `strokeWidth` 1,25 em todo o site; Instagram e Facebook desenhados no mesmo traço.
- **Barra do celular:** aparece depois do hero; "Agendar avaliação" abre uma folha com Tricologia, Micropigmentação e "Outro serviço".

# Motion
Sistema único (`src/lib/motion.ts` e variáveis CSS):
- **Durações:** rápida 200ms (microinterações), média 500ms (hover, menus, revelações), lenta 900ms (entradas de seção, máscaras, sublinhado desenhado).
- **Easings:** saída `cubic-bezier(.16,1,.3,1)` (tudo que entra) e entrada `cubic-bezier(.7,0,.84,1)` (tudo que sai).
- **Regras:** só `transform`, `opacity`, `clip-path`, `stroke-dashoffset`. Um movimento por seção, ligado ao conteúdo dela.
- **Assinaturas:**
  1. *Hero:* sobrancelha de 86 fios (SVG determinístico) se desenhando em stagger, com guia tracejada e brilho que passa por cima.
  2. *Lente de análise:* círculo de 176px que amplia 2,2× a foto sob o mouse; no celular passeia sozinho (GSAP, yoyo).
  3. *Fios crescendo:* corte do couro cabeludo; `stroke-dashoffset` ligado ao scroll (ScrollTrigger scrub) e as etapas acendem ao lado.
- **Sistema:** transição de página (cortina creme com o monograma, 350ms entrando + 350ms saindo, ≤ 700ms); intro de abertura só na 1ª visita da sessão (monograma revelado em 800ms e cortina que sobe, ≤ 1,5s); menu do celular com links em stagger; cartões que sobem 6px no hover; cursor ponto coral + anel com lerp (só em dispositivos com mouse ≥ 1024px).
- **Rolagem:** Lenis integrado ao ticker do GSAP.
- **`prefers-reduced-motion`:** sem intro, sem cortina, sem Lenis, sem parallax; sobrancelha já desenhada, lente estática, fios completos, revelações desligadas. A versão estática é a mesma composição.

# Do's and Don'ts
- Faça: marca primeiro, coral só em detalhes, uma seção escura por página, legenda "Resultado real. Os resultados variam de pessoa para pessoa." em todo antes e depois.
- Faça: botões de agendamento sempre para a categoria certa do Livebase; WhatsApp com o nome do serviço na mensagem.
- Não: fotos de banco de pessoas, promessa de cura ou resultado, "definitiva" para laser, preços no site, nota média ou contagem de avaliações, crédito da agência.
- Não: segunda fonte, texto do navegador em campos, animação genérica repetida em todas as seções.
