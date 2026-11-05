// Servidor estático simples para conferir o export (out/). Uso: node scripts/serve.mjs [pasta] [porta] [prefixo]
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? 5190);
const prefix = process.argv[4] ?? "";
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".webp": "image/webp", ".json": "application/json", ".svg": "image/svg+xml", ".txt": "text/plain", ".xml": "application/xml", ".webmanifest": "application/manifest+json", ".woff2": "font/woff2" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (prefix && p.startsWith(prefix)) p = p.slice(prefix.length) || "/";
  let f = path.join(root, p);
  if (!f.startsWith(root)) { res.statusCode = 403; return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) { f = path.join(root, "404.html"); res.statusCode = 404; }
  res.setHeader("content-type", types[path.extname(f)] ?? "application/octet-stream");
  fs.createReadStream(f).pipe(res);
}).listen(port, () => console.log("http://localhost:" + port));
