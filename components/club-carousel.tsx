"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { montserrat } from "@/lib/fonts";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import useBoxStore from "@/hooks/use-box-store";
import { formatNumber } from "@/lib/utils";
import { Button } from "./ui/button";

const ClubCarousel: React.FC = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const { clubBoxes, fetchClubBoxes } = useBoxStore();

  const [expandedBox, setExpandedBox] = useState<string | null>(null);

  const componentRef = useRef(null);
  const inView = useInView(componentRef, { once: true });

  useEffect(() => {
    fetchClubBoxes();
  }, [fetchClubBoxes]);

  const handleMoreInfo = (clubId: string) => {
    router.push(`/club?clubId=${clubId}`);
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const totalItems = clubBoxes.length;
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

  return (
    <motion.div
      className="relative group hidden md:block"
      ref={componentRef}
      initial={{ y: 100, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1
        className={`${montserrat.className} text-4xl font-semibold text-[#B15147] uppercase tracking-wide`}
      >
        Hay vino para todos
      </h1>
      {/* Botón anterior */}
      <button
        onClick={handlePrev}
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#B15147] text-white p-2 z-10 opacity-0 ${
          clubBoxes.length > 4 ? "group-hover:opacity-100" : ""
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
          className="flex transition-transform duration-500 gap-4"
          style={{
            transform: `translateX(-${
              currentIndex * (100 / clubBoxes.length)
            }%)`,
          }}
        >
          {clubBoxes.map((item) => (
            <motion.div
              key={item.id}
              layoutId={item.id}
              className={`${
                montserrat.className
              } flex-shrink-0 w-80 flex justify-center items-center flex-col gap-y-4 py-12 ${
                expandedBox === item.id ? "z-50" : ""
              }`}
              onClick={() => setExpandedBox(item.id)}
            >
              <motion.div
                className="relative w-60 h-60 overflow-hidden cursor-pointer"
                initial={{ borderRadius: "50%" }}
                whileHover={{ borderRadius: "10%", scale: 1.2 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={item.src!}
                  alt={item.src!}
                  layout="fill"
                  objectFit="cover"
                  className="cursor-pointer"
                />
                <motion.div
                  className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 gap-6"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-white text-xl font-bold">{item.name}</h2>
                  {/* <h2 className="text-white text-xl font-bold">+ INFO</h2> */}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expandido */}
      <AnimatePresence>
        {expandedBox && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedBox(null)} // Cerrar al hacer clic fuera
            />
            <motion.div
              layoutId={expandedBox}
              className="fixed min-h-96 inset-x-10 top-20 mx-auto max-w-md z-50 rounded-lg shadow-lg bg-cover bg-center"
              style={{
                backgroundImage: `url('${
                  clubBoxes.find((box) => box.id === expandedBox)?.src || ""
                }')`,
              }}
            >
              <button
                className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-2"
                onClick={() => setExpandedBox(null)}
              >
                <X />
              </button>

              <div
                className={`${montserrat.className} min-h-96 flex flex-col items-center justify-between bg-black/50 rounded-lg p-5`}
              >
                <h2 className="text-3xl font-bold text-white">
                  {clubBoxes.find((box) => box.id === expandedBox)?.name}
                </h2>
                {/* <p className="mt-4 text-white text-xl">
                  {formatNumber(
                    clubBoxes.find((box) => box.id === expandedBox)?.price || 0
                  )}
                </p> */}
                <p className="mt-4 text-white text-lg text-center">
                  Esta es una descripción de ejemplo.
                </p>
                <Button
                  className={`${montserrat.className} uppercase bg-neutral-200 text-neutral-800 hover:bg-neutral-200/80`}
                >
                  Mas información
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Botón siguiente */}
      <button
        onClick={handleNext}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#B15147] text-white p-2 z-10 opacity-0 ${
          clubBoxes.length > 4 ? "group-hover:opacity-100" : ""
        } transition-opacity duration-300 ${
          currentIndex === clubBoxes.length - 1
            ? "cursor-not-allowed bg-[#B15147]/30"
            : ""
        }`}
        disabled={currentIndex === clubBoxes.length - 1}
      >
        <ChevronRight size={20} />
      </button>
    </motion.div>
  );
};

export default ClubCarousel;
