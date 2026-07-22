import type { ReactNode } from "react";

import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  href: "/infinite-scroll",
});

export default function InfiniteScrollLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

