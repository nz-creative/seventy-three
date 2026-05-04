import Link from "next/link";

const links = [
  { href: "/", label: "Overview" },
  { href: "/installation", label: "Installation" },
  { href: "/tokens", label: "Tokens" },
  { href: "/typography", label: "Typography" },
  { href: "/components", label: "Components" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          Seventy-Three
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
