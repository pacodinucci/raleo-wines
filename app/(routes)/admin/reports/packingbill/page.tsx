import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const PackingbillPage = async (props: Props) => {
  const packingbills = await db.packingbill.findMany();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-neutral-800">Productos</h1>
        <div>
          <Link href={"/admin/products/new"}>
            <Button
              className="bg-[#B15147] flex gap-x-2 items-center rounded-sm hover:bg-[#B15147]/70"
              size="sm"
            >
              <Plus size={20} />
              Agregar Remito
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <ProductsClient data={productsFormat} />
      </div>
    </div>
  );
};

export default PackingbillPage;
