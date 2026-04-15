#!/usr/bin/env bash
# Next static export with basePath /docs writes routes to out/<route>/index.html while
# asset links use /docs/... — move everything under out/docs/ for GitHub Pages.
set -euo pipefail
OUT="${1:-apps/docs/out}"
if [[ ! -d "$OUT" ]]; then
  echo "Missing $OUT" >&2
  exit 1
fi
if [[ -f "$OUT/docs/index.html" ]]; then
  echo "Already laid out: $OUT/docs/"
  exit 0
fi
if [[ ! -f "$OUT/index.html" && ! -d "$OUT/tokens" ]]; then
  echo "Missing expected export — run: pnpm --filter @seventythree/docs build:static" >&2
  exit 1
fi
mkdir -p "$OUT/docs"
shopt -s dotglob
for item in "$OUT"/*; do
  [[ -e "$item" ]] || continue
  base=$(basename "$item")
  if [[ "$base" == "docs" ]]; then
    continue
  fi
  mv "$item" "$OUT/docs/"
done
echo "Laid out static docs under $OUT/docs/"
