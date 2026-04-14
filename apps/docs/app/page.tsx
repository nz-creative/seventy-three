import Link from "next/link";

import { Button } from "@seventythree/ui";

import { DocPage, DocSection } from "../components/doc-page";
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
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
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
          <InlineCode>font-sans</InlineCode> and{" "}
          <InlineCode>font-mono</InlineCode> from the preset; see{" "}
          <Link
            href="/typography"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Typography
          </Link>{" "}
          for defaults and overrides.
        </p>
      </DocSection>
    </DocPage>
  );
}
