import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns, CustomerColumn } from "./columns";

interface CustomerClientProps {
  data: CustomerColumn[];
}

const CustomerClient: React.FC<CustomerClientProps> = ({ data }) => {
  return (
    <div>
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  );
};

export default CustomerClient;
