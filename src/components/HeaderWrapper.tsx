"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper() {
  const pathname = usePathname();
  const hideHeaderRoutes = ["/multipleFormPage"];
  const shouldHideHeader = hideHeaderRoutes.includes(pathname);

  if (shouldHideHeader) return null;
  return <Header/>;
}
