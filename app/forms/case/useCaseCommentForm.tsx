import React from "react";
import {
  convertBooleanToString,
  getChangedValues,
  removeNullsFromObject,
} from "@/app/utils/utils";
import { CaseComment, CaseCommentFormData } from "@/app/types/cases";

export const useCaseCommentForm = () => {
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
    };
    let newFormData: any = removeNullsFromObject(data);

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
      };
    }
    return newFormData;
  };

  return {
    setIsLoading,
    isLoading,
    createCaseCommentFormSubmissionData,
  };
};