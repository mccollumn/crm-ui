import React from "react";
import { DataTable } from "../DataTable";
import { ButtonNav } from "../navigation/ButtonNav";
import { getCaseData } from "@/app/utils/getData";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const CaseComments = async ({ caseID }: CaseCommentsProps) => {
  const caseData = await getCaseData(caseID);
  const rows = caseData?.CaseComments;

  return (
    <>
      <ButtonNav size="small" path={`/cases/new/${caseID}/comment/`}>
        New
      </ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<>Loading cases...</>}>
          <DataTable
            rows={rows}
            columnDefType="caseComments"
            data={caseData}
            sortModel={[{ field: "CaseComments_CreatedDate", sort: "desc" }]}
          />
        </React.Suspense>
      </div>
    </>
  );
};

interface CaseCommentsProps {
  caseID: string;
}

export default CaseComments;
