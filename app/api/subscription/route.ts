import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      email,
      name,
      address,
      region,
      city,
      zipCode,
      phone,
      plan,
      mercadopagoId,
    } = body;

    if (
      !email ||
      !name ||
      !address ||
      !region ||
      !city ||
      !zipCode ||
      !phone ||
      !plan ||
      !mercadopagoId
    ) {
      return new NextResponse("Todos los campos son obligatorios", {
        status: 400,
      });
    }

    const subscription = await db.subscription.create({
      data: {
        email,
        name,
        address,
        region,
        city,
        zipCode,
        phone,
        plan,
        isActive: false,
        mercadopagoId,
      },
    });

    return NextResponse.json(subscription, { status: 201 });
  } catch (error) {
    console.error("[SUBSCRIPTION_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
