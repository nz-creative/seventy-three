import Link from "next/link";

import { DocPage, DocSection } from "../components/doc-page";
import { HomePreview } from "../components/home-preview";
import { InlineCode } from "../components/inline-code";

export default function HomePage() {
  return (
    <DocPage
      title="Seventy-Three"
      description="Semantic CSS variables, a Tailwind preset, and React components built with Radix and CVA — aligned with the shadcn stack."
    >
      <DocSection title="Principles">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Tokens first.</strong> Color and radius flow from CSS
            variables so themes and dark mode stay consistent.
          </li>
          <li>
            <strong>Accessible primitives.</strong> Behavior comes from Radix
            where it matters; styling stays thin and predictable.
          </li>
          <li>
            <strong>Apps own composition.</strong> The package ships building
            blocks; product layouts live in your application.
          </li>
        </ul>
      </DocSection>

      <DocSection title="Preview">
        <HomePreview />
      </DocSection>

      <DocSection title="Next steps">
        <p>
          Start with{" "}
          <Link
            href="/installation"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Installation
          </Link>{" "}
          to wire Tailwind and the theme stylesheet, then read{" "}
          <Link
            href="/tokens"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Tokens
          </Link>{" "}
          for the semantic palette. Use{" "}
          <InlineCode>font-sans</InlineCode>,{" "}
          <InlineCode>font-display</InlineCode>, and{" "}
          <InlineCode>font-mono</InlineCode> from the preset; see{" "}
          <Link
            href="/typography"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Typography
          </Link>{" "}
          for defaults and overrides. For <InlineCode>Field</InlineCode> and{" "}
          <InlineCode>Dialog</InlineCode> composition, read{" "}
          <Link
            href="/patterns"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Patterns
          </Link>
          . Browse shipped UI in{" "}
          <Link
            href="/components"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Components
          </Link>
          .
        </p>
      </DocSection>
    </DocPage>
  );
}
