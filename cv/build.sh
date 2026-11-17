#!/usr/bin/env bash
# Rebuild assets/CV-EHS.pdf from cv/CV-EHS.html.
# Needs a headless Chrome and the Avenir Next system font (macOS).
set -euo pipefail

cd "$(dirname "$0")/.."
SRC="cv/CV-EHS.html"
OUT="assets/CV-EHS.pdf"

CHROME="${CHROME:-}"
if [ -z "$CHROME" ]; then
  for c in \
    "$HOME"/.cache/puppeteer/chrome-headless-shell/*/chrome-headless-shell-*/chrome-headless-shell \
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; do
    [ -x "$c" ] && CHROME="$c" && break
  done
fi
[ -n "$CHROME" ] || { echo "no chrome found; set CHROME=/path/to/chrome" >&2; exit 1; }

"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUT" "file://$PWD/$SRC" 2>/dev/null

echo "wrote $OUT"
