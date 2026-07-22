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
      label: "Infinite Scroll",
      href: "/infinite-scroll",
      description:
        "A social-style feed powered by a paginated backend endpoint and auto-loading cards on scroll.",
      status: "Ready",
    },
    {
      label: "Pagination",
      href: "/pagination",
      description:
        "A page-by-page card feed that reuses the same paginated API as the infinite scroll example.",
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
      label: "File Download",
      href: "/file-download",
      description:
        "A downloadable file index that lists files previously uploaded to the shared Blob store.",
      status: "Ready",
    },
  ],
  links: {
    github: "",
    docs: "https://heroui.com",
  },
};
