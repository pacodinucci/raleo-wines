import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns, BillsColumn } from "./columns";

interface BillsClientProps {
  data: BillsColumn[];
}

const BillsClient: React.FC<BillsClientProps> = ({ data }) => {
  return (
    <div>
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  );
};

export default BillsClient;
