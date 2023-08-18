"use client";

import { useRouter } from "next/navigation";
import { SalesInvoiceForm } from "@/app/forms/SalesInvoiceForm";

const NewSalesInvoice = ({ params }: { params: { accountID: string } }) => {
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
    <SalesInvoiceForm
      formTitle="New Sales Invoice"
      onSuccess={onSuccess}
      onCancel={handleCancel}
    />
  );
};

export default NewSalesInvoice;
