"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCartStore from "@/hooks/use-cart-store";
import { Button } from "./ui/button";
import Image from "next/image";
import { montserrat } from "@/lib/fonts";
import { useRouter } from "next/navigation";

const SemiCart = () => {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    setCartClose,
  } = useCartStore();

  const shouldDisplayCart = isCartOpen && cart.length > 0;

  const formatNumber = (number: number): string => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(number);
  };

  const calculateTotal = () => {
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

  return (
    <div>
      <AnimatePresence>
        {shouldDisplayCart && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-sm shadow-lg w-80 min-h-80 fixed z-50 top-20 right-6 py-5 px-2 flex flex-col justify-between"
          >
            <div>
              {cart.map((product) => {
                const price = Number(product.price);
                const boxSize = Number(product.boxSize);
                const quantity = product.quantity;
                const discount = Number(product.discount || 0);

                // Calculate discounted price
                const discountedPrice =
                  discount > 0 ? price * (1 - discount / 100) : price;
                const totalPrice = discountedPrice * boxSize * quantity;

                return (
                  <div
                    key={product.id}
                    className={`${montserrat.className} flex justify-between items-center mb-4`}
                  >
                    <div className="flex gap-x-2 w-full items-center">
                      <div>
                        <Image
                          src={product.src}
                          alt="botella al este"
                          width={70}
                          height={0}
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex flex-col gap-y-2 w-full">
                        <div className="flex flex-col w-full justify-between text-neutral-800 text-sm">
                          <p>
                            {product.quantity + " X "}
                            {product.title}
                          </p>
                          <div className="flex justify-end gap-x-2 px-8 text-right">
                            {discount > 0 && (
                              <p className="line-through text-neutral-400">
                                {formatNumber(price * boxSize * quantity)}
                              </p>
                            )}
                            <p>{formatNumber(totalPrice)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <p
                className={`${montserrat.className} text-right text-sm font-semibold px-6`}
              >
                {formatNumber(calculateTotal())}
              </p>
            </div>
            <div className="flex gap-x-4 justify-center mt-2">
              <Button
                className={`${montserrat.className} font-normal rounded-none bg-[#B15147] hover:bg-darkCustom/90`}
                onClick={() => {
                  router.push("/cart");
                  setCartClose();
                }}
              >
                Ver carrito
              </Button>
              <Button
                className={`${montserrat.className} font-normal rounded-none bg-[#B15147] hover:bg-darkCustom/90`}
                onClick={() => {
                  router.push("/shipping");
                  setCartClose();
                }}
              >
                Finalizar compra
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SemiCart;
