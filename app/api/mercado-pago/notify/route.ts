import { NextResponse } from "next/server";
import { MerchantOrder, Payment } from "mercadopago";
import { mercadopagoPreference } from "@/lib/mercadopago-preference";
import mercadopago from "mercadopago";
import { db } from "@/lib/db";
import postShipnowOrder from "@/lib/post-shipnow-order";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    let paymentStatus = "";
    let orderId = "";

    if (body.topic === "payment") {
      const payment = await new Payment(mercadopagoPreference).get({
        id: body.resource,
      });

      if (!payment) {
        throw new Error("No se pudo obtener payment de mercado pago.");
      }

      if (payment.status_detail === "accredited") {
        const updatedOrder = await db.order.update({
          where: {
            id: payment.metadata.order_id,
          },
          data: {
            isPaid: true,
          },
          include: {
            orderItems: true,
          },
        });

        const shippingDetails = updatedOrder.shippingDetails as any;
        const cart = updatedOrder.cart as any[];

        // Creamos los datos de la orden para Shipnow basados en el cart
        const orderData = {
          external_reference: updatedOrder.id, // Referencia de la orden en nuestro sistema
          ship_to: {
            name: updatedOrder.name,
            last_name: "", // Opcional
            zip_code: shippingDetails?.zipCode || "",
            address_line: shippingDetails?.address || "",
            city: shippingDetails?.city || "",
            state: shippingDetails?.region || "",
            email: updatedOrder.email,
          },
          items: cart.map((item: any) => ({
            id: item.shipnowVariantId,
            quantity: item.quantity,
          })),
        };

        const shipnowResponse = await postShipnowOrder(orderData);

        if (!shipnowResponse) {
          console.error("Error al crear la orden en Shipnow");
          return new NextResponse("Error al crear la orden en Shipnow.", {
            status: 400,
          });
        }

        // Actualizar el stock de los productos
        await Promise.all(
          payment.metadata.products.map(async (product: any) => {
            await db.product.update({
              where: {
                id: product.id, // Usamos el ID del producto
              },
              data: {
                stock: {
                  decrement: product.quantity, // Reducimos el stock
                },
              },
            });

            // Verificamos si el producto se quedó sin stock
            const updatedProduct = await db.product.findUnique({
              where: {
                id: product.id,
              },
            });

            // Si no hay stock disponible, marcamos el producto como no disponible
            if (updatedProduct?.stock === 0) {
              await db.product.update({
                where: {
                  id: product.id,
                },
                data: {
                  available: false, // Marcamos el producto como no disponible
                },
              });
            }
          })
        );
      }
    }

    return new NextResponse(null, { status: 200 });
  } catch (error: any) {
    console.error("Error en el webhook de MercadoPago:", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
