import { CaseCommentForm } from "@/app/forms/case/CaseCommentForm";

const NewCaseComment = ({ params }: { params: { caseID: string } }) => {
  const caseID = params.caseID;

  return <CaseCommentForm formTitle="New Case Comment" caseID={caseID} />;
};

export default NewCaseComment;
