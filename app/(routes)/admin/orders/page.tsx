import { db } from "@/lib/db";
import React from "react";
import OrdersClient from "./components/client";
import { OrdersColumn, OrderItem } from "./components/columns";

const OrdersPage = async () => {
  const orders = await db.order.findMany({
    include: {
      orderItems: true, // Asume que tienes una relación con orderItems
    },
  });

  const mappedOrders: OrdersColumn[] = orders.map((order) => ({
    id: order.id,
    name: order.name,
    isPaid: order.isPaid,
    isdelivered: order.isdelivered,
    orderItems: order.orderItems.map((item: any) => ({
      productId: item.productId,
      productName: item.productName || "Unknown Product",
      quantity: item.quantity || 0,
      price: item.price || 0,
    })),
    paymentMethod: order.paymentMethod,
    phone: order.phone,
    email: order.email,
    address: order.address,
    billingDetails: order.billingDetails,
    shippingDetails: order.shippingDetails,
    deliveryDays: order.deliveryDays,
    deliveryTime: order.deliveryTime,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  }));

  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold text-neutral-800">Ordenes</h1>
      </div>
      <div>
        <OrdersClient data={mappedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
