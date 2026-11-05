// Auditoria do celular: 4 tamanhos × 2 motores (WebKit e Chromium) × todas as páginas.
// Uso: node scripts/audit.mjs [url]  → _qa/auditoria-celular.json e .md
import { webkit, chromium, devices } from "playwright-core";
import fs from "node:fs";

const BASE = (process.argv[2] ?? "http://localhost:5190").replace(/\/$/, "");
const PAGES = ["/", "/metodo-fio-real/", "/tricologia/", "/sobrancelhas/", "/sobrancelhas/micropigmentacao-fio-a-fio/", "/sobrancelhas/reconstrucao-de-fios/", "/sobrancelhas/despigmentacao-a-laser/", "/sobrancelhas/design/", "/laser-e-estetica/", "/resultados/", "/sobre/", "/avaliacoes/", "/agendar/", "/contato/", "/privacidade/", "/pagina-que-nao-existe/"];
const VIEWPORTS = [
  { name: "390×844 (iPhone 14)", w: 390, h: 844 },
  { name: "375×667 (iPhone SE)", w: 375, h: 667 },
  { name: "414×896", w: 414, h: 896 },
  { name: "360×800 (Android)", w: 360, h: 800 },
];
const ENGINES = [
  ["webkit", () => webkit.launch()],
  ["chromium", () => chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" })],
];

const probe = () => {
  const fixed = (e) => { for (let p = e; p; p = p.parentElement) if (getComputedStyle(p).position === "fixed") return true; return false; };
  const out = { hscroll: false, vaza: [], toque: [], espaco: [], titulo: [], campo: [], fonte: [], sobreposto: [] };
  const de = document.documentElement;
  out.hscroll = de.scrollWidth > innerWidth + 1;
  const hidden = (el) => !!el.closest("[aria-hidden='true'], .sr-only, .marquee, .intro, .curtain, [hidden]");
  const visible = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none" && cs.opacity !== "0"; };
  // 1) elementos vazando para a direita
  for (const el of document.querySelectorAll("body *")) {
    if (hidden(el) || !visible(el) || fixed(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.right > innerWidth + 1.5 && r.width < innerWidth * 3 && !el.closest("video, img, svg, picture, .bg-video-wrap, .photo-wrap, [role=slider]")) out.vaza.push(`${el.tagName.toLowerCase()}: ${(el.textContent || "").trim().slice(0, 30)}`);
  }
  // 2) alvos de toque
  const targets = [...document.querySelectorAll("a[href], button, summary, input:not([type=hidden]), select, textarea, [role=slider]")].filter((e) => !hidden(e) && visible(e) && !fixed(e));
  for (const t of targets) {
    const r = t.getBoundingClientRect();
    const isCheck = t.matches("input[type=checkbox]");
    const area = isCheck ? t.closest("label")?.getBoundingClientRect() ?? r : r;
    if (Math.min(area.width, area.height) < 43.5) {
      // link de texto dentro de parágrafo corrido é exceção (WCAG 2.5.8): só conta se estiver sozinho em bloco
      const inline = t.matches("a") && t.closest("p, li") && getComputedStyle(t).display === "inline";
      if (!inline) out.toque.push(`${t.tagName.toLowerCase()} ${Math.round(area.width)}×${Math.round(area.height)}: ${(t.textContent || t.getAttribute("aria-label") || "").trim().slice(0, 28)}`);
    }
  }
  // 3) distância mínima de 8px entre alvos vizinhos
  for (let i = 0; i < targets.length; i++) for (let j = i + 1; j < targets.length; j++) {
    const a = targets[i].getBoundingClientRect(), b = targets[j].getBoundingClientRect();
    if (targets[i].contains(targets[j]) || targets[j].contains(targets[i])) continue;
    const dx = Math.max(0, Math.max(a.left, b.left) - Math.min(a.right, b.right));
    const dy = Math.max(0, Math.max(a.top, b.top) - Math.min(a.bottom, b.bottom));
    const gap = Math.hypot(dx, dy);
    const overlap = a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
    if (overlap && !targets[i].closest("label")?.contains(targets[j])) { out.espaco.push(`sobrepõe: ${(targets[i].textContent || "").trim().slice(0, 18)} / ${(targets[j].textContent || "").trim().slice(0, 18)}`); }
    else if (!overlap && gap < 8 && (dx === 0 || dy === 0) && gap >= 0 && Math.min(a.height, b.height) > 20 && !(targets[i].closest("footer") && targets[j].closest("footer"))) out.espaco.push(`${gap.toFixed(0)}px: ${(targets[i].textContent || "").trim().slice(0, 18)} / ${(targets[j].textContent || "").trim().slice(0, 18)}`);
  }
  // 4) títulos: sem palavra partida e sem estouro
  for (const h of document.querySelectorAll("h1, h2, h3")) {
    if (hidden(h) || !visible(h)) continue;
    if (h.scrollWidth > h.clientWidth + 1) { out.titulo.push("estouro: " + h.textContent.trim().slice(0, 28)); continue; }
    const w = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
    let n, broke = null;
    while ((n = w.nextNode()) && !broke) {
      const re = /S+/g; let m;
      while ((m = re.exec(n.textContent))) {
        const rg = document.createRange(); rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length);
        const rects = [...rg.getClientRects()].filter((r) => r.width > 1);
        const tops = new Set(rects.map((r) => Math.round(r.top / 4)));
        if (tops.size > 1) { broke = m[0]; break; }
      }
    }
    if (broke) out.titulo.push("palavra partida: " + broke);
  }
  // 5) campos ≥16px
  for (const f of document.querySelectorAll("input:not([type=checkbox]):not([type=hidden]), select, textarea")) if (parseFloat(getComputedStyle(f).fontSize) < 16) out.campo.push(f.name || f.id);
  // 6) fontes
  const ok = /^"?(__)?(Fraunces|Figtree|Mrs Saint Delafield)/i;
  for (const el of document.querySelectorAll("body *")) {
    if (!el.childNodes || ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    if (el.closest("svg") && el.tagName.toLowerCase() !== "text") continue;
    const ff = getComputedStyle(el).fontFamily.split(",")[0].trim();
    if (!ok.test(ff)) out.fonte.push(ff);
  }
  // 7) linha fina (borda) atravessando texto: um elemento de texto cujo topo fica acima da borda superior do seu item
  for (const row of document.querySelectorAll(".svc-row, .faq details, ol > li")) {
    const rr = row.getBoundingClientRect();
    for (const t of row.querySelectorAll("h2, h3, .nm")) { const r = t.getBoundingClientRect(); if (r.top < rr.top - 1 && r.height > 0) out.sobreposto.push(`${t.textContent.trim().slice(0, 24)}`); }
  }
  for (const k of Object.keys(out)) if (Array.isArray(out[k])) out[k] = [...new Set(out[k])].slice(0, 6);
  return out;
};

const ITEMS = [["hscroll", "sem rolagem horizontal"], ["vaza", "nada vaza da tela"], ["titulo", "título sem palavra partida/estouro"], ["toque", "alvos de toque ≥ 44px"], ["espaco", "8px entre alvos"], ["campo", "campos ≥ 16px"], ["fonte", "fontes da marca"], ["sobreposto", "texto sem linha por cima"]];
const results = {}; // page -> item -> [falhas]
for (const [eng, launch] of ENGINES) {
  const browser = await launch();
  for (const vp of VIEWPORTS) {
    const opts = eng === "webkit" && vp.w === 390 ? { ...devices["iPhone 14"] } : { viewport: { width: vp.w, height: vp.h }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 };
    const ctx = await browser.newContext(opts);
    const page = await ctx.newPage();
    await page.addInitScript(() => sessionStorage.setItem("jr-intro", "1"));
    for (const p of PAGES) {
      await page.goto(BASE + p, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += 450) { await page.evaluate((yy) => scrollTo(0, yy), y); await page.waitForTimeout(40); }
      await page.evaluate(() => { document.querySelectorAll(".rv,.reveal-photo,.fx").forEach((e) => e.classList.add("is-in")); scrollTo(0, 0); });
      await page.waitForTimeout(1300);
      const r = await page.evaluate(probe);
      results[p] ??= {};
      for (const [k] of ITEMS) {
        const bad = k === "hscroll" ? (r.hscroll ? ["rolagem horizontal"] : []) : r[k];
        results[p][k] ??= [];
        if (bad.length) { results[p][k].push(`${eng} ${vp.name}: ${bad.slice(0, 3).join(" | ")}`); }
      }
    }
    await ctx.close();
  }
  await browser.close();
}
fs.writeFileSync("_qa/auditoria-celular.json", JSON.stringify(results, null, 2));
let md = "| Página | " + ITEMS.map((i) => i[1]).join(" | ") + " |\n|---|" + ITEMS.map(() => "---").join("|") + "|\n";
let totalBad = 0;
for (const p of PAGES) {
  md += `| ${p} | ` + ITEMS.map(([k]) => { const b = results[p][k]; if (b.length) totalBad++; return b.length ? `✗ ${b.length}` : "✓"; }).join(" | ") + " |\n";
}
fs.writeFileSync("_qa/auditoria-celular.md", md);
console.log(md);
console.log("células com falha:", totalBad);
for (const p of PAGES) for (const [k] of ITEMS) if (results[p][k].length) console.log(p, k, "→", results[p][k].slice(0, 2).join(" ;; "));
