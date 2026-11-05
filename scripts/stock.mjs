// Tratamento único das fotos de atmosfera (Pexels): pretos esverdeados (piso forest), tom quente,
// saturação 0.85 e grão sutil. Algumas em duotone forest + creme.
// Uso: node scripts/stock.mjs  → _qa/prancha/*.jpg
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "_originais/pexels";
const OUT = "_qa/prancha";
fs.mkdirSync(OUT, { recursive: true });
const FOREST = [31, 58, 43];
const CREAM = [244, 236, 227];

// id → { duotone?: boolean, width }
const JOBS = {
  7482357: {}, 7830509: {}, 1302883: { duotone: true }, 28410614: {}, 14255210: { duotone: true },
  3736279: {}, 3736521: {}, 11024139: {}, 9096593: {},
};

function noise(w, h, amp) {
  const buf = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const v = 128 + (Math.random() - 0.5) * 255 * amp * 2;
    buf[i * 4] = buf[i * 4 + 1] = buf[i * 4 + 2] = v;
    buf[i * 4 + 3] = 255;
  }
  return buf;
}

for (const [id, opt] of Object.entries(JOBS)) {
  const file = path.join(SRC, `px-${id}.jpg`);
  if (!fs.existsSync(file)) continue;
  const base = sharp(file).rotate().resize({ width: 1600, withoutEnlargement: true });
  const { data, info } = await base.clone().removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  if (opt.duotone) {
    for (let i = 0; i < w * h; i++) {
      const l = (0.299 * data[i * 3] + 0.587 * data[i * 3 + 1] + 0.114 * data[i * 3 + 2]) / 255;
      const t = Math.min(1, Math.max(0, (l - 0.05) / 0.9));
      for (let c = 0; c < 3; c++) data[i * 3 + c] = FOREST[c] + (CREAM[c] - FOREST[c]) * t;
    }
  }
  let img = sharp(data, { raw: { width: w, height: h, channels: 3 } });
  if (!opt.duotone) {
    img = img.modulate({ saturation: 0.85, brightness: 0.99 }).linear(0.96, 4);
    const forestFloor = await sharp({ create: { width: w, height: h, channels: 3, background: { r: FOREST[0], g: FOREST[1], b: FOREST[2] } } }).png().toBuffer();
    const warm = await sharp({ create: { width: w, height: h, channels: 3, background: { r: 242, g: 217, b: 190 } } }).png().toBuffer();
    img = sharp(await img.png().toBuffer()).composite([
      { input: forestFloor, blend: "lighten" },
      { input: warm, blend: "soft-light" },
    ]);
  }
  const graded = await img.png().toBuffer();
  const grain = await sharp(noise(w, h, 0.05), { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
  await sharp(graded)
    .composite([{ input: grain, blend: "overlay" }])
    .jpeg({ quality: 86 })
    .toFile(path.join(OUT, `${id}${opt.duotone ? "-duotone" : ""}.jpg`));
  console.log("ok", id, opt.duotone ? "duotone" : "");
}
