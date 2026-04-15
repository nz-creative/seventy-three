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
    config.resolve.alias = {
      ...config.resolve.alias,
      "@seventythree/ui": path.resolve(dirname, "../../../packages/ui/src"),
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
