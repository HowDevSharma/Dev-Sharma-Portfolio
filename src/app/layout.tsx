import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Gochi_Hand, Space_Mono, Unbounded } from "next/font/google";
import { site } from "@/content/site";
import { Nav } from "@/components/layout/Nav";
import { Cursor, Preloader, SmoothScroll, preloaderScript } from "@/components/layout/chrome";
import "./globals.css";

const display = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["600", "800"],
});

const sans = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

const mono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const hand = Gochi_Hand({
  variable: "--font-gochi",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    siteName: site.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${hand.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloaderScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="label sr-only fixed top-2 left-2 z-[200] bg-ink px-3 py-2 text-paper focus:not-sr-only"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Preloader />
        <Nav />
        <main id="main" className="pt-(--nav-h)">
          {children}
        </main>
        <Cursor />
      </body>
    </html>
  );
}
