"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { montserrat } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import useCartStore from "@/hooks/use-cart-store";
import { useRouter } from "next/navigation";
import useProductStore from "@/hooks/use-product-store";

export interface TiendaCarouselProps {
  // products: Product[];
}

const TiendaCarousel: React.FC<TiendaCarouselProps> = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);

  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleNext = () => {
    if (carouselRef.current) {
      const totalItems = products.length;
      if (currentIndex < totalItems - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const handleAddToCart = (product: Product) => {
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      boxSize: product.boxSize,
      discount: product.discount,
      weight: product.weight,
      src: product.src,
    };

    addToCart(cartProduct);
  };

  return (
    <div className="relative group hidden md:block">
      <button
        onClick={handlePrev}
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#B15147] text-white p-2 z-10 opacity-0 ${
          products.length > 4 ? "group-hover:opacity-100" : ""
        } transition-opacity duration-300 ${
          currentIndex === 0 ? "cursor-not-allowed bg-midBrownCustom/30" : ""
        }`}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={20} />
      </button>
      <div
        className="flex overflow-hidden"
        style={{ width: "100%" }}
        ref={carouselRef}
      >
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${
              currentIndex * (100 / products.length)
            }%)`,
          }}
        >
          {products.map((item, index) => (
            <div
              key={item.src}
              className="flex-shrink-0 w-80 p-2 flex justify-center items-center flex-col gap-y-4"
            >
              <div className="relative w-full h-80 overflow-hidden flex flex-col text-center justify-center items-center gap-y-4">
                <Image
                  src={item.src}
                  alt={item.src}
                  layout="fill"
                  objectFit="cover"
                  className="cursor-pointer hover:scale-125 transition-all duration-500"
                />
                {item.discount !== "0" && (
                  <span className="w-16 h-16 flex items-center justify-center p-3 rounded-full text-white font-medium absolute top-5 left-5 bg-gradient-to-r from-amber-600 to-orange-800">
                    {item.discount}% OFF
                  </span>
                )}
              </div>
              <div
                className="text-center cursor-pointer"
                onClick={() => router.push(`/tienda/${item.id}`)}
              >
                <p
                  className={`${montserrat.className} w-56 min-h-12 hover:text-amber-800`}
                >
                  {item.title} &mdash; {`Caja (${item.boxSize}u)`}
                </p>
                <p className="text-lg font-semibold">
                  {item.discount !== "0" ? (
                    <>
                      <span className="text-neutral-500 font-light line-through mr-2">
                        {new Intl.NumberFormat("es-AR", {
                          style: "currency",
                          currency: "ARS",
                          //   minimumFractionDigits: 0,
                          //   maximumFractionDigits: 0,
                        }).format(Number(item.price) * Number(item.boxSize))}
                      </span>
                      <span>
                        {new Intl.NumberFormat("es-AR", {
                          style: "currency",
                          currency: "ARS",
                          //   minimumFractionDigits: 0,
                          //   maximumFractionDigits: 0,
                        }).format(
                          Number(item.price) *
                            Number(item.boxSize) *
                            (1 - Number(item.discount) / 100)
                        )}
                      </span>
                    </>
                  ) : (
                    new Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                      //   minimumFractionDigits: 0,
                      //   maximumFractionDigits: 0,
                    }).format(Number(item.price) * Number(item.boxSize))
                  )}
                </p>
              </div>
              <Button
                className={`${montserrat.className} rounded-none bg-[#B15147] hover:bg-[#B15147]/80 uppercase tracking-wide`}
                onClick={() => handleAddToCart(item)}
              >
                Agregar al carrito
              </Button>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleNext}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#B15147] text-white p-2 z-10 opacity-0 ${
          products.length > 4 ? "group-hover:opacity-100" : ""
        } transition-opacity duration-300 ${
          currentIndex === products.length - 1
            ? "cursor-not-allowed bg-[#B15147]/30"
            : ""
        }`}
        disabled={currentIndex === products.length - 1}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default TiendaCarousel;
