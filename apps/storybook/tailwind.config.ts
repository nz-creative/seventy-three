import type { Config } from "tailwindcss";
import preset from "@seventythree/ui/tailwind-preset";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
} satisfies Config;
