// Checagem funcional no celular (390×844, toque) e no desktop: menu, barra fixa, folha de agendamento,
// links do Livebase/WhatsApp, vitrine, vídeo, antes e depois, formulário, FAQ, mapa e transição de página.
import { chromium } from "playwright-core";

const BASE = (process.argv[2] ?? "http://localhost:5190").replace(/\/$/, "");
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", args: ["--autoplay-policy=no-user-gesture-required"] });
const results = [];
const ok = (name, pass, extra = "") => { results.push({ name, pass, extra }); console.log(pass ? "OK  " : "FALHA", name, extra); };

async function mobile() {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  const bad = [];
  page.on("response", (r) => r.status() >= 400 && bad.push(r.status() + " " + r.url()));

  // Primeira visita: intro roda e termina
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(400);
  const introShown = await page.evaluate(() => getComputedStyle(document.querySelector(".intro")).display !== "none");
  ok("mobile · intro aparece na 1ª visita", introShown);
  await page.waitForTimeout(2600);
  const introGone = await page.evaluate(() => getComputedStyle(document.querySelector(".intro")).visibility === "hidden" && document.documentElement.dataset.ready === "1");
  ok("mobile · intro termina e libera o título", introGone);

  // Hero
  const h1lines = await page.evaluate(() => document.querySelectorAll("h1 .line").length);
  ok("mobile · título em 3 linhas com máscara", h1lines === 3);
  const heroTitleVisible = await page.evaluate(() => { const r = document.querySelector("h1").getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; });
  ok("mobile · título do hero dentro da primeira tela", heroTitleVisible);
  const vid = await page.evaluate(async () => {
    const v = document.querySelector("video");
    await new Promise((r) => setTimeout(r, 1500));
    return v ? { src: v.currentSrc.split("/").pop(), paused: v.paused, t: v.currentTime } : null;
  });
  ok("mobile · vídeo do hero usa a versão leve e toca", !!vid && /hero-m\.mp4/.test(vid.src) && !vid.paused, JSON.stringify(vid));

  // Botões do hero → Livebase por categoria
  const heroLinks = await page.evaluate(() => [...document.querySelectorAll("section a.btn")].slice(0, 2).map((a) => a.href));
  ok("mobile · botões do hero levam às categorias 1359 e 1361", /category%3A1359/.test(heroLinks[0] ?? "") && /category%3A1361/.test(heroLinks[1] ?? ""), heroLinks.join(" | "));

  // Barra fixa só depois do hero + folha de agendamento
  const barBefore = await page.evaluate(() => { const b = [...document.querySelectorAll("div")].find((d) => d.className?.toString?.().includes("translate-y-[140%]") || (d.className?.toString?.().includes("fixed inset-x-0 bottom-0") && d.querySelector("button"))); return b ? b.getBoundingClientRect().top > innerHeight - 5 : null; });
  ok("mobile · barra fixa escondida no hero", barBefore === true);
  await page.evaluate(() => (window.__lenis ? window.__lenis.scrollTo(900, { immediate: true }) : scrollTo(0, 900)));
  await page.waitForTimeout(900);
  const barBtn = page.getByRole("button", { name: /agendar avalia/i }).last();
  const barVisible = await barBtn.isVisible();
  ok("mobile · barra fixa aparece depois do hero", barVisible);
  await barBtn.tap();
  await page.waitForTimeout(700);
  const sheet = await page.evaluate(() => [...document.querySelectorAll('[role="dialog"] a')].map((a) => a.getAttribute("href")));
  ok("mobile · folha: Tricologia, Micropigmentação e outro serviço", sheet.length === 3 && /1359/.test(sheet[0]) && /1361/.test(sheet[1]) && /agendar/.test(sheet[2]), sheet.join(" | "));
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);

  // Menu em tela cheia
  await page.evaluate(() => (window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : scrollTo(0, 0)));
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: /abrir menu/i }).tap();
  await page.waitForTimeout(1200);
  const menuLinks = await page.evaluate(() => [...document.querySelectorAll("[role=dialog][aria-label=Menu] a")].map((a) => a.textContent.trim()));
  ok("mobile · menu abre com os links (stagger)", menuLinks.length >= 9, menuLinks.slice(0, 3).join(", ") + "…");
  const menuOp = await page.evaluate(() => getComputedStyle(document.querySelector("[role=dialog][aria-label=Menu] [data-stagger]")).opacity);
  ok("mobile · links do menu ficam visíveis após o stagger", Number(menuOp) > 0.95, "opacidade " + menuOp);
  await page.getByRole("button", { name: /fechar menu/i }).last().tap();
  await page.waitForTimeout(600);

  // Vitrine empilhada (sem pin) e imagens inteiras
  const pinned = await page.evaluate(() => !!document.querySelector("[data-prog]"));
  ok("mobile · vitrine empilhada, sem pin", !pinned);
  await page.evaluate(() => document.querySelector("#destaques").scrollIntoView());
  await page.waitForTimeout(1500);
  const showImgs = await page.evaluate(() => [...document.querySelectorAll("#destaques img")].filter((i) => i.getBoundingClientRect().width > 100).map((i) => { const r = i.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; }));
  ok("mobile · imagens da vitrine carregam e cabem na tela", showImgs.length >= 2 && showImgs.every(([w]) => w <= 390), JSON.stringify(showImgs));

  // Antes e depois por toque
  await page.evaluate(() => document.querySelector('[role="slider"]').scrollIntoView({ block: "center" }));
  await page.waitForTimeout(3500);
  const before = await page.evaluate(() => document.querySelector('[role="slider"]').getAttribute("aria-valuenow"));
  const box = await page.evaluate(() => { const r = document.querySelector('[role="slider"]').parentElement.getBoundingClientRect(); return { x: r.x, y: r.y + r.height / 2, w: r.width }; });
  await page.touchscreen.tap(box.x + box.w * 0.15, box.y);
  await page.waitForTimeout(400);
  const after = await page.evaluate(() => document.querySelector('[role="slider"]').getAttribute("aria-valuenow"));
  ok("mobile · divisória do antes e depois responde ao toque", before !== after && Number(after) < 30, `${before} → ${after}`);

  // Folículos e lente (animações ligadas ao scroll / automáticas)
  await page.evaluate(() => document.querySelector("[data-bar]")?.scrollIntoView({ block: "center" }));
  await page.waitForTimeout(1500);
  const stepsOn = await page.evaluate(() => document.querySelectorAll("[data-step][data-on='1']").length);
  ok("mobile · etapas da tricologia acendem no scroll", stepsOn >= 1, stepsOn + " de 4");

  // Sem rolagem horizontal
  const hs = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  ok("mobile · sem rolagem horizontal na Home", !hs);

  // Navegação com cortina
  await page.evaluate(() => (window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : scrollTo(0, 0)));
  await page.getByRole("button", { name: /abrir menu/i }).tap();
  await page.waitForTimeout(900);
  await page.locator('[role="dialog"][aria-label="Menu"] a[href$="/contato/"]').tap();
  await page.waitForURL(/contato/, { timeout: 5000 });
  await page.waitForTimeout(900);
  ok("mobile · navegação entre páginas (cortina) leva ao Contato", /\/contato\/$/.test(page.url()));
  const curtainClosed = await page.evaluate(() => getComputedStyle(document.querySelector(".curtain")).clipPath);
  ok("mobile · cortina reabre depois da navegação", /inset\(100%/.test(curtainClosed) || curtainClosed === "none" || /inset\(0px 0px 100%/.test(curtainClosed), curtainClosed);

  // Formulário: validação e campos na fonte da marca
  await page.getByRole("button", { name: /abrir conversa no whatsapp/i }).tap();
  await page.waitForTimeout(300);
  const errs = await page.evaluate(() => [...document.querySelectorAll(".err")].map((e) => e.textContent));
  ok("mobile · formulário mostra os 3 erros ao enviar vazio", errs.length === 3, errs.length + " erros");
  const fieldFonts = await page.evaluate(() => [...document.querySelectorAll("input, select, textarea, button")].map((e) => getComputedStyle(e).fontFamily.split(",")[0]));
  ok("mobile · campos e botões na fonte da marca", fieldFonts.every((f) => /Figtree|Fraunces/i.test(f)), [...new Set(fieldFonts)].join(", "));
  const zoomRisk = await page.evaluate(() => [...document.querySelectorAll("input:not([type=checkbox]), select, textarea")].some((e) => parseFloat(getComputedStyle(e).fontSize) < 16));
  ok("mobile · campos com 16px+ (sem zoom automático no iPhone)", !zoomRisk);

  // WhatsApp com serviço
  await page.goto(BASE + "/tricologia/", { waitUntil: "networkidle" });
  const wa = await page.evaluate(() => [...document.querySelectorAll("a")].find((a) => /wa\.me/.test(a.href) && /Falar no WhatsApp/i.test(a.textContent))?.href);
  ok("mobile · WhatsApp da Tricologia leva o nome do serviço", /queda%20de%20cabelo/.test(wa ?? ""), decodeURIComponent(wa ?? "").slice(0, 110));
  const note = await page.evaluate(() => document.body.innerText.includes("indicamos a avaliação de um médico dermatologista"));
  ok("conformidade · nota do dermatologista na Tricologia", note);
  const faq = page.locator(".faq summary").first();
  await faq.tap();
  await page.waitForTimeout(400);
  ok("mobile · FAQ abre ao toque", await page.evaluate(() => document.querySelector(".faq details").open));

  ok("mobile · sem erro de console/JS", errors.length === 0, errors.slice(0, 2).join(" | "));
  const real404 = bad.filter((b) => !/__next|_rsc|favicon/.test(b));
  ok("mobile · sem recurso 404", real404.length === 0, real404.slice(0, 3).join(" | "));
  await ctx.close();
}

async function reduced() {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const st = await page.evaluate(() => ({
    intro: getComputedStyle(document.querySelector(".intro")).display,
    vid: getComputedStyle(document.querySelector("video")).display,
    line: getComputedStyle(document.querySelector("h1 .line > span")).transform,
    rv: getComputedStyle(document.querySelector(".rv")).opacity,
  }));
  ok("reduced-motion · sem intro, sem vídeo (poster), título e blocos visíveis", st.intro === "none" && st.vid === "none" && (st.line === "none" || st.line === "matrix(1, 0, 0, 1, 0, 0)") && st.rv === "1", JSON.stringify(st));
  await ctx.close();
}

async function desktop() {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript(() => sessionStorage.setItem("jr-intro", "1"));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const pinned = await page.evaluate(() => !!document.querySelector("[data-prog]"));
  ok("desktop · vitrine fixa (pin) ativa", pinned);
  const hv = await page.evaluate(() => { const r = document.querySelector("h1").getBoundingClientRect(); const b = [...document.querySelectorAll("section a.btn")][0].getBoundingClientRect(); return { h1: r.bottom <= innerHeight, btn: b.bottom <= innerHeight }; });
  ok("desktop · título e botões do hero na primeira tela (1440×900)", hv.h1 && hv.btn, JSON.stringify(hv));
  await page.hover('header button:has-text("Outros serviços")');
  await page.waitForTimeout(700);
  const sub = await page.evaluate(() => [...document.querySelectorAll("header nav ul a")].map((a) => a.textContent.trim()));
  ok("desktop · menu 'Outros serviços' abre", sub.length === 5, sub.join(", "));
  await ctx.close();
}

await mobile();
await reduced();
await desktop();
await browser.close();
const fail = results.filter((r) => !r.pass);
console.log(`\n${results.length - fail.length}/${results.length} verificações OK`);
if (fail.length) { console.log("FALHAS:"); fail.forEach((f) => console.log(" -", f.name, f.extra)); }
