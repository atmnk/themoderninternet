import type { ReactNode } from "react";

import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  href: "/drag-and-drop",
});

export default function DragAndDropLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

