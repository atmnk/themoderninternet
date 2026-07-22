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
