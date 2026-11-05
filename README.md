# Juliana Rosa · Tricologia e Sobrancelha (Nova Odessa/SP)

Prévia do site: Next.js (App Router) + TypeScript + Tailwind v4, export estático.
Prévia: https://jm-mark.github.io/juliana-rosa-tricologia/

## Rodar

```bash
npm install
npm run dev          # desenvolvimento
npm run lint
npm run build        # export estático em out/ (já copia os payloads de rota para o nome plano)
```

Variáveis:

| Variável | Para quê |
|---|---|
| `GITHUB_PAGES=true` | usa o prefixo `/juliana-rosa-tricologia` (GitHub Pages) |
| `NEXT_PUBLIC_BASE_PATH` | prefixo manual (o build funciona com e sem) |
| `NEXT_PUBLIC_SITE_URL` | URL do site (canonical, sitemap, Open Graph, JSON-LD). Centralizada em `src/config.ts` |
| `NEXT_PUBLIC_INDEXABLE` | `false` (padrão) = `noindex` + `robots.txt` com `Disallow: /`. Troque para `true` ao publicar no domínio final |

Cloudflare Pages: `npm run build` (sem `GITHUB_PAGES`), pasta `out`. `public/_headers` traz cache e cabeçalhos de segurança.

## Estrutura

- `src/content/`: textos e dados (`services.ts`, `reviews.ts`, `results.ts`, `photo-data.ts`). Nada de texto direto nos componentes.
- `src/config.ts`: endereço, WhatsApp, redes, Livebase (IDs de categoria) e URLs.
- `DESIGN.md`: sistema de design e de motion. `docs/design-direction.md`: escolha da família.
- `scripts/photos.mjs`: recorta e gera WebP (`-lg` e `-sm`) + LQIP a partir de `_originais/` (não versionada).
- `scripts/logo.mjs`: extrai o monograma da prévia. `scripts/icons.mjs`: favicon, ícone do app e imagens de compartilhamento.
- `scripts/qa.mjs`: prints em 4 larguras, checagem de fonte (100% dos elementos), rolagem horizontal, texto cortado e vídeos (`--video`). Usa o Chrome instalado, via playwright-core.

## Agendamento (Livebase)

O Livebase envia `X-Frame-Options: SAMEORIGIN`: **não aceita iframe**. `/agendar` é uma página de escolha por categoria, que abre o Livebase em nova aba. O Livebase aceita link por categoria (`?category=category:ID`), e todos os botões usam isso:

| Categoria | ID |
|---|---|
| Tricologia | 1359 |
| Design de sobrancelha | 1360 |
| Micropigmentação de sobrancelha | 1361 |
| Depilação a laser | 1362 |
| Limpeza de pele | 1363 |
| Despigmentação de micropigmentação | 1364 |
| Reconstrução de fios | 1365 |
| Depilação com linha | 1397 |
| Micropigmentação labial | 1407 |
| Depilação linha ou cera | 1479 |

O WhatsApp leva o nome do serviço na mensagem. Cliques em "Agendar" e WhatsApp têm `data-event` pronto para o analytics.

## Fotos e direitos

Todas vêm de conteúdo **publicado pela Juliana** (Instagram @julianarosa.tricologia e ficha do Google). Nada de banco de imagens de pessoas. Nenhuma textura do Pexels/Pixabay foi usada até aqui; se entrar alguma, registrar aqui o link e a licença.

| Arquivo | Origem | Uso |
|---|---|---|
| `juliana-retrato` | Instagram, post `DI1DkdFRKxx` | hero da Home e Sobre |
| `juliana-blazer` | Instagram, post `DQ9YxBSkZC6` (recorte da metade de cima, sem a frase) | split da Tricologia e página de tricologia |
| `fio-a-fio-resultado` | Instagram, post `DGWBDhIvwh5`, slide 1 (recorte do rodapé, sem cortar a sobrancelha) | split da Micropigmentação, lente de análise |
| `resultado-avulso` | Instagram, post `DGWBDhIvwh5`, slide 2 | só em `/resultados` |
| `micro-no-dia` e `micro-um-ano` | Instagram, post `DJjRXPMNVqC` (recorte das duas metades, sem os rótulos, sem retoque) | antes e depois arrastável |

**Confirmar autorização das clientes antes da publicação oficial.** Os antes e depois e os frames de reels mostram clientes reais.

Os arquivos de origem ficam em `_originais/` (fora do Git). A resolução do Instagram é de 1080px: nenhuma foto entra em tela cheia.

## Logo

O monograma JR é uma **versão extraída** do post do Instagram (fundo removido), usada só na prévia: `public/brand/jr-marca.png` e `jr-logo-completa.png`. **Pedir à Juliana a logo original em vetor** e trocar. Não foi redesenhada.

## Conformidade

Sem promessa de cura ou resultado; "redução progressiva dos pelos" (nunca "definitiva"); frase do dermatologista nas páginas de tricologia; legenda "Resultado real. Os resultados variam de pessoa para pessoa." em todo antes e depois; sem preços; sem nota média nem contagem de avaliações no site; LGPD (consentimento no formulário e página de privacidade). Textos marcados `TODO confirmar` nos comentários do código dependem da Juliana.

## Pedir à Juliana (em ordem de prioridade)

1. **Ensaio simples no consultório:** ela atendendo, o espaço e detalhes dos equipamentos.
2. **Fotos de antes e depois originais e separadas** (mesmo ângulo e mesma luz), sem texto e sem marca por cima.
3. **Logo em vetor** (SVG, PDF ou AI).
4. Horário de atendimento completo (a ficha do Google só mostra "Fecha às 19:00").
5. Etapas reais do Método Fio Real (o texto atual é neutro).
6. Formação e certificações (página Sobre) e o tempo de atuação ("mais de 15 anos" aparece nos posts dela).
7. Fotos em alta resolução (os posts saem em 1080px) e dos procedimentos de tricologia (couro cabeludo, atendimento).
8. Autorização das clientes dos antes e depois e dos frames de reels.
9. Se atende clientes de Americana, Sumaré e Hortolândia (para citar as cidades).
10. Se a tricologia atende homens e se há mais serviços/planos para listar.
