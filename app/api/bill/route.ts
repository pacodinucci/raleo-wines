import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      billNumber,
      packingbills,
      products,
      observations,
      company,
      subtotal,
      iva,
      total,
    } = body;

    if (
      !billNumber ||
      !packingbills ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0 ||
      !company ||
      subtotal === undefined ||
      iva === undefined ||
      total === undefined
    ) {
      return new NextResponse("Campos requeridos faltantes.", { status: 400 });
    }

    for (const product of products) {
      if (!product.productId || !product.quantity || !product.unitPrice) {
        return new NextResponse("Estructura de producto inválida.", {
          status: 400,
        });
      }
    }

    // Calcular montos si no están provistos
    const processedProducts = products.map((product: any) => ({
      ...product,
      subtotal: product.quantity * product.unitPrice,
    }));

    // Verificar que el subtotal y el total coincidan con los productos procesados
    const calculatedSubtotal = processedProducts.reduce(
      (sum, product) => sum + product.subtotal,
      0
    );

    if (calculatedSubtotal !== subtotal) {
      return new NextResponse("Subtotal error", { status: 400 });
    }

    const calculatedTotal = calculatedSubtotal + iva;
    if (calculatedTotal !== total) {
      return new NextResponse("Total error", { status: 400 });
    }

    const newBill = await db.bill.create({
      data: {
        billNumber,
        packingbills: {
          connect: packingbills,
        },
        products,
        observations: observations || "",
        company,
        subtotal,
        iva,
        total,
      },
    });

    return NextResponse.json(newBill);
  } catch (error) {
    console.log("[BILL_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const billId = searchParams.get("billId");

    if (billId) {
      const bill = await db.bill.findUnique({
        where: { id: billId },
        include: { packingbills: true },
      });

      if (!bill) {
        return new NextResponse("Factura no encontrada", { status: 404 });
      }

      return NextResponse.json(bill);
    }

    const bills = await db.bill.findMany({
      include: {
        packingbills: true,
      },
    });

    return NextResponse.json(bills);
  } catch (error) {
    console.error("[BILL_GET]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
