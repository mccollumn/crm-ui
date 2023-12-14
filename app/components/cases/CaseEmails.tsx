import React from "react";
import { DataTable } from "../DataTable";
import { getCaseData } from "@/app/utils/getData";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function CaseEmails({ caseID }: CaseEmailsProps) {
  const caseData = await getCaseData(caseID);
  const caseEmails = caseData?.CaseEmails;

  return (
    <>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<>Loading case emails...</>}>
          <DataTable rows={caseEmails} columnDefType="caseEmails" />
        </React.Suspense>
      </div>
    </>
  );
}

interface CaseEmailsProps {
  caseID: string;
}
