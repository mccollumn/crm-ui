"use client";

import { useRouter } from "next/navigation";
import { SalesOrderForm } from "@/app/forms/SalesOrderForm";

const NewSalesOrder = ({ params }: { params: { accountID: string } }) => {
  const router = useRouter();
  const accountID = params.accountID;

  const onSuccess = (values: any) => {
    console.log("Success values", values);
    // TODO:
    // PUT data
    // Verify successful response
    router.push(`/accounts/view/${accountID}`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SalesOrderForm
      formTitle="New Sales Order"
      onSuccess={onSuccess}
      onCancel={handleCancel}
    />
  );
};

export default NewSalesOrder;
