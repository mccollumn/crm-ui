import { CaseCommentForm } from "@/app/forms/case/CaseCommentForm";
import { createCaseCommentFormData } from "@/app/forms/case/caseCommentFormUtils";
import { getCaseData } from "@/app/utils/getData";

const NewCaseComment = async ({ params }: { params: { caseID: string } }) => {
  const caseID = params.caseID;
  const caseData = await getCaseData(caseID);
  const values = await createCaseCommentFormData();

  return (
    <CaseCommentForm
      formTitle="New Case Comment"
      defaultValues={values}
      caseData={caseData}
    />
  );
};

export default NewCaseComment;
