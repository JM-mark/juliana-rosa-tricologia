// Gera public/photos/*.webp (largura nativa até 1600 + 800) e src/content/photo-data.ts (dimensões + LQIP).
// Só recortes (sem retoque). Fontes em _originais/ (não versionadas).
import sharp from "sharp";
import fs from "node:fs";

const SRC = "_originais/";
const jobs = [
  // nome, arquivo, recorte {left, top, width, height}
  ["juliana-retrato", "jr-src-A-retrato.jpg", null],
  ["juliana-blazer", "jr-src-E-retrato-blazer.jpg", { left: 0, top: 0, width: 1350, height: 1200 }],
  ["fio-a-fio-resultado", "jr-src-B-fio-a-fio.jpg", { left: 0, top: 0, width: 1080, height: 940 }],
  ["resultado-avulso", "jr-src-C-resultado.jpg", null],
  ["micro-no-dia", "jr-src-D-antes-depois.jpg", { left: 0, top: 170, width: 1350, height: 470 }],
  ["micro-um-ano", "jr-src-D-antes-depois.jpg", { left: 0, top: 1030, width: 1350, height: 470 }],
];

fs.mkdirSync("public/photos", { recursive: true });
const data = {};
for (const [name, file, crop] of jobs) {
  let img = sharp(SRC + file);
  if (crop) img = sharp(await img.extract(crop).toBuffer());
  const meta = await img.metadata();
  const out = (w) => img.clone().resize({ width: Math.min(w, meta.width), withoutEnlargement: true }).webp({ quality: 82 });
  await out(1600).toFile(`public/photos/${name}-lg.webp`);
  await out(800).toFile(`public/photos/${name}-sm.webp`);
  const lq = await img.clone().resize(24).webp({ quality: 40 }).toBuffer();
  data[name] = { w: meta.width, h: meta.height, lqip: "data:image/webp;base64," + lq.toString("base64") };
  console.log(name, meta.width + "x" + meta.height);
}
fs.writeFileSync(
  "src/content/photo-data.ts",
  "// Gerado por scripts/photos.mjs. Não editar à mão.\nexport const photoData = " + JSON.stringify(data, null, 2) + " as const;\n",
);
