"use client";

import { MouseEvent, useEffect, useState } from "react";

import { subtitle, title } from "@/components/primitives";

type FileItem = {
  id: string;
  name: string;
  kind: "folder" | "document" | "image" | "spreadsheet";
  updated: string;
  owner: string;
};

type ContextState = {
  item: FileItem;
  x: number;
  y: number;
} | null;

const fileItems: FileItem[] = [
  {
    id: "workspace-folder",
    name: "Automation Workspace",
    kind: "folder",
    updated: "2 minutes ago",
    owner: "Ava Johnson",
  },
  {
    id: "release-notes",
    name: "Release Notes Q3.docx",
    kind: "document",
    updated: "12 minutes ago",
    owner: "Leo Brooks",
  },
  {
    id: "campaign-mock",
    name: "Homepage Redesign.png",
    kind: "image",
    updated: "26 minutes ago",
    owner: "Elena Costa",
  },
  {
    id: "forecast-sheet",
    name: "Demand Forecast.xlsx",
    kind: "spreadsheet",
    updated: "1 hour ago",
    owner: "Priya Nair",
  },
];

const iconByKind: Record<FileItem["kind"], string> = {
  folder: "Folder",
  document: "Doc",
  image: "Image",
  spreadsheet: "Sheet",
};

function buildMenuItems(item: FileItem) {
  return [
    {
      id: "open",
      label: item.kind === "folder" ? "Open folder" : "Open file",
    },
    {
      id: "rename",
      label: "Rename",
    },
    {
      id: "share",
      label: "Share",
    },
    {
      id: "duplicate",
      label: item.kind === "folder" ? "Duplicate folder" : "Duplicate file",
    },
    {
      id: "archive",
      label: "Move to archive",
    },
  ];
}

export default function ContextMenuPage() {
  const [contextState, setContextState] = useState<ContextState>(null);
  const [actionLog, setActionLog] = useState<string[]>([
    "Right-click any row to open the context menu.",
  ]);

  useEffect(() => {
    const closeMenu = () => setContextState(null);

    window.addEventListener("click", closeMenu);
    window.addEventListener("scroll", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu);
      window.removeEventListener("scroll", closeMenu);
    };
  }, []);

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>, item: FileItem) => {
    event.preventDefault();
    const menuWidth = 260;
    const menuHeight = 260;

    setContextState({
      item,
      x: Math.min(event.clientX, window.innerWidth - menuWidth),
      y: Math.min(event.clientY, window.innerHeight - menuHeight),
    });
  };

  const handleMenuAction = (actionLabel: string) => {
    if (!contextState) {
      return;
    }

    setActionLog((current) => [
      `${actionLabel} on ${contextState.item.name}`,
      ...current,
    ]);
    setContextState(null);
  };

  const menuItems = contextState ? buildMenuItems(contextState.item) : [];

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-separator bg-surface px-6 py-10 shadow-surface backdrop-blur md:px-10">
        <div className="pointer-events-none absolute left-0 top-0 h-44 w-44 rounded-full bg-[var(--accent-soft)] blur-3xl" />
        <div className="relative space-y-5">
          <span className="inline-flex rounded-full border border-separator bg-surface-secondary px-3 py-1 text-sm text-foreground">
            Interaction Sample
          </span>

          <div className="max-w-3xl space-y-4">
            <h1 className={title({ size: "lg" })}>Context Menu</h1>
            <p className={subtitle({ class: "max-w-3xl" })}>
              This page simulates a file manager. Right-clicking any file or
              folder row opens a context menu positioned near the pointer with
              actions that depend on the selected item.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="relative rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              Shared workspace
            </h2>
            <p className="text-sm text-muted">
              Right-click any row to open the menu. Left click anywhere else to close it.
            </p>
          </div>

          <div className="mt-5 space-y-3" data-testid="file-list">
            {fileItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-separator bg-background-secondary px-4 py-4"
                data-testid={item.id}
                onContextMenu={(event) => handleContextMenu(event, item)}
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="rounded-full border border-separator bg-surface px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    {iconByKind[item.kind]}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">{item.name}</p>
                    <p className="mt-1 text-sm text-muted">
                      Owned by {item.owner} · Updated {item.updated}
                    </p>
                  </div>
                </div>

                <div className="rounded-full bg-surface px-3 py-1 text-xs text-muted">
                  {item.kind}
                </div>
              </div>
            ))}
          </div>

          {contextState ? (
            <div
              className="fixed z-50 min-w-56 rounded-[1.25rem] border border-separator bg-surface p-2 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              data-testid="context-menu"
              style={{
                left: contextState.x,
                top: contextState.y,
              }}
            >
              <div className="border-b border-separator px-3 pb-2 pt-1">
                <p className="text-sm font-semibold text-foreground">
                  {contextState.item.name}
                </p>
                <p className="text-xs text-muted">{contextState.item.kind}</p>
              </div>

              <div className="mt-2 space-y-1">
                {menuItems.map((menuItem) => (
                  <button
                    key={menuItem.id}
                    className="block w-full rounded-xl px-3 py-2 text-left text-sm text-foreground transition hover:bg-background-secondary"
                    data-testid={`menu-item-${menuItem.id}`}
                    type="button"
                    onClick={() => handleMenuAction(menuItem.label)}
                  >
                    {menuItem.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <aside className="space-y-6">
          <div className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <h2 className="text-xl font-semibold text-foreground">
              Latest actions
            </h2>
            <div className="mt-4 space-y-3 text-sm text-muted" data-testid="action-log">
              {actionLog.map((entry, index) => (
                <div
                  key={`${entry}-${index}`}
                  className="rounded-[1rem] border border-separator bg-background-secondary px-3 py-3"
                >
                  {entry}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <h2 className="text-xl font-semibold text-foreground">
              Automation notes
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>Right-click a row to open the menu near the pointer position.</li>
              <li>Menu labels change slightly based on whether the target is a file or folder.</li>
              <li>Choosing an action appends a human-readable log entry.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
