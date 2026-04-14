import eslint from "@eslint/js";
import storybook from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...storybook.configs["flat/recommended"],
  {
    ignores: ["storybook-static/**", "postcss.config.cjs"],
  }
);
