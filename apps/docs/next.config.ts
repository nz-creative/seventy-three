import type { NextConfig } from "next";

/**
 * Static export + /docs basePath are for `next build` (GitHub Pages) only.
 * If we apply them during `next dev`, routes break (e.g. /tokens 500s) or move
 * under /docs — so gate on NODE_ENV === "production" (set by next build/start).
 */
const pagesStaticExport =
  process.env.DOCS_STATIC_EXPORT === "1" &&
  process.env.NODE_ENV === "production";

function normalizeRepoRoot(raw: string): string {
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withSlash.replace(/\/+$/, "") || "";
}

/**
 * GitHub **project** Pages serves this app at `/<repo>/docs/...`.
 *
 * If we only set `basePath: /docs`, Next emits `href="/docs/tokens"` — the browser
 * resolves that to `github.io/docs/tokens` (wrong). Use `/<repo>/docs` as
 * `basePath` in CI so links and `_next` assets are `/<repo>/docs/...`.
 *
 * Locally (no `DOCS_REPO_ROOT`), keep `basePath` from `DOCS_BASE_PATH` (default
 * `/docs`) so the layout script still nests files under `out/docs/`.
 */
const pagesBasePath = (() => {
  if (!pagesStaticExport) return undefined;
  const repoRaw = process.env.DOCS_REPO_ROOT?.trim();
  if (repoRaw) {
    const repo = normalizeRepoRoot(repoRaw);
    if (repo) return `${repo}/docs`;
  }
  const fromEnv = process.env.DOCS_BASE_PATH?.trim();
  if (fromEnv) return fromEnv.startsWith("/") ? fromEnv : `/${fromEnv}`;
  return "/docs";
})();

const nextConfig: NextConfig = {
  ...(pagesStaticExport
    ? { output: "export" as const, trailingSlash: true }
    : {}),
  ...(pagesBasePath ? { basePath: pagesBasePath } : {}),
  transpilePackages: ["@seventythree/ui"],
};

export default nextConfig;
