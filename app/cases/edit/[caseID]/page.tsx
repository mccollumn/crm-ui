"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CaseForm } from "@/app/forms/CaseForm";

import { cases } from "@/mockData/cases";

const EditCase = ({ params }: { params: { caseID: string } }) => {
  const router = useRouter();
  const [values, setValues] = React.useState<{} | null>(null);
  const caseID = params.caseID;

  const getData = async () => {
    const data = await getCaseData(caseID);
    setValues(data);
  };
  getData();

  const onSuccess = async (values: any) => {
    console.log("Success values", values);
    // TODO:
    // PUT data
    const data = await fetch(`/cases/api/${caseID}/update/`);
    // Verify successful response
    router.push(`/cases/view/${caseID}`);
  };

  const handleCancel = () => {
    router.back();
  };

  if (values) {
    return (
      <CaseForm
        formTitle="Edit Case"
        onSuccess={onSuccess}
        onCancel={handleCancel}
        defaultValues={values}
      />
    );
  }
  return <div>Loading...</div>;
};

const getCaseData = async (caseID: string) => {
  const data = await fetch(`${process.env.API_ENDPOINT}/cases/api/${caseID}`);
  // TODO: Retreive case data. Just returning initial data for now.
  return cases.find((item) => item.id.toString() === caseID) || {};
};

export default EditCase;
