import { getCaseData } from "@/app/utils/getData";
import { CaseCommentForm } from "@/app/forms/case/CaseCommentForm";
import { createCaseCommentFormData } from "@/app/forms/case/caseCommentFormUtils";

const EditCaseComment = async ({
  params,
}: {
  params: { caseID: string; commentID: string };
}) => {
  const caseID = params.caseID;
  const commentID = params.commentID;
  const caseData = await getCaseData(caseID);
  const comment = caseData?.CaseComments.find(
    (comment: any) => comment.CaseComments_ID.toString() === commentID
  );
  const values = await createCaseCommentFormData(comment);

  return (
    <CaseCommentForm
      formTitle="Edit Case Comment"
      defaultValues={values}
      caseCommentData={comment}
      caseData={caseData}
    />
  );
};

export default EditCaseComment;
