"use client";

import { useRouter } from "next/navigation";
import { CaseForm } from "@/app/forms/CaseForm";

const NewCase = () => {
  const router = useRouter();

  const onSuccess = (values: any) => {
    console.log("Success values", values);
    // TODO:
    // PUT data
    // Verify successful response
    // Get ID
    const caseID = "";
    router.push(`/cases/view/${caseID}`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <CaseForm
      formTitle="New Case"
      onSuccess={onSuccess}
      onCancel={handleCancel}
    />
  );
};

export default NewCase;
