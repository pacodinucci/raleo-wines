import { NextResponse } from "next/server";
import mercadopago from "mercadopago";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";

import { db } from "@/lib/db";

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

// const client = new MercadoPagoConfig({
//   accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
// });

const corsHeaders = {
  // "Access-Control-Allow-Origin": "https://aleste.vercel.app",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface ProductMetadata {
  id: string;
  quantity: number;
}

interface CustomCreatePreferencePayload extends CreatePreferencePayload {
  metadata: { orderId: string; products: ProductMetadata[] };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds, shippingCost, cart, data, anotherAddress } =
    await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const filteredProducts = productIds.flatMap((productId: any) => {
    const matchingProducts = products.filter(
      (product) => product.id === productId
    );
    return matchingProducts;
  });

  try {
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

    const order = await db.order.create({
      data: {
        name: data.fullName,
        phone: data.phone,
        email: data.email,
        isPaid: false,
        paymentMethod: "mercado-pago",
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

    // const preference = new Preference(client);

    const metadataProducts = cart.map((product: any) => ({
      id: product.id,
      quantity: product.quantity,
    }));

    const preference: CustomCreatePreferencePayload = {
      metadata: { orderId: order.id, products: metadataProducts },
      items: cart.map((product: any) => {
        return {
          title: product.title,
          unit_price: Number(product.price) * Number(product.boxSize),
          quantity: product.quantity,
        };
      }),
      shipments: {
        cost: Number(shippingCost),
      },
      auto_return: "approved",
      back_urls: {
        success: `http://localhost:3000?success=1`,
        failure: `http://localhost:3000?canceled=1`,
      },
      notification_url: `https://aleste.vercel.app/api/notify`,
    };
    const response = await mercadopago.preferences.create(preference);

    if (response.body.init_point) {
      return NextResponse.json(
        { url: response.body.init_point },
        {
          headers: corsHeaders,
        }
      );
    } else {
      throw new Error("Failed to create preference");
    }
  } catch (error) {
    console.log(error);
  }
}
