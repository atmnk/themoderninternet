import { subtitle, title } from "@/components/primitives";

export default function BasicAuthPage() {
  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-separator bg-surface px-6 py-10 shadow-surface backdrop-blur md:px-10">
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[var(--accent-soft)] blur-3xl" />
        <div className="relative space-y-5">
          <span className="inline-flex rounded-full border border-separator bg-surface-secondary px-3 py-1 text-sm text-foreground">
            Protected Route Sample
          </span>

          <div className="max-w-3xl space-y-4">
            <h1 className={title({ size: "lg" })}>Basic Auth</h1>
            <p className={subtitle({ class: "max-w-3xl" })}>
              This page is protected by HTTP Basic Authentication. Use the
              browser prompt and authenticate with the correct credentials to
              access this content.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.35fr_0.85fr]">
        <div className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
          <h2 className="text-2xl font-semibold text-foreground">
            Authenticated Content
          </h2>
          <div className="mt-4 space-y-4 text-muted">
            <p>
              You are seeing this page only because the request included valid
              Basic Auth credentials.
            </p>
            <p>
              This exercise is useful for automation flows that need to attach
              credentials at the network layer instead of filling a login form.
            </p>
            <p className="rounded-2xl border border-separator bg-surface-secondary px-4 py-4 text-foreground">
              Username: <span className="font-semibold">admin</span>
              <br />
              Password: <span className="font-semibold">admin</span>
            </p>
          </div>
        </div>

        <aside className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
          <h2 className="text-xl font-semibold text-foreground">
            Automation notes
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              The browser should prompt with a native auth dialog when
              credentials are missing.
            </li>
            <li>
              The correct credentials are `admin` / `admin`.
            </li>
            <li>
              Good assertions: 401 before auth, 200 after auth, and protected
              content visibility.
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
