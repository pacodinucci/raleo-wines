"use client";

import { useWindow } from "@/hooks/use-window";
import React, { useEffect, useRef } from "react";

const Scene = () => {
  const { dimension } = useWindow();
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const prevPosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (dimension.width > 0) init();
  }, [dimension]);

  // const init = () => {
  //   const ctx = canvas.current?.getContext("2d");
  //   if (ctx) {
  //     ctx.fillStyle = "black";
  //     ctx.fillRect(0, 0, dimension.width, dimension.height);
  //     ctx.globalCompositeOperation = "destination-out";
  //   }
  // };

  const init = () => {
    const ctx = canvas.current?.getContext("2d");

    if (ctx) {
      // Rellenar el canvas con blanco antes de cargar la imagen
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, dimension.width, dimension.height);

      const image = new Image();
      image.src = "/redwine.jpg"; // Ruta de tu imagen
      image.onload = () => {
        ctx.drawImage(image, 0, 0, dimension.width, dimension.height); // Dibuja la imagen ajustada al canvas
        ctx.globalCompositeOperation = "destination-out";
      };
    }
  };

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const manageMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY, movementX, movementY } = e;
    const numberOfCircles =
      Math.max(Math.abs(movementX), Math.abs(movementY)) / 3;

    if (prevPosition.current) {
      for (let i = 0; i < numberOfCircles; i++) {
        const targetX = lerp(
          prevPosition.current.x,
          clientX,
          (1 / numberOfCircles) * i
        );
        const targetY = lerp(
          prevPosition.current.y,
          clientY,
          (1 / numberOfCircles) * i
        );
        drawCircle(targetX, targetY, 20);
      }
    }

    prevPosition.current = {
      x: clientX,
      y: clientY,
    };
  };

  const drawCircle = (x: number, y: number, radius: number) => {
    const ctx = canvas.current?.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  return (
    <div className="relative w-full h-full">
      {dimension.width === 0 && (
        <div className="absolute w-full h-full bg-black"></div>
      )}
      <canvas
        onMouseMove={manageMouseMove}
        ref={canvas}
        height={dimension.height}
        width={dimension.width}
      />
    </div>
  );
};

export default Scene;
