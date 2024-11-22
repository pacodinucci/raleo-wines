import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns, ProductsColumn } from "./columns";

interface ProductsClientProps {
  data: ProductsColumn[];
}

const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  return (
    <div>
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  );
};

export default ProductsClient;
