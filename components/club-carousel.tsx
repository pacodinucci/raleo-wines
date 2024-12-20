"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { montserrat } from "@/lib/fonts";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import useBoxStore from "@/hooks/use-box-store";
import { formatNumber } from "@/lib/utils";

const ClubCarousel: React.FC = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const { clubBoxes, fetchClubBoxes } = useBoxStore();

  const [expandedBox, setExpandedBox] = useState<string | null>(null);

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
    <div className="relative group hidden md:block">
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
                className="relative w-60 h-60 overflow-hidden"
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
                  className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-white text-xl font-bold">{item.name}</h2>
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
              className="fixed inset-10 bg-white z-50 p-5 rounded-lg shadow-lg flex flex-col items-center"
            >
              <button
                className="absolute top-2 right-2 text-gray-500"
                onClick={() => setExpandedBox(null)}
              >
                Cerrar
              </button>
              <Image
                src={clubBoxes.find((box) => box.id === expandedBox)?.src || ""}
                alt="Expanded Box"
                width={400}
                height={400}
              />
              <h2 className="mt-4 text-2xl font-bold">
                {clubBoxes.find((box) => box.id === expandedBox)?.name}
              </h2>
              <p className="mt-2">
                {formatNumber(
                  clubBoxes.find((box) => box.id === expandedBox)?.price || 0
                )}
              </p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleMoreInfo(expandedBox!)}
              >
                Ver Más Información
              </button>
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
    </div>
  );
};

export default ClubCarousel;
