# @seventythree/ui

React primitives for **Seventy-Three**: Radix where it matters, **CVA** for variants, **`cn()`** for class merging. Styled with your **`tailwindcss`** install plus **`@seventythree/ui/tailwind-preset`** and **`@seventythree/tokens`** CSS.

## Peer dependencies

- `react` ^18 or ^19  
- `react-dom` ^18 or ^19  
- `tailwindcss` ^3.4  

Also install **`clsx`**, **`tailwind-merge`**, **`class-variance-authority`**, and Radix packages pulled in by components you use (see root **`package.json`** / **`pnpm-lock.yaml`**).

## Usage

```tsx
import { Button, Input, Label } from "@seventythree/ui";

export function Example() {
  return (
    <>
      <Label htmlFor="x">Name</Label>
      <Input id="x" />
      <Button type="submit">Save</Button>
    </>
  );
}
```

Tailwind: extend **`@seventythree/ui/tailwind-preset`** and include this package in **`content`** so utilities are not purged.

Shared styles for text-like controls live in **`src/lib/control-styles.ts`** (`controlFieldBaseClasses`) — extend there when adding Select, Checkbox, etc.

See repo **[CONTRIBUTING.md](../../CONTRIBUTING.md)** for type-scale and PR workflow.
