"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type StockColumn = {
  id: string;
  title: string;
  stock: number;
  src: string;
  year: string;
  updatedAt: Date;
};

export const columns: ColumnDef<StockColumn>[] = [
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
    accessorKey: "stock",
    header: "Stock",
  },
];
