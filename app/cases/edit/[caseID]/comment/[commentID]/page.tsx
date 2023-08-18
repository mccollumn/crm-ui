"use client";

import { useRouter } from "next/navigation";
import { CaseCommentForm } from "@/app/forms/CaseCommentForm";

import { cases } from "@/mockData/cases";

const EditCaseComment = ({
  params,
}: {
  params: { caseID: string; commentID: string };
}) => {
  const router = useRouter();

  const caseID = params.caseID;
  const commentID = params.commentID;
  const values = getCaseCommentData(caseID, commentID);

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
      formTitle="Edit Case Comment"
      onSuccess={onSuccess}
      onCancel={handleCancel}
      defaultValues={values}
    />
  );
};

const getCaseCommentData = (caseID: string, commentID: string) => {
  // TODO: Retreive case data. Just returning mock data for now.
  const caseData = cases.find((item) => item.id.toString() === caseID);
  if (!caseData?.comments) return {};
  const comment = caseData?.comments.find(
    (comment) => comment.id.toString() === commentID
  );
  return comment;
};

export default EditCaseComment;
