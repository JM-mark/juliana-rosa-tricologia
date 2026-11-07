# Juliana Rosa · Tricologia e Sobrancelha (Nova Odessa/SP)

Site institucional da Juliana Rosa (tricologia e micropigmentação fio a fio). Next.js (App Router) + TypeScript + Tailwind v4, export estático.

- **Prévia (GitHub Pages):** https://jm-mark.github.io/juliana-rosa-tricologia/ (repo `JM-mark/juliana-rosa-tricologia`, branch `main`, deploy por GitHub Actions)
- **Prévia da cliente (Cloudflare Pages):** https://juliana-rosa-tricologia.pages.dev/ (upload manual do `juliana-rosa-cloudflare.zip`)
- **Status:** em revisão pela cliente, com `noindex` ligado de propósito.

## Comandos
```bash
npm run dev                      # desenvolvimento
npm run lint && npm run build    # build estático em out/ (já roda scripts/postbuild.mjs)
node scripts/serve.mjs out 5190  # serve out/ localmente (com brotli)
node scripts/functional.mjs      # 30 checagens funcionais (celular, desktop, movimento)
node scripts/audit.mjs           # auditoria do celular: 4 tamanhos × WebKit e Chromium × todas as páginas
node scripts/qa.mjs              # prints e checagem de fontes (4 larguras)
python scripts/zip.py            # gera juliana-rosa-cloudflare.zip a partir de out/
```
Build para o Cloudflare (raiz do domínio, sem basePath):
`env -u GITHUB_PAGES NEXT_PUBLIC_BASE_PATH="" NEXT_PUBLIC_SITE_URL=https://juliana-rosa-tricologia.pages.dev NEXT_PUBLIC_INDEXABLE=false npm run build` e depois `python scripts/zip.py`.
No Git Bash, use `MSYS_NO_PATHCONV=1` ao passar caminhos que começam com `/` para scripts Node.

## Estrutura
- `src/content/`: textos e dados (serviços, avaliações, resultados, fotos). `src/config.ts`: endereço, WhatsApp, Livebase (IDs de categoria), URLs.
- `src/components/`: Header, MobileMenu (portal), Showcase (vitrine fixa), AutoVideo (hero), BeforeAfter, LensPhoto, FollicleGrow, BrowSketch etc.
- `DESIGN.md`: sistema de design e motion. `docs/`: direção de design e registro das fotos de banco. `README.md`: como rodar e pedidos à cliente.
- `scripts/`: fotos (`photos.mjs`, `stock.mjs`, `media.mjs`), vídeo do hero (`hero-render.*`), QA e auditoria.
- `_originais/` e `_qa/` ficam fora do Git (fotos de origem e relatórios).

## Decisões que não mudam sem pedir
- Fontes: Fraunces 300 (SOFT 0, itálico em coral-text) + Figtree + assinatura Mrs Saint Delafield (nunca sobre foto). Paleta aprovada em `DESIGN.md`.
- 2 destaques: Tricologia (Livebase 1359) e Micropigmentação (1361). Nada de preço no site, nada de promessa de resultado, nota do dermatologista na tricologia, antes e depois só reais com legenda.
- Sem cursor personalizado. Movimento forçado (`FORCE_MOTION` em `src/lib/motion.ts`). No celular (≤767px) o hero é só poster estático; o vídeo fica no desktop.
- Livebase não aceita iframe: `/agendar` abre cada categoria em nova aba.
- Fotos: conteúdo publicado pela Juliana (Instagram e Google Maps) + fotos de banco (Pexels) só como atmosfera, nunca como resultado ou cliente.

## Pendências com a cliente
Logo em vetor, horário completo, etapas reais do Método Fio Real, formação/certificações, ensaio no consultório, antes e depois originais, autorização das clientes, cidades vizinhas, domínio .com.br e liberação da indexação (`NEXT_PUBLIC_INDEXABLE=true`).
