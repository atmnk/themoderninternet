import type { ReactNode } from "react";

import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  href: "/file-upload",
});

export default function FileUploadLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

