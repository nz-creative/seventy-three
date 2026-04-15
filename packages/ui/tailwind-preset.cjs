const defaultTheme = require("tailwindcss/defaultTheme");

const spacingFromTokens = Object.fromEntries(
  Object.entries(defaultTheme.spacing).map(([k]) => {
    const cssKey = String(k).replace(/\./g, "_");
    return [k, `var(--space-${cssKey})`];
  }),
);

const fontSizeFromTokens = Object.fromEntries(
  Object.entries(defaultTheme.fontSize).map(([name]) => {
    const safe = String(name).replace(/\./g, "_");
    return [
      name,
      [
        `var(--text-${safe})`,
        { lineHeight: `var(--leading-${safe})` },
      ],
    ];
  }),
);

const boxShadowFromTokens = Object.fromEntries(
  Object.entries(defaultTheme.boxShadow).map(([k]) => {
    const cssKey = k === "DEFAULT" ? "default" : k;
    return [k, `var(--shadow-${cssKey})`];
  }),
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",
          foreground: "hsl(var(--success-foreground) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning) / <alpha-value>)",
          foreground: "hsl(var(--warning-foreground) / <alpha-value>)",
        },
        info: {
          DEFAULT: "hsl(var(--info) / <alpha-value>)",
          foreground: "hsl(var(--info-foreground) / <alpha-value>)",
        },
        chart: {
          1: "hsl(var(--chart-1) / <alpha-value>)",
          2: "hsl(var(--chart-2) / <alpha-value>)",
          3: "hsl(var(--chart-3) / <alpha-value>)",
          4: "hsl(var(--chart-4) / <alpha-value>)",
          5: "hsl(var(--chart-5) / <alpha-value>)",
        },
      },
      spacing: {
        ...spacingFromTokens,
        "stack-xs": "var(--space-stack-xs)",
        "stack-sm": "var(--space-stack-sm)",
        "stack-md": "var(--space-stack-md)",
        "stack-lg": "var(--space-stack-lg)",
        "inline-sm": "var(--space-inline-sm)",
        "inline-md": "var(--space-inline-md)",
        "page-gutter": "var(--space-page-gutter)",
        "section-y": "var(--space-section-y)",
      },
      fontSize: fontSizeFromTokens,
      lineHeight: {
        xs: "var(--leading-xs)",
        sm: "var(--leading-sm)",
        base: "var(--leading-base)",
        lg: "var(--leading-lg)",
        xl: "var(--leading-xl)",
        "2xl": "var(--leading-2xl)",
        "3xl": "var(--leading-3xl)",
        "4xl": "var(--leading-4xl)",
        "5xl": "var(--leading-5xl)",
        "6xl": "var(--leading-6xl)",
        "7xl": "var(--leading-7xl)",
        "8xl": "var(--leading-8xl)",
        "9xl": "var(--leading-9xl)",
      },
      letterSpacing: {
        tighter: "var(--tracking-tighter)",
        tight: "var(--tracking-tight)",
        normal: "var(--tracking-normal)",
        wide: "var(--tracking-wide)",
        wider: "var(--tracking-wider)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: boxShadowFromTokens,
      maxWidth: {
        prose: "var(--width-prose)",
        content: "var(--width-content)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.serif],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
    },
  },
};
