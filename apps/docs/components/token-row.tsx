import type { ReactNode } from "react";

export function TokenRow({
  name,
  description,
  example,
}: {
  name: string;
  description: string;
  example?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-start sm:gap-6">
      <div className="min-w-0 flex-1 space-y-1">
        <p className="font-mono text-sm font-medium text-card-foreground">
          {name}
        </p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="font-mono text-xs text-muted-foreground">
          var(--{name})
        </p>
      </div>
      {example ? (
        <div className="shrink-0 text-foreground">{example}</div>
      ) : null}
    </div>
  );
}
