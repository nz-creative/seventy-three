import { Button } from "@seventythree/ui";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-10 px-6 py-16">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Design system
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Seventy-Three
        </h1>
        <p className="text-lg text-muted-foreground">
          Semantic CSS variables, Tailwind preset, and React components built
          with Radix primitives and CVA — aligned with the shadcn stack you
          already use.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>
      <section className="space-y-3 rounded-lg border border-border bg-card p-6 text-card-foreground">
        <h2 className="text-lg font-medium">Using in an app</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Install{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-foreground">
              @seventythree/ui
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-foreground">
              @seventythree/tokens
            </code>
            .
          </li>
          <li>
            Add the Tailwind preset from{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-foreground">
              @seventythree/ui/tailwind-preset
            </code>{" "}
            and import the theme CSS once.
          </li>
          <li>
            Toggle dark mode with{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-foreground">
              class=&quot;dark&quot;
            </code>{" "}
            on the root element.
          </li>
        </ol>
      </section>
    </main>
  );
}
