import React from "react";
import { DataTable } from "../DataTable";
import { getCaseData } from "@/app/utils/getData";

export default async function CaseHistory({ caseID }: CaseHistoryProps) {
  const caseData = await getCaseData(caseID);
  const rows = caseData?.CaseHistory || [];

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading case history...</p>}>
          <DataTable rows={rows} columnDefType="caseHistory" />
        </React.Suspense>
      </div>
    </>
  );
}

interface CaseHistoryProps {
  caseID: string;
}
