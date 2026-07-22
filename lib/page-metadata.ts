import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

function findPracticePage(href: string) {
  return siteConfig.practicePages.find((page) => page.href === href);
}

export function createPageMetadata({
  href,
  fallbackTitle,
  fallbackDescription,
}: {
  href: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
}): Metadata {
  const page = findPracticePage(href);

  return {
    title: page?.label ?? fallbackTitle ?? siteConfig.name,
    description: page?.description ?? fallbackDescription ?? siteConfig.description,
  };
}

