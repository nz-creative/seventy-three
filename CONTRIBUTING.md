# Contributing

## Setup

```bash
pnpm install
pnpm exec turbo run build lint typecheck test
```

## Type scale (`primitives.css`)

Modular `--text-*` / `--leading-*` values are **generated**, not hand-edited.

1. Set the ratio in **`scripts/type-scale.config.json`** (default `1.25`).
2. Run **`pnpm generate:type-scale`** (optional override: **`pnpm generate:type-scale --ratio 1.2`**).
3. Commit **`packages/tokens/src/themes/primitives.css`**.
4. **`pnpm check:type-scale`** must pass in CI — it asserts the file matches the generator for the configured ratio.

If you only tweak **`type-scale.config.json`**, regenerate before opening a PR.

## Packages

- **`@seventythree/ui`** — React components; build with **`pnpm --filter @seventythree/ui build`**.
- **`@seventythree/tokens`** — CSS themes; **`pnpm --filter @seventythree/tokens build`** copies **`src/themes`** → **`dist/`**.

## Storybook

```bash
pnpm storybook
```

Stories live under **`apps/storybook/src/`**. **`eslint-plugin-jsx-a11y`** (recommended rules) runs on **`src/**` and `.storybook/**`** TSX/JSX — in addition to the **@storybook/addon-a11y** panel. Prefer **`tags: ['autodocs']`** and a short **`parameters.docs.description`** on the meta object when adding components.

## Design conventions

- **Tokens first** — semantic colors and type scale from **`primitives.css`** / **`seventythree.css`**; avoid raw Tailwind palette names in components when a token exists.
- **Focus** — `focus-visible` rings aligned with **`ring`** tokens (see **Input** / **Button**).
- **Form controls** — shared chrome lives in **`packages/ui/src/lib/control-styles.ts`** (`controlFieldBaseClasses`); extend there when adding **Select** / **Checkbox** surfaces.

## Changelog

Update **[CHANGELOG.md](./CHANGELOG.md)** when you merge user-visible or structural changes:

1. Add bullets under **`## [Unreleased]`** (Added / Changed / Fixed / Removed).
2. When you **publish packages** or want a **dated snapshot**, move **`[Unreleased]`** content into a new **`## [x.y.z] — YYYY-MM-DD`** section and clear **`[Unreleased]`** (or leave a short placeholder).

[Changesets](https://github.com/changesets/changesets) can still drive **per-package** release notes for npm. Keep **root `CHANGELOG.md`** as the **whole-system** rolling history unless you automate syncing.

## Changelog (AI)

Optional automation updates **`[Unreleased]`** using **`scripts/update-changelog-ai.mjs`** (OpenAI API).

**Local:** `OPENAI_API_KEY=sk-... pnpm changelog:ai`

**GitHub Actions:** add repository secret **`OPENAI_API_KEY`**. Workflow **`.github/workflows/changelog-ai.yml`** runs on **`push` to `main`** with **`paths-ignore: CHANGELOG.md`** so the bot commit does not loop. **Actions → Changelog (AI) → Run workflow** for a manual run.

Optional repository variable **`OPENAI_MODEL`** (defaults to **`gpt-4o-mini`**).

If **`OPENAI_API_KEY`** is missing in CI, the script exits **0** without updating.

You can still edit **`CHANGELOG.md`** by hand; the next run merges with existing **`[Unreleased]`** bullets.
