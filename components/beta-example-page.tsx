"use client";

import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

import { subtitle, title } from "@/components/primitives";
import { BetaExampleConfig } from "@/lib/beta-examples";

function Shell({
  config,
  children,
}: {
  config: BetaExampleConfig;
  children: ReactNode;
}) {
  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-separator bg-surface px-6 py-10 shadow-surface backdrop-blur md:px-10">
        <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full bg-[var(--warning-soft)] blur-3xl" />
        <div className="relative space-y-5">
          <span className="inline-flex rounded-full border border-separator bg-surface-secondary px-3 py-1 text-sm text-foreground">
            Beta Exercise
          </span>
          <div className="max-w-3xl space-y-4">
            <h1 className={title({ size: "lg" })}>{config.title}</h1>
            <p className={subtitle({ class: "max-w-3xl" })}>{config.description}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-6">{children}</div>

        <aside className="space-y-6">
          <div className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <h2 className="text-xl font-semibold text-foreground">Beta notes</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {config.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function BetaExamplePage({ config }: { config: BetaExampleConfig }) {
  const router = useRouter();
  const [statusText, setStatusText] = useState("Idle");
  const [authUser, setAuthUser] = useState("");
  const [authPass, setAuthPass] = useState("");
  const [authSuccess, setAuthSuccess] = useState(false);
  const [navVariant, setNavVariant] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [cardsSeed, setCardsSeed] = useState(0);
  const [checkboxPresent, setCheckboxPresent] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [inputEnabled, setInputEnabled] = useState(false);
  const [dynamicInput, setDynamicInput] = useState("Automation");
  const [delayedVisible, setDelayedVisible] = useState(false);
  const [showEntryModal, setShowEntryModal] = useState(config.kind === "entry-ad");
  const [showExitModal, setShowExitModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState<string | null>(null);
  const [frameMode, setFrameMode] = useState("editor");
  const [geoMessage, setGeoMessage] = useState("Location not requested yet.");
  const [sliderValue, setSliderValue] = useState(3.5);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [numberValue, setNumberValue] = useState(12);
  const [menuPath, setMenuPath] = useState<string[]>(["Enabled"]);
  const [dialogResult, setDialogResult] = useState("No dialog action yet.");
  const [errorCount, setErrorCount] = useState(1);
  const [lastKey, setLastKey] = useState("None");
  const [windowOpened, setWindowOpened] = useState(false);
  const [notice, setNotice] = useState("Notification area is idle.");
  const [redirecting, setRedirecting] = useState(false);
  const [redirectStep, setRedirectStep] = useState("Waiting");
  const [shiftMode, setShiftMode] = useState(0);
  const [slowCards, setSlowCards] = useState([
    { id: "slow-1", loaded: false },
    { id: "slow-2", loaded: false },
    { id: "slow-3", loaded: false },
  ]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [statusCode, setStatusCode] = useState(200);
  const [typoSeed, setTypoSeed] = useState(0);
  const [editorContent, setEditorContent] = useState("Start editing the beta content here.");
  const shadowHostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (config.kind !== "javascript-error") {
      return;
    }

    setStatusText(`Onload error recorded (${errorCount}).`);
  }, [config.kind, errorCount]);

  useEffect(() => {
    if (config.kind !== "exit-intent") {
      return;
    }

    const handleMouseOut = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        setShowExitModal(true);
      }
    };

    window.addEventListener("mouseout", handleMouseOut);

    return () => window.removeEventListener("mouseout", handleMouseOut);
  }, [config.kind]);

  useEffect(() => {
    if (config.kind !== "shadow-dom" || !shadowHostRef.current) {
      return;
    }

    const host = shadowHostRef.current;
    const root = host.shadowRoot ?? host.attachShadow({ mode: "open" });

    root.innerHTML = `
      <style>
        .panel { padding: 16px; border-radius: 16px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: white; font-family: sans-serif; }
        .button { margin-top: 12px; padding: 10px 14px; border-radius: 999px; border: 0; background: #7dd3fc; color: #082f49; cursor: pointer; font-weight: 600; }
      </style>
      <div class="panel">
        <div id="shadow-text">Shadow DOM beta content is mounted.</div>
        <button class="button" id="shadow-button">Shadow Action</button>
      </div>
    `;

    const button = root.getElementById("shadow-button");
    const text = root.getElementById("shadow-text");

    button?.addEventListener("click", () => {
      if (text) {
        text.textContent = "Shadow action clicked.";
      }
    });
  }, [config.kind]);

  const shuffledCards = useMemo(() => {
    const variants = [
      [
        { title: "Maya Chen", body: "Updated the experiment copy for mobile onboarding." },
        { title: "Leo Brooks", body: "Investigated a flaky alert in the retry pipeline." },
      ],
      [
        { title: "Priya Nair", body: "Swapped the hero banner and adjusted campaign timing." },
        { title: "Elena Costa", body: "Reviewed hover states in the gallery cards." },
      ],
      [
        { title: "Samir Khan", body: "Reordered the feed blocks for the beta cohort." },
        { title: "Ari Gomez", body: "Refreshed the support macros for new regions." },
      ],
    ];

    return variants[cardsSeed % variants.length];
  }, [cardsSeed]);

  const navVisible = useMemo(() => {
    const pools = [
      ["Home", "About", "Contact", "Portfolio"],
      ["Home", "Contact", "Gallery"],
      ["Home", "About", "Portfolio", "Gallery"],
    ];

    return pools[navVariant % pools.length];
  }, [navVariant]);

  const tableRows = useMemo(
    () =>
      [
        { name: "Jane Doe", email: "jane@example.com", amount: 120 },
        { name: "John Smith", email: "john@example.com", amount: 86 },
        { name: "Mary Lane", email: "mary@example.com", amount: 208 },
      ].sort((a, b) =>
        sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount,
      ),
    [sortDirection],
  );

  const typoText =
    typoSeed % 2 === 0
      ? "Sometimes the beta copy contains a typo for automation tolerance practice."
      : "Sometimes the beta copy contians a typo for automation tolerance practice.";

  const renderAuth = () => (
    <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Authentication challenge</h2>
        <p className="text-sm text-muted">Use username `admin` and password `admin`.</p>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <input className="rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none" data-testid="auth-username" placeholder="Username" value={authUser} onChange={(e)=>setAuthUser(e.target.value)} />
        <input className="rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none" data-testid="auth-password" placeholder="Password" type="password" value={authPass} onChange={(e)=>setAuthPass(e.target.value)} />
      </div>
      <div className="mt-5 flex items-center gap-4">
        <Button className="rounded-full" variant="primary" onPress={() => {
          const ok = authUser === "admin" && authPass === "admin";
          setAuthSuccess(ok);
          setStatusText(ok ? "Authenticated successfully." : "Authentication failed.");
        }}>Authenticate</Button>
        <p className={`text-sm ${authSuccess ? "text-success-soft-foreground" : "text-danger-soft-foreground"}`} data-testid="auth-result">{statusText}</p>
      </div>
      {authSuccess && config.slug === "secure-file-download" ? (
        <div className="mt-5 rounded-[1.25rem] border border-separator bg-background-secondary p-4">
          <a className="underline text-foreground" download="secure-beta.txt" href={`data:text/plain;charset=utf-8,${encodeURIComponent("Secure beta file downloaded.")}`}>
            Download secure beta file
          </a>
        </div>
      ) : null}
    </section>
  );

  const renderByKind = () => {
    switch (config.kind) {
      case "table-actions":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Busy action table</h2>
                <p className="mt-1 text-sm text-muted">A beta version of the selector-heavy DOM page.</p>
              </div>
              <Button className="rounded-full" variant="secondary" onPress={() => setCardsSeed((v) => v + 1)}>
                Shuffle labels
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {["Primary", cardsSeed % 2 ? "Archive" : "Success", cardsSeed % 3 ? "Delete" : "Danger"].map((label, index) => (
                <button key={`${label}-${index}`} className="rounded-full bg-background-secondary px-4 py-2 text-foreground">
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-separator text-muted">
                    <th className="px-3 py-3">Item</th>
                    <th className="px-3 py-3">State</th>
                    <th className="px-3 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {["Row 1", "Row 2", "Row 3"].map((row) => (
                    <tr key={row} className="border-b border-separator/70">
                      <td className="px-3 py-4 text-foreground">{row}</td>
                      <td className="px-3 py-4 text-foreground">Stable</td>
                      <td className="px-3 py-4">
                        <div className="flex gap-2">
                          <button className="rounded-full bg-background-secondary px-3 py-1 text-foreground">edit</button>
                          <button className="rounded-full bg-background-secondary px-3 py-1 text-foreground">delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      case "auth":
        return renderAuth();
      case "nav-shuffle":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Shifting navigation</h2>
                <p className="mt-1 text-sm text-muted">Refresh to change which items are visible.</p>
              </div>
              <Button className="rounded-full" variant="secondary" onPress={() => setNavVariant((current) => current + 1)}>
                Refresh menu
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {navVisible.map((item) => (
                <div key={item} className="rounded-full bg-background-secondary px-4 py-2 text-foreground">
                  {item}
                </div>
              ))}
            </div>
          </section>
        );
      case "select":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <h2 className="text-2xl font-semibold text-foreground">Select an environment</h2>
            <select className="mt-5 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none" data-testid="beta-dropdown" value={selectedOption} onChange={(e)=>setSelectedOption(e.target.value)}>
              <option value="">Choose one</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
              <option value="qa-lab">QA Lab</option>
            </select>
            <p className="mt-4 text-sm text-muted" data-testid="beta-dropdown-result">
              Selected: {selectedOption || "Nothing selected"}
            </p>
          </section>
        );
      case "content-shuffle":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Dynamic feed cards</h2>
                <p className="mt-1 text-sm text-muted">Refresh to swap the content blocks.</p>
              </div>
              <Button className="rounded-full" variant="secondary" onPress={() => setCardsSeed((v) => v + 1)}>
                Refresh content
              </Button>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {shuffledCards.map((card) => (
                <div key={card.title} className="rounded-[1.5rem] border border-separator bg-background-secondary p-5">
                  <p className="font-semibold text-foreground">{card.title}</p>
                  <p className="mt-2 text-sm text-muted">{card.body}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case "dynamic-controls":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Dynamic checkbox</h2>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Button className="rounded-full" variant="secondary" onPress={() => {
                  setStatusText("Loading...");
                  window.setTimeout(() => setCheckboxPresent((v) => !v), 700);
                }}>
                  {checkboxPresent ? "Remove checkbox" : "Add checkbox"}
                </Button>
                {checkboxPresent ? (
                  <label className="flex items-center gap-3 rounded-full bg-background-secondary px-4 py-2 text-foreground">
                    <input checked={checkboxChecked} type="checkbox" onChange={(e)=>setCheckboxChecked(e.target.checked)} />
                    Enable beta mode
                  </label>
                ) : (
                  <span className="text-sm text-muted">Checkbox is currently absent.</span>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Dynamic input</h2>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Button className="rounded-full" variant="secondary" onPress={() => {
                  setStatusText("Loading...");
                  window.setTimeout(() => setInputEnabled((v) => !v), 700);
                }}>
                  {inputEnabled ? "Disable input" : "Enable input"}
                </Button>
                <input disabled={!inputEnabled} className="rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none disabled:opacity-50" value={dynamicInput} onChange={(e)=>setDynamicInput(e.target.value)} />
              </div>
              <p className="mt-3 text-sm text-muted">{statusText}</p>
            </div>
          </section>
        );
      case "delayed-reveal":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <Button className="rounded-full" variant="primary" onPress={() => {
              setDelayedVisible(false);
              setStatusText("Loading content...");
              window.setTimeout(() => {
                setDelayedVisible(true);
                setStatusText("Content loaded.");
              }, 1200);
            }}>
              Start loading
            </Button>
            <p className="mt-4 text-sm text-muted">{statusText}</p>
            {delayedVisible ? (
              <div className="mt-5 rounded-[1.5rem] border border-separator bg-background-secondary p-5 text-foreground">
                Beta content has been revealed.
              </div>
            ) : null}
          </section>
        );
      case "entry-ad":
      case "exit-intent":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <p className="text-sm text-muted">
              {config.kind === "exit-intent"
                ? "Move the pointer above the viewport or use the helper button."
                : "The beta modal opens automatically on load."}
            </p>
            {config.kind === "exit-intent" ? (
              <Button className="mt-4 rounded-full" variant="secondary" onPress={() => setShowExitModal(true)}>
                Simulate exit intent
              </Button>
            ) : null}
            {(showEntryModal || showExitModal) ? (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-6">
                <div className="w-full max-w-md rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
                  <h2 className="text-2xl font-semibold text-foreground">Beta modal</h2>
                  <p className="mt-2 text-sm text-muted">
                    {config.kind === "entry-ad"
                      ? "This entry ad opened when the page loaded."
                      : "This exit-intent modal opened after the pointer left the page."}
                  </p>
                  <Button className="mt-5 rounded-full" variant="primary" onPress={() => {
                    setShowEntryModal(false);
                    setShowExitModal(false);
                    setStatusText("Modal dismissed.");
                  }}>
                    Close
                  </Button>
                </div>
              </div>
            ) : null}
            <p className="mt-4 text-sm text-muted">{statusText}</p>
          </section>
        );
      case "floating-menu":
        return (
          <section className="space-y-6">
            <div className="sticky top-24 z-20 rounded-[1.75rem] border border-separator bg-surface/95 p-4 shadow-surface backdrop-blur">
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "reports", label: "Reports" },
                  { id: "activity", label: "Activity" },
                  { id: "support", label: "Support" },
                ].map((section) => (
                  <a
                    key={section.id}
                    className="rounded-full bg-background-secondary px-4 py-2 text-sm text-foreground"
                    href={`#${section.id}`}
                  >
                    {section.label}
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                id: "overview",
                title: "Overview",
                body:
                  "This sticky menu stays anchored while the content scrolls, making it useful for scroll-following navigation checks.",
              },
              {
                id: "reports",
                title: "Reports",
                body:
                  "Each section is intentionally tall so automation can exercise anchor navigation, viewport assertions, and menu persistence.",
              },
              {
                id: "activity",
                title: "Activity",
                body:
                  "The beta version focuses on sticky behavior and anchored jumps rather than reproducing the exact legacy visual structure.",
              },
              {
                id: "support",
                title: "Support",
                body:
                  "Use the top menu to jump between sections and confirm the active page content remains stable after long scrolls.",
              },
            ].map((section) => (
              <article
                key={section.id}
                className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface"
                id={section.id}
              >
                <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
                <p className="mt-3 text-sm text-muted">{section.body}</p>
                <div className="mt-6 grid gap-3">
                  {Array.from({ length: 8 }, (_, index) => (
                    <div
                      key={`${section.id}-${index + 1}`}
                      className="rounded-[1.25rem] bg-background-secondary p-4 text-sm text-muted"
                    >
                      {section.title} item {index + 1}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>
        );
      case "forgot-password":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <h2 className="text-2xl font-semibold text-foreground">Reset your password</h2>
            <input className="mt-5 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none" placeholder="name@example.com" type="email" value={forgotEmail} onChange={(e)=>setForgotEmail(e.target.value)} />
            <div className="mt-5 flex items-center gap-4">
              <Button className="rounded-full" variant="primary" onPress={() => {
                setForgotMessage(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail) ? `Reset link queued for ${forgotEmail}.` : "Enter a valid email address.");
              }}>
                Send reset link
              </Button>
              {forgotMessage ? <p className="text-sm text-muted">{forgotMessage}</p> : null}
            </div>
          </section>
        );
      case "frames":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div className="flex gap-3">
              <Button className="rounded-full" variant="secondary" onPress={() => setFrameMode("editor")}>Editor mode</Button>
              <Button className="rounded-full" variant="secondary" onPress={() => setFrameMode("preview")}>Preview mode</Button>
            </div>
            <iframe
              className="mt-5 h-72 w-full rounded-[1.5rem] border border-separator bg-white"
              srcDoc={`<html><body style="font-family:sans-serif;padding:24px"><h2>${config.title}</h2><p>Current mode: ${frameMode}</p><div style="margin-top:16px;padding:12px;border:1px solid #ddd;border-radius:12px">${config.slug === "nested-frames" ? "Nested frame beta content" : "Frame beta content"}</div></body></html>`}
              title={config.title}
            />
          </section>
        );
      case "geolocation":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <Button className="rounded-full" variant="primary" onPress={() => {
              if (!navigator.geolocation) {
                setGeoMessage("Geolocation unavailable. Fallback: 37.7749, -122.4194");
                return;
              }
              navigator.geolocation.getCurrentPosition(
                (position) => setGeoMessage(`Latitude ${position.coords.latitude.toFixed(4)}, Longitude ${position.coords.longitude.toFixed(4)}`),
                () => setGeoMessage("Permission denied. Fallback: 37.7749, -122.4194"),
              );
            }}>
              Locate me
            </Button>
            <p className="mt-4 text-sm text-muted">{geoMessage}</p>
          </section>
        );
      case "slider":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <input className="w-full accent-[var(--accent)]" max={5} min={0} step={0.5} type="range" value={sliderValue} onChange={(e)=>setSliderValue(Number(e.target.value))} />
            <p className="mt-4 text-sm text-muted">Current value: {sliderValue.toFixed(1)}</p>
          </section>
        );
      case "hovers":
        return (
          <section className="grid gap-4 md:grid-cols-3">
            {["Ada", "Mina", "Jon"].map((name) => (
              <div
                key={name}
                className="relative rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface"
                onMouseEnter={() => setHoveredCard(name)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="h-40 rounded-[1.25rem] bg-background-secondary" />
                {hoveredCard === name ? (
                  <div className="absolute inset-4 rounded-[1.25rem] bg-black/70 p-4 text-white">
                    <p className="font-semibold">{name}</p>
                    <p className="mt-2 text-sm">Hover actions are now visible.</p>
                  </div>
                ) : null}
              </div>
            ))}
          </section>
        );
      case "inputs":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div className="grid gap-4 md:grid-cols-2">
              <input className="rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none" type="number" value={numberValue} onChange={(e)=>setNumberValue(Number(e.target.value))} />
              <input className="rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none" type="number" value={numberValue * 2} readOnly />
            </div>
          </section>
        );
      case "menus":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div className="flex flex-wrap gap-3">
              {["Enabled", "Downloads", "CSV", "Excel"].map((item, index) => (
                <button key={item} className="rounded-full bg-background-secondary px-4 py-2 text-foreground" onClick={() => setMenuPath(["Enabled", ...["Downloads", "CSV", "Excel"].slice(1, index + 1)])}>
                  {item}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">Current path: {menuPath.join(" > ")}</p>
          </section>
        );
      case "javascript-alerts":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full" variant="secondary" onPress={() => { window.alert("Beta alert"); setDialogResult("Alert accepted."); }}>Alert</Button>
              <Button className="rounded-full" variant="secondary" onPress={() => setDialogResult(window.confirm("Beta confirm?") ? "Confirm accepted." : "Confirm dismissed.")}>Confirm</Button>
              <Button className="rounded-full" variant="secondary" onPress={() => {
                const value = window.prompt("Enter beta input", "Automation");
                setDialogResult(value === null ? "Prompt cancelled." : `Prompt value: ${value}`);
              }}>Prompt</Button>
            </div>
            <p className="mt-4 text-sm text-muted">{dialogResult}</p>
          </section>
        );
      case "javascript-error":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <p className="text-sm text-danger-soft-foreground">{statusText}</p>
            <Button className="mt-4 rounded-full" variant="secondary" onPress={() => setErrorCount((v) => v + 1)}>
              Reproduce error
            </Button>
          </section>
        );
      case "key-presses":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <input className="w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none" placeholder="Type here" onKeyDown={(e)=>setLastKey(e.key)} />
            <p className="mt-4 text-sm text-muted">Last key: {lastKey}</p>
          </section>
        );
      case "large-dom":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div className="grid gap-3 md:grid-cols-3">
              {Array.from({ length: 18 }, (_, outer) => (
                <div key={outer} className="rounded-[1.25rem] border border-separator bg-background-secondary p-3">
                  <p className="text-sm font-semibold text-foreground">Cluster {outer + 1}</p>
                  <div className="mt-3 grid gap-2">
                    {Array.from({ length: 6 }, (_, inner) => (
                      <div key={inner} className="rounded-lg bg-surface px-3 py-2 text-xs text-muted">
                        Node {outer + 1}-{inner + 1}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case "multiple-windows":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <Button className="rounded-full" variant="primary" onPress={() => {
              const child = window.open("", "_blank", "width=420,height=320");
              child?.document.write("<h1>Beta child window</h1><p>Multiple window practice target.</p>");
              setWindowOpened(true);
            }}>
              Open new window
            </Button>
            <p className="mt-4 text-sm text-muted">{windowOpened ? "Child window opened." : "No child window opened yet."}</p>
          </section>
        );
      case "notifications":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <Button className="rounded-full" variant="secondary" onPress={() => {
              const messages = [
                "Action successful, although it may not have gone through.",
                "Unable to complete request. Please try again.",
                "New notification generated for the beta feed.",
              ];
              setNotice(messages[Math.floor(Math.random() * messages.length)]);
            }}>
              Trigger message
            </Button>
            <div className="mt-5 rounded-[1.25rem] border border-separator bg-background-secondary p-4 text-sm text-foreground">
              {notice}
            </div>
          </section>
        );
      case "redirect":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <Button className="rounded-full" variant="primary" onPress={() => {
              setRedirecting(true);
              setRedirectStep("Redirecting to intermediate page...");
              window.setTimeout(() => setRedirectStep("Redirecting to final destination..."), 700);
              window.setTimeout(() => {
                setRedirectStep("Arrived at final beta destination.");
                setRedirecting(false);
              }, 1400);
            }}>
              Follow redirect link
            </Button>
            <p className="mt-4 text-sm text-muted">{redirectStep}{redirecting ? " (in progress)" : ""}</p>
          </section>
        );
      case "shadow-dom":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div ref={shadowHostRef} />
          </section>
        );
      case "shifting-content":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <Button className="rounded-full" variant="secondary" onPress={() => setShiftMode((v) => (v + 1) % 3)}>
              Shift content
            </Button>
            <div className={`mt-6 rounded-[1.5rem] border border-separator bg-background-secondary p-6 transition-all ${shiftMode === 1 ? "translate-x-8" : shiftMode === 2 ? "ml-12" : ""}`}>
              <p className="font-medium text-foreground">Shifting beta block</p>
              <p className="mt-2 text-sm text-muted">This block changes position between states.</p>
            </div>
          </section>
        );
      case "slow-resources":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <Button className="rounded-full" variant="primary" onPress={() => {
              setSlowCards(initialSlow => initialSlow.map(card => ({ ...card, loaded: false })));
              [600, 1400, 2200].forEach((delay, index) => {
                window.setTimeout(() => {
                  setSlowCards((current) =>
                    current.map((card, cardIndex) =>
                      cardIndex === index ? { ...card, loaded: true } : card,
                    ),
                  );
                }, delay);
              });
            }}>
              Load slow resources
            </Button>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {slowCards.map((card) => (
                <div key={card.id} className="rounded-[1.25rem] border border-separator bg-background-secondary p-4 text-sm text-muted">
                  {card.loaded ? "Loaded beta resource" : "Loading..."}
                </div>
              ))}
            </div>
          </section>
        );
      case "sortable-table":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <Button className="rounded-full" variant="secondary" onPress={() => setSortDirection((v) => (v === "asc" ? "desc" : "asc"))}>
              Sort amount: {sortDirection}
            </Button>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-separator text-muted">
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">Email</th>
                    <th className="px-3 py-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => (
                    <tr key={row.email} className="border-b border-separator/70">
                      <td className="px-3 py-4 text-foreground">{row.name}</td>
                      <td className="px-3 py-4 text-foreground">{row.email}</td>
                      <td className="px-3 py-4 text-foreground">${row.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      case "status-codes":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div className="flex flex-wrap gap-3">
              {[200, 301, 404, 500].map((code) => (
                <Button key={code} className="rounded-full" variant="secondary" onPress={() => setStatusCode(code)}>
                  {code}
                </Button>
              ))}
            </div>
            <div className="mt-5 rounded-[1.25rem] border border-separator bg-background-secondary p-4">
              <p className="text-lg font-semibold text-foreground">Status {statusCode}</p>
              <p className="mt-2 text-sm text-muted">
                {statusCode === 200
                  ? "Everything looks healthy."
                  : statusCode === 301
                    ? "The resource has moved."
                    : statusCode === 404
                      ? "The requested item was not found."
                      : "A server error occurred."}
              </p>
            </div>
          </section>
        );
      case "typos":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <Button className="rounded-full" variant="secondary" onPress={() => setTypoSeed((v) => v + 1)}>
              Refresh text
            </Button>
            <p className="mt-5 text-foreground">{typoText}</p>
          </section>
        );
      case "editor":
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full" variant="secondary" onPress={() => setEditorContent((v) => `**${v}**`)}>
                Bold marker
              </Button>
              <Button className="rounded-full" variant="secondary" onPress={() => setEditorContent((v) => `_${v}_`)}>
                Italic marker
              </Button>
              <Button className="rounded-full" variant="secondary" onPress={() => setEditorContent((v) => `${v}\n- bullet item`)}>
                Add bullet
              </Button>
            </div>
            <div
              className="mt-5 min-h-48 rounded-[1.5rem] border border-separator bg-background-secondary p-4 text-foreground outline-none"
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => setEditorContent((e.target as HTMLDivElement).innerText)}
            >
              {editorContent}
            </div>
            <p className="mt-4 text-sm text-muted">Current length: {editorContent.length}</p>
          </section>
        );
      default:
        return (
          <section className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <p className="text-muted">Beta example is not configured yet.</p>
            <Button className="mt-4 rounded-full" variant="secondary" onPress={() => router.push("/")}>
              Back to home
            </Button>
          </section>
        );
    }
  };

  return <Shell config={config}>{renderByKind()}</Shell>;
}
