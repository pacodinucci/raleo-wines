"use client";

import React from "react";
import { usePathname } from "next/navigation";
import TopNavigation from "@/components/top-navigation";

type Props = {};

const ClientLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");
  return (
    <div>
      {!isAdminRoute && <TopNavigation />}
      {children}
    </div>
  );
};

export default ClientLayout;
