import type { ReactNode } from "react";

import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  href: "/pagination",
});

export default function PaginationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

