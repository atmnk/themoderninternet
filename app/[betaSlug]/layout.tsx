import type { Metadata } from "next";
import type { ReactNode } from "react";

import { betaExamples } from "@/lib/beta-examples";
import { siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ betaSlug: string }>;
}): Promise<Metadata> {
  const { betaSlug } = await params;
  const config = betaExamples[betaSlug];

  return {
    title: config?.title ?? siteConfig.name,
    description: config?.description ?? siteConfig.description,
  };
}

export default function BetaSlugLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

