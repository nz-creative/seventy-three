import type { Config } from "tailwindcss";
import preset from "@seventythree/ui/tailwind-preset";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
} satisfies Config;
