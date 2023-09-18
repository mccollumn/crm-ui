import React from "react";
import { DataTable } from "../DataTable";
import { ButtonNav } from "../navigation/ButtonNav";
import { getCaseData } from "@/app/utils/getData";

const CaseComments = async ({ caseID }: CaseCommentsProps) => {
  const caseData = await getCaseData(caseID);
  const rows = caseData?.CaseComments;

  return (
    <>
      <ButtonNav size="small" path={`/cases/new/${caseID}/comment/`}>
        New
      </ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<p>Loading cases...</p>}>
          <DataTable rows={rows} columnDefType="caseComments" data={caseData} />
        </React.Suspense>
      </div>
    </>
  );
};

interface CaseCommentsProps {
  caseID: string;
}

export default CaseComments;
