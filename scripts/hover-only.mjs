// Move toda regra com :hover para dentro de @media (hover: hover) and (pointer: fine).
// No toque, só :active e :focus-visible. Roda uma vez (idempotente: ignora linhas já dentro do bloco).
import fs from "node:fs";
const f = "src/app/globals.css";
const lines = fs.readFileSync(f, "utf8").split("\n");
const keep = [];
const media = [];
for (const line of lines) {
  const m = line.match(/^([^{}@]*:hover[^{}]*)\{(.*)\}\s*$/);
  if (!m) { keep.push(line); continue; }
  const sels = m[1].split(",").map((s) => s.trim());
  const hov = sels.filter((s) => s.includes(":hover"));
  const rest = sels.filter((s) => !s.includes(":hover"));
  if (rest.length) keep.push(`${rest.join(", ")} {${m[2]}}`);
  media.push(`  ${hov.join(", ")} {${m[2]}}`);
}
const marker = "/* ===== Hover só com mouse ===== */";
let out = keep.join("\n").replace(new RegExp(marker + "[\s\S]*$"), "").trimEnd();
if (media.length) out += `\n\n${marker}\n@media (hover: hover) and (pointer: fine) {\n${media.join("\n")}\n}\n`;
fs.writeFileSync(f, out);
console.log(media.length, "regras de hover movidas");
