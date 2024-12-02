import { PreApproval } from "mercadopago";

import { mercadopago } from "@/lib/mercadopago";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body: { data: { id: string }; type: string } = await request.json();

    if (body.type === "subscription_preapproval") {
      const preapproval = await new PreApproval(mercadopago).get({
        id: body.data.id,
      });

      if (preapproval.status === "authorized") {
        const updatedSubscription = await db.subscription.updateMany({
          where: { mercadopagoId: preapproval.id },
          data: { isActive: true },
        });
        console.log(updatedSubscription);
      }
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Error en el webhook:", error);
    return new Response(null, { status: 500 });
  }
}
