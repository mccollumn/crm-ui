"use client";

import { useRouter } from "next/navigation";
import { SalesOrderForm } from "@/app/forms/SalesOrderForm";

const EditSalesOrder = ({
  params,
}: {
  params: { accountID: string; orderNumber: string };
}) => {
  const router = useRouter();

  const accountID = params.accountID;
  const orderNumber = params.orderNumber;
  const values = getSalesOrderData(accountID, orderNumber);

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
      formTitle="Edit Sales Order"
      onSuccess={onSuccess}
      onCancel={handleCancel}
      defaultValues={values}
    />
  );
};

const getSalesOrderData = (accountID: string, orderNumber: string) => {
  // TODO: Retreive order data.
  return {};
};

export default EditSalesOrder;
