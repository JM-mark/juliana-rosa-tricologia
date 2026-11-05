import type { NextConfig } from "next";

// Prévia no GitHub Pages: GITHUB_PAGES=true usa o prefixo /juliana-rosa-tricologia.
// Cloudflare Pages / raiz do domínio: STATIC_EXPORT=true (sem prefixo).
const pages = process.env.GITHUB_PAGES === "true";
const basePath = pages ? "/juliana-rosa-tricologia" : (process.env.NEXT_PUBLIC_BASE_PATH ?? "");

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
