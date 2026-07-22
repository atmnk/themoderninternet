"use client";

import { Button, Card, CardContent, CardHeader, Chip } from "@heroui/react";
import { useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";
import { subtitle, title } from "@/components/primitives";

export default function Home() {
  const router = useRouter();
  const readyPages = [...siteConfig.practicePages]
    .filter((page) => page.status === "Ready")
    .sort((left, right) => left.label.localeCompare(right.label));
  const comingSoonPages = [...siteConfig.practicePages]
    .filter((page) => page.status !== "Ready")
    .sort((left, right) => left.label.localeCompare(right.label));

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

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Ready Now</h2>
            <p className="mt-1 text-sm text-muted">
              Live practice pages sorted alphabetically.
            </p>
          </div>
          <Chip color="success" variant="soft">
            {readyPages.length} ready
          </Chip>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {readyPages.map((page) => (
            <Card
              key={page.href}
              className="border border-separator bg-surface shadow-surface"
            >
              <CardHeader className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold text-foreground">{page.label}</h2>
                  <p className="text-sm text-muted">{page.description}</p>
                </div>
                <Chip color="success" size="sm" variant="soft">
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
      </div>

      {comingSoonPages.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Coming Soon</h2>
              <p className="mt-1 text-sm text-muted">
                Additional exercises that are not yet verified for deployment.
              </p>
            </div>
            <Chip color="warning" variant="soft">
              {comingSoonPages.length} coming soon
            </Chip>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {comingSoonPages.map((page) => (
              <Card
                key={page.href}
                className="border border-separator bg-surface shadow-surface"
              >
                <CardHeader className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold text-foreground">{page.label}</h2>
                    <p className="text-sm text-muted">{page.description}</p>
                  </div>
                  <Chip color="warning" size="sm" variant="soft">
                    Coming Soon
                  </Chip>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button isDisabled variant="tertiary">
                    Coming soon
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
