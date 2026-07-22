export type BetaExampleKind =
  | "table-actions"
  | "auth"
  | "nav-shuffle"
  | "select"
  | "content-shuffle"
  | "dynamic-controls"
  | "delayed-reveal"
  | "entry-ad"
  | "exit-intent"
  | "floating-menu"
  | "forgot-password"
  | "frames"
  | "geolocation"
  | "slider"
  | "hovers"
  | "inputs"
  | "menus"
  | "javascript-alerts"
  | "javascript-error"
  | "key-presses"
  | "large-dom"
  | "multiple-windows"
  | "notifications"
  | "redirect"
  | "shadow-dom"
  | "shifting-content"
  | "slow-resources"
  | "sortable-table"
  | "status-codes"
  | "typos"
  | "editor";

export type BetaExampleConfig = {
  slug: string;
  title: string;
  description: string;
  kind: BetaExampleKind;
  notes: string[];
};

export const betaExamples: Record<string, BetaExampleConfig> = {
  "challenging-dom": {
    slug: "challenging-dom",
    title: "Challenging DOM",
    description:
      "A beta page with changing button labels, repeated rows, and awkward table selectors.",
    kind: "table-actions",
    notes: [
      "Buttons intentionally reshuffle labels to make selectors less predictable.",
      "The table rows include repeated action buttons and per-row summaries.",
      "This beta version focuses on selector toughness rather than visual parity.",
    ],
  },
  "digest-auth": {
    slug: "digest-auth",
    title: "Digest Authentication",
    description:
      "A beta auth flow that simulates an auth challenge using the same admin/admin credentials.",
    kind: "auth",
    notes: [
      "Use username admin and password admin.",
      "This beta page uses an in-page auth challenge instead of protocol-level digest auth.",
      "Useful for form fill and gated-content assertions.",
    ],
  },
  "disappearing-elements": {
    slug: "disappearing-elements",
    title: "Disappearing Elements",
    description:
      "A beta navigation example where some items disappear and reappear between refreshes.",
    kind: "nav-shuffle",
    notes: [
      "The visible nav items change when you refresh the menu.",
      "One or more links may be absent at a time.",
      "The layout stays stable while the item set changes.",
    ],
  },
  dropdown: {
    slug: "dropdown",
    title: "Dropdown",
    description:
      "A beta dropdown example with a realistic filter and selection summary.",
    kind: "select",
    notes: [
      "Changing the option updates a visible summary card.",
      "The beta version uses realistic labels instead of placeholder options.",
      "Useful for simple selection and assertion flows.",
    ],
  },
  "dynamic-content": {
    slug: "dynamic-content",
    title: "Dynamic Content",
    description:
      "A beta page where content cards change when the feed is refreshed.",
    kind: "content-shuffle",
    notes: [
      "Refreshing swaps the visible content blocks and authors.",
      "The layout stays the same while the content changes.",
      "Good for comparing before/after card text and images.",
    ],
  },
  "dynamic-controls": {
    slug: "dynamic-controls",
    title: "Dynamic Controls",
    description:
      "A beta page with controls that appear, disappear, enable, and disable asynchronously.",
    kind: "dynamic-controls",
    notes: [
      "Buttons trigger delayed UI state changes.",
      "One section removes and restores a checkbox.",
      "Another section disables and enables an input after a loading step.",
    ],
  },
  "dynamic-loading": {
    slug: "dynamic-loading",
    title: "Dynamic Loading",
    description:
      "A beta delayed-loading example with a loader and revealed content.",
    kind: "delayed-reveal",
    notes: [
      "Clicking start shows a loader before content is revealed.",
      "The result panel only appears after the delay completes.",
      "Useful for waiting logic and visibility assertions.",
    ],
  },
  "entry-ad": {
    slug: "entry-ad",
    title: "Entry Ad",
    description:
      "A beta entry modal that appears on page load and can be dismissed.",
    kind: "entry-ad",
    notes: [
      "The modal opens automatically on first render.",
      "Closing it updates a visible page state badge.",
      "Useful for overlay and dismissal automation.",
    ],
  },
  "exit-intent": {
    slug: "exit-intent",
    title: "Exit Intent",
    description:
      "A beta modal that appears when the pointer leaves the top edge of the page.",
    kind: "exit-intent",
    notes: [
      "Moving the pointer out of the viewport top triggers the modal.",
      "A helper button also simulates the behavior for automation convenience.",
      "The page records whether the modal has been shown.",
    ],
  },
  "floating-menu": {
    slug: "floating-menu",
    title: "Floating Menu",
    description:
      "A beta sticky menu page with long sections and an anchored floating nav.",
    kind: "floating-menu",
    notes: [
      "The beta version uses a sticky in-page menu with anchor links.",
      "Sections are long enough to exercise scrolling behavior.",
      "Useful for scroll-and-click navigation checks.",
    ],
  },
  "forgot-password": {
    slug: "forgot-password",
    title: "Forgot Password",
    description:
      "A beta reset-request form with email validation and success feedback.",
    kind: "forgot-password",
    notes: [
      "Submitting an invalid email shows inline validation.",
      "A valid email reveals a success message without navigation.",
      "Useful for form validation and submit assertions.",
    ],
  },
  "form-authentication": {
    slug: "form-authentication",
    title: "Form Authentication",
    description:
      "A beta login form with success and failure states.",
    kind: "auth",
    notes: [
      "Use username admin and password admin.",
      "Invalid credentials show a failure banner.",
      "Valid credentials unlock a success panel.",
    ],
  },
  frames: {
    slug: "frames",
    title: "Frames",
    description:
      "A beta frames page with iframe content switching between editor and preview panes.",
    kind: "frames",
    notes: [
      "The page includes an iframe with internal content.",
      "A mode switch changes the iframe source document.",
      "Useful for iframe targeting and content assertions.",
    ],
  },
  geolocation: {
    slug: "geolocation",
    title: "Geolocation",
    description:
      "A beta geolocation example with permission, success, and fallback states.",
    kind: "geolocation",
    notes: [
      "A browser geolocation request is attempted when you click locate.",
      "If unavailable, a fallback simulation is shown.",
      "The result includes latitude, longitude, and a status message.",
    ],
  },
  "horizontal-slider": {
    slug: "horizontal-slider",
    title: "Horizontal Slider",
    description:
      "A beta slider example with a live value readout.",
    kind: "slider",
    notes: [
      "Dragging the slider updates the numeric value.",
      "Preset snap points are visible for simple assertions.",
      "Useful for pointer drag and value-change checks.",
    ],
  },
  hovers: {
    slug: "hovers",
    title: "Hovers",
    description:
      "A beta hover-card gallery that reveals hidden actions and profile details.",
    kind: "hovers",
    notes: [
      "Hovering a card reveals extra content.",
      "Each card has consistent structure with different text.",
      "Useful for hover-driven visibility assertions.",
    ],
  },
  inputs: {
    slug: "inputs",
    title: "Inputs",
    description:
      "A beta numeric input playground focused on value entry and boundaries.",
    kind: "inputs",
    notes: [
      "The field accepts numbers and updates helper text immediately.",
      "A second input uses step controls for increment behavior.",
      "Useful for keyboard entry and number assertions.",
    ],
  },
  "jqueryui-menus": {
    slug: "jqueryui-menus",
    title: "JQuery UI Menus",
    description:
      "A beta multi-level menu inspired by classic jQuery UI interactions.",
    kind: "menus",
    notes: [
      "Selecting a top-level item reveals nested items.",
      "Choosing a leaf action updates a result panel.",
      "Useful for multi-step menu traversal.",
    ],
  },
  "javascript-alerts": {
    slug: "javascript-alerts",
    title: "JavaScript Alerts",
    description:
      "A beta alert playground with alert, confirm, and prompt flows.",
    kind: "javascript-alerts",
    notes: [
      "Buttons trigger alert-like, confirm-like, and prompt-like dialogs.",
      "Results are written to a visible output panel.",
      "Useful for modal handling behavior.",
    ],
  },
  "javascript-onload-error": {
    slug: "javascript-onload-error",
    title: "JavaScript Onload Event Error",
    description:
      "A beta page that records a simulated onload error message.",
    kind: "javascript-error",
    notes: [
      "The page simulates an error during load and surfaces it in the UI.",
      "A retry button reproduces the same error.",
      "Useful for error-state assertions without crashing the app shell.",
    ],
  },
  "key-presses": {
    slug: "key-presses",
    title: "Key Presses",
    description:
      "A beta key event example that displays the last pressed key.",
    kind: "key-presses",
    notes: [
      "Typing in the field updates the key display.",
      "Modifier and navigation keys are also captured.",
      "Useful for keyboard event automation.",
    ],
  },
  "large-deep-dom": {
    slug: "large-deep-dom",
    title: "Large & Deep DOM",
    description:
      "A beta DOM stress page with many nested nodes and repeated structures.",
    kind: "large-dom",
    notes: [
      "The page contains a large nested card and table structure.",
      "Repeated patterns are intentional for selector stress-testing.",
      "Useful for traversal and performance-sensitive selectors.",
    ],
  },
  "multiple-windows": {
    slug: "multiple-windows",
    title: "Multiple Windows",
    description:
      "A beta page that opens a secondary window and tracks its state.",
    kind: "multiple-windows",
    notes: [
      "Opening the helper window updates local state.",
      "The child window contains simple verification text.",
      "Useful for popup or new-tab automation flows.",
    ],
  },
  "nested-frames": {
    slug: "nested-frames",
    title: "Nested Frames",
    description:
      "A beta nested iframe example for deeper frame switching practice.",
    kind: "frames",
    notes: [
      "The page uses an iframe with content that includes nested sections.",
      "A toggle changes the nested frame label to prove context switching.",
      "Useful for iframe targeting and nested context tests.",
    ],
  },
  "notification-messages": {
    slug: "notification-messages",
    title: "Notification Messages",
    description:
      "A beta flash-message page with randomized notifications.",
    kind: "notifications",
    notes: [
      "Each trigger shows one of several possible flash messages.",
      "The latest message is kept visible for assertion checks.",
      "Useful for tolerant text matching and retries.",
    ],
  },
  "redirect-link": {
    slug: "redirect-link",
    title: "Redirect Link",
    description:
      "A beta redirect example that simulates intermediate and final states.",
    kind: "redirect",
    notes: [
      "The flow transitions through a redirecting state into a destination state.",
      "Progress text changes over time to mimic a redirect hop.",
      "Useful for waiting through intermediate content.",
    ],
  },
  "secure-file-download": {
    slug: "secure-file-download",
    title: "Secure File Download",
    description:
      "A beta protected-download flow that requires credentials before a download link appears.",
    kind: "auth",
    notes: [
      "Use username admin and password admin.",
      "Successful auth reveals a generated secure download link.",
      "Useful for gated content and download assertions.",
    ],
  },
  "shadow-dom": {
    slug: "shadow-dom",
    title: "Shadow DOM",
    description:
      "A beta shadow-root example with text and buttons rendered inside a shadow tree.",
    kind: "shadow-dom",
    notes: [
      "Content is mounted into an actual shadow root.",
      "The shadow content includes visible text and an action button.",
      "Useful for shadow DOM selector strategies.",
    ],
  },
  "shifting-content": {
    slug: "shifting-content",
    title: "Shifting Content",
    description:
      "A beta shifting-layout example with toggled alignment and offsets.",
    kind: "shifting-content",
    notes: [
      "The content block shifts between multiple layout states.",
      "A control cycles the shift modes.",
      "Useful for layout drift and position assertions.",
    ],
  },
  "slow-resources": {
    slug: "slow-resources",
    title: "Slow Resources",
    description:
      "A beta delayed-resource page with intentionally slow cards.",
    kind: "slow-resources",
    notes: [
      "Loading starts on demand and completes in staggered delays.",
      "Each resource updates from loading to loaded independently.",
      "Useful for waiting on partial completion states.",
    ],
  },
  "sortable-data-tables": {
    slug: "sortable-data-tables",
    title: "Sortable Data Tables",
    description:
      "A beta sortable data table with repeated columns and sort toggles.",
    kind: "sortable-table",
    notes: [
      "Column headers toggle between ascending and descending order.",
      "The table content changes in place without navigation.",
      "Useful for sorting and table assertion flows.",
    ],
  },
  "status-codes": {
    slug: "status-codes",
    title: "Status Codes",
    description:
      "A beta page that displays different status code responses and descriptions.",
    kind: "status-codes",
    notes: [
      "Buttons switch the page into different code states.",
      "The code and summary message update together.",
      "Useful for response-state assertions.",
    ],
  },
  typos: {
    slug: "typos",
    title: "Typos",
    description:
      "A beta text example where copy occasionally changes.",
    kind: "typos",
    notes: [
      "Refreshing text may introduce or remove a typo.",
      "The layout stays stable while copy changes.",
      "Useful for tolerant text matching.",
    ],
  },
  "wysiwyg-editor": {
    slug: "wysiwyg-editor",
    title: "WYSIWYG Editor",
    description:
      "A beta rich-text editor example with formatting and editable content.",
    kind: "editor",
    notes: [
      "Toolbar buttons insert formatting markers into the draft.",
      "The editable surface is contenteditable for direct typing.",
      "Useful for editor focus and content manipulation flows.",
    ],
  },
} as const;
