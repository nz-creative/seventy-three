# Seventy-Three

A **code-first** personal design system: semantic CSS variables, a **Tailwind preset** (shadcn-aligned), and **React** components built with **Radix** and **CVA**.

## Packages

| Package | Description |
|--------|-------------|
| [`@seventythree/tokens`](./packages/tokens) | Theme CSS (`seventythree.css`) — light/dark via `.dark` |
| [`@seventythree/ui`](./packages/ui) | Components, `cn()`, and `tailwind-preset` export |

## Apps

- **`apps/storybook`** — component development and a11y addon
- **`apps/docs`** — Next.js site with **Overview**, **Installation**, **Tokens** (semantic palette + swatches), and **Typography** (DM Sans defaults)

## Development

```bash
pnpm install
pnpm build
pnpm storybook   # http://localhost:6006
pnpm --filter @seventythree/docs dev
```

## Storybook on GitHub Pages

After you enable **GitHub Pages** for this repository (**Settings → Pages → Build and deployment: GitHub Actions**), pushes to `main` run [`.github/workflows/deploy-storybook.yml`](./.github/workflows/deploy-storybook.yml) and publish static Storybook.

The live URL for a project site is:

`https://<owner>.github.io/<repo>/`

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
