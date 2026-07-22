import type { ReactNode } from "react";

import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  href: "/file-download",
});

export default function FileDownloadLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

