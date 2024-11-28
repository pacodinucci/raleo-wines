"use client";

import React from "react";
import {
  initMercadoPago,
  createCardToken,
  CardNumber,
  SecurityCode,
  ExpirationDate,
  CardPayment,
} from "@mercadopago/sdk-react";
import {
  IAdditionalData,
  ICardPaymentBrickPayer,
  ICardPaymentFormData,
} from "@mercadopago/sdk-react/bricks/cardPayment/type";
import { useRouter } from "next/navigation";
import { useCustomerDataModal } from "@/hooks/use-customer-data-modal";

const publicKey =
  process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || "default_public_key";
initMercadoPago(publicKey);

export const PaymentCardForm = () => {
  const router = useRouter();
  const customerDataModal = useCustomerDataModal();

  //   const cardToken = async () => {
  //     const response = await createCardToken({
  //       cardholderName: "<CARD_HOLDER_NAME>",
  //       identificationType: "<BUYER_IDENTIFICATION_TYPE>",
  //       identificationNumber: "<BUYER_IDENTIFICATION_NUMBER>",
  //     });
  //     console.log("Card Token Response = ", response);
  //   };

  const handleSubmit = async (
    formData: ICardPaymentFormData<ICardPaymentBrickPayer>,
    additionalData?: IAdditionalData
  ): Promise<void> => {
    console.log("Form Data:", formData);
    console.log("Additional Data:", additionalData);

    const subscriptionData = {
      card_token_id: formData.token,
      payer_email: formData.payer.email,
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: formData.transaction_amount,
        currency_id: "ARS",
        start_date: new Date().toISOString(),
        end_date: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toISOString(),
      },
      back_url: "https://vino-club.vercel.app/success",
      reason: "Suscripción Caja Mensual Vino Rodante",
      external_reference: "YG-1234",
      status: "authorized",
    };

    try {
      const response = await fetch("/api/mercado-pago/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscriptionData),
      });

      const data = await response.json();
      console.log("Subscription Response:", data);

      if (response.ok) {
        console.log("Subscription created successfully!");
        // customerDataModal.onClose();
        // router.push("/success");
      } else {
        console.error("Failed to create subscription:", data);
        // Maneja el error de manera adecuada
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
    }
  };

  return (
    <>
      <CardPayment
        initialization={{ amount: 15 }}
        onSubmit={handleSubmit}
        locale="es-AR"
        customization={{
          visual: {
            hideFormTitle: false,
            texts: {
              formSubmit: "Suscribirse y pagar",
            },
          },
          paymentMethods: {
            types: {
              included: ["credit_card", "debit_card"],
            },
            maxInstallments: 1,
          },
        }}
      />
    </>
  );
};
