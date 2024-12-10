"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import CellAction from "./cell-action";

export type PackingbillsColumn = {
  id: string;
  packingbillNumber: string;
  // bill: string;
  billNumber: string;
  company: string;
  observations?: string;
  createdAt: string;
};

export const columns: ColumnDef<PackingbillsColumn>[] = [
  {
    accessorKey: "packingbillNumber",
    header: "Número de Remito",
  },
  {
    accessorKey: "company",
    header: "Titular",
  },
  {
    accessorKey: "billNumber",
    header: "Número de Factura",
  },
  {
    accessorKey: "observations",
    header: "Observaciones",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
  },
];
