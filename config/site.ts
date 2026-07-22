export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "The Modern Internet",
  description:
    "A modern automation practice app inspired by the legacy the-internet.herokuapp.com exercises.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  practicePages: [
    {
      label: "A/B Testing",
      href: "/ab-testing",
      description:
        "A cookie-persisted split-testing page that randomly assigns users to different experiences.",
      status: "Ready",
    },
    {
      label: "Add/Remove Elements",
      href: "/add-remove-elements",
      description:
        "A dynamic DOM exercise where buttons add new elements and each created element can be removed.",
      status: "Ready",
    },
    {
      label: "Basic Auth",
      href: "/basic-auth",
      description:
        "A route protected by HTTP Basic Authentication. Use username `admin` and password `admin`.",
      status: "Ready",
    },
    {
      label: "Broken Images",
      href: "/broken-images",
      description:
        "A gallery that mixes valid images with intentionally broken image URLs for media failure testing.",
      status: "Ready",
    },
    {
      label: "Challenging DOM",
      href: "/challenging-dom",
      description:
        "A dense DOM exercise with changing classes, awkward selectors, and repeated controls.",
      status: "Beta",
    },
    {
      label: "Checkboxes",
      href: "/checkboxes",
      description:
        "A checkbox playground with multiple UI variations, repeated groups, and mixed checked states.",
      status: "Ready",
    },
    {
      label: "Context Menu",
      href: "/context-menu",
      description:
        "A file-manager style right-click example with an item-aware context menu and action log.",
      status: "Ready",
    },
    {
      label: "Digest Authentication",
      href: "/digest-auth",
      description:
        "An authentication exercise using digest auth with username `admin` and password `admin`.",
      status: "Beta",
    },
    {
      label: "Disappearing Elements",
      href: "/disappearing-elements",
      description:
        "A navigation example where some links appear or disappear between visits.",
      status: "Beta",
    },
    {
      label: "Drag and Drop",
      href: "/drag-and-drop",
      description:
        "A drag-and-drop playground with workflow lanes, nested drop zones, and card reordering.",
      status: "Ready",
    },
    {
      label: "Dropdown",
      href: "/dropdown",
      description:
        "A select/dropdown example for choosing options and asserting current value.",
      status: "Beta",
    },
    {
      label: "Dynamic Content",
      href: "/dynamic-content",
      description:
        "A page where content blocks refresh with changing text, users, or imagery.",
      status: "Beta",
    },
    {
      label: "Dynamic Controls",
      href: "/dynamic-controls",
      description:
        "Controls that appear, disappear, enable, and disable after async interactions.",
      status: "Beta",
    },
    {
      label: "Dynamic Loading",
      href: "/dynamic-loading",
      description:
        "A delayed-content example with loading placeholders and reveal states.",
      status: "Beta",
    },
    {
      label: "Entry Ad",
      href: "/entry-ad",
      description:
        "An entry modal or ad experience that appears when the page loads.",
      status: "Beta",
    },
    {
      label: "Exit Intent",
      href: "/exit-intent",
      description:
        "A modal triggered by exit-intent behavior near the top edge of the viewport.",
      status: "Beta",
    },
    {
      label: "File Download",
      href: "/file-download",
      description:
        "A downloadable file index that lists files previously uploaded to the shared Blob store.",
      status: "Ready",
    },
    {
      label: "File Upload",
      href: "/file-upload",
      description:
        "A file chooser and upload flow that stores files in Vercel Blob for automation practice.",
      status: "Ready",
    },
    {
      label: "Floating Menu",
      href: "/floating-menu",
      description:
        "A sticky floating navigation example that stays visible while scrolling.",
      status: "Beta",
    },
    {
      label: "Forgot Password",
      href: "/forgot-password",
      description:
        "A reset-request form with email validation and submit feedback.",
      status: "Beta",
    },
    {
      label: "Form Authentication",
      href: "/form-authentication",
      description:
        "A login form exercise with success and failure states.",
      status: "Beta",
    },
    {
      label: "Form Inputs",
      href: "/form-inputs",
      description:
        "A realistic form playground with multiple sections, varied input types, and inline validation flows.",
      status: "Ready",
    },
    {
      label: "Frames",
      href: "/frames",
      description:
        "A frames index for iframe and frame-switching automation practice.",
      status: "Beta",
    },
    {
      label: "Geolocation",
      href: "/geolocation",
      description:
        "A browser geolocation example with location permission handling.",
      status: "Beta",
    },
    {
      label: "Horizontal Slider",
      href: "/horizontal-slider",
      description:
        "A draggable slider control with a live numeric value.",
      status: "Beta",
    },
    {
      label: "Hovers",
      href: "/hovers",
      description:
        "Cards that reveal captions and actions when hovered.",
      status: "Beta",
    },
    {
      label: "Infinite Scroll",
      href: "/infinite-scroll",
      description:
        "A social-style feed powered by a paginated backend endpoint and auto-loading cards on scroll.",
      status: "Ready",
    },
    {
      label: "Inputs",
      href: "/inputs",
      description:
        "A minimal typed-input example focused on keyboard entry behavior.",
      status: "Beta",
    },
    {
      label: "JQuery UI Menus",
      href: "/jqueryui-menus",
      description:
        "A multi-level menu interaction inspired by classic jQuery UI patterns.",
      status: "Beta",
    },
    {
      label: "JavaScript Alerts",
      href: "/javascript-alerts",
      description:
        "Alert, confirm, and prompt dialog interactions.",
      status: "Beta",
    },
    {
      label: "JavaScript Onload Event Error",
      href: "/javascript-onload-error",
      description:
        "A page that triggers a JavaScript error when it loads.",
      status: "Beta",
    },
    {
      label: "Key Presses",
      href: "/key-presses",
      description:
        "A key event exercise that displays the last pressed key.",
      status: "Beta",
    },
    {
      label: "Large & Deep DOM",
      href: "/large-deep-dom",
      description:
        "A large, deeply nested DOM structure for traversal and selector stress-testing.",
      status: "Beta",
    },
    {
      label: "Multiple Windows",
      href: "/multiple-windows",
      description:
        "An example that opens new windows or tabs for context-switch testing.",
      status: "Beta",
    },
    {
      label: "Nested Frames",
      href: "/nested-frames",
      description:
        "A nested frame exercise for deeper frame-switching behavior.",
      status: "Beta",
    },
    {
      label: "Notification Messages",
      href: "/notification-messages",
      description:
        "A flash-message page with changing notification text and retry behavior.",
      status: "Beta",
    },
    {
      label: "Redirect Link",
      href: "/redirect-link",
      description:
        "A redirect flow for asserting final destinations and intermediate hops.",
      status: "Beta",
    },
    {
      label: "Secure File Download",
      href: "/secure-file-download",
      description:
        "An authenticated file download flow for protected resources.",
      status: "Beta",
    },
    {
      label: "Shadow DOM",
      href: "/shadow-dom",
      description:
        "An example with content rendered inside shadow roots.",
      status: "Beta",
    },
    {
      label: "Shifting Content",
      href: "/shifting-content",
      description:
        "A layout that shifts alignment or position between states.",
      status: "Beta",
    },
    {
      label: "Slow Resources",
      href: "/slow-resources",
      description:
        "A page with intentionally delayed assets or responses.",
      status: "Beta",
    },
    {
      label: "Sortable Data Tables",
      href: "/sortable-data-tables",
      description:
        "A data table with sortable columns and repeated cell patterns.",
      status: "Beta",
    },
    {
      label: "Status Codes",
      href: "/status-codes",
      description:
        "A page for visiting and asserting different HTTP status responses.",
      status: "Beta",
    },
    {
      label: "Typos",
      href: "/typos",
      description:
        "A text example where copy changes occasionally to simulate typo detection.",
      status: "Beta",
    },
    {
      label: "WYSIWYG Editor",
      href: "/wysiwyg-editor",
      description:
        "A rich text editor interaction example.",
      status: "Beta",
    },
    {
      label: "Pagination",
      href: "/pagination",
      description:
        "A page-by-page card feed that reuses the same paginated API as the infinite scroll example.",
      status: "Ready",
    },
  ],
  links: {
    github: "",
    docs: "https://heroui.com",
  },
};
