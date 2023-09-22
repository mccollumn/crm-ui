import React from "react";
import {
  convertBooleanToString,
  getChangedValues,
  removeNullsFromObject,
} from "@/app/utils/utils";
import { CaseComment, CaseCommentFormData } from "@/app/types/cases";

// TODO: Update all the menu names. I just guessed what they will be.

export const useCaseCommentForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const createCaseCommentFormSubmissionData = (
    values: CaseCommentFormData,
    caseID: string,
    caseCommentData?: CaseComment
  ) => {
    const data = {
      CaseComments_ID: values.caseID,
      CaseComments_CommentBody: values.comment,
      CaseComments_IsPublic: convertBooleanToString(values.isPublic),
    };
    let newFormData: any = removeNullsFromObject(data);

    // We only want to submit form values that were modified
    newFormData = getChangedValues(newFormData, caseCommentData);

    // Add the case ID back in
    if (caseCommentData) {
      newFormData = {
        CaseComments: [
          { ...newFormData, CaseComments_ID: caseCommentData.CaseComments_ID },
        ],
        CaseInformation: {
          Cases_ID: caseID,
        },
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
