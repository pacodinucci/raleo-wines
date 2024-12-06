import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns, PackingbillsColumn } from "./columns";

interface PackingbillsClientProps {
  data: PackingbillsColumn[];
}

const PackingbillsClient: React.FC<PackingbillsClientProps> = ({ data }) => {
  return (
    <div>
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  );
};

export default PackingbillsClient;
