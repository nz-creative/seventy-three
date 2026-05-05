/**
 * Helpers for Field id and `aria-describedby` wiring (see `components/field.tsx`).
 * Kept separate so behavior is easy to unit test without rendering React trees.
 */

/** React `useId()` values may contain `:`; strip for stable DOM ids. */
export function fieldIdSuffixFromReactId(reactId: string): string {
  return reactId.replace(/:/g, "");
}

/** Builds `aria-describedby` from hint/error presence and target element ids. */
export function fieldAriaDescribedBy({
  hintPresent,
  errorPresent,
  descriptionId,
  errorId,
}: {
  hintPresent: boolean;
  errorPresent: boolean;
  descriptionId: string;
  errorId: string;
}): string | undefined {
  const parts = [
    hintPresent ? descriptionId : null,
    errorPresent ? errorId : null,
  ].filter((id): id is string => Boolean(id));
  return parts.length ? parts.join(" ") : undefined;
}
