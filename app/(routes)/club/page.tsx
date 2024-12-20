"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useBoxStore from "@/hooks/use-box-store";

const ClubPage = () => {
  const searchParams = useSearchParams();
  const clubId = searchParams.get("clubId"); // Obtener el ID del club desde la URL

  const { fetchBoxById, selectedBox } = useBoxStore(); // Acceder a la acción y el estado de la Box
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
        <h1>No se encontro el club</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1>{selectedBox.name}</h1>
    </div>
  );
};

export default ClubPage;
