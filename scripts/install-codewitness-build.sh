#!/usr/bin/env bash
# Install the real CodeWitness cockpit build (cw-v3) into public/codewitness-app/
# so the portfolio can iframe it in demo mode.
#
# The cockpit is built with Vite base '/', so every absolute asset reference
# ("/assets/…", "/fonts/…", "/logo-cwt.png") points at the ORIGIN ROOT. Under
# the portfolio those must resolve inside /codewitness-app/, so this script
# rewrites them. Nothing else in the build is touched — the JS is the product's
# own shipped bundle, byte-for-byte apart from those path prefixes.
#
# Usage: scripts/install-codewitness-build.sh [SRC_DIST]
set -euo pipefail

SRC="${1:-/mnt/d/DEV/cw-v3/web/apps/app/dist}"
DEST="$(cd "$(dirname "$0")/.." && pwd)/public/codewitness-app"

[ -f "$SRC/index.html" ] || { echo "no index.html in $SRC" >&2; exit 1; }

echo "→ source: $SRC"
echo "→ dest:   $DEST"

# Keep the demo shim; replace everything else.
SHIM="$(mktemp)"
[ -f "$DEST/cw-demo-api.js" ] && cp "$DEST/cw-demo-api.js" "$SHIM"
rm -rf "$DEST"
mkdir -p "$DEST"
cp -r "$SRC/assets" "$SRC/fonts" "$DEST/"
cp "$SRC/logo-cwt.png" "$DEST/"
[ -s "$SHIM" ] && cp "$SHIM" "$DEST/cw-demo-api.js"
rm -f "$SHIM"

# proto.html is a 570 KB standalone design prototype — not part of the SPA.
rm -f "$DEST/proto.html"

# ── rewrite the origin-root absolute references to the /codewitness-app/ mount ──
python3 - "$DEST" <<'PY'
import pathlib, re, sys
dest = pathlib.Path(sys.argv[1])
MOUNT = '/codewitness-app'
# Vite's preload helper builds every lazy chunk's <link modulepreload> href as
# `base + dep`, where base is the build-time '/' and dep is a bare
# "assets/Chunk-hash.js". The dynamic import() itself resolves relative to the
# importing module, so the app WORKS without this — but every preload link 404s
# at the origin root and floods the console. Repointing that one helper is the
# whole fix. (The pattern is Vite's own emitted `function(x){return"/"+x}`.)
ASSETS_URL = re.compile(r'function\((\w+)\)\{return"/"\+\1\}')
preload_patched = 0
for f in sorted(dest.glob('assets/*')):
    if f.suffix not in {'.js', '.mjs', '.css'}:
        continue
    s = orig = f.read_text(encoding='utf-8')
    s = s.replace('"/assets/', f'"{MOUNT}/assets/').replace("'/assets/", f"'{MOUNT}/assets/")
    s = s.replace('"/logo-cwt.png"', f'"{MOUNT}/logo-cwt.png"')
    s = s.replace('url(/fonts/', f'url({MOUNT}/fonts/')
    s, n = ASSETS_URL.subn(lambda m: 'function(%s){return"%s/"+%s}' % (m.group(1), MOUNT, m.group(1)), s)
    preload_patched += n
    if s != orig:
        f.write_text(s, encoding='utf-8')
if preload_patched != 1:
    sys.exit(f'expected exactly 1 vite assetsURL helper, patched {preload_patched} '
             '— inspect the build before shipping it')
print('   assets rewritten (preload helper patched)')
PY

# ── the HTML shell: mount-relative asset paths + the demo shim first ──
python3 - "$SRC/index.html" "$DEST/app.html" <<'PY'
import re, sys
src, dest = sys.argv[1], sys.argv[2]
html = open(src, encoding='utf-8').read()
html = html.replace('src="/assets/', 'src="/codewitness-app/assets/')
html = html.replace('href="/assets/', 'href="/codewitness-app/assets/')
# The shell ships no <link rel="icon">, so the browser probes /favicon.ico at the
# origin root and logs a 404 inside the frame. Point it at the build's own mark.
html = html.replace(
    '<meta name="viewport"',
    '<link rel="icon" type="image/png" href="/codewitness-app/logo-cwt.png" />\n    <meta name="viewport"',
    1,
)
# The demo shim is a CLASSIC script: it runs to completion before the deferred
# module entry, so fetch() is patched and the route is set before React boots.
html = html.replace(
    '<script type="module"',
    '<script src="/codewitness-app/cw-demo-api.js"></script>\n    <script type="module"',
    1,
)
assert '/codewitness-app/cw-demo-api.js' in html, 'shim injection failed'
assert 'src="/assets/' not in html and 'href="/assets/' not in html, 'unrewritten asset path'
open(dest, 'w', encoding='utf-8').write(html)
print('   app.html written')
PY

echo "→ size: $(du -sh "$DEST" | cut -f1)"
echo "done."
