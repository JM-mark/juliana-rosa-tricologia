// O Next exporta os payloads de rota como __next.a/b/__PAGE__.txt, mas o navegador pede __next.a.b.__PAGE__.txt.
// Hospedagens estáticas (GitHub Pages, Cloudflare Pages) não reescrevem. Copiamos para o nome plano.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
let n = 0;

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (!e.isDirectory()) continue;
    if (e.name.startsWith("__next.")) {
      flatten(dir, e.name, full, e.name);
    } else {
      walk(full);
    }
  }
}

function flatten(baseDir, prefix, dir, flatName) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) flatten(baseDir, prefix, full, `${flatName}.${e.name}`);
    else {
      const target = path.join(baseDir, `${flatName}.${e.name}`);
      if (!fs.existsSync(target)) {
        fs.copyFileSync(full, target);
        n++;
      }
    }
  }
}

walk(OUT);
console.log(`postbuild: ${n} payloads de rota copiados para o nome plano`);
