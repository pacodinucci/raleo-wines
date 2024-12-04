import { db } from "@/lib/db";
import React from "react";
import PackingbillForm from "./components/packingbill-form";

interface PackingbillIdPageProps {
  params: {
    packingbillId: string;
  };
}

const PackingbillIdPage = async ({ params }: PackingbillIdPageProps) => {
  const packingbill = await db.packingbill.findFirst({
    where: {
      id: params.packingbillId,
    },
  });

  return (
    <div>
      <PackingbillForm initialData={packingbill} />
    </div>
  );
};

export default PackingbillIdPage;
