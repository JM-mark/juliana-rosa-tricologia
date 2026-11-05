// Codifica os vídeos e fotos de atmosfera para public/. Usa ffmpeg-static (dependência do projeto).
// Hero: render próprio (_qa/hero/hero-b-fios-desenhados.mp4). Folhagem: Pexels 4826946 com tratamento de cor.
import ffmpeg from "ffmpeg-static";
import sharp from "sharp";
import fs from "node:fs";
import { spawnSync } from "node:child_process";

fs.mkdirSync("public/video", { recursive: true });
fs.mkdirSync("public/atmos", { recursive: true });
const run = (args) => {
  const r = spawnSync(ffmpeg, ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });
  if (r.status !== 0) throw new Error("ffmpeg falhou: " + args.join(" "));
};
const mb = (f) => (fs.statSync(f).size / 1e6).toFixed(1) + " MB";

// ---- Hero (fios desenhados) ----
const H = "_qa/hero/hero-b-fios-desenhados.mp4";
run(["-i", H, "-an", "-c:v", "libx264", "-crf", "23", "-maxrate", "5M", "-bufsize", "10M", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "public/video/hero.mp4"]);
run(["-i", H, "-an", "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-row-mt", "1", "public/video/hero.webm"]);
run(["-i", H, "-an", "-vf", "scale=960:540", "-c:v", "libx264", "-crf", "27", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "public/video/hero-m.mp4"]);
run(["-ss", "6.5", "-i", H, "-frames:v", "1", "_qa/hero/poster-hero.png"]);
await sharp("_qa/hero/poster-hero.png").webp({ quality: 78 }).toFile("public/video/hero-poster.webp");

// ---- Folhagem ao sol (Sobre e CTA) com tratamento da marca ----
const L = "_originais/pexels/v-4826946.mp4";
const grade =
  "eq=saturation=0.8:contrast=1.04:brightness=-0.04,curves=r='0/0.12 1/1':g='0/0.23 1/1':b='0/0.17 1/0.97',colorbalance=rm=0.05:bm=-0.05,noise=alls=3:allf=t,format=yuv420p";
run(["-ss", "6", "-t", "12", "-i", L, "-an", "-vf", grade, "-c:v", "libx264", "-crf", "27", "-preset", "slow", "-movflags", "+faststart", "public/video/folhagem.mp4"]);
run(["-ss", "6", "-t", "12", "-i", L, "-an", "-vf", grade, "-c:v", "libvpx-vp9", "-crf", "40", "-b:v", "0", "-row-mt", "1", "public/video/folhagem.webm"]);
run(["-ss", "9", "-i", L, "-vf", grade.replace(",format=yuv420p", ""), "-frames:v", "1", "_qa/hero/poster-folhagem.png"]);
await sharp("_qa/hero/poster-folhagem.png").webp({ quality: 76 }).toFile("public/video/folhagem-poster.webp");

for (const f of fs.readdirSync("public/video")) console.log(f, mb("public/video/" + f));

// ---- Fotos de atmosfera tratadas (de _qa/prancha) ----
const MAP = { 7482357: "cabelo-macro", 7830509: "cabelo-dourado", 9096593: "escova", 28410614: "folha", "1302883-duotone": "samambaia", "14255210-duotone": "folhas", 3736279: "clinica-clara", 3736521: "equipamento", 11024139: "sala", 7750114: "salao-claro" };
for (const [id, name] of Object.entries(MAP)) {
  const src = `_qa/prancha/${id}.jpg`;
  if (!fs.existsSync(src)) continue;
  await sharp(src).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 72 }).toFile(`public/atmos/${name}.webp`);
  await sharp(src).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 74 }).toFile(`public/atmos/${name}-sm.webp`);
}
console.log(fs.readdirSync("public/atmos").length, "arquivos em public/atmos");
