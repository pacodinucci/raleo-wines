"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { oswald } from "@/lib/fonts";

const Steps: React.FC = () => {
  const pathname = usePathname();

  const getStepStyle = (step: number): string => {
    if (pathname === "/confirmation") {
      return "bg-[#B15147]"; // Cambia este color según lo necesites
    }

    if (step === 1) {
      if (
        pathname === "/cart" ||
        pathname === "/shipping" ||
        pathname === "/payment"
      ) {
        return "bg-[#B15147]";
      }
    } else if (step === 2) {
      if (pathname === "/shipping" || pathname === "/payment") {
        return "bg-[#B15147]";
      }
    } else if (step === 3) {
      if (pathname === "/payment") {
        return "bg-[#B15147]";
      }
    }
    return "bg-gray-300";
  };

  const getConnectorStyle = (step: number): string => {
    if (pathname === "/confirmation") {
      return "bg-[#B15147]";
    }

    if (pathname === "/shipping" && step === 1) {
      return "bg-[#B15147]";
    }
    if (pathname === "/payment" && step === 2) {
      return "bg-[#B15147]";
    }
    return "bg-gray-300";
  };

  return (
    <div>
      <div className="flex items-center justify-center mt-28 mb-16">
        <div className="flex">
          <span
            className={`${oswald.className} ${getStepStyle(
              1
            )} text-white p-2 rounded-full w-10 h-10 flex items-center justify-center relative`}
          >
            1
            <p className="absolute top-12 left-1/2 transform -translate-x-1/2 text-neutral-800 uppercase text-xs">
              Carrito
            </p>
          </span>
          <div className="flex items-center justify-center w-24 relative">
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 w-full h-1 ${getConnectorStyle(
                1
              )}`}
            ></div>
          </div>
          <span
            className={`${oswald.className} ${getStepStyle(
              2
            )} text-white p-2 rounded-full w-10 h-10 flex items-center justify-center relative`}
          >
            2
            <p className="absolute top-12 left-1/2 transform -translate-x-1/2 text-neutral-800 uppercase text-xs">
              Pago
            </p>
          </span>
          <div className="flex items-center justify-center w-24 relative">
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 w-full h-1 ${getConnectorStyle(
                2
              )}`}
            ></div>
          </div>
          <span
            className={`${oswald.className} ${getStepStyle(
              3
            )} text-white p-2 rounded-full w-10 h-10 flex items-center justify-center relative`}
          >
            3
            <p className="absolute top-12 left-1/2 transform -translate-x-1/2 text-neutral-800 uppercase text-xs">
              Confirmación
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Steps;
