"use client";

import React from "react";
import { FormEvent } from "react";
import { CaseCommentForm, INITIAL_DATA } from "@/app/forms/CaseCommentForm";

const NewCaseComment = () => {
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
      <CaseCommentForm {...data} setData={setData} />
    </form>
  );
};

export default NewCaseComment;
