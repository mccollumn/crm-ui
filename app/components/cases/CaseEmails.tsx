import React from "react";
import { DataTable } from "../DataTable";
import { getCaseData } from "@/app/utils/getData";

export default async function CaseEmails({ caseID }: CaseEmailsProps) {
  const caseData = await getCaseData(caseID);
  const caseEmails = caseData?.CaseEmails;

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading case emails...</p>}>
          <DataTable rows={caseEmails} columnDefType="caseEmails" />
        </React.Suspense>
      </div>
    </>
  );
}

interface CaseEmailsProps {
  caseID: string;
}
