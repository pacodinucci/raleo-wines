"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import CellAction from "./cell-action";

export type BillsColumn = {
  id: string;
  // packingbillNumber: string;
  billNumber: string;
  company: string;
  observations?: string;
  subtotal: number;
  iva: number;
  total: number;
  createdAt: string;
};

export const columns: ColumnDef<BillsColumn>[] = [
  {
    accessorKey: "billNumber",
    header: "Número de Factura",
  },
  // {
  //   accessorKey: "packingbillNumber",
  //   header: "Número de Remito",
  // },
  {
    accessorKey: "company",
    header: "Titular",
  },
  {
    accessorKey: "observations",
    header: "Observaciones",
    cell: ({ getValue }) => {
      const value = getValue<string | undefined>();
      return value ? value : "Sin observaciones";
    },
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
    cell: ({ getValue }) => {
      const date = new Date(getValue<string>());
      return date.toLocaleDateString("es-AR");
    },
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return `$${value.toLocaleString("es-AR")}`;
    },
  },
  {
    accessorKey: "iva",
    header: "IVA",
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return `$${value.toLocaleString("es-AR")}`;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return `$${value.toLocaleString("es-AR")}`;
    },
  },
];
