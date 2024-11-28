import { db } from "@/lib/db";
import React from "react";
import CustomerClient from "./components/client";

const CustomersPage = async () => {
  const customers = await db.customer.findMany({
    include: {
      orders: true,
    },
  });

  const transformedData = customers.map((customer) => ({
    id: customer.id,
    name: customer.name || "Sin nombre",
    email: customer.email || "Sin correo",
    phone: customer.phone || "Sin teléfono",
    address: customer.address || "Sin dirección",
    orders: customer.orders.map((order) => order.id),
    updatedAt: customer.updatedAt, // Cuenta el número de órdenes
  }));

  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold text-neutral-800">Clientes</h1>
      </div>
      <div>
        <CustomerClient data={transformedData} />
      </div>
    </div>
  );
};

export default CustomersPage;
