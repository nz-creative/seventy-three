import type { Metadata } from "next";

import { DocPage, DocSection } from "../../components/doc-page";
import { InlineCode } from "../../components/inline-code";

export const metadata: Metadata = {
  title: "Installation",
};

export default function InstallationPage() {
  return (
    <DocPage
      title="Installation"
      description="Add the packages, theme CSS, and Tailwind preset. Dark mode uses a class on the document root."
    >
      <DocSection title="1. Install packages">
        <p>
          From your app (pnpm, npm, or yarn). When packages are published, use
          the registry version; until then, use{" "}
          <InlineCode>workspace:*</InlineCode> or a git dependency from your
          monorepo.
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-sm text-foreground">
          <code>{`pnpm add @seventythree/ui @seventythree/tokens \\
  tailwindcss postcss autoprefixer \\
  class-variance-authority clsx tailwind-merge`}</code>
        </pre>
        <p>
          Peer dependencies: <InlineCode>react</InlineCode>,{" "}
          <InlineCode>react-dom</InlineCode>, and{" "}
          <InlineCode>tailwindcss</InlineCode> (v3.4.x matches this repo).
        </p>
      </DocSection>

      <DocSection title="2. Import theme CSS once">
        <p>
          In your root layout or entry (e.g. Next.js{" "}
          <InlineCode>app/layout.tsx</InlineCode>), import the theme{" "}
          <em>before</em> your own global styles so variables are available.
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-sm text-foreground">
          <code>{`import "@seventythree/tokens/themes/seventythree.css";
import "./globals.css";`}</code>
        </pre>
      </DocSection>

      <DocSection title="3. Tailwind config">
        <p>
          Use the preset from <InlineCode>@seventythree/ui/tailwind-preset</InlineCode>{" "}
          and point <InlineCode>content</InlineCode> at your app{" "}
          <em>and</em> the UI package source (or dist) so class names are not
          purged.
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-sm text-foreground">
          <code>{`import type { Config } from "tailwindcss";
import preset from "@seventythree/ui/tailwind-preset";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@seventythree/ui/dist/**/*.{js,mjs}",
  ],
  presets: [preset],
} satisfies Config;`}</code>
        </pre>
        <p className="text-sm">
          If you consume the UI package from source in a monorepo, include that
          path in <InlineCode>content</InlineCode> instead of{" "}
          <InlineCode>node_modules/.../dist</InlineCode>.
        </p>
      </DocSection>

      <DocSection title="4. Global base styles">
        <p>
          Apply border and body colors so surfaces match the tokens (same idea
          as shadcn&apos;s <InlineCode>globals.css</InlineCode> snippet).
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-sm text-foreground">
          <code>{`@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground antialiased;
  }
}`}</code>
        </pre>
      </DocSection>

      <DocSection title="5. Dark mode">
        <p>
          Toggle dark theme by adding <InlineCode>class=&quot;dark&quot;</InlineCode>{" "}
          on <InlineCode>&lt;html&gt;</InlineCode> (or a root wrapper). All
          semantic colors read from the <InlineCode>.dark</InlineCode> block in
          the theme CSS.
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-sm text-foreground">
          <code>{`<html lang="en" className={dark ? "dark" : undefined}>`}</code>
        </pre>
      </DocSection>

      <DocSection title="6. Use components">
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-sm text-foreground">
          <code>{`import { Button } from "@seventythree/ui";

export function Example() {
  return <Button>Save</Button>;
}`}</code>
        </pre>
      </DocSection>
    </DocPage>
  );
}
