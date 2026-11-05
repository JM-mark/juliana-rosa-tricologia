// Vídeo rolando a Home (intro, hero, vitrine fixa, lente, antes e depois, folículos, lista com hover).
// Captura quadros com Playwright (ritmo controlado) e monta o MP4 com ffmpeg-static. Uso: node scripts/video.mjs [url]
import { chromium } from "playwright-core";
import fs from "node:fs";
import { spawnSync } from "node:child_process";
import ffmpeg from "ffmpeg-static";

const BASE = (process.argv[2] ?? "http://localhost:5190").replace(/\/$/, "");
const FPS = 15;
const VARIANTS = [
  { name: "desktop", w: 1440, h: 900, secs: 30, mobile: false },
  { name: "celular", w: 390, h: 844, secs: 20, mobile: true },
];
fs.mkdirSync("_qa/video", { recursive: true });

const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", args: ["--autoplay-policy=no-user-gesture-required"] });
for (const v of VARIANTS) {
  const dir = `_qa/video/frames-${v.name}`;
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: v.w, height: v.h }, isMobile: v.mobile, hasTouch: v.mobile, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const total = v.secs * FPS;
  let n = 0;
  const shot = async () => { await page.screenshot({ path: `${dir}/${String(n++).padStart(4, "0")}.jpg`, type: "jpeg", quality: 88 }); };
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" }); // intro roda (sessão nova)
  const introFrames = Math.round(2.6 * FPS);
  for (let i = 0; i < introFrames; i++) await shot();
  await page.waitForTimeout(600);
  const maxY = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const scrollFrames = total - n;
  for (let i = 0; i < scrollFrames; i++) {
    const t = i / (scrollFrames - 1);
    const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // ease-in-out
    await page.evaluate((y) => (window.__lenis ? window.__lenis.scrollTo(y, { immediate: true }) : window.scrollTo(0, y)), maxY * (0.02 + 0.96 * e));
    await shot();
    if (n % 90 === 0) console.log(v.name, n, "/", total);
  }
  await ctx.close();
  const out = `_qa/video/home-${v.name}.mp4`;
  const r = spawnSync(ffmpeg, ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", `${dir}/%04d.jpg`, "-c:v", "libx264", "-crf", "23", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out], { stdio: "inherit" });
  console.log(r.status === 0 ? `ok ${out} (${(fs.statSync(out).size / 1e6).toFixed(1)} MB)` : "falhou " + out);
}
await browser.close();
