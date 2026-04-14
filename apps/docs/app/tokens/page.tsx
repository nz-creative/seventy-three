import type { Metadata } from "next";

import { DocPage, DocSection } from "../../components/doc-page";
import { InlineCode } from "../../components/inline-code";
import { TokenSwatch } from "../../components/token-swatch";

export const metadata: Metadata = {
  title: "Tokens",
};

const surfaces = [
  { token: "background", description: "Page canvas behind content." },
  { token: "foreground", description: "Default text on the canvas." },
  { token: "card", description: "Raised surfaces: cards, panels." },
  { token: "card-foreground", description: "Text on card surfaces." },
  { token: "popover", description: "Floating surfaces: menus, popovers." },
  {
    token: "popover-foreground",
    description: "Text on popover surfaces.",
  },
] as const;

const brand = [
  {
    token: "primary",
    description: "Primary actions and strong emphasis.",
  },
  {
    token: "primary-foreground",
    description: "Text and icons on primary.",
  },
  {
    token: "secondary",
    description: "Secondary actions and subtle fills.",
  },
  {
    token: "secondary-foreground",
    description: "Text on secondary surfaces.",
  },
  { token: "muted", description: "Muted backgrounds and disabled chrome." },
  {
    token: "muted-foreground",
    description: "Secondary text, captions, placeholders.",
  },
  { token: "accent", description: "Accent highlights and focus affordances." },
  {
    token: "accent-foreground",
    description: "Text on accent (e.g. accent buttons).",
  },
  {
    token: "destructive",
    description: "Destructive actions and error emphasis.",
  },
  {
    token: "destructive-foreground",
    description: "Text on destructive surfaces.",
  },
] as const;

const chrome = [
  { token: "border", description: "Default borders and dividers." },
  { token: "input", description: "Input borders (often matches border)." },
  { token: "ring", description: "Focus rings and strong focus outlines." },
] as const;

export default function TokensPage() {
  return (
    <DocPage
      title="Tokens"
      description="Semantic colors are HSL triplets on CSS variables. Tailwind maps utilities like bg-primary to hsl(var(--primary) / <alpha>)."
    >
      <DocSection title="Format">
        <p>
          In <InlineCode>seventythree.css</InlineCode>, each token is stored as
          three numbers (hue, saturation, lightness) without{" "}
          <InlineCode>hsl()</InlineCode>. That matches the shadcn / Tailwind v3
          pattern: utilities apply opacity via{" "}
          <InlineCode>/ &lt;alpha-value&gt;</InlineCode>.
        </p>
      </DocSection>

      <DocSection title="Surfaces">
        <div className="grid gap-3 sm:grid-cols-2">
          {surfaces.map(({ token, description }) => (
            <TokenSwatch key={token} token={token} description={description} />
          ))}
        </div>
      </DocSection>

      <DocSection title="Brand and emphasis">
        <div className="grid gap-3 sm:grid-cols-2">
          {brand.map(({ token, description }) => (
            <TokenSwatch key={token} token={token} description={description} />
          ))}
        </div>
      </DocSection>

      <DocSection title="Chrome">
        <div className="grid gap-3 sm:grid-cols-2">
          {chrome.map(({ token, description }) => (
            <TokenSwatch key={token} token={token} description={description} />
          ))}
        </div>
      </DocSection>

      <DocSection title="Radius and fonts">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <InlineCode>--radius</InlineCode> — base corner radius (rem).
            Tailwind <InlineCode>rounded-lg</InlineCode> and friends in the
            preset derive from it.
          </li>
          <li>
            <InlineCode>--font-sans</InlineCode> — default UI typeface stack (
            <strong>DM Sans</strong> first; override in your app if needed).
          </li>
          <li>
            <InlineCode>--font-mono</InlineCode> — monospace stack for code.
          </li>
        </ul>
      </DocSection>
    </DocPage>
  );
}
