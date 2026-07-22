"use client";

import NextLink from "next/link";
import { Button, Card, CardContent, CardHeader, Chip } from "@heroui/react";
import { useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";
import { subtitle, title } from "@/components/primitives";

export default function Home() {
  const router = useRouter();

  return (
    <section className="space-y-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-separator bg-surface px-6 py-10 shadow-surface backdrop-blur md:px-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,var(--accent-soft),transparent_70%)] opacity-80" />
        <div className="relative space-y-5">
          <Chip className="border-separator bg-surface-secondary text-foreground" variant="soft">
            The Modern Internet
          </Chip>
          <div className="max-w-3xl">
            <span className={title({ size: "lg" })}>Modern automation practice pages, </span>
            <span className={title({ color: "cyan", size: "lg" })}>
              built one screen at a time.
            </span>
            <div className={subtitle({ class: "mt-5 max-w-2xl" })}>
              Inspired by the legacy the-internet.herokuapp.com playground, this
              home page is the master index for 20+ practice routes. Each page is
              a dedicated automation target covering flows like form fills, table
              actions, filtering, and settings updates.
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              className="rounded-full shadow-surface"
              variant="primary"
              onPress={() => router.push("/ab-testing")}
            >
              Open first page
            </Button>
            <Button
              className="rounded-full"
              variant="secondary"
              onPress={() => window.open(siteConfig.links.docs, "_blank", "noopener,noreferrer")}
            >
              HeroUI reference
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {siteConfig.practicePages.map((page) => (
          <Card
            key={page.href}
            className="border border-separator bg-surface shadow-surface"
          >
            <CardHeader className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-foreground">{page.label}</h2>
                <p className="text-sm text-muted">{page.description}</p>
              </div>
              <Chip
                color={page.status === "Ready" ? "success" : "warning"}
                size="sm"
                variant="soft"
              >
                {page.status}
              </Chip>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="tertiary" onPress={() => router.push(page.href)}>
                Visit page
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
