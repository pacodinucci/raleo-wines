import { db } from "@/lib/db";
import React from "react";
import BillForm from "./components/bill-form";

interface BillIdPageProps {
  params: {
    billId: string;
  };
}

const BillIdPage = async ({ params }: BillIdPageProps) => {
  const packingbill = await db.bill.findFirst({
    where: {
      id: params.billId,
    },
  });

  return (
    <div>
      <BillForm initialData={packingbill} />
    </div>
  );
};

export default BillIdPage;
