"use client";

import React from "react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SalesOrderForm, INITIAL_DATA } from "@/app/forms/SalesOrderForm";

const EditSalesOrder = ({
  params,
}: {
  params: { accountNumber: string; orderNumber: string };
}) => {
  const router = useRouter();

  const accountNumber = params.accountNumber;
  const orderNumber = params.orderNumber;
  const [data, setData] = React.useState(
    getSalesOrderData(accountNumber, orderNumber)
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
      <SalesOrderForm
        {...data}
        setData={setData}
        formTitle="Edit Sales Order"
      />
    </form>
  );
};

const getSalesOrderData = (accountNumber: string, orderNumber: string) => {
  // TODO: Retreive order data.
  return { id: "" } || INITIAL_DATA;
};

export default EditSalesOrder;
