"use client";

import React from "react";
import MainNavigation from "./main-navigation";
import OptionsNavigation from "./options-navigation";
import { signika } from "@/lib/fonts";
import { useScroll, motion, useTransform, useInView } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSubscription } from "@/context/subscription-context";

const TopNavigation = () => {
  const { subscriptionInView } = useSubscription();
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const opacity = useTransform(
    scrollY,
    pathname === "/" ? [2200, 2300] : [0, 0],
    pathname === "/" ? [0, 1] : [1, 1]
  );
  const translateY = useTransform(
    scrollY,
    pathname === "/" ? [150, 200] : [0, 0],
    pathname === "/" ? [-50, 0] : [0, 0]
  );

  const backgroundColor = subscriptionInView
    ? "rgba(255, 255, 255, 0)"
    : "rgba(255, 255, 255, 0.5)";

  return (
    <motion.div
      className="fixed top-0 left-0 grid grid-cols-[40%_20%_40%] items-center px-6 py-4 z-50 w-full bg-white/50 backdrop-blur-md"
      style={{
        opacity,
        transform: translateY,
        backgroundColor,
        transition: "background-color 0.5s ease",
      }}
    >
      {/* Left column */}
      <div className="flex justify-start">
        <MainNavigation subscriptionInView={subscriptionInView} />
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
        <OptionsNavigation subscriptionInView={subscriptionInView} />
      </div>
    </motion.div>
  );
};

export default TopNavigation;
