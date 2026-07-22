import type { ReactNode } from "react";

import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  href: "/checkboxes",
});

export default function CheckboxesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

