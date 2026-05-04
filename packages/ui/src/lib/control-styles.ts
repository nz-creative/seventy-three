/**
 * Shared surface styles for single-line and multi-line text controls (Input,
 * Textarea, future Select). Keeps focus, invalid, and disabled chrome consistent.
 */
export const controlFieldBaseClasses =
  "flex w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive";
