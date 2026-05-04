# Changelog

All notable changes to **Seventy-Three** (monorepo: tokens, UI package, docs, Storybook) are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Dates use **YYYY-MM-DD**.

## [Unreleased]

### Added

- _(Add bullet points under Added / Changed / Fixed / Removed as you merge work.)_

---

## [0.1.0] — 2026-05-05

Summary of the design system **as shipped to this date** (packages not necessarily published to npm yet).

### Added

- **Monorepo** — pnpm workspaces, Turborepo, `@seventythree/tokens`, `@seventythree/ui`
- **Tokens** — `primitives.css` (palette, spacing, modular type scale), `seventythree.css` semantics, optional `webfonts.css`
- **Modular type scale** — Major Third default; `scripts/type-scale.config.json`; `scripts/generate-type-scale.mjs` with `--check` for CI
- **UI package** — `Button`, `Badge`, `Card` (+ subparts), `Input`, `Label`, `Textarea`; `cn()`; shared `controlFieldBaseClasses`; Tailwind preset
- **Storybook** — component stories; `@storybook/addon-a11y`; `eslint-plugin-jsx-a11y` on story TSX
- **Docs site** (Next.js) — Overview, Installation, Tokens, Typography, Components (Storybook links); `NEXT_PUBLIC_STORYBOOK_URL` for production links
- **GitHub Pages** — combined deploy: Storybook at repo root, docs under `/docs/`
- **CI** — build, lint, typecheck, test (Vitest for `cn`), `check:type-scale`
- **Documentation** — root README, `CONTRIBUTING.md`, `packages/ui/README.md`

### Changed

- **Typography** — `--text-*` steps generated from configured ratio (replacing hand-maintained ladder)
- **Badge** — renders as `<span>` for inline use; focus ring aligned with other controls
- **Input / Textarea** — deduplicated styles via `control-styles.ts`

---

Earlier history before this changelog file was not captured line-by-line; **from [0.1.0] onward**, update **`[Unreleased]`** when you merge meaningful work, then **rename** that block to a version + date when you cut a release or periodic snapshot.
