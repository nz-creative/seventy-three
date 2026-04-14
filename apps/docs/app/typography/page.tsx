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
      description="Seventy-Three defaults to DM Sans for UI type, loaded by the theme stylesheet. Monospace uses the system stack for code."
    >
      <DocSection title="Sans (UI)">
        <p>
          The theme CSS sets <InlineCode>--font-sans</InlineCode> to{" "}
          <strong>DM Sans</strong> and imports it from Google Fonts. Tailwind
          maps <InlineCode>font-sans</InlineCode> to{" "}
          <InlineCode>var(--font-sans)</InlineCode> via the UI preset.
        </p>
        <p>
          Put <InlineCode>className=&quot;font-sans antialiased&quot;</InlineCode>{" "}
          on <InlineCode>&lt;body&gt;</InlineCode> (as this docs app does) for
          consistent rendering.
        </p>
      </DocSection>

      <DocSection title="Scale (Tailwind)">
        <p>
          Use Tailwind type utilities (<InlineCode>text-sm</InlineCode>,{" "}
          <InlineCode>text-lg</InlineCode>, <InlineCode>font-medium</InlineCode>
          , <InlineCode>tracking-tight</InlineCode>) for scale and weight.
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
          in the theme CSS.
        </p>
        <p className="font-mono text-sm text-card-foreground">
          Example: const theme = &quot;seventythree&quot;;
        </p>
      </DocSection>

      <DocSection title="Overriding the sans font">
        <p>
          To use a different face, set <InlineCode>--font-sans</InlineCode> on{" "}
          <InlineCode>:root</InlineCode> after importing the theme, or replace the{" "}
          <InlineCode>@import</InlineCode> in a forked theme file. Keep the same
          variable name so the Tailwind preset stays valid.
        </p>
      </DocSection>
    </DocPage>
  );
}
