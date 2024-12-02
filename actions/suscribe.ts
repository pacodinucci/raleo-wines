"use server";

import { PreApproval } from "mercadopago";
import { mercadopago } from "@/lib/mercadopago";

const suscribe = async (email: string) => {
  const suscription = await new PreApproval(mercadopago).create({
    body: {
      back_url: process.env.APP_URL!,
      reason: "Suscripción a club de vino",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 15,
        currency_id: "ARS",
      },
      payer_email: email,
      status: "pending",
    },
  });

  return { init_point: suscription.init_point!, id: suscription.id };
};

export default suscribe;
