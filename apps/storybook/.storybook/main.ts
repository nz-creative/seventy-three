import path from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/react-vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    config.resolve = config.resolve ?? {};
    const tokensRoot = path.resolve(dirname, "../../../packages/tokens");
    config.resolve.alias = {
      ...config.resolve.alias,
      "@seventythree/ui": path.resolve(dirname, "../../../packages/ui/src"),
      // Tokens package exports point at dist/; Storybook build does not run `turbo build` first.
      "@seventythree/tokens/themes/seventythree.css": path.join(
        tokensRoot,
        "src/themes/seventythree.css",
      ),
      "@seventythree/tokens/themes/webfonts.css": path.join(
        tokensRoot,
        "src/themes/webfonts.css",
      ),
    };
    // GitHub Pages project sites live at /<repo>/; set STORYBOOK_BASE_PATH in CI (e.g. /seventy-three/).
    const base = process.env.STORYBOOK_BASE_PATH?.trim();
    if (base) {
      config.base = base.endsWith("/") ? base : `${base}/`;
    }
    return config;
  },
};

export default config;
