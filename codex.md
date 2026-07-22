# codex.md

## Project

- Name: The Modern Internet
- Goal: Build a sample Next.js app for automation practice, hosted on Vercel.
- Inspiration: The app is inspired by the legacy https://the-internet.herokuapp.com/ practice site.
- UI stack: Next.js App Router + HeroUI.
- Approach: The home page is the index of practice pages, and we will build one page at a time.
- Scale expectation: The app will contain 20+ pages, so the navbar should stay minimal and should not try to list every route.

## Current decisions

- Scaffold source: HeroUI CLI app template for Next.js App Router.
- Branding: Use the exact app name `The Modern Internet`.
- Package manager: Standardize on `pnpm` for local development, lockfile management, and Vercel installs.
- Pnpm repo config: Commit `pnpm-lock.yaml`, use repo-local `.npmrc` to disable the interactive module purge prompt, and allow the required package build scripts through pnpm config.
- Styling direction: Keep HeroUI as the component system and use a darker, slightly cinematic shell instead of the stock starter look.
- Theme system: The app now supports multiple named themes selected from a navbar dropdown. Current themes are `midnight`, `sunrise`, `paper`, `canopy`, `lagoon`, `signal`, `ember`, `blossom`, and `graphite`, driven by shared CSS tokens via `next-themes`.
- Navigation model: The homepage is the primary catalog of pages. The navbar should remain compact and point back to the homepage instead of enumerating all practice routes.
- A/B testing behavior: `/ab-testing` now assigns a random variant in middleware, persists it in the `tmi_ab_testing_variant` cookie, and renders different functionality for control vs variation users.
- Basic auth behavior: `/basic-auth` is protected in `middleware.ts` with HTTP Basic Authentication and accepts the credentials `admin` / `admin`.
- Infinite scroll behavior: `/infinite-scroll` consumes `/api/infinite-feed`, a paginated endpoint that returns deterministic pseudo-random feed cards for endless-scroll style testing.
- Shared feed API: `/api/infinite-feed` now has a larger dataset window and is reused by both `/infinite-scroll` and `/pagination`.
- File storage behavior: `/file-upload` and `/file-download` share a Vercel Blob-backed storage flow. Uploads are stored under the `uploads/` prefix in a private Blob store, and downloads are served through `/api/files/download` instead of direct public Blob URLs.
- Upload safety rules: File uploads are limited to 5 MB and reject common executable or script-like file extensions/MIME types. This is a lightweight misuse guard, not full malware scanning.
- Local Blob setup: To make file upload/download work locally, run `vercel link`, then `vercel env pull .env.local`, and restart local dev so `BLOB_READ_WRITE_TOKEN` is available.
- Homepage catalog policy: The homepage should only expose verified pages as navigable `Ready Now` entries. Any page not yet validated for deployment, including internally implemented beta routes, should be shown as non-clickable `Coming Soon`.
- Beta rollout policy: Remaining legacy-style exercises are now implemented via a shared dynamic beta route (`app/[betaSlug]/page.tsx`) backed by a route registry in `lib/beta-examples.ts`. These pages are intentionally marked `Beta` in the catalog and remain individually accessible by route slug.
- Current practice routes:
  - `/ab-testing` -> A/B Testing
  - `/add-remove-elements` -> Add/Remove Elements
  - `/basic-auth` -> Basic Auth
  - `/broken-images` -> Broken Images
  - `/checkboxes` -> Checkboxes
  - `/context-menu` -> Context Menu
  - `/digest-auth` -> Digest Authentication
  - `/disappearing-elements` -> Disappearing Elements
  - `/drag-and-drop` -> Drag And Drop
  - `/dropdown` -> Dropdown
  - `/dynamic-content` -> Dynamic Content
  - `/dynamic-controls` -> Dynamic Controls
  - `/dynamic-loading` -> Dynamic Loading
  - `/entry-ad` -> Entry Ad
  - `/exit-intent` -> Exit Intent
  - `/floating-menu` -> Floating Menu
  - `/forgot-password` -> Forgot Password
  - `/form-authentication` -> Form Authentication
  - `/form-inputs` -> Form Inputs
  - `/frames` -> Frames
  - `/geolocation` -> Geolocation
  - `/horizontal-slider` -> Horizontal Slider
  - `/hovers` -> Hovers
  - `/infinite-scroll` -> Infinite Scroll
  - `/inputs` -> Inputs
  - `/jqueryui-menus` -> JQuery UI Menus
  - `/javascript-alerts` -> JavaScript Alerts
  - `/javascript-onload-error` -> JavaScript Onload Event Error
  - `/key-presses` -> Key Presses
  - `/large-deep-dom` -> Large & Deep DOM
  - `/multiple-windows` -> Multiple Windows
  - `/nested-frames` -> Nested Frames
  - `/notification-messages` -> Notification Messages
  - `/pagination` -> Pagination
  - `/redirect-link` -> Redirect Link
  - `/secure-file-download` -> Secure File Download
  - `/shadow-dom` -> Shadow DOM
  - `/shifting-content` -> Shifting Content
  - `/slow-resources` -> Slow Resources
  - `/sortable-data-tables` -> Sortable Data Tables
  - `/status-codes` -> Status Codes
  - `/typos` -> Typos
  - `/wysiwyg-editor` -> WYSIWYG Editor
  - `/file-upload` -> File Upload
  - `/file-download` -> File Download
