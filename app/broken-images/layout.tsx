import type { ReactNode } from "react";

import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  href: "/broken-images",
});

export default function BrokenImagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

