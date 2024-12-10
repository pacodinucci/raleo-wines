import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns, PackingbillsColumn } from "./columns";

interface PackingbillsClientProps {
  data: PackingbillsColumn[];
}

const PackingbillsClient: React.FC<PackingbillsClientProps> = ({ data }) => {
  console.log("Packingbill Data --> ", data);
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        searchKey="title"
        tableType="packingbill"
      />
    </div>
  );
};

export default PackingbillsClient;
