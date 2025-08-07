"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper() {
  const pathname = usePathname();
  const hideHeaderRoutes = ["/multipleFormPage"];
  const hideHeaderRoutes2 = ["/Addons"];
  const shouldHideHeader = hideHeaderRoutes.includes(pathname);
  const shouldHideHeader2 = hideHeaderRoutes2.includes(pathname);

  if (shouldHideHeader || shouldHideHeader2) return null;
  return <Header />;
}
