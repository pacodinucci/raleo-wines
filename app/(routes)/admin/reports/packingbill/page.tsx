"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import PackingbillsClient from "./components/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { PackingbillsColumn } from "./components/columns";
import usePackingbillStore from "@/hooks/use-packingbill-store";

const PackingbillPage = () => {
  // const packingbills = await db.packingbill.findMany({
  //   include: {
  //     bill: true,
  //   },
  // });

  const { packingbills, fetchPackingbills, isLoading, error } =
    usePackingbillStore();

  useEffect(() => {
    fetchPackingbills();
  }, [fetchPackingbills]);

  const formattedPackingbills = packingbills.map((bill) => ({
    ...bill,
    observations: bill.observations ?? undefined,
    billNumber: bill.bill?.billNumber ?? "",
    createdAt: format(new Date(bill.createdAt), "dd/MM/yyyy", { locale: es }),
    updatedAt: format(new Date(bill.updatedAt), "dd/MM/yyyy", { locale: es }),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-neutral-800">Remitos</h1>
        <div>
          <Link href={"/admin/reports/packingbill/new"}>
            <Button
              className="bg-[#B15147] flex gap-x-2 items-center rounded-sm hover:bg-[#B15147]/70"
              size="sm"
            >
              <Plus size={20} />
              Agregar Remito
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <PackingbillsClient data={formattedPackingbills} />
      </div>
    </div>
  );
};

export default PackingbillPage;