- Status:
  - Home page is implemented as a route hub.
  - The homepage now surfaces ready pages first and shows every unverified route as non-clickable `Coming Soon`.
  - `/ab-testing` is implemented as the first real practice page.
  - `/add-remove-elements` is implemented as the second real practice page with dynamic DOM creation and removal.
  - `/basic-auth` is implemented as a network-level authentication exercise.
  - `/broken-images` is implemented with generated local assets plus intentional broken image URLs.
  - `/checkboxes` is implemented as a multi-section checkbox practice page with repeated layouts, disabled states, and live selection summaries.
  - `/context-menu` is implemented as a file-manager style right-click interaction with a positioned context menu and action logging.
  - Remaining rough-list exercises are now implemented as shared beta pages through a dynamic registry-driven route, with route-specific demos and notes.
  - `/drag-and-drop` is implemented as a multi-example native drag-and-drop page with workflow lanes, nested campaign targets, and a reorderable priority list.
  - `/form-inputs` is implemented as a multi-form page with realistic account, shipping, billing, and support flows, each with independent validation.
  - `/infinite-scroll` is implemented as a client feed backed by a paginated API endpoint.
  - `/pagination` is implemented and reuses the same paginated feed API with explicit next/previous navigation.
  - `/file-upload` is implemented as a Blob-backed upload UI with a simple chooser and success state.
  - `/file-download` is implemented as a Blob-backed file listing with direct download links.
  - The rough-list legacy exercises are covered either by bespoke pages or by shared beta pages, but unverified pages are intentionally hidden behind `Coming Soon` cards on the homepage until they are tested.
  - Build verification: `pnpm exec next build --webpack` completed successfully on July 22, 2026. Plain `pnpm build` still hits a Turbopack sandbox panic in this environment while processing CSS, so webpack mode is the reliable verification path here.

## Working agreement for future Codex sessions

- Keep this `codex.md` file up to date whenever requirements, decisions, routes, architecture, or implementation status change.
- Record new pages before or while building them.
- If a session makes assumptions because details are missing, write those assumptions here so the next handoff is clear.
- Preserve the core product direction from the original instruction:
  - This is a sample app for automation practice.
  - It is a Next.js app intended for Vercel hosting.
  - The home page should link to the list of other pages.
  - We are building one page at a time.
  - Use HeroUI components.

## Next sensible steps

- Replace beta implementations with richer bespoke pages where needed.
- Revisit any beta page whose interaction should move from in-page simulation to network-level realism.
- Add deployment notes once the app is connected to Vercel.
