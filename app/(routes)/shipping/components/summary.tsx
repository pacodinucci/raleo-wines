"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";

import useCartStore from "@/hooks/use-cart-store";
import getShipnowPrice from "@/lib/get-shipnow-price";
import { montserrat, oswald } from "@/lib/fonts";
import { calculateWeight } from "@/lib/helpers";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CartProduct } from "@/hooks/use-cart-store";
import { useShippingStore } from "@/hooks/use-shipping-store";
import { useFormContext } from "@/context/shipping-form-context";
import AccordionRadioGroup from "@/components/ui/accordion-radio-group";
import MercadoPagoCustom from "./mercadopago-custom";
import createPreference from "@/actions/preference";

const Summary = () => {
  const { cart } = useCartStore();
  const { shippingInfo } = useShippingStore();
  const { handleSubmit } = useFormContext();
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("mercado-pago");

  useEffect(() => {
    const fetchShippingCost = async () => {
      try {
        const weight = 11900; // Peso hardcodeado
        const zipCode = shippingInfo.deliveryAddress
          ? shippingInfo.deliveryZipCode
          : shippingInfo.zipCode;
        const cost = await getShipnowPrice(weight, Number(zipCode));
        setShippingCost(cost);
      } catch (error) {
        console.error("Error fetching shipping cost:", error);
      }
    };

    if (shippingInfo.zipCode.length === 4) {
      fetchShippingCost();
    }
  }, [
    shippingInfo.zipCode,
    shippingInfo.deliveryZipCode,
    shippingInfo.deliveryAddress,
  ]);

  const calculateSubtotal = (item: CartProduct) => {
    const price = Number(item.price);
    const boxSize = Number(item.boxSize);
    const quantity = item.quantity;
    const discount = Number(item.discount || 0);

    const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;

    return discountedPrice * boxSize * quantity;
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => {
      return total + calculateSubtotal(product);
    }, 0);
  };

  const calculateDiscount = () => {
    const subtotal = calculateTotal();
    return paymentMethod === "transferencia" ? subtotal * 0.1 : 0;
  };

  const calculateTotalWithShipping = () => {
    const subtotal = calculateTotal();
    const discount = calculateDiscount();
    return subtotal - discount + (shippingCost || 0);
  };

  const formatNumber = (number: number): string => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(number);
  };

  // const onSubmit = async (data: any) => {
  //   if (
  //     shippingInfo.deliveryAddress &&
  //     (!shippingInfo.deliveryFullName ||
  //       shippingInfo.deliveryZipCode.length < 4 ||
  //       !shippingInfo.deliveryAddressLine ||
  //       !shippingInfo.deliveryCity ||
  //       !shippingInfo.deliveryPhone ||
  //       !shippingInfo.deliveryRegion)
  //   ) {
  //     toast.error("Complete todos los campos de la dirección de entrega.");
  //   } else {
  //     console.log("Carrito:", cart);
  //     console.log("Información de envío:", data);
  //     console.log("Método de Pago:", paymentMethod);
  //     console.log("DELIVERY ADDRESS -->> ", shippingInfo.deliveryAddress);
  //     const anotherAddress = shippingInfo.deliveryAddress;
  //     if (paymentMethod === "mercado-pago") {
  //       const response = await axios.post(
  //         "http://localhost:3000/api/mercado-pago/checkout",
  //         {
  //           productIds: cart.map((item) => item.id),
  //           shippingCost,
  //           cart,
  //           data,
  //           anotherAddress,
  //         }
  //       );
  //       console.log(response);
  //       window.location = response.data.url;
  //     }
  //   }
  // };

  const onSubmit = async (data: any) => {
    if (
      shippingInfo.deliveryAddress &&
      (!shippingInfo.deliveryFullName ||
        shippingInfo.deliveryZipCode?.length < 4 ||
        !shippingInfo.deliveryAddressLine ||
        !shippingInfo.deliveryCity ||
        !shippingInfo.deliveryPhone ||
        !shippingInfo.deliveryRegion)
    ) {
      toast.error("Complete todos los campos de la dirección de entrega.");
    } else {
      try {
        const validShippingCost = shippingCost ?? 0;
        const zipCode = shippingInfo.deliveryZipCode ?? "0000";

        console.log({
          productIds: cart.map((item) => item.id),
          shippingCost: validShippingCost,
          cart,
          data: {
            ...data,
            zipCode,
          },
          anotherAddress: shippingInfo.deliveryAddress,
        });

        const initPoint = await createPreference({
          productIds: cart.map((item) => item.id),
          shippingCost: validShippingCost,
          cart,
          data: {
            ...data,
            zipCode,
          },
          anotherAddress: shippingInfo.deliveryAddress,
        });

        toast.success("Redirigiendo al proceso de pago...");
        window.location.href = initPoint!;
      } catch (error) {
        console.error("Error al crear la preferencia:", error);
        toast.error("Hubo un problema al intentar procesar tu pedido.");
      }
    }
  };

  const paymentOptions = [
    {
      label: "Compras con tarjetas guardadas o saldo en Mercado Pago",
      value: "mercado-pago",
      description: <MercadoPagoCustom />,
    },
    {
      label: "Transferencia bancaria directa",
      value: "transferencia",
      description:
        "PAGO POR TRANSFERENCIA: 10% OFF (se aplica automáticamente al seleccionar esta opción)\n\nRealiza tu pago directamente en nuestra cuenta bancaria. Por favor, usa el número del pedido como referencia de pago. Tu pedido no se procesará hasta que se haya recibido el importe en nuestra cuenta.",
      discount: "(10% de descuento)",
    },
  ];

  return (
    <div className="h-full p-4 space-y-2 max-w-4xl md:pl-6 md:pr-24 relative">
      <h2
        className={`${oswald.className} text-neutral-700 text-3xl tracking-wide px-6 py-4 mb-4 uppercase`}
      >
        Resumen de compra
      </h2>
      {cart.map((item) => (
        <div
          key={item.id}
          className={`${montserrat.className} flex items-center justify-between p-4 border-b border-gray-300`}
        >
          <div className="flex items-center space-x-2">
            <Image
              src={item.src}
              alt={item.title}
              width={40}
              height={40}
              className="rounded"
            />
            <span className="text-sm">{item.quantity}</span>
            <span className="text-sm">x</span>
            <span className="text-base">{item.title}</span>
          </div>
          <span className="text-lg">
            {calculateSubtotal(item).toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </span>
        </div>
      ))}
      <div className="max-w-80 ml-auto">
        <div
          className={`${montserrat.className} flex justify-between gap-x-6 text-xl px-4`}
        >
          <p>Subtotal</p>
          <span>{formatNumber(calculateTotal())}</span>
        </div>
        <div
          className={`${montserrat.className} flex justify-between gap-x-6 text-xl px-4 mt-2`}
        >
          <p>Descuento</p>
          <span>{`(${formatNumber(calculateDiscount())})`}</span>
        </div>
        <div
          className={`${montserrat.className} flex justify-between items-center gap-x-6 text-xl px-4 mt-2`}
        >
          <p>Envío</p>
          <span className={shippingCost === null ? "text-sm" : ""}>
            {shippingCost !== null
              ? formatNumber(shippingCost)
              : "Ingresar código postal"}
          </span>
        </div>
        <p className="text-xs text-right px-4 text-neutral-500 mb-2">
          (Los envíos en CABA no tienen costo.)
        </p>
        <Separator />
        <div
          className={`${montserrat.className} flex justify-between gap-x-6 text-xl px-4 mt-2`}
        >
          <p className="font-medium">Total a pagar</p>
          <span>{formatNumber(calculateTotalWithShipping())}</span>
        </div>
      </div>
      <div className="pt-10 pl-6">
        <AccordionRadioGroup
          options={paymentOptions}
          selectedValue={paymentMethod}
          onValueChange={setPaymentMethod}
        />
      </div>
      <div className="flex justify-end pt-8">
        <Button
          className={`${montserrat.className} bg-[#B15147] text-white uppercase hover:bg-[#B15147]/70 rounded-none`}
          onClick={handleSubmit(onSubmit)}
        >
          Realizar pedido
        </Button>
      </div>
    </div>
  );
};

export default Summary;
