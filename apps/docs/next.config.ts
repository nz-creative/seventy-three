import type { NextConfig } from "next";

/**
 * Static export + /docs basePath are for `next build` (GitHub Pages) only.
 * If we apply them during `next dev`, routes break (e.g. /tokens 500s) or move
 * under /docs — so gate on NODE_ENV === "production" (set by next build/start).
 */
const pagesStaticExport =
  process.env.DOCS_STATIC_EXPORT === "1" &&
  process.env.NODE_ENV === "production";
const pagesBasePath =
  pagesStaticExport && process.env.DOCS_BASE_PATH?.trim()
    ? process.env.DOCS_BASE_PATH.trim()
    : undefined;

/**
 * GitHub **project** Pages serves the docs app under `/<repo>/docs/...`.
 * `basePath: /docs` makes Next emit `/docs/_next/...`, which the browser resolves
 * to the wrong path unless we also set `assetPrefix` to `/<repo>/docs` so
 * assets load from `/<repo>/docs/_next/...` (matches `out/docs/_next/` after layout).
 * Set `DOCS_REPO_ROOT` in CI to `/${{ github.event.repository.name }}` (e.g. `/seventy-three`).
 */
const pagesAssetPrefix = (() => {
  if (!pagesStaticExport || !pagesBasePath) return undefined;
  const raw = process.env.DOCS_REPO_ROOT?.trim();
  if (!raw) return undefined;
  const repo = (raw.startsWith("/") ? raw : `/${raw}`).replace(/\/+$/, "");
  if (!repo) return undefined;
  const base = pagesBasePath.startsWith("/")
    ? pagesBasePath
    : `/${pagesBasePath}`;
  return `${repo}${base.replace(/\/+$/, "")}` || undefined;
})();

const nextConfig: NextConfig = {
  ...(pagesStaticExport
    ? { output: "export" as const, trailingSlash: true }
    : {}),
  ...(pagesBasePath ? { basePath: pagesBasePath } : {}),
  ...(pagesAssetPrefix ? { assetPrefix: pagesAssetPrefix } : {}),
  transpilePackages: ["@seventythree/ui"],
};

export default nextConfig;
