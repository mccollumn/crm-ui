"use client";

import React from "react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CaseCommentForm, INITIAL_DATA } from "@/app/forms/CaseCommentForm";

import { cases } from "@/mockData/cases";

const EditCaseComment = ({
  params,
}: {
  params: { caseNumber: string; commentID: string };
}) => {
  const router = useRouter();

  const caseNumber = params.caseNumber;
  const commentID = params.commentID;
  const [data, setData] = React.useState(
    getCaseCommentData(caseNumber, commentID)
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", data);
    // PUT data
    // Verify successful response
    router.push(`/cases/view/${caseNumber}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CaseCommentForm {...data} setData={setData} />
    </form>
  );
};

const getCaseCommentData = (caseNumber: string, commentID: string) => {
  // TODO: Retreive case data. Just returning mock data for now.
  const caseData = cases.find((item) => item.id.toString() === caseNumber);
  if (!caseData?.comments) return INITIAL_DATA;
  const comment = caseData?.comments.find(
    (comment) => comment.id.toString() === commentID
  );
  return comment || INITIAL_DATA;
};

export default EditCaseComment;
