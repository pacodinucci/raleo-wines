import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const body = await req.json();
    console.log({ body });
    const {
      title,
      price,
      stock,
      harvest,
      fermentation,
      aging,
      notes,
      composition,
      cellar,
      alcohol,
      ph,
      category,
      type,
      year,
      size,
      boxSize,
      src,
      discount,
      available,
    } = body.data;

    if (
      !title ||
      !price ||
      !stock ||
      !harvest ||
      !fermentation ||
      !aging ||
      !notes ||
      !composition ||
      !cellar ||
      !alcohol ||
      !ph ||
      !category ||
      !type ||
      !year ||
      !size ||
      !boxSize ||
      !src ||
      !discount ||
      available === null
    ) {
      return new NextResponse("All fields are required.", { status: 400 });
    }

    const product = await db.product.update({
      where: { id: params.productId },
      data: {
        title,
        price,
        stock,
        harvest,
        fermentation,
        aging,
        notes,
        composition,
        cellar,
        alcohol,
        ph,
        category,
        type,
        year,
        size,
        boxSize,
        src,
        discount,
        available,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product ID es requerido.", { status: 400 });
    }

    const product = await db.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
