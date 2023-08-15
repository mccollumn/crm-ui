"use client";

import React from "react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CaseCommentForm, INITIAL_DATA } from "@/app/forms/CaseCommentForm";

const NewCaseComment = ({ params }: { params: { caseNumber: string } }) => {
  const router = useRouter();
  const caseNumber = params.caseNumber;
  const [data, setData] = React.useState(INITIAL_DATA);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", data);
    // POST data
    // Verify successful response
    router.push(`/cases/view/${caseNumber}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CaseCommentForm
        {...data}
        setData={setData}
        formTitle="New Case Comment"
      />
    </form>
  );
};

export default NewCaseComment;
