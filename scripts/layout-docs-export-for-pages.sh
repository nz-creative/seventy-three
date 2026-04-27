#!/usr/bin/env bash
# Two export shapes:
# 1) basePath /docs only (no DOCS_REPO_ROOT): Next emits /docs/* URLs; move all
#    of out/* under out/docs/ so a copy to storybook-static/docs matches /docs/.
# 2) basePath /<repo>/docs (DOCS_REPO_ROOT in CI): Next emits /<repo>/docs/*;
#    files already sit at the right relative paths under out/ — no move.
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
if [[ ! -f "$OUT/index.html" ]]; then
  echo "Missing expected export — run: pnpm --filter @seventythree/docs run build:static" >&2
  exit 1
fi
# Repo-prefixed basePath build: hrefs like /my-repo/docs/_next/...
if grep -qE 'href="/[^/]+/docs/_next' "$OUT/index.html" 2>/dev/null; then
  echo "Flat export (repo basePath); leaving $OUT/ unchanged."
  exit 0
fi
if [[ ! -d "$OUT/tokens" && ! -f "$OUT/404.html" ]]; then
  echo "Missing expected routes under $OUT" >&2
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
