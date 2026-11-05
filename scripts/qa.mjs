// QA: prints de todas as páginas em 1440/1024/768/390, fonte certa em 100% dos elementos,
// rolagem horizontal, texto cortado e vídeos da Home (30s desktop, 20s celular).
// Uso: node scripts/qa.mjs [url-base] [--video]   (a base padrão é http://localhost:5190, servida por scripts/serve.mjs)
import { chromium } from "playwright-core";
import fs from "node:fs";

const BASE = (process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : "http://localhost:5190").replace(/\/$/, "");
const VIDEO = process.argv.includes("--video");
const PAGES = [
  "/", "/metodo-fio-real/", "/tricologia/", "/sobrancelhas/", "/sobrancelhas/micropigmentacao-fio-a-fio/",
  "/sobrancelhas/reconstrucao-de-fios/", "/sobrancelhas/despigmentacao-a-laser/", "/sobrancelhas/design/",
  "/laser-e-estetica/", "/resultados/", "/sobre/", "/avaliacoes/", "/agendar/", "/contato/", "/privacidade/", "/pagina-que-nao-existe/",
];
const WIDTHS = [1440, 1024, 768, 390];
const OUT = "_qa/prints";
fs.mkdirSync(OUT, { recursive: true });

const slug = (p) => (p === "/" ? "home" : p.replace(/^\/|\/$/g, "").replace(/\//g, "-"));

const checks = () => {
  const ok = /^"?(__)?(Fraunces|Figtree|Mrs Saint Delafield)/i;
  const bad = new Map();
  for (const el of document.querySelectorAll("body *")) {
    if (["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "PATH", "CIRCLE", "RECT", "G", "DEFS", "LINEARGRADIENT", "STOP", "CLIPPATH", "TITLE"].includes(el.tagName.toUpperCase())) continue;
    if (el.closest("svg") && el.tagName.toLowerCase() !== "text") continue;
    const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    const isField = ["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(el.tagName);
    if (!hasText && !isField) continue;
    const ff = getComputedStyle(el).fontFamily.split(",")[0].trim();
    if (!ok.test(ff)) bad.set(`${el.tagName.toLowerCase()}.${(el.className?.baseVal ?? el.className ?? "").toString().split(" ")[0]} → ${ff}`, (bad.get(ff) ?? 0) + 1);
  }
  const de = document.documentElement;
  const hscroll = de.scrollWidth > de.clientWidth + 1;
  const clipped = [];
  for (const el of document.querySelectorAll("h1,h2,h3,h4,p,a,button,li,label,span")) {
    const cs = getComputedStyle(el);
    if (cs.display === "inline" || cs.visibility === "hidden") continue;
    if (el.closest(".sr-only") || el.classList.contains("sr-only")) continue;
    if ((cs.overflow === "hidden" || cs.overflowX === "hidden") && el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0 && !el.closest(".photo-wrap,.faq,.card,.btn,.rv"))
      clipped.push(el.textContent.trim().slice(0, 40));
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.right > de.clientWidth + 2 && !el.closest("[aria-hidden='true'],.sr-only,svg,.cursor-ring,.curtain,.intro")) clipped.push("fora da tela: " + el.textContent.trim().slice(0, 40));
  }
  // texto que vaza para fora do cartão/caixa que o contém
  for (const box of document.querySelectorAll(".card, article, li, figure")) {
    const br = box.getBoundingClientRect();
    if (br.width < 80) continue;
    for (const t of box.querySelectorAll("h1,h2,h3,h4,p,span,a")) {
      const r = t.getBoundingClientRect();
      if (r.width && r.right > br.right + 2 && !t.closest(".marquee,[aria-hidden='true'],.sr-only")) clipped.push("vaza do cartão: " + t.textContent.trim().slice(0, 40));
    }
  }
  return { badFonts: [...bad.keys()], hscroll, clipped: [...new Set(clipped)].slice(0, 8) };
};

const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const report = [];
for (const w of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w >= 1024 ? 900 : 844 }, reducedMotion: "no-preference", hasTouch: w < 768, isMobile: w < 768 });
  const page = await ctx.newPage();
  await page.addInitScript(() => sessionStorage.setItem("jr-intro", "1"));
  for (const p of PAGES) {
    await page.goto(BASE + p, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // percorre a página para disparar as revelações e depois mostra tudo
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 500) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(60); }
    await page.evaluate(() => { document.querySelectorAll(".rv,.reveal-photo,.scribble").forEach((e) => e.classList.add("is-in")); window.scrollTo(0, 0); });
    await page.waitForTimeout(1300);
    const r = await page.evaluate(checks);
    report.push({ page: p, width: w, ...r });
    await page.screenshot({ path: `${OUT}/${slug(p)}-${w}.png`, fullPage: true });
  }
  await ctx.close();
}

if (VIDEO) {
  for (const [name, vp, secs] of [["desktop", { width: 1440, height: 900 }, 30], ["celular", { width: 390, height: 844 }, 20]]) {
    const ctx = await browser.newContext({ viewport: vp, recordVideo: { dir: "_qa/video", size: vp }, isMobile: vp.width < 768, hasTouch: vp.width < 768 });
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(2600);
    const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    const steps = secs * 10 - 26;
    for (let i = 0; i <= steps; i++) {
      await page.evaluate((y) => (window.__lenis ? window.__lenis.scrollTo(y, { immediate: true }) : window.scrollTo(0, y)), (total * i) / steps);
      await page.waitForTimeout(100);
    }
    await ctx.close();
    const f = fs.readdirSync("_qa/video").filter((x) => x.endsWith(".webm")).sort((a, b) => fs.statSync("_qa/video/" + b).mtimeMs - fs.statSync("_qa/video/" + a).mtimeMs)[0];
    fs.renameSync("_qa/video/" + f, `_qa/video/home-${name}.webm`);
  }
}
await browser.close();

fs.writeFileSync("_qa/relatorio.json", JSON.stringify(report, null, 2));
const bad = report.filter((r) => r.badFonts.length || r.hscroll || r.clipped.length);
console.log(`${report.length} verificações (${PAGES.length} páginas × ${WIDTHS.length} larguras)`);
console.log(bad.length ? "PROBLEMAS:" : "Sem problemas de fonte, rolagem horizontal ou texto cortado.");
for (const r of bad) console.log(r.width, r.page, JSON.stringify({ fontes: r.badFonts, hscroll: r.hscroll, cortado: r.clipped }));
