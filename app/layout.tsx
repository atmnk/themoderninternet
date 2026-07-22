import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#101826",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background text-foreground font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers
          themeProps={{
            attribute: "data-theme",
            defaultTheme: "midnight",
            disableTransitionOnChange: true,
            enableSystem: false,
            themes: [
              "midnight",
              "sunrise",
              "paper",
              "canopy",
              "lagoon",
              "signal",
              "ember",
              "blossom",
              "graphite",
            ],
          }}
        >
          <div className="relative flex min-h-screen flex-col">
            <div className="pointer-events-none fixed right-0 top-0 z-50 h-40 w-40 overflow-hidden">
              <a
                className="pointer-events-auto absolute right-[-2.85rem] top-8 block w-56 rotate-45 border border-emerald-900 bg-emerald-600 px-0 py-2 text-center text-xs font-semibold text-white shadow-[0_6px_14px_rgba(0,0,0,0.35)] transition-colors hover:bg-emerald-500"
                href={siteConfig.links.github}
                rel="noreferrer"
                target="_blank"
              >
                Fork me on GitHub
              </a>
            </div>
            <Navbar />
            <main className="mx-auto w-full max-w-6xl flex-grow px-6 pb-16 pt-12">
              {children}
            </main>
            <footer className="w-full border-t border-separator py-4">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm text-muted">
                <p>Built with Next.js and HeroUI for automation practice.</p>
                <p>Vercel-ready starter</p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
