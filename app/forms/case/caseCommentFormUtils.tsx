import { CaseCommentFormData, CaseComment } from "../../types/cases";

/**
 * Generates and object containing the default values for a new/empty case comment form.
 * @returns Initial case comment form data.
 */
const generateInitialCaseCommentFormData = async () => {
  const initialCaseCommentFormData: CaseCommentFormData = {
    caseCommentID: null,
    caseID: null,
    comment: null,
    isPublic: null,
  };

  return initialCaseCommentFormData;
};

/**
 * Returns a case comment data object to be passed to the case comment form.
 * @param caseCommentData Data from an existing case comment. (optional)
 * @returns Case comment data object.
 */
export const createCaseCommentFormData = async (
  caseCommentData?: CaseComment
) => {
  const initialCaseCommentFormData = await generateInitialCaseCommentFormData();

  if (!caseCommentData) {
    return initialCaseCommentFormData;
  }

  return {
    ...initialCaseCommentFormData,
    caseCommentID: caseCommentData.CaseComments_ID,
    caseID: caseCommentData.CaseComments_CaseID,
    comment: caseCommentData.CaseComments_CommentBody,
    isPublic: !!Number(caseCommentData.CaseComments_IsPublic),
  };
};
