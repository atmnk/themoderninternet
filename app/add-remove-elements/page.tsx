"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

import { subtitle, title } from "@/components/primitives";

type DynamicElement = {
  id: number;
};

export default function AddRemoveElementsPage() {
  const [elements, setElements] = useState<DynamicElement[]>([]);

  const addElement = () => {
    setElements((current) => [...current, { id: Date.now() + current.length }]);
  };

  const removeElement = (id: number) => {
    setElements((current) => current.filter((element) => element.id !== id));
  };

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-separator bg-surface px-6 py-10 shadow-surface backdrop-blur md:px-10">
        <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-[var(--accent-soft)] blur-3xl" />
        <div className="relative space-y-5">
          <span className="inline-flex rounded-full border border-separator bg-surface-secondary px-3 py-1 text-sm text-foreground">
            Dynamic DOM Sample
          </span>

          <div className="max-w-3xl space-y-4">
            <h1 className={title({ size: "lg" })}>Add/Remove Elements</h1>
            <p className={subtitle({ class: "max-w-3xl" })}>
              Use the button below to add new elements to the page. Each element
              is created dynamically and includes its own remove control so
              automation can practice working with changing DOM structure.
            </p>
          </div>

          <Button
            className="rounded-full shadow-surface"
            data-testid="add-element"
            variant="primary"
            onPress={addElement}
          >
            Add Element
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.35fr_0.85fr]">
        <div className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Dynamic Elements
            </h2>
            <span
              className="rounded-full border border-separator bg-surface-secondary px-3 py-1 text-sm text-muted"
              data-testid="element-count"
            >
              {elements.length} active
            </span>
          </div>

          <div
            className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
            data-testid="elements-container"
          >
            {elements.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-separator bg-background-secondary p-6 text-sm text-muted">
                No dynamic elements yet. Add one to create a new removable DOM
                node.
              </div>
            ) : null}

            {elements.map((element, index) => (
              <div
                key={element.id}
                className="rounded-[1.5rem] border border-separator bg-surface-secondary p-4"
                data-testid={`dynamic-element-${index + 1}`}
              >
                <p className="text-sm uppercase tracking-[0.18em] text-muted">
                  Dynamic element
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  Element {index + 1}
                </p>
                <p className="mt-1 text-sm text-muted">
                  Added at runtime for selector and action practice.
                </p>

                <Button
                  className="mt-4 rounded-full"
                  data-testid={`remove-element-${index + 1}`}
                  variant="secondary"
                  onPress={() => removeElement(element.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
          <h2 className="text-xl font-semibold text-foreground">
            Automation notes
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>Click `Add Element` to append a fresh DOM node.</li>
            <li>Each new node creates its own `Delete` button.</li>
            <li>Removing one element should not disturb the others.</li>
            <li>
              Good assertions: element count, container children, and per-button
              visibility.
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
