"use client";

import { DragEvent, useMemo, useState } from "react";

import { subtitle, title } from "@/components/primitives";

type LaneId = "backlog" | "in-progress" | "done";

type TaskCard = {
  id: string;
  title: string;
  lane: LaneId;
  owner: string;
};

type AssetCard = {
  id: string;
  name: string;
  type: "banner" | "logo" | "document";
};

type ReorderCard = {
  id: string;
  label: string;
  stat: string;
};

type AssetZone = "hero-parent" | "hero-overlay" | "footer";

const initialTasks: TaskCard[] = [
  { id: "task-1", title: "Audit onboarding selectors", lane: "backlog", owner: "Ava" },
  { id: "task-2", title: "Review flaky payment test", lane: "backlog", owner: "Leo" },
  { id: "task-3", title: "Compare CTA variant clicks", lane: "in-progress", owner: "Priya" },
  { id: "task-4", title: "Ship support dashboard fix", lane: "done", owner: "Elena" },
];

const initialAssets: AssetCard[] = [
  { id: "asset-1", name: "Q3 Hero Banner", type: "banner" },
  { id: "asset-2", name: "Partner Logo Pack", type: "logo" },
  { id: "asset-3", name: "Launch Checklist", type: "document" },
];

const initialPriorityCards: ReorderCard[] = [
  { id: "priority-1", label: "Checkout Errors", stat: "18 unresolved" },
  { id: "priority-2", label: "Image Failures", stat: "9 unresolved" },
  { id: "priority-3", label: "Login Timeouts", stat: "6 unresolved" },
  { id: "priority-4", label: "Export Bugs", stat: "3 unresolved" },
];

const laneLabels: Record<LaneId, string> = {
  backlog: "Backlog",
  "in-progress": "In Progress",
  done: "Done",
};

type DragPayload =
  | { type: "task"; id: string }
  | { type: "asset"; id: string }
  | { type: "priority"; id: string };

function encodeDragPayload(payload: DragPayload) {
  return JSON.stringify(payload);
}

