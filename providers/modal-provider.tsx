"use client";

import { useEffect, useState } from "react";

import { CustomerDataModal } from "@/components/modals/cutomer-data-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CustomerDataModal />
    </>
  );
};
