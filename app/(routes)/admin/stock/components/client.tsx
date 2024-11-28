import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns, StockColumn } from "./columns";

interface StockClientProps {
  data: StockColumn[];
}

const StockClient: React.FC<StockClientProps> = ({ data }) => {
  return (
    <div>
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  );
};

export default StockClient;
