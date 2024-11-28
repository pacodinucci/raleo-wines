import React from "react";

const ThreeColumnScroll = () => {
  return (
    <div className="h-[100vh] overflow-y-hidden">
      <div className="h-[15vh]">Titulo</div>
      <div className="grid grid-cols-3">
        <div className="border border-red-500 h-[90vh] relative">
          <div className="mt-24 sticky">Columna 1</div>
        </div>
        <div className="border border-green-500 h-[120vh]">
          <div>Columna 2</div>
        </div>
        <div className="border border-blue-500 h-[150vh]">
          <div>Columna 3</div>
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnScroll;
