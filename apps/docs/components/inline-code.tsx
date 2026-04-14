import type { ReactNode } from "react";

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground">
      {children}
    </code>
  );
}
