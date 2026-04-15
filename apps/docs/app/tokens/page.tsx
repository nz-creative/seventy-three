import type { Metadata } from "next";

import { DocPage, DocSection } from "../../components/doc-page";
import { InlineCode } from "../../components/inline-code";
import { TokenRow } from "../../components/token-row";
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

const status = [
  {
    token: "success",
    description: "Positive outcomes, confirmations, safe states.",
  },
  {
    token: "success-foreground",
    description: "Text and icons on success surfaces.",
  },
  {
    token: "warning",
    description: "Caution, pending, or attention-needed states.",
  },
  {
    token: "warning-foreground",
    description: "Text on warning surfaces (often dark on amber).",
  },
  {
    token: "info",
    description: "Neutral informational highlights.",
  },
  {
    token: "info-foreground",
    description: "Text on info surfaces.",
  },
] as const;

const chrome = [
  { token: "border", description: "Default borders and dividers." },
  { token: "input", description: "Input borders (often matches border)." },
  { token: "ring", description: "Focus rings and strong focus outlines." },
] as const;

const charts = [
  { token: "chart-1", description: "Data series 1 (default brand-adjacent)." },
  { token: "chart-2", description: "Data series 2 (accent / teal)." },
  { token: "chart-3", description: "Data series 3 (violet)." },
  { token: "chart-4", description: "Data series 4 (amber)." },
  { token: "chart-5", description: "Data series 5 (green)." },
] as const;

const primitivesNeutral = [
  { token: "palette-neutral-0", description: "White — cards and popovers (light)." },
  { token: "palette-neutral-50", description: "Lightest gray — page background (light)." },
  { token: "palette-neutral-100", description: "Subtle fills, secondary surfaces." },
  { token: "palette-neutral-200", description: "Borders and inputs (light)." },
  { token: "palette-neutral-300", description: "Stronger borders, dividers." },
  { token: "palette-neutral-400", description: "Disabled hints, placeholder-adjacent." },
  { token: "palette-neutral-500", description: "Mid gray." },
  { token: "palette-neutral-600", description: "Muted foreground text (light)." },
  { token: "palette-neutral-700", description: "Emphasized gray text." },
  { token: "palette-neutral-800", description: "Strong secondary text." },
  { token: "palette-neutral-900", description: "Body text on light (light theme)." },
  { token: "palette-neutral-950", description: "Near-black — page background (dark)." },
  {
    token: "palette-dark-neutral-925",
    description: "Elevated dark surfaces — cards and popovers in .dark.",
  },
] as const;

const primitivesBrand = [
  { token: "palette-brand-50", description: "Lightest brand tint." },
  { token: "palette-brand-700", description: "Primary actions (light theme)." },
  { token: "palette-brand-900", description: "Deep brand / emphasis." },
] as const;

const primitivesAccentDanger = [
  { token: "palette-accent-500", description: "Accent fills and highlights." },
  { token: "palette-accent-600", description: "Focus ring, stronger accent." },
  { token: "palette-danger-500", description: "Error and destructive (light)." },
  { token: "palette-danger-600", description: "Destructive (dark theme)." },
] as const;

const primitivesStatus = [
  { token: "palette-success-500", description: "Success hue (light alerts)." },
  { token: "palette-warning-500", description: "Warning hue." },
  { token: "palette-info-500", description: "Info hue." },
] as const;

