import { Payment, Preference } from "mercadopago";
import { revalidatePath } from "next/cache";

import { mercadopagoPreference } from "@/lib/mercadopago-preference";

const getPayment = async (paymentId: any) => {
  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        },
      }
    );

    const payment = await response.json();

    if (response.ok) {
      return payment;
    } else {
      throw new Error(payment.message || "Error al obtener el pago");
    }
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    throw error;
  }
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Webhook recibido:", body);

    // Solo procesar si el tipo de notificación es de pago
    if (body.type === "payment") {
      const paymentId = body.data.id;

      // Obtener información detallada del pago desde la API
      const payment = await getPayment(paymentId);

      console.log("Información del pago:", payment);

      // Verificar el estado del pago y procesar metadata/external_reference
      // if (payment.status === "approved") {
      //   const externalReference = payment.external_reference;
      //   const metadata = payment.metadata;

      //   console.log("External Reference:", externalReference);
      //   console.log("Metadata:", metadata);

      //   // Actualiza el estado del pedido en tu base de datos
      //   await db.order.update({
      //     where: { id: externalReference },
      //     data: { isPaid: true },
      //   });

      //   console.log("Pedido actualizado correctamente");
      // }
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Error en el webhook:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
