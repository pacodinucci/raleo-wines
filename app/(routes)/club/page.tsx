"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useBoxStore from "@/hooks/use-box-store";

const ClubPageContent = () => {
  const searchParams = useSearchParams();
  const clubId = searchParams.get("clubId");

  const { fetchBoxById, selectedBox } = useBoxStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClub = async () => {
      if (clubId) {
        await fetchBoxById(clubId);
        setLoading(false);
      }
    };

    fetchClub();
  }, [clubId, fetchBoxById]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1>Cargando...</h1>
      </div>
    );
  }

  if (!selectedBox) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1>No se encontró el club</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1>{selectedBox.name}</h1>
    </div>
  );
};

const ClubPage = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center min-h-screen">
        <h1>Cargando...</h1>
      </div>
    }
  >
    <ClubPageContent />
  </Suspense>
);

export default ClubPage;
