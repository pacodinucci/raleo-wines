"use client";

import React from "react";
import MainNavigation from "./main-navigation";
import OptionsNavigation from "./options-navigation";
import { signika } from "@/lib/fonts";

const TopNavigation = () => {
  return (
    <div className="grid grid-cols-[40%_20%_40%] items-center px-6 py-4">
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
    </div>
  );
};

export default TopNavigation;
