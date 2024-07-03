import React from "react";
import { useRouter } from "next/navigation";
import {
  convertBooleanToString,
  getChangedValues,
  isSuccessfulResponse,
  cleanObject,
} from "@/app/utils/utils";
import { CaseComment, CaseCommentFormData, CaseData } from "@/app/types/cases";
import { useForm } from "../useForm";

export const useCaseCommentForm = () => {
  const router = useRouter();
  const { user } = useForm({});
  const [isLoading, setIsLoading] = React.useState(false);

  const createCaseCommentFormSubmissionData = (
    values: CaseCommentFormData,
    caseID: string,
    caseCommentData?: CaseComment
  ) => {
    const data = {
      CaseComments_CaseID: values.caseID,
      CaseComments_ID: values.caseCommentID,
      CaseComments_CommentBody: values.comment,
      CaseComments_IsPublic: convertBooleanToString(values.isPublic),
      SubmissionDetails: {
        UserID: user?.id || null,
        CaseID: values?.caseID || null,
      },
    };
    let newFormData: any = cleanObject(data);

    // We only want to submit form values that were modified
    newFormData = getChangedValues(newFormData, caseCommentData);

    // Add the case and comment IDs back in
    newFormData = {
      ...newFormData,
      CaseComments_CaseID: caseID,
    };
    if (caseCommentData && values.caseCommentID) {
      newFormData = {
        ...newFormData,
        CaseComments_ID: values.caseCommentID,
        CaseComments_CaseID: caseCommentData.CaseComments_CaseID || null,
        SubmissionDetails: {
          ...newFormData.SubmissionDetails,
          CaseCommentID: caseCommentData.CaseComments_ID || null,
          CaseID: caseCommentData.CaseComments_CaseID || null,
        },
      };
    }
    return newFormData;
  };

  const submitCaseComment = async (
    values: CaseCommentFormData,
    caseData: CaseData,
    caseCommentData?: CaseComment
  ) => {
    let id = caseData?.CaseInformation.Cases_ID;
    const data = await createCaseCommentFormSubmissionData(
      values,
      id,
      caseCommentData
    );
    console.log("Success values", values);
    console.log("Submitted Data:", data);
    const url = caseCommentData
      ? "/api/cases/update/comment"
      : "/api/cases/insert/comment";
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const response = await fetch(request);

    if (!(await isSuccessfulResponse(response))) {
      setIsLoading(false);
      router.push("/error");
      return;
    }

    const responseData = await response.json();

    // Refresh the page cache
    React.startTransition(() => {
      router.refresh();
    });
    // Invalidate cached case data
    await fetch("/api/revalidate/tag?tag=case");

    return responseData;
  };

  return {
    setIsLoading,
    isLoading,
    createCaseCommentFormSubmissionData,
    submitCaseComment,
  };
};
