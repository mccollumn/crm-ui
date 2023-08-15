import React from "react";
import { DataTable } from "./DataTable";

import { cases } from "@/mockData/cases";

const getCaseEmails = async (caseNumber: string) => {
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function CaseEmails({ caseNumber }: CaseEmailsProps) {
  const thisCase = cases.find((item) => item.id.toString() === caseNumber);
  const rows = thisCase?.comments || [];

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading case emails...</p>}>
          <DataTable rows={rows} columnDefType="caseEmails" />
        </React.Suspense>
      </div>
    </>
  );
}

interface CaseEmailsProps {
  caseNumber: string;
}
