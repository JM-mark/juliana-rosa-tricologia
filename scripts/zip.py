import os, zipfile
src, dst = "out", "juliana-rosa-cloudflare.zip"
if os.path.exists(dst): os.remove(dst)
with zipfile.ZipFile(dst, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for root, _, files in os.walk(src):
        for f in files:
            p = os.path.join(root, f)
            z.write(p, os.path.relpath(p, src).replace(os.sep, "/"))
z = zipfile.ZipFile(dst)
n = z.namelist()
print(len(n), "arquivos;", "barras invertidas:", sum("\\" in x for x in n), ";", "index.html na raiz:", "index.html" in n, ";", "_headers:", "_headers" in n)
