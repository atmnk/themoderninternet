import type { ReactNode } from "react";

import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  href: "/context-menu",
});

export default function ContextMenuLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

