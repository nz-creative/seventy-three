import type { Metadata } from "next";
import Link from "next/link";

import { DocPage, DocSection } from "../../components/doc-page";
import { InlineCode } from "../../components/inline-code";
import { getStorybookUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Patterns",
};

export default function PatternsPage() {
  const storybook = getStorybookUrl().replace(/\/$/, "");
  return (
    <DocPage
      title="Patterns"
      description="How to compose form fields and modals with @seventythree/ui. See Storybook for live examples."
    >
      <DocSection title="Field (forms)">
        <p>
          Use <InlineCode>Field</InlineCode> when you want one place to wire{" "}
          <InlineCode>label htmlFor</InlineCode>, control{" "}
          <InlineCode>id</InlineCode>, optional hint text, optional error text,
          and <InlineCode>aria-describedby</InlineCode> /{" "}
          <InlineCode>aria-invalid</InlineCode> without hand-maintaining ids.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <InlineCode>FieldLabel</InlineCode> — pairs with the control via the
            generated id (Radix <InlineCode>Label</InlineCode> under the hood).
          </li>
          <li>
            <InlineCode>FieldHint</InlineCode> — optional; when rendered, its{" "}
            <InlineCode>id</InlineCode> is included in the control&apos;s{" "}
            <InlineCode>aria-describedby</InlineCode>.
          </li>
          <li>
            <InlineCode>FieldError</InlineCode> — optional; only renders when it
            has content; uses <InlineCode>role=&quot;alert&quot;</InlineCode>{" "}
            and is linked when present.
          </li>
          <li>
            <InlineCode>FieldControl</InlineCode> — wraps a single{" "}
            <InlineCode>Input</InlineCode> or <InlineCode>Textarea</InlineCode>{" "}
            (Radix <InlineCode>Slot</InlineCode> merges props onto that child).
          </li>
        </ul>
        <p className="mt-4">
          Set <InlineCode>invalid</InlineCode> on <InlineCode>Field</InlineCode>{" "}
          when validation failed; the control receives{" "}
          <InlineCode>aria-invalid</InlineCode> and you can use{" "}
          <InlineCode>FieldLabel variant=&quot;error&quot;</InlineCode> for
          visual emphasis. Your app still owns <em>when</em> to show an error
          string in <InlineCode>FieldError</InlineCode>.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-sm text-foreground">
          <code>{`import {
  Field,
  FieldControl,
  FieldError,
  FieldHint,
  FieldLabel,
  Input,
} from "@seventythree/ui";

export function EmailField() {
  return (
    <Field invalid className="max-w-sm">
      <FieldLabel variant="error">Email</FieldLabel>
      <FieldHint>We will never share your address.</FieldHint>
      <FieldControl>
        <Input type="email" autoComplete="email" />
      </FieldControl>
      <FieldError>Enter a valid email.</FieldError>
    </Field>
  );
}`}</code>
        </pre>
        <p className="mt-4 text-sm text-muted-foreground">
          <strong>Next.js App Router:</strong> client-only features (e.g.{" "}
          <InlineCode>useState</InlineCode> for local error state) should live in
          a <InlineCode>&quot;use client&quot;</InlineCode> component; import{" "}
          <InlineCode>Field</InlineCode> there, or keep the page as a server
          component and render a small client form section.
        </p>
        <p className="mt-3">
          <a
            href={`${storybook}/?path=${encodeURIComponent("/story/components-field--with-hint")}`}
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Open Field stories in Storybook
          </a>
        </p>
      </DocSection>

      <DocSection title="Dialog (modals)">
        <p>
          <InlineCode>Dialog</InlineCode> is built on Radix Dialog: focus trap,
          scroll lock, Escape and overlay dismiss (per Radix props). Compose{" "}
          <InlineCode>DialogTrigger</InlineCode>,{" "}
          <InlineCode>DialogContent</InlineCode>,{" "}
          <InlineCode>DialogHeader</InlineCode>,{" "}
          <InlineCode>DialogTitle</InlineCode>,{" "}
          <InlineCode>DialogDescription</InlineCode>, and{" "}
          <InlineCode>DialogFooter</InlineCode> with{" "}
          <InlineCode>Button</InlineCode> actions as needed.
        </p>
        <p className="mt-3">
          Put interactive dialogs in a <InlineCode>&quot;use client&quot;</InlineCode>{" "}
          component when using the React Server Components default in Next.js App
          Router.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-sm text-foreground">
          <code>{`import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@seventythree/ui";

export function ConfirmDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Discard draft?</DialogTitle>
          <DialogDescription>This cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" variant="destructive">
            Discard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`}</code>
        </pre>
        <p className="mt-4">
          <a
            href={`${storybook}/?path=${encodeURIComponent("/story/components-dialog--default")}`}
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Open Dialog story in Storybook
          </a>
        </p>
      </DocSection>

      <DocSection title="Related">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <Link
              href="/components"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              Components
            </Link>{" "}
            — story index for all building blocks.
          </li>
          <li>
            <Link
              href="/installation"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              Installation
            </Link>{" "}
            — package and Tailwind setup.
          </li>
        </ul>
      </DocSection>
    </DocPage>
  );
}
