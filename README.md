# Seventy-Three

A **code-first** personal design system: semantic CSS variables, a **Tailwind preset** (shadcn-aligned), and **React** components built with **Radix** and **CVA**.

## Packages

| Package | Description |
|--------|-------------|
| [`@seventythree/tokens`](./packages/tokens) | Theme CSS (`seventythree.css`) — light/dark via `.dark` |
| [`@seventythree/ui`](./packages/ui) | Components, `cn()`, and `tailwind-preset` export |

## Apps

- **`apps/storybook`** — component development and a11y addon
- **`apps/docs`** — Next.js marketing / getting-started surface

## Development

```bash
pnpm install
pnpm build
pnpm storybook   # http://localhost:6006
pnpm --filter @seventythree/docs dev
```

## Publishing

Uses [Changesets](https://github.com/changesets/changesets). From the repo root:

```bash
pnpm changeset
pnpm changeset version
pnpm publish -r
```

Replace the `repository` URLs in each `package.json` with your Git remote before publishing.
