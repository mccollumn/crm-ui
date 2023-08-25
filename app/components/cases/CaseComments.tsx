import React from "react";
import { DataTable } from "../DataTable";
import { ButtonNav } from "../navigation/ButtonNav";
import { getCaseData } from "@/app/utils/getData";

export default async function CaseComments({ caseID }: CaseCommentsProps) {
  const caseData = await getCaseData(caseID);
  const rows = caseData?.CaseComments;

  return (
    <>
      <ButtonNav size="small" path={`/cases/new/${caseID}/comment/`}>
        New
      </ButtonNav>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading cases...</p>}>
          <DataTable rows={rows} columnDefType="caseComments" data={caseData} />
        </React.Suspense>
      </div>
    </>
  );
}

interface CaseCommentsProps {
  caseID: string;
}
