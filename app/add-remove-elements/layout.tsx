import type { ReactNode } from "react";

import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  href: "/add-remove-elements",
});

export default function AddRemoveElementsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

