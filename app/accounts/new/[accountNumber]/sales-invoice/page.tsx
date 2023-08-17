"use client";

import React from "react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SalesInvoiceForm, INITIAL_DATA } from "@/app/forms/SalesInvoiceForm";

const NewSalesInvoice = ({ params }: { params: { accountNumber: string } }) => {
  const router = useRouter();
  const accountNumber = params.accountNumber;
  const [data, setData] = React.useState(INITIAL_DATA);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", data);
    // POST data
    // Verify successful response
    router.push(`/accounts/view/${accountNumber}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SalesInvoiceForm
        {...data}
        setData={setData}
        formTitle="New Sales Invoice"
      />
    </form>
  );
};

export default NewSalesInvoice;
