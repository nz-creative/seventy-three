import type { Metadata } from "next";
import Link from "next/link";

import { DocPage, DocSection } from "../../components/doc-page";
import { InlineCode } from "../../components/inline-code";
import { getStorybookUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Components",
};

/** Storybook 8 doc URLs: ?path=/story/<story-id> */
const STORIES = [
  { label: "Badge", path: "/story/components-badge--default" },
  { label: "Button", path: "/story/components-button--default" },
  { label: "Card", path: "/story/components-card--default" },
  {
    label: "Dialog",
    path: "/story/components-dialog--default",
  },
  {
    label: "Field",
    path: "/story/components-field--with-hint",
  },
  {
    label: "Input, Label, Textarea",
    path: "/story/components-form-fields--label-and-input",
  },
] as const;

export default function ComponentsPage() {
  const storybookRoot = getStorybookUrl().replace(/\/$/, "");

  return (
    <DocPage
      title="Components"
      description="Building blocks from @seventythree/ui. Browse interactively in Storybook; import primitives in your app."
    >
      <DocSection title="Storybook">
        <p>
          Interactive docs and variants live in{" "}
          <a
            href={`${storybookRoot}/`}
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Storybook
          </a>
          {storybookRoot.startsWith("http://localhost") ? (
            <>
              {" "}
              (run <InlineCode>pnpm storybook</InlineCode> locally). Set{" "}
              <InlineCode>NEXT_PUBLIC_STORYBOOK_URL</InlineCode> when building
              docs for production so links target your Pages deployment.
            </>
          ) : (
            <>
              {" "}
              at your GitHub Pages site root (same deploy as these docs).
            </>
          )}
        </p>
      </DocSection>

      <DocSection title="@seventythree/ui">
        <ul className="list-disc space-y-2 pl-5">
          {STORIES.map(({ label, path }) => (
            <li key={path}>
              <strong>{label}</strong>
              {" — "}
              <a
                href={`${storybookRoot}/?path=${encodeURIComponent(path)}`}
                className="text-accent underline-offset-4 hover:underline"
              >
                Open story
              </a>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection title="Patterns">
        <p>
          For form field wiring (<InlineCode>Field</InlineCode>) and modal
          composition (<InlineCode>Dialog</InlineCode>), see{" "}
          <Link
            href="/patterns"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Patterns
          </Link>
          .
        </p>
      </DocSection>

      <DocSection title="Install">
        <p>
          See{" "}
          <Link
            href="/installation"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Installation
          </Link>{" "}
          for <InlineCode>@seventythree/ui</InlineCode>, peers, and Tailwind
          preset setup.
        </p>
      </DocSection>
    </DocPage>
  );
}
