import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { packingbillNumber, products, observations, linkedBillNumber } =
      body;

    if (!packingbillNumber || !products)
      return new NextResponse("Numero de remito y productos son requeridos.", {
        status: 400,
      });

    const packingbill = await db.$transaction(async (prisma) => {
      const newPackingbill = await prisma.packingbill.create({
        data: {
          packingbillNumber,
          products: JSON.stringify(products),
          observations: observations || null,
          linkedBillNumber: linkedBillNumber || null,
        },
      });

      // Actualizar el stock de cada producto
      for (const product of products) {
        const { productId, stock } = product;

        if (!productId || stock == null) {
          throw new Error("Cada producto debe incluir productId y stock.");
        }

        await prisma.product.update({
          where: { id: productId },
          data: {
            stock: {
              increment: stock, // Incrementar el stock actual
            },
          },
        });
      }

      return newPackingbill;
    });

    return NextResponse.json(packingbill);
  } catch (error) {
    console.log("[PACKINGBILL_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
