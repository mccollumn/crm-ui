"use client";

import React from "react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AccountForm, INITIAL_DATA } from "@/app/forms/AccountForm";

const EditAccount = ({ params }: { params: { accountNumber: string } }) => {
  const router = useRouter();

  const accountNumber = params.accountNumber;
  const [data, setData] = React.useState(getAccountData(accountNumber));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", data);
    // PUT data
    // Verify successful response
    router.push(`/cases/view/${accountNumber}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <AccountForm {...data} setData={setData} formTitle="Edit Case" />
    </form>
  );
};

const getAccountData = (accountNumber: string) => {
  // TODO: Retreive case data. Just returning initial data for now.
  return INITIAL_DATA;
};

export default EditAccount;
