import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, bottles, type, products = [], isActive, price, src } = body;

    if (!name || !bottles || !type) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newBox = await db.box.create({
      data: {
        name,
        bottles,
        type,
        src,
        products: {
          connect:
            products.length > 0
              ? products.map((productId: string) => ({ id: productId }))
              : [],
        },
        isActive: isActive ?? true,
        price: price || null,
      },
    });

    // Devolvemos la respuesta con el nuevo registro
    return NextResponse.json(newBox);
  } catch (error) {
    console.log("[BOX_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (!type) {
      const boxes = await db.box.findMany();
      return NextResponse.json(boxes);
    }

    const boxes = await db.box.findMany({
      //@ts-ignore
      where: { type },
      include: {
        products: true,
      },
    });

    return NextResponse.json(boxes);
  } catch (error) {
    console.log("[BOXES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
