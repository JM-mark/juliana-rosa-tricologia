// Favicon, ícone do app e imagens de compartilhamento (1200x630) com foto real + monograma.
import sharp from "sharp";
import fs from "node:fs";

const CREAM = { r: 244, g: 236, b: 227 };
fs.mkdirSync("public/og", { recursive: true });

async function icon(size, file) {
  const mark = await sharp("public/brand/jr-marca.png").resize({ width: Math.round(size * 0.66) }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: CREAM } })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toFile(file);
}
await icon(512, "public/icon.png");
await icon(180, "public/apple-icon.png");

async function og(name, photo, crop) {
  const W = 1200, H = 630;
  let p = sharp(`_originais/${photo}`);
  if (crop) p = sharp(await p.extract(crop).toBuffer());
  const right = await p.resize({ width: 560, height: H, fit: "cover", position: "attention" }).toBuffer();
  const logo = await sharp("public/brand/jr-logo-completa.png").resize({ width: 380 }).toBuffer();
  await sharp({ create: { width: W, height: H, channels: 4, background: CREAM } })
    .composite([
      { input: right, left: W - 560, top: 0 },
      { input: logo, left: 110, top: 150 },
    ])
    .png()
    .toFile(`public/og/${name}.png`);
}
await og("default", "jr-src-A-retrato.jpg", null);
await og("home", "jr-src-A-retrato.jpg", null);
await og("tricologia", "jr-src-E-retrato-blazer.jpg", { left: 0, top: 0, width: 1350, height: 1200 });
await og("micropigmentacao", "jr-src-B-fio-a-fio.jpg", { left: 0, top: 0, width: 1080, height: 940 });
await og("design", "jr-src-B-fio-a-fio.jpg", { left: 0, top: 0, width: 1080, height: 940 });
await og("reconstrucao", "jr-src-E-retrato-blazer.jpg", { left: 0, top: 0, width: 1350, height: 1200 });
await og("despigmentacao", "jr-src-B-fio-a-fio.jpg", { left: 0, top: 0, width: 1080, height: 940 });
await og("laser", "jr-src-A-retrato.jpg", null);
console.log("ok");
