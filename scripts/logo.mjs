// Extrai o monograma JR (versão de prévia) do post do Instagram, removendo o fundo creme.
// Substituir pelo vetor original da cliente assim que ela enviar.
import sharp from "sharp";
const BG = [235, 226, 215];
async function cut(name, region, scale, outWidth) {
  const { data, info } = await sharp("_originais/jr-src-logo-post.jpg")
    .extract(region).resize({ width: region.width * scale, kernel: "lanczos3" }).raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
    const d = Math.max(Math.abs(r - BG[0]), Math.abs(g - BG[1]), Math.abs(b - BG[2]));
    const a = Math.max(0, Math.min(255, (d - 6) * 5));
    out[i * 4] = r; out[i * 4 + 1] = g; out[i * 4 + 2] = b; out[i * 4 + 3] = a;
  }
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).trim().resize({ width: outWidth, kernel: "lanczos3" }).png({ palette: true, quality: 82, effort: 8 }).toFile(`public/brand/${name}.png`);
  const m = await sharp(`public/brand/${name}.png`).metadata();
  console.log(name, m.width, m.height);
}
await import("node:fs").then((fs) => fs.mkdirSync("public/brand", { recursive: true }));
await cut("jr-marca", { left: 466, top: 104, width: 150, height: 76 }, 5, 280);
await cut("jr-logo-completa", { left: 466, top: 104, width: 150, height: 106 }, 5, 440);
