"use client";

import React, { useRef } from "react";
import { optionsNavigationOptions } from "@/lib/constants";
import { montserrat } from "@/lib/fonts";
import { PiBagLight } from "react-icons/pi";
import useCartStore from "@/hooks/use-cart-store";
import SemiCart from "./semi-cart";

const OptionsNavigation = () => {
  const semiCartRef = useRef<HTMLDivElement>(null);
  const cartIconRef = useRef<HTMLDivElement>(null);

  const cartItemsSum = useCartStore((state) => state.cart.length);
  const setCartOpen = useCartStore((state) => state.setCartOpen);
  const setCartClose = useCartStore((state) => state.setCartClose);
  const toggleCart = useCartStore((state) => state.toggleCart);

  let closeTimeout: ReturnType<typeof setTimeout>;

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }
    setCartOpen(); // Abre el carrito
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      if (
        !cartIconRef.current?.contains(document.activeElement) &&
        !semiCartRef.current?.contains(document.activeElement)
      ) {
        setCartClose(); // Cierra el carrito
      }
    }, 300); // Retardo de 300ms para cerrar el SemiCart
  };

  return (
    <div className="flex items-center gap-x-8">
      <ul className="flex gap-x-8">
        {optionsNavigationOptions.map((option, index) => (
          <li
            key={index}
            className={`${montserrat.className} text-neutral-700 uppercase text-sm tracking-wide cursor-pointer`}
          >
            {option}
          </li>
        ))}
      </ul>
      <div
        className="relative p-2"
        ref={cartIconRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <PiBagLight className="text-xl cursor-pointer" onClick={toggleCart} />
        {cartItemsSum > 0 && (
          <span className="absolute top-0 right-0 bg-[#B15147] text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
            {cartItemsSum}
          </span>
        )}
      </div>
      <div
        ref={semiCartRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SemiCart />
      </div>
    </div>
  );
};

export default OptionsNavigation;
