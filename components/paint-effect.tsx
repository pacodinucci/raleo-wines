import Scene from "@/components/scene";
import Text from "@/components/text";
import React from "react";

const PaintEffect = () => {
  return (
    <main className="flex w-screen h-screen items-center justify-center bg-white overflow-x-hidden">
      <Text />
      <Scene />
    </main>
  );
};

export default PaintEffect;
