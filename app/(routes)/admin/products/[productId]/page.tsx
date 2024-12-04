import React from "react";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import ProductForm from "./components/product-form";

interface ProductIdPageProps {
  params: {
    productId: string;
  };
}

const ProductIdPage = async ({ params }: ProductIdPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
  });

  return (
    <div>
      <ProductForm initialData={product} />
    </div>
  );
};

export default ProductIdPage;
