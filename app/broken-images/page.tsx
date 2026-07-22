const imageCards = [
  {
    title: "Mountain Poster",
    src: "/images/broken-images/mountain.png",
    state: "Working",
    note: "Expected to render a blue mountain scene.",
  },
  {
    title: "Robot Portrait",
    src: "/images/broken-images/robot.png",
    state: "Working",
    note: "Expected to render an orange robot illustration.",
  },
  {
    title: "Leaf Texture",
    src: "/images/broken-images/missing-leaves.png",
    state: "Broken",
    note: "This intentionally points to a missing asset.",
  },
  {
    title: "City Skyline",
    src: "/images/broken-images/skyline.png",
    state: "Working",
    note: "Expected to render a dusk skyline illustration.",
  },
  {
    title: "Forest Banner",
    src: "/images/broken-images/not-found-forest.png",
    state: "Broken",
    note: "This intentionally returns a broken image request.",
  },
  {
    title: "Tropical Pattern",
    src: "/images/broken-images/leaves.png",
    state: "Working",
    note: "Expected to render a green tropical pattern.",
  },
] as const;

export default function BrokenImagesPage() {
  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-separator bg-surface px-6 py-10 shadow-surface backdrop-blur md:px-10">
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[var(--danger-soft)] blur-3xl" />
        <div className="relative space-y-5">
          <span className="inline-flex rounded-full border border-separator bg-surface-secondary px-3 py-1 text-sm text-foreground">
            Media Failure Sample
          </span>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground lg:text-6xl">
              Broken Images
            </h1>
            <p className="max-w-3xl text-lg text-muted lg:text-xl">
              This page mixes healthy image URLs with intentionally broken ones.
              It is meant for testing image visibility checks, broken asset
              detection, fallback behavior, and DOM assertions around failed
              loads.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {imageCards.map((card, index) => (
          <article
            key={card.title}
            className="overflow-hidden rounded-[1.5rem] border border-separator bg-surface shadow-surface"
            data-testid={`image-card-${index + 1}`}
          >
            <div className="aspect-[16/10] bg-background-secondary">
              {/* Intentional native img usage so broken asset behavior stays visible for testing. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={card.title}
                className="h-full w-full object-cover"
                data-testid={`image-${index + 1}`}
                src={card.src}
              />
            </div>

            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-foreground">
                  {card.title}
                </h2>
                <span
                  className={
                    card.state === "Working"
                      ? "rounded-full border border-success/20 bg-success-soft px-3 py-1 text-xs font-medium text-success-soft-foreground"
                      : "rounded-full border border-danger/20 bg-danger-soft px-3 py-1 text-xs font-medium text-danger-soft-foreground"
                  }
                >
                  {card.state}
                </span>
              </div>

              <p className="text-sm text-muted">{card.note}</p>
              <code className="block rounded-xl bg-background-secondary px-3 py-2 text-xs text-foreground">
                {card.src}
              </code>
            </div>
          </article>
        ))}
      </div>

      <aside className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
        <h2 className="text-xl font-semibold text-foreground">
          Automation notes
        </h2>
        <ul className="mt-4 space-y-3 text-sm text-muted">
          <li>Some images should render and some should fail.</li>
          <li>Good checks: natural image size, broken request URLs, and card-level labeling.</li>
          <li>The broken assets are intentional and should stay broken.</li>
        </ul>
      </aside>
    </section>
  );
}
