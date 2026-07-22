"use client";

import { ChangeEvent, ReactNode, useState } from "react";

import { subtitle, title } from "@/components/primitives";

const basicOptions = [
  { value: "email-alerts", label: "Email alerts" },
  { value: "browser-notices", label: "Browser notices" },
  { value: "weekly-summary", label: "Weekly summary" },
  { value: "product-updates", label: "Product updates" },
];

const preferenceOptions = [
  {
    value: "compact-cards",
    label: "Compact cards",
    detail: "Reduce spacing in dense layouts.",
  },
  {
    value: "sticky-filters",
    label: "Sticky filters",
    detail: "Keep controls visible while scrolling.",
  },
  {
    value: "auto-refresh",
    label: "Auto refresh",
    detail: "Update content every 30 seconds.",
  },
  {
    value: "show-previews",
    label: "Show previews",
    detail: "Display media thumbnails in feeds.",
  },
];

const permissionOptions = [
  { value: "view", label: "View dashboards" },
  { value: "edit", label: "Edit settings" },
  { value: "export", label: "Export data" },
  { value: "admin", label: "Admin access", disabled: true },
];

const checklistOptions = [
  { value: "qa-steps-1", label: "Verify default checked state" },
  { value: "qa-steps-2", label: "Toggle repeated checkbox labels" },
  { value: "qa-steps-3", label: "Assert disabled styling" },
  { value: "qa-steps-4", label: "Submit selected values" },
];

function toggleSelection(
  current: string[],
  value: string,
  nextChecked: boolean,
) {
  if (nextChecked) {
    return current.includes(value) ? current : [...current, value];
  }

  return current.filter((item) => item !== value);
}

