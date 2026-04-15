# Seventy-Three

A **code-first** personal design system: semantic CSS variables, a **Tailwind preset** (shadcn-aligned), and **React** components built with **Radix** and **CVA**.

## Packages

| Package | Description |
|--------|-------------|
| [`@seventythree/tokens`](./packages/tokens) | `primitives.css` (palette, font stacks, space, type, shadow, radius), optional `webfonts.css` (Google CDN), `seventythree.css` (semantic colors) — light/dark via `.dark`. Next.js apps should use `next/font` instead of `webfonts.css`. |
| [`@seventythree/ui`](./packages/ui) | Components, `cn()`, and `tailwind-preset` export |

## Apps

- **`apps/storybook`** — component development and a11y addon
- **`apps/docs`** — Next.js site with **Overview**, **Installation**, **Tokens** (primitives + semantics + swatches), and **Typography**

## Development

```bash
pnpm install
pnpm build
pnpm storybook   # http://localhost:6006
pnpm --filter @seventythree/docs dev
```

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

The Storybook Vite `base` is set in CI via `STORYBOOK_BASE_PATH` (defaults to `/<repository name>/`). For a local static build that mimics Pages, run:

```bash
STORYBOOK_BASE_PATH=/seventy-three/ pnpm build-storybook
```

## Publishing

Uses [Changesets](https://github.com/changesets/changesets). From the repo root:

```bash
pnpm changeset
pnpm changeset version
pnpm publish -r
```

Replace the `repository` URLs in each `package.json` with your Git remote before publishing.
