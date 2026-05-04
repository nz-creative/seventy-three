# Seventy-Three

A **code-first** personal design system: semantic CSS variables, a **Tailwind preset** (shadcn-aligned), and **React** components built with **Radix** and **CVA**.

## Packages

| Package | Description |
|--------|-------------|
| [`@seventythree/tokens`](./packages/tokens) | `primitives.css` (palette, font stacks, space, type, shadow, radius), optional `webfonts.css` (Google CDN), `seventythree.css` (semantic colors) — light/dark via `.dark`. Next.js apps should use `next/font` instead of `webfonts.css`. |
| [`@seventythree/ui`](./packages/ui) | Components, `cn()`, and `tailwind-preset` export |

## Apps

- **`apps/storybook`** — component development and a11y addon
- **`apps/docs`** — Next.js site with **Overview**, **Installation**, **Tokens**, **Typography**, **Components** (links to Storybook)

## Development

```bash
pnpm install
pnpm build
pnpm test        # Vitest (e.g. `cn()` in @seventythree/ui)
pnpm generate:type-scale   # Regenerate type scale in primitives.css (see scripts/generate-type-scale.mjs)
pnpm check:type-scale      # Fail if primitives.css drifts from generator (CI runs this)
pnpm storybook   # http://localhost:6006
pnpm --filter @seventythree/docs dev
```

### Type scale (modular)

Canonical ratio lives in **`scripts/type-scale.config.json`** (`ratio`, default `1.25`). **`pnpm generate:type-scale`** reads that file and rewrites the block between `TYPE-SCALE-BLOCK:START/END` in `packages/tokens/src/themes/primitives.css`. Override for one run with **`pnpm generate:type-scale --ratio 1.2`**. Then `pnpm --filter @seventythree/tokens build` (or `pnpm build`) so `dist/` matches.

**`pnpm check:type-scale`** (also in CI) verifies `primitives.css` matches the generator using **the config ratio** unless you pass **`--ratio`** on the check command.

Production docs builds set **`NEXT_PUBLIC_STORYBOOK_URL`** in [deploy-site.yml](./.github/workflows/deploy-site.yml) so the Components page links to Storybook on GitHub Pages.

## GitHub Pages

After you enable **GitHub Pages** (**Settings → Pages → Build and deployment: GitHub Actions**), pushes to `main` run [`.github/workflows/deploy-site.yml`](./.github/workflows/deploy-site.yml) and publish the combined static site.

### Published URLs

For a **project** site (repo `seventy-three` under an org or user), the base is:

`https://<owner>.github.io/<repo>/`

| Path | What loads |
|------|----------------|
| `/` | Storybook (components, a11y) |
| `/docs/` | Next.js docs — overview, installation, **tokens**, typography |
| `/docs/tokens/` | Tokens reference (not `/tokens` at the root; that path is not part of the Storybook bundle) |

Example: `https://<owner>.github.io/seventy-three/docs/tokens/`

### If the URL shows an error or 404

1. Open **Actions** → **Deploy site to GitHub Pages** and confirm the latest run is **green**. Red runs mean nothing was published (open the failed job log).
2. Under **Settings → Pages**, ensure **Source** is **GitHub Actions** and wait a minute after a green deploy for the CDN to update.
3. Storybook lives at the **repo root** `/`, not under `/docs/`. Use **`/docs/`** for the Next.js documentation site.

The Storybook Vite `base` is set in CI via `STORYBOOK_BASE_PATH` (defaults to `/<repository name>/`). The docs static export sets **`DOCS_REPO_ROOT`** so Next uses **`basePath: /<repo>/docs`**, which makes **`href`** and **`_next`** URLs **`/<repo>/docs/...`** on disk and in HTML. Without that, `basePath: /docs` alone produces **`/docs/...`** links, which the browser resolves to **`github.io/docs/...`** instead of **`github.io/<repo>/docs/...`** (broken nav and missing CSS).

Local mimic of a project Pages build:

```bash
STORYBOOK_BASE_PATH=/seventy-three/ pnpm build-storybook
DOCS_REPO_ROOT=/seventy-three pnpm --filter @seventythree/docs run build:static
```

## Publishing

Uses [Changesets](https://github.com/changesets/changesets). From the repo root:

```bash
pnpm changeset
pnpm changeset version
pnpm publish -r
```

Replace the `repository` URLs in each `package.json` with your Git remote before publishing.
