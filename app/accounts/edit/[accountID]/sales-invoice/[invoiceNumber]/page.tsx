"use client";

import { useRouter } from "next/navigation";
import { SalesInvoiceForm } from "@/app/forms/SalesInvoiceForm";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const EditSalesInvoice = ({
  params,
}: {
  params: { accountID: string; orderNumber: string };
}) => {
  const router = useRouter();

  const accountID = params.accountID;
  const orderNumber = params.orderNumber;
  const values = getSalesInvoiceData(accountID, orderNumber);

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
    <SalesInvoiceForm
      formTitle="Edit Sales Invoice"
      onSuccess={onSuccess}
      onCancel={handleCancel}
      defaultValues={values}
    />
  );
};

const getSalesInvoiceData = (accountID: string, orderNumber: string) => {
  // TODO: Retreive order data.
  return {};
};

export default EditSalesInvoice;
