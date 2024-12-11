"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { montserrat, oswald } from "@/lib/fonts";
import useCartStore from "@/hooks/use-cart-store";
import { useRouter } from "next/navigation";

type Props = {};

const CartItems = (props: Props) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isShortScreen, setIsShortScreen] = useState(false);
  const { cart, removeFromCart, updateCartItem } = useCartStore();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsShortScreen(window.innerHeight < 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/tienda");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const formatNumber = (number: number): string => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(number);
  };

  return (
    <div className={`${montserrat.className} flex-1`}>
      <div className="hidden border-b-2 border-slate-200 md:flex justify-between py-6 text-neutral-800 font-semibold">
        <p className="ml-5">Producto</p>
        <div className="flex justify-between w-96">
          <p>Cantidad</p>
          <p className="mr-16">Subtotal</p>
        </div>
      </div>
      <div>
        {cart.map((item) => {
          const price = Number(item.price);
          const boxSize = Number(item.boxSize);
          const quantity = item.quantity;
          const discount = Number(item.discount || 0);

          const discountedPrice =
            discount > 0 ? price * (1 - discount / 100) : price;

          return (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-y-2 justify-between px-2 py-4 items-center border-b border-dashed border-slate-300 relative"
            >
              <div className="flex items-center">
                <Image
                  src={item.src}
                  alt="carrito al este"
                  width={40}
                  height={0}
                />
                <p className="w-72 md:w-80">{item.title}</p>
              </div>
              <div className="flex justify-between items-center w-96">
                <div
                  className={`flex items-center ${
                    isShortScreen ? "ml-10" : "ml-4"
                  } md:ml-0 py-2 px-3 md:py-1 md:px-2 border-2 border-[#B15147] text-slate-400 h-9 md:h-7`}
                >
                  <button
                    onClick={() => updateCartItem(item.id, item.quantity - 1)}
                  >
                    <Minus size={20} className="md:size-[15px]" />{" "}
                  </button>
                  <input
                    min="0"
                    value={item.quantity}
                    onChange={(e) =>
                      updateCartItem(item.id, Number(e.target.value))
                    }
                    className="text-slate-500 dark:text-white border-0 bg-transparent text-sm md:text-xs font-normal focus:outline-none focus:ring-0 max-w-[2rem] text-center"
                    style={{ MozAppearance: "textfield" }}
                  />
                  <button
                    onClick={() => updateCartItem(item.id, item.quantity + 1)}
                  >
                    <Plus size={20} className="md:size-[15px]" />{" "}
                  </button>
                </div>
                <div className="mr-10 text-right">
                  {discount > 0 && (
                    <p className="line-through text-neutral-400">
                      {formatNumber(price * boxSize * quantity)}
                    </p>
                  )}
                  <p className="text-lg font-medium">
                    {formatNumber(discountedPrice * boxSize * quantity)}
                  </p>
                  {discount > 0 && (
                    <p className="text-green-600 text-sm">
                      Ahorraste{" "}
                      {formatNumber(
                        (price - discountedPrice) * boxSize * quantity
                      )}
                    </p>
                  )}
                </div>
                <Trash2
                  className="absolute top-7 right-0 cursor-pointer text-neutral-800"
                  size={isMobile ? 20 : 15}
                  onClick={() => removeFromCart(item.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-x-2 mt-4">
        <Input
          className="max-w-52 rounded-none"
          placeholder="Código del cupón"
        />
        <Button className="rounded-none bg-[#B15147] hover:bg-[#B15147]/90">
          Aplicar el cupón
        </Button>
      </div>
    </div>
  );
};

export default CartItems;
