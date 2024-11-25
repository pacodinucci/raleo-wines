"use client";

import React, { useEffect, useState } from "react";

import Steps from "@/components/steps";
import { oswald } from "@/lib/fonts";
import CartItems from "@/components/cart-items";
import CartTotals from "@/components/cart-totals";
// import Footer from "@/components/footer";
import TopNavigation from "@/components/top-navigation";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Steps />
      <div className="px-5 md:px-10">
        <h1
          className={`${oswald.className} uppercase text-4xl text-neutral-800`}
        >
          Carrito
        </h1>
        <div className="flex flex-col md:flex-row gap-12">
          <CartItems />
          <CartTotals />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default CartPage;
