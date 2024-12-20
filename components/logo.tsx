"use client";

import React from "react";
import { signika } from "@/lib/fonts";
import { useScroll, useTransform, motion } from "framer-motion";

const Logo = () => {
  const { scrollY } = useScroll();

  // Define la opacidad en función del scroll
  //   const opacity = useTransform(scrollY, [1500, 1600], [0, 1]); // Aparece entre 1500px y 1600px de scroll
  //   const scale = useTransform(scrollY, [0, 100], [0, 100]); // Se reduce mientras sigues scrolleando
  //   const y = useTransform(scrollY, [1500, 2000], [0, -100]); // Se mueve hacia arriba mientras se encoge
  const logoSize = useTransform(scrollY, [0, 600], [620, 100]);
  const logoTop = useTransform(scrollY, [0, 600], ["40%", "4.5%"]);
  const logoLeft = useTransform(scrollY, [0, 600], ["30%", "3%"]);

  return (
    <motion.div
      className="fixed top-50 left-50 w-full h-full flex items-center justify-center pointer-events-none z-50 bg-transparent"
      //   style={{ opacity, scale, y }}
      style={{
        position: "fixed", // Fija el logo a la ventana del navegador
        width: logoSize,
        height: logoSize,
        top: logoTop,
        // left: logoLeft,
      }}
    >
      <motion.h1
        className={`${signika.className} text-[12vw] uppercase tracking-wide font-semibold text-[#B15147]`}
      >
        Halmacén
      </motion.h1>
    </motion.div>
  );
};

export default Logo;
