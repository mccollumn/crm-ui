"use client";

import { useRouter } from "next/navigation";
import { CaseCommentForm } from "@/app/forms/CaseCommentForm";

const NewCaseComment = ({ params }: { params: { caseID: string } }) => {
  const router = useRouter();
  const caseID = params.caseID;

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
    <CaseCommentForm
      formTitle="New Case Comment"
      onSuccess={onSuccess}
      onCancel={handleCancel}
    />
  );
};

export default NewCaseComment;
