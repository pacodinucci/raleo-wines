import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { BoxType } from "@prisma/client";

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

    // Validate and cast the type to BoxType if it matches
    const validTypes = Object.values(BoxType); // Ensure BoxType is properly imported
    const typeFilter = validTypes.includes(type as BoxType)
      ? (type as BoxType)
      : undefined;

    const boxes = await db.box.findMany({
      where: typeFilter ? { type: typeFilter } : undefined,
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
