"use client";

import { useRouter } from "next/navigation";
import { CaseForm } from "@/app/forms/CaseForm";

import { cases } from "@/mockData/cases";

const EditCase = ({ params }: { params: { caseID: string } }) => {
  const router = useRouter();

  const caseID = params.caseID;
  const values = getCaseData(caseID);

  const onSuccess = (values: any) => {
    console.log("Success values", values);
    // TODO:
    // PUT data
    // Verify successful response
    router.push(`/cases/view/${caseID}`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <CaseForm
      formTitle="Edit Case"
      onSuccess={onSuccess}
      onCancel={handleCancel}
      defaultValues={values}
    />
  );
};

const getCaseData = (caseID: string) => {
  // TODO: Retreive case data. Just returning initial data for now.
  return cases.find((item) => item.id.toString() === caseID) || {};
};

export default EditCase;