export default function TokensPage() {
  return (
    <DocPage
      title="Tokens"
      description="primitives.css holds palette, font stacks, spacing, type scale, radius, and shadows (load font files with next/font or webfonts.css). seventythree.css maps semantic color roles. Tailwind utilities reference those CSS variables."
    >
      <DocSection title="Taxonomy">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Primitives</strong> —{" "}
            <InlineCode>primitives.css</InlineCode>:{" "}
            <InlineCode>--palette-*</InlineCode> (color ramps),{" "}
            <InlineCode>--font-*</InlineCode>, <InlineCode>--space-*</InlineCode>,{" "}
            <InlineCode>--text-*</InlineCode>, <InlineCode>--shadow-*</InlineCode>,{" "}
            <InlineCode>--radius*</InlineCode>, etc.
          </li>
          <li>
            <strong>Semantics</strong> —{" "}
            <InlineCode>seventythree.css</InlineCode> maps UI roles (
            <InlineCode>--background</InlineCode>, <InlineCode>--primary</InlineCode>
            , …) to palette primitives; color values stay HSL triplets for
            Tailwind opacity.
          </li>
          <li>
            Light and dark modes swap <strong>semantic</strong> assignments; some
            dark-only fine-tunes live as additional primitives (e.g.{" "}
            <InlineCode>--palette-dark-*</InlineCode>).
          </li>
        </ul>
      </DocSection>

      <DocSection title="Format">
        <p>
          Each color value is stored as three numbers (hue, saturation,
          lightness) without <InlineCode>hsl()</InlineCode>. Utilities apply
          opacity via <InlineCode>/ &lt;alpha-value&gt;</InlineCode>.
        </p>
      </DocSection>

      <DocSection title="Layout &amp; typography (primitives)">
        <p className="mb-4 text-sm text-muted-foreground">
          Spacing aligns with Tailwind&apos;s default scale (
          <InlineCode>p-4</InlineCode> → <InlineCode>var(--space-4)</InlineCode>
          ). Semantic aliases like <InlineCode>gap-stack-md</InlineCode> map to
          common product gaps.
        </p>
        <h3 className="mb-2 text-sm font-semibold text-foreground">Spacing</h3>
        <div className="mb-6 space-y-3">
          <TokenRow
            name="space-4"
            description="1rem — default inline spacing step."
            example={
              <div
                className="h-8 w-8 rounded border border-dashed border-border bg-muted"
                style={{ width: "var(--space-4)", height: "var(--space-4)" }}
              />
            }
          />
          <TokenRow
            name="space-stack-md"
            description="Semantic stack gap (aliases space-4)."
            example={
              <div className="flex gap-stack-md">
                <span className="size-3 rounded-sm bg-primary" />
                <span className="size-3 rounded-sm bg-primary" />
              </div>
            }
          />
        </div>
        <h3 className="mb-2 text-sm font-semibold text-foreground">Type scale</h3>
        <div className="mb-6 space-y-3">
          <TokenRow
            name="text-base"
            description="Body — paired with leading-base in the preset."
            example={<span className="text-base text-foreground">Ag</span>}
          />
          <TokenRow
            name="text-2xl"
            description="Section title scale."
            example={
              <span className="font-display text-2xl font-semibold text-foreground">
                Aa
              </span>
            }
          />
        </div>
        <h3 className="mb-2 text-sm font-semibold text-foreground">Radius</h3>
        <p className="mb-3 text-sm text-muted-foreground">
          <InlineCode>--radius</InlineCode> is the base;{" "}
          <InlineCode>rounded-md</InlineCode> uses <InlineCode>--radius-md</InlineCode>{" "}
          (<InlineCode>calc(var(--radius) - 2px)</InlineCode>).
        </p>
        <h3 className="mb-2 text-sm font-semibold text-foreground">Elevation</h3>
        <div className="space-y-3">
          <TokenRow
            name="shadow-md"
            description="Cards and dropdowns; stronger in .dark."
            example={
              <div className="size-14 rounded-md border border-border bg-card shadow-md" />
            }
          />
        </div>
      </DocSection>

      <DocSection title="Palette primitives (excerpt)">
        <p className="mb-4 text-sm text-muted-foreground">
          Import from{" "}
          <InlineCode>@seventythree/tokens/themes/primitives.css</InlineCode>{" "}
          only if you need raw steps; most apps should use semantic tokens
          below.
        </p>
        <h3 className="mb-2 text-sm font-semibold text-foreground">Neutral</h3>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {primitivesNeutral.map(({ token, description }) => (
            <TokenSwatch key={token} token={token} description={description} />
          ))}
        </div>
        <h3 className="mb-2 text-sm font-semibold text-foreground">Brand</h3>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {primitivesBrand.map(({ token, description }) => (
            <TokenSwatch key={token} token={token} description={description} />
          ))}
        </div>
        <h3 className="mb-2 text-sm font-semibold text-foreground">
          Accent &amp; danger
        </h3>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {primitivesAccentDanger.map(({ token, description }) => (
            <TokenSwatch key={token} token={token} description={description} />
          ))}
        </div>
        <h3 className="mb-2 text-sm font-semibold text-foreground">Status hues</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {primitivesStatus.map(({ token, description }) => (
            <TokenSwatch key={token} token={token} description={description} />
          ))}
        </div>
      </DocSection>

      <DocSection title="Semantic — surfaces">
        <div className="grid gap-3 sm:grid-cols-2">
          {surfaces.map(({ token, description }) => (
            <TokenSwatch key={token} token={token} description={description} />
          ))}
        </div>
      </DocSection>

      <DocSection title="Semantic — brand and emphasis">
        <div className="grid gap-3 sm:grid-cols-2">
          {brand.map(({ token, description }) => (
            <TokenSwatch key={token} token={token} description={description} />
          ))}
        </div>
      </DocSection>

      <DocSection title="Semantic — status">
        <div className="grid gap-3 sm:grid-cols-2">
          {status.map(({ token, description }) => (
            <TokenSwatch key={token} token={token} description={description} />
          ))}
        </div>
      </DocSection>

      <DocSection title="Semantic — chrome">
        <div className="grid gap-3 sm:grid-cols-2">
          {chrome.map(({ token, description }) => (
            <TokenSwatch key={token} token={token} description={description} />
          ))}
        </div>
      </DocSection>

      <DocSection title="Semantic — charts">
        <p className="mb-4 text-sm text-muted-foreground">
          Use with Tailwind: <InlineCode>bg-chart-1</InlineCode>,{" "}
          <InlineCode>text-chart-2</InlineCode>, etc.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {charts.map(({ token, description }) => (
            <TokenSwatch key={token} token={token} description={description} />
          ))}
        </div>
      </DocSection>

      <DocSection title="Fonts (primitives.css)">
        <p className="mb-3 text-sm text-muted-foreground">
          Stacks only — use <InlineCode>next/font</InlineCode> (docs app) or{" "}
          <InlineCode>webfonts.css</InlineCode> / your own loader to fetch files.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <InlineCode>--font-sans</InlineCode> — default UI typeface stack (
            <strong>DM Sans</strong> first; override in your app if needed).
          </li>
          <li>
            <InlineCode>--font-display</InlineCode> — headline / marketing face (
            <strong>DM Serif Display</strong>); use Tailwind{" "}
            <InlineCode>font-display</InlineCode>.
          </li>
          <li>
            <InlineCode>--font-mono</InlineCode> — monospace stack for code.
          </li>
        </ul>
      </DocSection>
    </DocPage>
  );
}
