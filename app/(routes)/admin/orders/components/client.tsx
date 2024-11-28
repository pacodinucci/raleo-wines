import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns, OrdersColumn } from "./columns";

interface ProductsClientProps {
  data: OrdersColumn[];
}

const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  return (
    <div>
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  );
};

export default ProductsClient;
