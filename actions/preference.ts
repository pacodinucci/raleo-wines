"use server";

import { Preference } from "mercadopago";
import { mercadopagoPreference } from "@/lib/mercadopago-preference";
import { db } from "@/lib/db";

const createPreference = async ({
  productIds,
  shippingCost,
  cart,
  data,
  anotherAddress,
}: {
  productIds: string[];
  shippingCost: number;
  cart: any[];
  data: any;
  anotherAddress: boolean;
}) => {
  if (!productIds || productIds.length === 0) {
    throw new Error("Product ids are required");
  }

  // Fetch products from the database
  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const shippingDetails = anotherAddress
    ? {
        name: data.deliveryFullName,
        phone: data.deliveryPhone,
        address: data.deliveryAddressLine,
        apart: data.deliveryApart,
        city: data.deliveryCity,
        region: data.deliveryRegion,
        zipCode: data.deliveryZipCode,
      }
    : {
        name: data.fullName,
        phone: data.phone,
        address: data.address,
        apart: data.apart,
        city: data.city,
        region: data.region,
        zipCode: data.zipCode,
      };

  // Ensure customer exists
  let customer = await db.customer.findFirst({
    where: { email: data.email },
  });

  if (!customer) {
    customer = await db.customer.create({
      data: {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
    });
  }

  // Create order in the database
  const order = await db.order.create({
    data: {
      name: data.fullName,
      phone: data.phone,
      email: data.email,
      isPaid: false,
      paymentMethod: "mercado-pago",
      customerId: customer.id,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
      billingDetails: {
        name: data.fullName,
        billingId: data.identification,
        address: data.address,
        apart: data.apart,
        city: data.city,
        region: data.region,
        zipCode: data.zipCode,
      },
      shippingDetails,
      deliveryDays: data.deliveryDays,
      deliveryTime: data.deliveryTime,
      cart,
    },
  });

  const metadataProducts = cart.map((product: any) => ({
    id: product.id,
    quantity: product.quantity,
  }));

  // Create the preference
  const preference = await new Preference(mercadopagoPreference).create({
    body: {
      metadata: { orderId: order.id, products: metadataProducts },
      items: cart.map((product: any) => ({
        id: product.id,
        title: product.title,
        unit_price: Number(product.price) * Number(product.boxSize),
        quantity: product.quantity,
        description: order.id,
      })),
      shipments: {
        cost: Number(shippingCost),
      },
      auto_return: "approved",
      back_urls: {
        success: `https://halmacen-five.vercel.app?success=1`,
        failure: `https://halmacen-five.vercel.app?canceled=1`,
      },
      notification_url: `https://halmacen-five.vercel.app/api/mercado-pago/notify`,
    },
  });

  return preference.init_point;
};

export default createPreference;
