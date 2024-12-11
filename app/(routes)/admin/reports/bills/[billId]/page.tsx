import { db } from "@/lib/db";
import React from "react";
import BillForm from "./components/bill-form";

interface BillIdPageProps {
  params: {
    billId: string;
  };
  searchParams: {
    packingbillId?: string;
  };
}

const BillIdPage = async ({ params, searchParams }: BillIdPageProps) => {
  const bill = await db.bill.findFirst({
    where: {
      id: params.billId,
    },
  });

  const defaultPackingbill = await db.packingbill.findUnique({
    where: {
      id: searchParams.packingbillId,
    },
  });

  return (
    <div>
      <BillForm initialData={bill} defaultPackingbill={defaultPackingbill} />
    </div>
  );
};

export default BillIdPage;
