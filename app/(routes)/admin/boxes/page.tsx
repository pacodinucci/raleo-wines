"use client";

import { Button } from "@/components/ui/button";
import useBoxStore from "@/hooks/use-box-store";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { formatNumber } from "@/lib/helpers";

type Props = {};

const BoxesPage = (props: Props) => {
  const { boxes, fetchBoxes } = useBoxStore();

  useEffect(() => {
    fetchBoxes();
  }, [fetchBoxes]);

  useEffect(() => {
    console.log(boxes);
  }, [boxes]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-neutral-800">Cajas</h1>
        <div>
          <Link href={"/admin/boxes/new"}>
            <Button
              className="bg-[#B15147] flex gap-x-2 items-center rounded-sm hover:bg-[#B15147]/70"
              size="sm"
            >
              <Plus size={20} />
              Agregar Caja
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap p-4 gap-4">
        {boxes &&
          boxes.map((box, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-2 w-[32vw] h-40 border border-neutral-500 rounded-md shadow-md cursor-pointer hover:border-2 transition-transform duration-300"
            >
              <p>{box.name}</p>
              {box?.price && <p>{formatNumber(Number(box.price))}</p>}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BoxesPage;
