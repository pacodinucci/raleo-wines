"use client";

import { JsonValue } from "type-fest";
import { ColumnDef } from "@tanstack/react-table";

export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
};

export type OrdersColumn = {
  id: string;
  name: string;
  isPaid: boolean;
  isdelivered: boolean;
  orderItems: OrderItem[];
  paymentMethod: string;
  phone: string;
  email: string;
  address: string;
  billingDetails: JsonValue;
  shippingDetails: JsonValue;
  deliveryDays: string[];
  deliveryTime: string[];
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<OrdersColumn>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "name",
    header: "Cliente",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isPaid",
    header: "Pago",
    cell: ({ row }) => <span>{row.original.isPaid ? "Si" : "No"}</span>,
  },
  {
    accessorKey: "isDelivered",
    header: "Entrega",
  },
];
