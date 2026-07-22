import type { ReactNode } from "react";

import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  href: "/form-inputs",
});

export default function FormInputsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

