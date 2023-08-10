"use client";

import React from "react";
import { FormEvent } from "react";
import { CaseForm, INITIAL_DATA } from "@/app/forms/CaseForm";

const NewCase = () => {
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
      <CaseForm {...data} setData={setData} formTitle="New Case" />
    </form>
  );
};

export default NewCase;
