"use client";

import React from "react";
import { FormEvent } from "react";
import { AccountForm, INITIAL_DATA } from "@/app/forms/AccountForm";

const NewAccount = () => {
  const [data, setData] = React.useState(INITIAL_DATA);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", data);
    // POST data
    // Verify successful response
    // Get new case number from response
    // Route user to /cases/view/${caseNumber}
  };

  return (
    <form onSubmit={handleSubmit}>
      <AccountForm {...data} setData={setData} formTitle="New Account" />
    </form>
  );
};

export default NewAccount;
