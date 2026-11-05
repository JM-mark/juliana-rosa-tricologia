// Prints dos 4 problemas do celular no WebKit (iPhone 14, 390px) e teste do vídeo.
// Uso: node scripts/mobile-shots.mjs <antes|depois> [url]
import { webkit, devices } from "playwright-core";
import fs from "node:fs";

const tag = process.argv[2] ?? "antes";
const BASE = (process.argv[3] ?? "http://localhost:5190").replace(/\/$/, "");
fs.mkdirSync("_qa/celular", { recursive: true });
const browser = await webkit.launch();
const ctx = await browser.newContext({ ...devices["iPhone 14"] });
const page = await ctx.newPage();
await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.waitForTimeout(3500); // intro termina

// 1. Vídeo do hero
const vid = await page.evaluate(async () => {
  const v = document.querySelector("video");
  if (!v) return null;
  await new Promise((r) => setTimeout(r, 1500));
  const cs = getComputedStyle(v);
  return { muted: v.muted, mutedAttr: v.hasAttribute("muted"), playsinline: v.hasAttribute("playsinline"), src: v.currentSrc.split("/").pop(), paused: v.paused, t: v.currentTime, readyState: v.readyState, display: cs.display };
});
console.log("video:", JSON.stringify(vid));
await page.screenshot({ path: `_qa/celular/1-hero-${tag}.png` });

// 2. Menu
await page.getByRole("button", { name: /abrir menu/i }).tap();
await page.waitForTimeout(1400);
await page.screenshot({ path: `_qa/celular/2-menu-${tag}.png` });
const menu = await page.evaluate(() => {
  const links = [...document.querySelectorAll("[role=dialog][aria-label=Menu] a")].filter((a) => a.getBoundingClientRect().height > 0);
  const root = links[0]?.closest("div");
  const r = root?.getBoundingClientRect();
  return { links: links.length, panel: r ? [Math.round(r.top), Math.round(r.height)] : null, innerH: innerHeight, covers: r ? r.height >= innerHeight - 4 : false };
});
console.log("menu:", JSON.stringify(menu));
await page.keyboard.press("Escape");
await page.getByRole("button", { name: /fechar menu/i }).tap().catch(() => {});
await page.waitForTimeout(600);

// 3. Lista de serviços (toque deixa o hover grudado?)
await page.evaluate(() => document.querySelector(".svc-row").scrollIntoView({ block: "start" }));
await page.waitForTimeout(1200);
const rows = await page.$$(".svc-row");
await rows[2]?.hover().catch(() => {}); // no toque o :hover fica grudado no último item tocado
await page.waitForTimeout(700);
await page.screenshot({ path: `_qa/celular/3-lista-${tag}.png` });
await browser.close();
