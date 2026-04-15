import type { Metadata } from "next";

import { DocPage, DocSection } from "../../components/doc-page";
import { InlineCode } from "../../components/inline-code";

export const metadata: Metadata = {
  title: "Typography",
};

export default function TypographyPage() {
  return (
    <DocPage
      title="Typography"
      description="DM Sans for UI body, DM Serif Display for display headlines via font-display. Monospace uses the system stack for code."
    >
      <DocSection title="Sans (UI)">
        <p>
          <InlineCode>primitives.css</InlineCode> defines the{" "}
          <InlineCode>--font-sans</InlineCode> stack (DM Sans first). This docs
          app loads the files with <InlineCode>next/font/google</InlineCode> so
          they are bundled — no Google Fonts request at runtime. Tailwind maps{" "}
          <InlineCode>font-sans</InlineCode> to{" "}
          <InlineCode>var(--font-sans)</InlineCode> via the UI preset.
        </p>
        <p>
          Put <InlineCode>className=&quot;font-sans antialiased&quot;</InlineCode>{" "}
          on <InlineCode>&lt;body&gt;</InlineCode> (as this docs app does) for
          consistent rendering.
        </p>
      </DocSection>

      <DocSection title="Display (headlines)">
        <p>
          <InlineCode>--font-display</InlineCode> defaults to{" "}
          <strong>DM Serif Display</strong> (also loaded via{" "}
          <InlineCode>next/font</InlineCode> here; optional{" "}
          <InlineCode>webfonts.css</InlineCode> for non-Next apps). Use{" "}
          <InlineCode>className=&quot;font-display&quot;</InlineCode>{" "}
          for page titles, hero headings, and marketing emphasis. Body copy stays{" "}
          <InlineCode>font-sans</InlineCode>.
        </p>
        <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
          Display preview — Seventy-Three
        </p>
      </DocSection>

      <DocSection title="Scale (Tailwind)">
        <p>
          Size and line-height come from <InlineCode>primitives.css</InlineCode>{" "}
          (<InlineCode>--text-*</InlineCode> / <InlineCode>--leading-*</InlineCode>
          ); the preset maps <InlineCode>text-sm</InlineCode>,{" "}
          <InlineCode>text-base</InlineCode>, etc. to those variables. Use{" "}
          <InlineCode>font-medium</InlineCode>, <InlineCode>tracking-tight</InlineCode>
          , and letter-spacing tokens (<InlineCode>tracking-wide</InlineCode>, …)
          for weight and density.
        </p>
        <p>
          Dedicated semantic text components can be added to{" "}
          <InlineCode>@seventythree/ui</InlineCode> later if you want fixed
          recipes (e.g. <InlineCode>Text</InlineCode> /{" "}
          <InlineCode>Heading</InlineCode>).
        </p>
      </DocSection>

      <DocSection title="Mono (code)">
        <p>
          Use <InlineCode>font-mono</InlineCode> for inline code, props, and
          snippets. The stack is defined by <InlineCode>--font-mono</InlineCode>{" "}
          in <InlineCode>primitives.css</InlineCode>.
        </p>
        <p className="font-mono text-sm text-card-foreground">
          Example: const theme = &quot;seventythree&quot;;
        </p>
      </DocSection>

      <DocSection title="Overriding fonts">
        <p>
          Keep <InlineCode>--font-sans</InlineCode> /{" "}
          <InlineCode>--font-display</InlineCode> in sync with how you load
          faces: adjust <InlineCode>next/font</InlineCode> in the layout, edit
          stacks in <InlineCode>primitives.css</InlineCode>, or add another{" "}
          <InlineCode>@font-face</InlineCode> / CDN import. Variable names must
          stay aligned with the Tailwind preset.
        </p>
      </DocSection>
    </DocPage>
  );
}
