"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import CellAction from "./cell-action";

export type ProductsColumn = {
  id: string;
  title: string;
  winery: string;
  year: string;
  type: string;
  price: string;
  discount: string | undefined;
  stock: number;
  category: string;
  src: string;
  available: boolean;
  updatedAt: string;
};

export const columns: ColumnDef<ProductsColumn>[] = [
  {
    accessorKey: "src",
    header: "Imagen",
    cell: ({ row }) => (
      <div>
        <Image
          src={row.original.src}
          alt="Imagen vino Al Este"
          width={50}
          height={50}
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "winery",
    header: "Bodega",
  },
  {
    accessorKey: "year",
    header: "Cosecha",
  },
  {
    accessorKey: "type",
    header: "Variedad",
  },
  {
    accessorKey: "price",
    header: "Precio",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "available",
    header: "Disponible",
    cell: ({ row }) => <span>{row.original.available ? "Si" : "No"}</span>,
  },
  {
    accessorKey: "updatedAt",
    header: "Última Actualización",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
