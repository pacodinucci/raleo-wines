"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type CustomerColumn = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  orders: string[];
  updatedAt: Date;
};

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Dirección",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
];
