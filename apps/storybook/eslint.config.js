import eslint from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import storybook from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...storybook.configs["flat/recommended"],
  {
    ...jsxA11y.flatConfigs.recommended,
    files: ["src/**/*.{tsx,jsx}", ".storybook/**/*.{tsx,jsx}"],
  },
  {
    ignores: ["storybook-static/**", "postcss.config.cjs"],
  }
);
