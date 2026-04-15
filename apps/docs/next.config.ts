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

const nextConfig: NextConfig = {
  ...(pagesStaticExport
    ? { output: "export" as const, trailingSlash: true }
    : {}),
  ...(pagesBasePath ? { basePath: pagesBasePath } : {}),
  transpilePackages: ["@seventythree/ui"],
};

export default nextConfig;
