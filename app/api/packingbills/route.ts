import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      packingbillNumber,
      products,
      observations,
      // linkedBillId,
      company,
    } = body;

    if (!packingbillNumber || !products || !company)
      return new NextResponse(
        "Numero de remito, productos y titular son requeridos.",
        {
          status: 400,
        }
      );

    const packingbill = await db.$transaction(async (prisma) => {
      const newPackingbill = await prisma.packingbill.create({
        data: {
          packingbillNumber,
          products,
          company,
          observations: observations || null,
          // bill: linkedBillId || null,
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

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, packingbillNumber, products, observations, company } = body;

    if (!id || !packingbillNumber || !products || !company) {
      return new NextResponse(
        "ID, número de remito, productos y titular son requeridos.",
        {
          status: 400,
        }
      );
    }

    const packingbill = await db.packingbill.findUnique({
      where: { id },
      include: { bill: true },
    });

    if (!packingbill) {
      return new NextResponse("El remito no existe.", { status: 404 });
    }

    if (packingbill.bill) {
      return new NextResponse(
        "No se puede actualizar un remito que ya está asociado a una factura.",
        { status: 400 }
      );
    }

    const updatedPackingbill = await db.$transaction(async (prisma) => {
      const originalPackingbill = await prisma.packingbill.findUnique({
        where: { id },
        select: { products: true },
      });

      if (!originalPackingbill) {
        throw new Error("El remito no existe.");
      }

      const originalProducts = originalPackingbill.products;

      if (Array.isArray(originalProducts)) {
        const typedProducts = originalProducts as Array<{
          productId: string;
          stock: number;
        }>;
        for (const product of typedProducts) {
          const { productId, stock } = product;

          if (!productId || stock == null) {
            throw new Error(
              "Cada producto original debe incluir productId y stock."
            );
          }

          await prisma.product.update({
            where: { id: productId },
            data: {
              stock: {
                decrement: stock,
              },
            },
          });
        }
      } else {
        throw new Error(
          "El campo 'products' del remito original no es un array válido."
        );
      }

      const updatedPackingbill = await prisma.packingbill.update({
        where: { id },
        data: {
          packingbillNumber,
          products,
          company,
          observations: observations || null,
        },
      });

      for (const product of products) {
        const { productId, stock } = product;

        if (!productId || stock == null) {
          throw new Error("Cada producto debe incluir productId y stock.");
        }

        await prisma.product.update({
          where: { id: productId },
          data: {
            stock: {
              increment: stock,
            },
          },
        });
      }

      return updatedPackingbill;
    });

    return NextResponse.json(updatedPackingbill);
  } catch (error) {
    console.log("[PACKINGBILL_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const packingbills = await db.packingbill.findMany({
      include: {
        bill: true,
      },
    });

    return NextResponse.json(packingbills);
  } catch (error) {
    console.error("[PACKINGBILL_GET]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