function NativeCheckbox({
  checked,
  className = "",
  dataTestId,
  disabled = false,
  label,
  name,
  onChange,
  value,
}: {
  checked: boolean;
  className?: string;
  dataTestId: string;
  disabled?: boolean;
  label: ReactNode;
  name?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) {
  return (
    <label
      className={`flex items-start gap-3 rounded-[1.25rem] border border-separator px-4 py-3 ${
        disabled
          ? "cursor-not-allowed bg-background-secondary/60 opacity-60"
          : "cursor-pointer bg-background-secondary"
      } ${className}`}
    >
      <input
        checked={checked}
        className="mt-1 h-4 w-4 accent-[var(--accent)]"
        data-testid={dataTestId}
        disabled={disabled}
        name={name}
        type="checkbox"
        value={value}
        onChange={onChange}
      />
      <div className="min-w-0">{label}</div>
    </label>
  );
}

export default function CheckboxesPage() {
  const [basicSelection, setBasicSelection] = useState<string[]>([
    "browser-notices",
    "weekly-summary",
  ]);
  const [preferenceSelection, setPreferenceSelection] = useState<string[]>([
    "compact-cards",
    "show-previews",
  ]);
  const [permissionSelection, setPermissionSelection] = useState<string[]>([
    "view",
    "export",
  ]);
  const [checklistSelection, setChecklistSelection] = useState<string[]>([
    "qa-steps-1",
    "qa-steps-4",
  ]);

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-separator bg-surface px-6 py-10 shadow-surface backdrop-blur md:px-10">
        <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-[var(--accent-soft)] blur-3xl" />
        <div className="relative space-y-5">
          <span className="inline-flex rounded-full border border-separator bg-surface-secondary px-3 py-1 text-sm text-foreground">
            Form Control Sample
          </span>

          <div className="max-w-3xl space-y-4">
            <h1 className={title({ size: "lg" })}>Checkboxes</h1>
            <p className={subtitle({ class: "max-w-3xl" })}>
              This page uses real native checkbox inputs in several different
              wrappers so automation can practice checked state assertions,
              section-scoped selectors, disabled cases, and repeated list rows.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Basic stacked checkboxes
              </h2>
              <p className="text-sm text-muted">
                Standard native checkboxes with mixed default states.
              </p>
            </div>

            <div className="mt-5 space-y-3" data-testid="basic-checkbox-group">
              {basicOptions.map((option) => (
                <NativeCheckbox
                  key={option.value}
                  checked={basicSelection.includes(option.value)}
                  className="rounded-2xl"
                  dataTestId={option.value}
                  label={<span className="text-foreground">{option.label}</span>}
                  name="basic-checkboxes"
                  value={option.value}
                  onChange={(event) =>
                    setBasicSelection((current) =>
                      toggleSelection(current, option.value, event.target.checked),
                    )
                  }
                />
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Detail cards
              </h2>
              <p className="text-sm text-muted">
                Card-style wrappers around the same native checkbox behavior.
              </p>
            </div>

            <div
              className="mt-5 grid gap-4 md:grid-cols-2"
              data-testid="detail-checkbox-group"
            >
              {preferenceOptions.map((option) => (
                <NativeCheckbox
                  key={option.value}
                  checked={preferenceSelection.includes(option.value)}
                  className={`rounded-[1.5rem] ${
                    preferenceSelection.includes(option.value)
                      ? "border-[var(--accent)] bg-[var(--accent-soft)]/30"
                      : ""
                  }`}
                  dataTestId={option.value}
                  label={
                    <div>
                      <p className="font-medium text-foreground">{option.label}</p>
                      <p className="mt-1 text-sm text-muted">{option.detail}</p>
                    </div>
                  }
                  name="detail-checkboxes"
                  value={option.value}
                  onChange={(event) =>
                    setPreferenceSelection((current) =>
                      toggleSelection(current, option.value, event.target.checked),
                    )
                  }
                />
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Permission matrix
              </h2>
              <p className="text-sm text-muted">
                Compact rows with one disabled checkbox for state and accessibility checks.
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {permissionOptions.map((option) => (
                <NativeCheckbox
                  key={option.value}
                  checked={permissionSelection.includes(option.value)}
                  dataTestId={option.value}
                  disabled={option.disabled}
                  label={<span className="text-foreground">{option.label}</span>}
                  name="permission-checkboxes"
                  value={option.value}
                  onChange={(event) =>
                    setPermissionSelection((current) =>
                      toggleSelection(current, option.value, event.target.checked),
                    )
                  }
                />
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Repeated checklist rows
              </h2>
              <p className="text-sm text-muted">
                Similar-looking rows help test nth selectors and repeated labels.
              </p>
            </div>

            <div
              className="mt-5 space-y-3"
              data-testid="checklist-checkbox-group"
            >
              {checklistOptions.map((option, index) => (
                <NativeCheckbox
                  key={option.value}
                  checked={checklistSelection.includes(option.value)}
                  dataTestId={`checklist-row-${index + 1}`}
                  label={<span className="text-foreground">{option.label}</span>}
                  name="checklist-checkboxes"
                  value={option.value}
                  onChange={(event) =>
                    setChecklistSelection((current) =>
                      toggleSelection(current, option.value, event.target.checked),
                    )
                  }
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <h2 className="text-xl font-semibold text-foreground">
              Selected values
            </h2>
            <div className="mt-4 space-y-4 text-sm text-muted">
              <div data-testid="basic-selection">
                Basic: {basicSelection.join(", ") || "None"}
              </div>
              <div data-testid="detail-selection">
                Detail cards: {preferenceSelection.join(", ") || "None"}
              </div>
              <div data-testid="permission-selection">
                Permissions: {permissionSelection.join(", ") || "None"}
              </div>
              <div data-testid="checklist-selection">
                Checklist: {checklistSelection.join(", ") || "None"}
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <h2 className="text-xl font-semibold text-foreground">
              Automation notes
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>Every control on this page is a native `input[type="checkbox"]`.</li>
              <li>Some options start checked, and one permission option is disabled.</li>
              <li>Selection summaries update live to help with assertion practice.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
