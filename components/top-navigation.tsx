"use client";

import React from "react";
import MainNavigation from "./main-navigation";
import OptionsNavigation from "./options-navigation";
import { signika } from "@/lib/fonts";
import { useScroll, motion, useTransform } from "framer-motion";

const TopNavigation = () => {
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [1300, 1400], [0, 1]); // Aparece gradualmente entre 150px y 200px de scroll
  const translateY = useTransform(scrollY, [150, 200], [-50, 0]);

  console.log(scrollY);
  return (
    <motion.div
      className="fixed top-0 left-0 grid grid-cols-[40%_20%_40%] items-center px-6 py-4 z-50 w-full bg-white/50 backdrop-blur-md"
      style={{
        opacity, // Controlar opacidad
        transform: translateY, // Controlar desplazamiento vertical
      }}
    >
      {/* Left column */}
      <div className="flex justify-start">
        <MainNavigation />
      </div>

      {/* Center column */}
      <div className="flex justify-center">
        <h1
          className={`${signika.className} text-3xl uppercase tracking-wide font-semibold text-[#B15147]`}
        >
          halmacén
        </h1>
      </div>

      {/* Right column */}
      <div className="flex justify-end">
        <OptionsNavigation />
      </div>
    </motion.div>
  );
};

export default TopNavigation;
