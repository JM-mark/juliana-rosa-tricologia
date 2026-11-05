import fs from "node:fs";
for (const f of fs.readdirSync("_qa/lh").filter((x) => x.endsWith(".json"))) {
  const j = JSON.parse(fs.readFileSync("_qa/lh/" + f, "utf8"));
  const s = (k) => Math.round((j.categories[k]?.score ?? 0) * 100);
  const a = j.audits;
  const v = (k) => a[k]?.displayValue ?? "-";
  console.log(f.replace(".json", ""), `| Perf ${s("performance")} | A11y ${s("accessibility")} | BP ${s("best-practices")} | SEO ${s("seo")} | LCP ${v("largest-contentful-paint")} | TBT ${v("total-blocking-time")} | CLS ${v("cumulative-layout-shift")} | FCP ${v("first-contentful-paint")}`);
  const fails = Object.values(a).filter((x) => x.score !== null && x.score < 0.9 && x.scoreDisplayMode !== "informative" && x.scoreDisplayMode !== "notApplicable" && ["accessibility","best-practices","seo"].some((c) => j.categories[c].auditRefs.some((r) => r.id === x.id)));
  fails.forEach((x) => console.log("   ✗", x.id, "-", x.title.slice(0, 80), x.details?.items?.slice(0, 2).map((i) => (i.node?.snippet ?? i.url ?? "").slice(0, 80)).join(" ; ")));
}
