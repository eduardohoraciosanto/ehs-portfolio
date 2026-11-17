#!/usr/bin/env bash
# Verify no page of the built PDF has text clipped by the bottom margin.
# Pages are fixed-height with overflow:hidden, so overflow shows up as ink
# painted below the 24pt bottom padding instead of as extra pages.
set -euo pipefail
cd "$(dirname "$0")/.."

PDF="assets/CV-EHS.pdf"
MEASURE="$HOME/.openclaw/workspace/scripts/pdf-measure.swift"
BOTTOM=24
PAGES=$(grep -c '<div class="page">' cv/CV-EHS.html)

[ -f "$PDF" ] || { echo "build first: ./cv/build.sh" >&2; exit 1; }

fail=0
for p in $(seq 1 "$PAGES"); do
  out=$(swift "$MEASURE" "$PDF" "$p" 2>/dev/null)
  clipped=$(echo "$out" | awk -v b="$BOTTOM" '$2+0 < b && /ytop/' | wc -l | tr -d ' ')
  last=$(echo "$out" | tail -1 | awk '{print $2}' | tr -d 'ytop=')
  if [ "$clipped" -gt 0 ]; then
    echo "page $p: OVERFLOW - $clipped line(s) clipped below the ${BOTTOM}pt bottom margin"
    fail=1
  else
    echo "page $p: ok (last ink ${last}pt above the page edge)"
  fi
done

[ "$fail" -eq 0 ] || { echo "trim copy or spacing and rebuild"; exit 1; }
echo "all $PAGES pages fit"