function decodeDragPayload(raw: string): DragPayload | null {
  try {
    const parsed = JSON.parse(raw) as DragPayload;

    if (!parsed || typeof parsed !== "object" || !("type" in parsed) || !("id" in parsed)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function reorderItems<T extends { id: string }>(items: T[], draggedId: string, targetId: string) {
  const draggedIndex = items.findIndex((item) => item.id === draggedId);
  const targetIndex = items.findIndex((item) => item.id === targetId);

  if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) {
    return items;
  }

  const next = [...items];
  const [draggedItem] = next.splice(draggedIndex, 1);

  next.splice(targetIndex, 0, draggedItem);

  return next;
}

export default function DragAndDropPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [assetPlacement, setAssetPlacement] = useState<Record<AssetZone, string[]>>({
    "hero-parent": [],
    "hero-overlay": [],
    footer: [],
  });
  const [priorityCards, setPriorityCards] = useState(initialPriorityCards);
  const [activityLog, setActivityLog] = useState<string[]>([
    "Drag a card into a lane, nested slot, or priority position.",
  ]);

  const visibleAssets = useMemo(
    () => {
      const placedIds = new Set(
        Object.values(assetPlacement).flatMap((zoneItems) => zoneItems),
      );

      return initialAssets.filter((asset) => !placedIds.has(asset.id));
    },
    [assetPlacement],
  );

  const startDrag = (event: DragEvent<HTMLElement>, payload: DragPayload) => {
    event.dataTransfer.setData("text/plain", encodeDragPayload(payload));
    event.dataTransfer.effectAllowed = "move";
  };

  const allowDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const appendLog = (entry: string) => {
    setActivityLog((current) => [entry, ...current]);
  };

  const moveTaskToLane = (event: DragEvent<HTMLElement>, lane: LaneId) => {
    event.preventDefault();
    const payload = decodeDragPayload(event.dataTransfer.getData("text/plain"));

    if (!payload || payload.type !== "task") {
      return;
    }

    setTasks((current) =>
      current.map((task) =>
        task.id === payload.id
          ? {
              ...task,
              lane,
            }
          : task,
      ),
    );

    const task = tasks.find((item) => item.id === payload.id);

    if (task) {
      appendLog(`Moved ${task.title} to ${laneLabels[lane]}.`);
    }
  };

  const dropAssetIntoNestedTarget = (
    event: DragEvent<HTMLElement>,
    zoneId: AssetZone,
    zoneName: string,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const payload = decodeDragPayload(event.dataTransfer.getData("text/plain"));

    if (!payload || payload.type !== "asset") {
      return;
    }

    const asset = initialAssets.find((item) => item.id === payload.id);

    if (asset) {
      setAssetPlacement((current) => {
        const alreadyPlaced = Object.values(current).some((zoneItems) =>
          zoneItems.includes(asset.id),
        );

        if (alreadyPlaced) {
          return current;
        }

        return {
          ...current,
          [zoneId]: [...current[zoneId], asset.id],
        };
      });
      appendLog(`Dropped ${asset.name} into ${zoneName}.`);
    }
  };

  const reorderPriorityCards = (
    event: DragEvent<HTMLElement>,
    targetId: string,
  ) => {
    event.preventDefault();
    const payload = decodeDragPayload(event.dataTransfer.getData("text/plain"));

    if (!payload || payload.type !== "priority") {
      return;
    }

    setPriorityCards((current) => reorderItems(current, payload.id, targetId));

    const dragged = priorityCards.find((item) => item.id === payload.id);
    const target = priorityCards.find((item) => item.id === targetId);

    if (dragged && target) {
      appendLog(`Reordered ${dragged.label} around ${target.label}.`);
    }
  };

  const placedAssetsByZone = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(assetPlacement).map(([zoneId, assetIds]) => [
          zoneId,
          assetIds
            .map((assetId) => initialAssets.find((asset) => asset.id === assetId))
            .filter(Boolean) as AssetCard[],
        ]),
      ) as Record<AssetZone, AssetCard[]>,
    [assetPlacement],
  );

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-separator bg-surface px-6 py-10 shadow-surface backdrop-blur md:px-10">
        <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full bg-[var(--accent-soft)] blur-3xl" />
        <div className="relative space-y-5">
          <span className="inline-flex rounded-full border border-separator bg-surface-secondary px-3 py-1 text-sm text-foreground">
            Interaction Sample
          </span>

          <div className="max-w-3xl space-y-4">
            <h1 className={title({ size: "lg" })}>Drag And Drop</h1>
            <p className={subtitle({ class: "max-w-3xl" })}>
              This page includes several real-life drag-and-drop interactions:
              moving tasks between workflow lanes, dropping assets into nested
              campaign zones, and reordering priority cards inside a queue.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Workflow board
              </h2>
              <p className="text-sm text-muted">
                Drag tasks between simple lane targets like a sprint board.
              </p>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {(Object.keys(laneLabels) as LaneId[]).map((laneId) => (
                <div
                  key={laneId}
                  className="rounded-[1.5rem] border border-dashed border-separator bg-background-secondary p-4"
                  data-testid={`lane-${laneId}`}
                  onDragOver={allowDrop}
                  onDrop={(event) => moveTaskToLane(event, laneId)}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                    {laneLabels[laneId]}
                  </p>

                  <div className="mt-4 space-y-3">
                    {tasks
                      .filter((task) => task.lane === laneId)
                      .map((task) => (
                        <div
                          key={task.id}
                          className="cursor-grab rounded-[1.25rem] border border-separator bg-surface px-4 py-3 active:cursor-grabbing"
                          data-testid={task.id}
                          draggable
                          onDragStart={(event) =>
                            startDrag(event, { type: "task", id: task.id })
                          }
                        >
                          <p className="font-medium text-foreground">{task.title}</p>
                          <p className="mt-1 text-sm text-muted">Owner: {task.owner}</p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Nested campaign targets
              </h2>
              <p className="text-sm text-muted">
                Drag assets from the tray into nested drop areas inside a page-builder style canvas.
              </p>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
              <div
                className="rounded-[1.5rem] border border-separator bg-background-secondary p-4"
                data-testid="asset-tray"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                  Asset tray
                </p>

                <div className="mt-4 space-y-3">
                  {visibleAssets.length === 0 ? (
                    <div className="rounded-[1rem] border border-dashed border-separator px-4 py-6 text-sm text-muted">
                      All demo assets have been placed.
                    </div>
                  ) : null}

                  {visibleAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="cursor-grab rounded-[1.25rem] border border-separator bg-surface px-4 py-3 active:cursor-grabbing"
                      data-testid={asset.id}
                      draggable
                      onDragStart={(event) =>
                        startDrag(event, { type: "asset", id: asset.id })
                      }
                    >
                      <p className="font-medium text-foreground">{asset.name}</p>
                      <p className="mt-1 text-sm text-muted">Type: {asset.type}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="rounded-[1.75rem] border border-separator bg-background-secondary p-5"
                data-testid="campaign-canvas"
                onDragOver={allowDrop}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                  Campaign canvas
                </p>

                <div className="mt-4 grid gap-4">
                  <div
                    className="rounded-[1.5rem] border border-dashed border-separator bg-surface px-5 py-8"
                    data-testid="drop-hero"
                    onDragOver={allowDrop}
                    onDrop={(event) =>
                      dropAssetIntoNestedTarget(
                        event,
                        "hero-parent",
                        "Hero section",
                      )
                    }
                  >
                    <p className="font-medium text-foreground">Hero section</p>
                    <p className="mt-1 text-sm text-muted">
                      Drop banners or images here. This parent zone accepts drops
                      separately from the nested child zone below.
                    </p>

                    <div className="mt-4 space-y-2" data-testid="hero-parent-items">
                      {placedAssetsByZone["hero-parent"].map((asset) => (
                        <div
                          key={asset.id}
                          className="rounded-[1rem] border border-separator bg-background-secondary px-3 py-3 text-sm text-foreground"
                        >
                          {asset.name}
                        </div>
                      ))}
                    </div>

                    <div
                      className="mt-4 rounded-[1rem] border border-dashed border-separator bg-background-secondary px-4 py-5 text-sm text-muted"
                      data-testid="drop-hero-overlay"
                      onDragOver={allowDrop}
                      onDrop={(event) =>
                        dropAssetIntoNestedTarget(
                          event,
                          "hero-overlay",
                          "Hero overlay zone",
                        )
                      }
                    >
                      <p className="font-medium text-foreground">Nested overlay zone</p>
                      <p className="mt-1 text-sm text-muted">
                        This child target is inside the hero section and keeps
                        its own dropped items.
                      </p>

                      <div className="mt-4 space-y-2" data-testid="hero-overlay-items">
                        {placedAssetsByZone["hero-overlay"].map((asset) => (
                          <div
                            key={asset.id}
                            className="rounded-[0.9rem] border border-separator bg-surface px-3 py-3 text-sm text-foreground"
                          >
                            {asset.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className="rounded-[1.5rem] border border-dashed border-separator bg-surface px-5 py-8"
                    data-testid="drop-footer"
                    onDragOver={allowDrop}
                    onDrop={(event) =>
                      dropAssetIntoNestedTarget(event, "footer", "Footer section")
                    }
                  >
                    <p className="font-medium text-foreground">Footer section</p>
                    <p className="mt-1 text-sm text-muted">
                      Drop logos or documents here.
                    </p>

                    <div className="mt-4 space-y-2" data-testid="footer-items">
                      {placedAssetsByZone.footer.map((asset) => (
                        <div
                          key={asset.id}
                          className="rounded-[1rem] border border-separator bg-background-secondary px-3 py-3 text-sm text-foreground"
                        >
                          {asset.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Priority reorder list
              </h2>
              <p className="text-sm text-muted">
                Drag cards onto other cards to reprioritize an incident queue.
              </p>
            </div>

            <div className="mt-5 space-y-3" data-testid="priority-list">
              {priorityCards.map((card) => (
                <div
                  key={card.id}
                  className="cursor-grab rounded-[1.25rem] border border-separator bg-background-secondary px-4 py-4 active:cursor-grabbing"
                  data-testid={card.id}
                  draggable
                  onDragOver={allowDrop}
                  onDragStart={(event) =>
                    startDrag(event, { type: "priority", id: card.id })
                  }
                  onDrop={(event) => reorderPriorityCards(event, card.id)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-foreground">{card.label}</p>
                    <span className="rounded-full bg-surface px-3 py-1 text-xs text-muted">
                      {card.stat}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <h2 className="text-xl font-semibold text-foreground">
              Activity log
            </h2>
            <div className="mt-4 space-y-3 text-sm text-muted" data-testid="drag-log">
              {activityLog.map((entry, index) => (
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
              <li>The page includes simple lanes, nested targets, and reorder-on-drop behavior.</li>
              <li>All drag sources use native `draggable` elements and `dataTransfer` payloads.</li>
              <li>The activity log updates after every successful drop to simplify assertions.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
