"use client";

import React from "react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SalesInvoiceForm, INITIAL_DATA } from "@/app/forms/SalesInvoiceForm";

const EditSalesInvoice = ({
  params,
}: {
  params: { accountNumber: string; orderNumber: string };
}) => {
  const router = useRouter();

  const accountNumber = params.accountNumber;
  const orderNumber = params.orderNumber;
  const [data, setData] = React.useState(
    getSalesInvoiceData(accountNumber, orderNumber)
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", data);
    // PUT data
    // Verify successful response
    router.push(`/accounts/view/${accountNumber}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SalesInvoiceForm
        {...data}
        setData={setData}
        formTitle="Edit Sales Invoice"
      />
    </form>
  );
};

const getSalesInvoiceData = (accountNumber: string, orderNumber: string) => {
  // TODO: Retreive order data.
  return { id: "" } || INITIAL_DATA;
};

export default EditSalesInvoice;
