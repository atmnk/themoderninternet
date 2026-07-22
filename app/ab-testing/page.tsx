import Link from "next/link";
import { cookies } from "next/headers";

import { subtitle, title } from "@/components/primitives";

const VARIANT_COOKIE = "tmi_ab_testing_variant";

type ExperimentVariant = "control" | "variation";

type VariantContent = {
  badge: string;
  eyebrow: string;
  headline: string;
  description: string;
  panelTitle: string;
  panelCopy: string;
  primaryAction: string;
  secondaryAction: string;
  stats: Array<{ label: string; value: string }>;
};

const variantContent: Record<ExperimentVariant, VariantContent> = {
  control: {
    badge: "A/B Testing Sample",
    eyebrow: "Control experience",
    headline: "A/B Test Control",
    description:
      "Also known as split testing. This version focuses on a direct explanation and a classic call-to-action flow so teams can compare clear, familiar messaging against a more guided alternative.",
    panelTitle: "Classic CTA Flow",
    panelCopy:
      "The control experience keeps the user journey simple: read the explanation, review the experiment facts, and trigger a straightforward action.",
    primaryAction: "Start free trial",
    secondaryAction: "View pricing",
    stats: [
      { label: "Goal", value: "Increase click-through" },
      { label: "Copy style", value: "Direct and concise" },
      { label: "Interface pattern", value: "Dual CTA buttons" },
    ],
  },
  variation: {
    badge: "A/B Testing Sample",
    eyebrow: "Variant experience",
    headline: "A/B Test Variation",
    description:
      "This version tests a more guided interaction. Instead of presenting only direct calls to action, it asks the user to self-identify their goal before continuing, changing both the text and the functionality on the page.",
    panelTitle: "Guided Choice Flow",
    panelCopy:
      "The variation introduces segmented choices so the page can steer users toward a more tailored next step and measure whether guided interaction performs better.",
    primaryAction: "Choose a journey",
    secondaryAction: "Compare plans",
    stats: [
      { label: "Goal", value: "Increase qualified intent" },
      { label: "Copy style", value: "Guided and exploratory" },
      { label: "Interface pattern", value: "Selectable options" },
    ],
  },
};

function ControlExperience() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <button
        className="rounded-2xl border border-success/30 bg-success-soft px-5 py-4 text-left transition hover:bg-success-soft-hover"
        type="button"
      >
        <p className="text-sm uppercase tracking-[0.18em] text-success-soft-foreground">
          Primary action
        </p>
        <p className="mt-2 text-xl font-semibold text-foreground">
          Start free trial
        </p>
        <p className="mt-2 text-sm text-muted">
          A clear conversion-first action for users already ready to continue.
        </p>
      </button>

      <button
        className="rounded-2xl border border-separator bg-surface-secondary px-5 py-4 text-left transition hover:bg-surface-hover"
        type="button"
      >
        <p className="text-sm uppercase tracking-[0.18em] text-muted">
          Secondary action
        </p>
        <p className="mt-2 text-xl font-semibold text-foreground">View pricing</p>
        <p className="mt-2 text-sm text-muted">
          A lower-commitment path for users who still need more information.
        </p>
      </button>
    </div>
  );
}

function VariationExperience() {
  const choices = [
    {
      title: "I want faster onboarding",
      detail: "Test whether guided onboarding intent improves downstream clicks.",
    },
    {
      title: "I need stronger analytics",
      detail: "Test whether outcome-based language drives more qualified engagement.",
    },
    {
      title: "I am just exploring",
      detail: "Test whether a softer path reduces bounce for colder visitors.",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {choices.map((choice) => (
          <label
            key={choice.title}
            className="flex cursor-pointer items-start gap-3 rounded-2xl border border-accent/25 bg-accent-soft px-4 py-4 transition hover:bg-accent-soft-hover"
          >
            <input
              className="mt-1 h-4 w-4 accent-[var(--accent)]"
              name="visitor-goal"
              type="radio"
              value={choice.title}
            />
            <span>
              <span className="block text-base font-semibold text-foreground">
                {choice.title}
              </span>
              <span className="mt-1 block text-sm text-muted">
                {choice.detail}
              </span>
            </span>
          </label>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          className="rounded-full border border-accent/30 bg-accent-soft px-5 py-3 font-medium text-accent-soft-foreground transition hover:bg-accent-soft-hover"
          type="button"
        >
          Choose a journey
        </button>
        <button
          className="rounded-full border border-separator bg-surface-secondary px-5 py-3 font-medium text-foreground transition hover:bg-surface-hover"
          type="button"
        >
          Compare plans
        </button>
      </div>
    </div>
  );
}

export default async function AbTestingPage() {
  const cookieStore = await cookies();
  const cookieVariant = cookieStore.get(VARIANT_COOKIE)?.value as
    | ExperimentVariant
    | undefined;
  const variant =
    cookieVariant === "control" || cookieVariant === "variation"
      ? cookieVariant
      : "control";

  const content = variantContent[variant];

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-separator bg-surface px-6 py-10 shadow-surface backdrop-blur md:px-10">
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[var(--accent-soft)] blur-3xl" />
        <div className="relative space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-separator bg-surface-secondary px-3 py-1 text-sm text-foreground">
              {content.badge}
            </span>
            <span
              className="rounded-full border border-separator bg-background-secondary px-3 py-1 text-sm text-muted"
              data-testid="ab-variant-pill"
            >
              Variant: {variant}
            </span>
          </div>

          <div className="max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.24em] text-muted">
              {content.eyebrow}
            </p>
            <h1 className={title({ size: "lg" })} data-testid="ab-page-title">
              {content.headline}
            </h1>
            <p className={subtitle({ class: "max-w-3xl" })}>{content.description}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {content.stats.map((fact) => (
          <div
            key={fact.label}
            className="rounded-[1.5rem] border border-separator bg-surface p-5 shadow-surface"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-muted">
              {fact.label}
            </p>
            <p className="mt-3 text-lg font-semibold text-foreground">{fact.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
          <h2 className="text-2xl font-semibold text-foreground">
            {content.panelTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">{content.panelCopy}</p>

          <div className="mt-6" data-testid="ab-experience-panel">
            {variant === "control" ? <ControlExperience /> : <VariationExperience />}
          </div>
        </div>

        <aside className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
          <h2 className="text-xl font-semibold text-foreground">
            Experiment metadata
          </h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="uppercase tracking-[0.18em] text-muted">
                Cookie name
              </dt>
              <dd className="mt-1 text-foreground">{VARIANT_COOKIE}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.18em] text-muted">
                Active bucket
              </dt>
              <dd className="mt-1 text-foreground" data-testid="ab-cookie-value">
                {variant}
              </dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.18em] text-muted">
                Automation use
              </dt>
              <dd className="mt-1 text-muted">
                Assert the title, detect the assigned bucket, and verify that the
                same experience persists across refreshes.
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="rounded-full border border-separator bg-surface-secondary px-4 py-2 text-sm font-medium text-foreground transition hover:bg-surface-hover"
              href="/ab-testing/reset"
            >
              Reset experiment cookie
            </Link>
            <Link
              className="rounded-full border border-separator bg-transparent px-4 py-2 text-sm font-medium text-muted transition hover:text-foreground"
              href="/"
            >
              Back to all pages
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
