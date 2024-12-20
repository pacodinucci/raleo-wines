import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { boxId: string } }
) {
  try {
    const body = await req.json();
    const { name, bottles, type, products, isActive, price, src } = body;

    // if (!name || !bottles || !type) {
    //   return new NextResponse("Missing required fields", { status: 400 });
    // }

    const product = await db.box.update({
      where: { id: params.boxId },
      data: {
        name,
        bottles,
        type,
        products,
        isActive,
        price,
        src,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[BOXES_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { boxId: string } }
) {
  try {
    const { boxId } = params;

    if (!boxId) {
      return new NextResponse("El ID de la caja es requerido.", {
        status: 400,
      });
    }

    const box = await db.box.findUnique({
      where: { id: boxId },
    });

    if (!box) {
      return new NextResponse("La caja no fue encontrada.", { status: 404 });
    }

    return NextResponse.json(box);
  } catch (error) {
    console.error("[BOX_GET]", error);
    return new NextResponse("Error interno del servidor.", { status: 500 });
  }
}
