import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";

import { SiteNav } from "../components/site-nav";
import "@seventythree/tokens/themes/seventythree.css";
import "./globals.css";

const fontSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const fontDisplay = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: "400",
});

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontDisplay.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
