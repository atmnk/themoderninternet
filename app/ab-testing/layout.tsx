import type { ReactNode } from "react";

import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  href: "/ab-testing",
});

export default function AbTestingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

