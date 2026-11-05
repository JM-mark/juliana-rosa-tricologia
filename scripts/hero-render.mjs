// Renderiza o vídeo próprio do hero (10s, 30fps, 1920×1080) com Playwright + ffmpeg-static.
// Uso: node scripts/hero-render.mjs [frames=300]
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import ffmpeg from "ffmpeg-static";

const FPS = 30, DUR = 10;
const total = Number(process.argv[2] ?? FPS * DUR);
const dir = "_qa/hero/frames";
fs.rmSync(dir, { recursive: true, force: true });
fs.mkdirSync(dir, { recursive: true });

const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("file:///" + path.resolve("scripts/hero-render.html").replace(/\\/g, "/"));
await page.waitForFunction(() => window.__ready);
const canvas = await page.$("#c");
for (let f = 0; f < total; f++) {
  await page.evaluate((t) => window.renderFrame(t), f / FPS);
  await canvas.screenshot({ path: `${dir}/${String(f).padStart(4, "0")}.jpg`, type: "jpeg", quality: 92 });
  if (f % 50 === 0) console.log("frame", f, "/", total);
}
await browser.close();

const out = "_qa/hero/hero-b-fios-desenhados.mp4";
const r = spawnSync(ffmpeg, ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", `${dir}/%04d.jpg`, "-c:v", "libx264", "-crf", "22", "-maxrate", "5M", "-bufsize", "10M", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out], { stdio: "inherit" });
console.log(r.status === 0 ? `ok ${out} (${(fs.statSync(out).size / 1e6).toFixed(1)} MB)` : "falhou");
