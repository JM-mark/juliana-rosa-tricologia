// Prints de viewport em posições de scroll. Uso: node scripts/shots.mjs <caminho> <largura> <y1,y2,...> [prefixo]
import { chromium } from "playwright-core";
const [, , route = "/", width = "1440", ys = "0", prefix = "shot"] = process.argv;
const BASE = process.env.BASE ?? "http://localhost:5190";
const w = Number(width);
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", args: ["--autoplay-policy=no-user-gesture-required"] });
const page = await browser.newPage({ viewport: { width: w, height: Number(process.env.H) || (w >= 1024 ? 900 : 844) }, isMobile: w < 768, hasTouch: w < 768 });
await page.addInitScript(() => sessionStorage.setItem("jr-intro", "1"));
await page.goto(BASE + route, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(2500);
for (const y of ys.split(",")) {
  await page.evaluate((yy) => (window.__lenis ? window.__lenis.scrollTo(Number(yy), { immediate: true }) : window.scrollTo(0, Number(yy))), y);
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `_qa/${prefix}-${w}-${y}.png` });
}
await browser.close();
