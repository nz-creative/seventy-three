import type { Metadata } from "next";

import { SiteNav } from "../components/site-nav";
import "@seventythree/tokens/themes/seventythree.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Seventy-Three",
    template: "%s · Seventy-Three",
  },
  description:
    "A code-first design system — semantic tokens, accessible React primitives, shadcn-aligned stack.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
