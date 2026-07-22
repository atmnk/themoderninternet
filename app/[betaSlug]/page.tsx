import { notFound } from "next/navigation";

import { BetaExamplePage } from "@/components/beta-example-page";
import { betaExamples } from "@/lib/beta-examples";

export function generateStaticParams() {
  return Object.keys(betaExamples).map((betaSlug) => ({ betaSlug }));
}

export default async function BetaRoutePage({
  params,
}: {
  params: Promise<{ betaSlug: string }>;
}) {
  const { betaSlug } = await params;
  const config = betaExamples[betaSlug];

  if (!config) {
    notFound();
  }

  return <BetaExamplePage config={config} />;
}
