export function TokenSwatch({
  token,
  description,
}: {
  token: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-lg border border-border bg-card p-4">
      <div
        className="size-14 shrink-0 rounded-md border border-border shadow-sm"
        style={{ backgroundColor: `hsl(var(--${token}) / 1)` }}
        aria-hidden
      />
      <div className="min-w-0 space-y-1">
        <p className="font-mono text-sm font-medium text-card-foreground">
          {token}
        </p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="font-mono text-xs text-muted-foreground">
          var(--{token})
        </p>
      </div>
    </div>
  );
}
