import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const body = await req.json();
    console.log({ body });
    const { stock } = body;

    if (!stock) return new NextResponse("Stock is required.", { status: 400 });

    const product = await db.product.findFirst({
      where: { id: params.productId },
    });

    if (!product) return new NextResponse("Product not found", { status: 404 });

    const updatedProduct = await db.product.update({
      where: { id: params.productId },
      data: { stock: product.stock + stock },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log("[PRODUCT_STOCK_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
