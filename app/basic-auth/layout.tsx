import type { ReactNode } from "react";

import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  href: "/basic-auth",
});

export default function BasicAuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

