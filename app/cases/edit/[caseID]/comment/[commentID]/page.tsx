import { getCaseData } from "@/app/utils/getData";
import { CaseCommentForm } from "@/app/forms/case/CaseCommentForm";

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

  return (
    <CaseCommentForm
      formTitle="Edit Case Comment"
      caseID={caseID}
      defaultValues={comment}
    />
  );
};

export default EditCaseComment;
