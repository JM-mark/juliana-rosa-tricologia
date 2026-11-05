// Renderiza quadros avulsos do vídeo do hero para inspeção. Uso: node scripts/hero-frame.mjs 3.2 6.5
import { chromium } from "playwright-core";
import path from "node:path";

const times = process.argv.slice(2).map(Number);
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("file:///" + path.resolve("scripts/hero-render.html").replace(/\\/g, "/"));
await page.waitForFunction(() => window.__ready);
const canvas = await page.$("#c");
for (const t of times) {
  await page.evaluate((x) => window.renderFrame(x), t);
  await canvas.screenshot({ path: `_qa/hero/b-teste-${t}.jpg`, type: "jpeg", quality: 88 });
}
await browser.close();
