"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";

import getShipnowPrice from "@/lib/get-shipnow-price";
import useCartStore from "@/hooks/use-cart-store";
import { montserrat, oswald } from "@/lib/fonts";
import { calculateWeight } from "@/lib/helpers";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const CartTotals = () => {
  const router = useRouter();
  const { cart } = useCartStore();
  const [shippingPrice, setShippingPrice] = useState<number | null>(null);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [zipCode, setZipCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Resetea el precio de envío a null cuando cambie el carrito
    setShippingPrice(null);
  }, [cart]);

  const formatNumber = (number: number): string => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(number);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, product) => {
      const price = Number(product.price);
      const boxSize = Number(product.boxSize);
      const quantity = product.quantity;
      const discount = Number(product.discount || 0);

      // Apply discount if it exists
      const discountedPrice =
        discount > 0 ? price * (1 - discount / 100) : price;

      return total + discountedPrice * boxSize * quantity;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + (shippingPrice || 0);
  };

  const onShippingPriceClick = async () => {
    if (zipCode && zipCode.length >= 4) {
      setLoading(true);
      const weight = calculateWeight(cart);
      console.log({ weight, zipCode: Number(zipCode) });
      const price = await getShipnowPrice(weight, Number(zipCode));
      setShippingPrice(price);
      setLoading(false);
    } else {
      console.log("Ingrese un código postal válido.");
    }
  };

  return (
    <div className="border-2 border-slate-300 h-auto w-[90vw] md:w-96 p-6 flex flex-col justify-between gap-y-2">
      <h3 className={`${oswald.className} text-xl text-neutral-800`}>
        Totales del carrito
      </h3>
      <div className={`${montserrat.className} flex-1 flex flex-col`}>
        <div className="border-b border-dashed border-slate-200 py-4 flex justify-between">
          <p className="text-midBrownCustom font-medium">Subtotal</p>
          <p className="font-medium">{formatNumber(calculateSubtotal())}</p>
        </div>
        <div className="border-b border-dashed border-slate-200 py-4 flex-col justify-between">
          <div className="flex justify-between">
            <p className="text-midBrownCustom font-medium">Envío</p>
            <p className="text-neutral-800 hover:text-slate-600">
              {!shippingPrice && !loading ? (
                <p
                  className="text-neutral-800 hover:text-slate-600 cursor-pointer"
                  onClick={() => setShowShippingForm(!showShippingForm)}
                >
                  Calcular envío
                </p>
              ) : loading ? (
                <p className="font-medium">
                  <MoonLoader size={18} className="mr-8" />
                </p>
              ) : (
                <p className="font-medium">
                  {formatNumber(Number(shippingPrice))}
                </p>
              )}
            </p>
          </div>
          {/* <AnimatePresence> */}
          {showShippingForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -30 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.1 }}
              className="overflow-hidden py-4"
            >
              <div className="flex items-center gap-2 justify-end">
                <Input
                  type="text"
                  placeholder="Ingrese C.P."
                  className="border border-slate-300 px-4 py-2 w-40 rounded-none"
                  onChange={(e) => setZipCode(e.target.value)}
                />
                <Button
                  className={`${montserrat.className} bg-[#B15147] hover:bg-[#B15147]/90 rounded-none`}
                  onClick={onShippingPriceClick}
                >
                  Calcular
                </Button>
              </div>
            </motion.div>
          )}
          {/* </AnimatePresence> */}
        </div>
        <div className="py-4 flex justify-between">
          <p className="text-midBrownCustom font-medium">Total</p>
          <p className="font-medium">{formatNumber(calculateTotal())}</p>
        </div>
      </div>
      <Button
        className={`${montserrat.className} bg-[#B15147] hover:bg-[#B15147]/90 rounded-none`}
        onClick={() => router.push("/shipping")}
      >
        Finalizar compra
      </Button>
    </div>
  );
};

export default CartTotals;
