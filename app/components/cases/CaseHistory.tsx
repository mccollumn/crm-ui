import React from "react";
import { DataTable } from "../DataTable";
import { getCaseData } from "@/app/utils/getData";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const CaseHistory = async ({ caseID }: CaseHistoryProps) => {
  const caseData = await getCaseData(caseID);
  // const rows = caseData?.CaseHistory || [];

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<>Loading case history...</>}>
          <DataTable rows={[]} columnDefType="caseHistory" />
        </React.Suspense>
      </div>
    </>
  );
};

interface CaseHistoryProps {
  caseID: string;
}

export default CaseHistory;
