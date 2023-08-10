"use client";

import React from "react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CaseForm, INITIAL_DATA } from "@/app/forms/CaseForm";

import { cases } from "@/mockData/cases";

const EditCase = ({ params }: { params: { caseNumber: string } }) => {
  const router = useRouter();

  const caseNumber = params.caseNumber;
  const [data, setData] = React.useState(getCaseData(caseNumber));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", data);
    // PUT data
    // Verify successful response
    router.push(`/cases/view/${caseNumber}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CaseForm {...data} setData={setData} formTitle="Edit Case" />
    </form>
  );
};

const getCaseData = (caseNumber: string) => {
  // TODO: Retreive case data. Just returning initial data for now.
  return (
    cases.find((item) => item.id.toString() === caseNumber) || INITIAL_DATA
  );
};

export default EditCase;
