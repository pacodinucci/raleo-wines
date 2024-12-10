import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import BillsClient from "./components/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const BillsPage = async () => {
  const bills = await db.bill.findMany();

  const formattedBills = bills.map((bill) => ({
    id: bill.id,
    // packingbillNumber: bill.packingbillNumber,
    billNumber: bill.billNumber,
    company: bill.company,
    observations: bill.observations ?? "Sin observaciones",
    subtotal: bill.subtotal,
    iva: bill.iva,
    total: bill.total,
    createdAt: format(new Date(bill.createdAt), "dd/MM/yyyy", { locale: es }),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-neutral-800">Facturas</h1>
        <div>
          <Link href={"/admin/reports/bills/new"}>
            <Button
              className="bg-[#B15147] flex gap-x-2 items-center rounded-sm hover:bg-[#B15147]/70"
              size="sm"
            >
              <Plus size={20} />
              Agregar Factura
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <BillsClient data={formattedBills} />
      </div>
    </div>
  );
};

export default BillsPage;
