/**
 * Public URLs for cross-links (Storybook on GitHub Pages, etc.).
 * Set NEXT_PUBLIC_STORYBOOK_URL in CI/deploy so static export embeds the right link.
 */
export function getStorybookUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_STORYBOOK_URL?.trim();
  if (fromEnv) {
    return fromEnv.endsWith("/") ? fromEnv : `${fromEnv}/`;
  }
  return "http://localhost:6006/";
}
