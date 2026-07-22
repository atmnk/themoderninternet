"use client";

import { Link } from "@heroui/react";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/80 backdrop-blur-xl">
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-6">
          <NextLink className="flex items-center gap-2" href="/">
            <span className="text-accent">
              <Logo />
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-xs uppercase tracking-[0.3em] text-muted">
                QA Lens
              </span>
              <span className="font-semibold text-foreground">
                The Modern Internet
              </span>
            </div>
          </NextLink>
        </div>

        <div className="flex items-center gap-3">
          <NextLink
            className={clsx(
              "hidden text-sm text-foreground/80 transition-colors hover:text-accent sm:inline-flex",
            )}
            href="/"
          >
            All Pages
          </NextLink>
          <Link
            className="hidden text-sm text-muted sm:inline-flex"
            href={siteConfig.links.docs}
            rel="noreferrer"
            target="_blank"
          >
            HeroUI Docs
          </Link>
          <ThemeSwitch />
        </div>
      </header>
    </nav>
  );
};
