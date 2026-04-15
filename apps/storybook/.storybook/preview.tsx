import type { Preview } from "@storybook/react";

// CDN webfonts (docs app uses next/font instead). Theme: seventythree → primitives + semantics.
import "@seventythree/tokens/themes/webfonts.css";
import "@seventythree/tokens/themes/seventythree.css";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "canvas",
      values: [
        { name: "canvas", value: "hsl(var(--background))" },
        { name: "card", value: "hsl(var(--card))" },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: "Color scheme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as string;
      const className = theme === "dark" ? "dark" : "";
      return (
        <div className={className}>
          <div className="min-h-[200px] bg-background p-8 text-foreground font-sans antialiased">
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;
