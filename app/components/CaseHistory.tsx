import React from "react";
import { DataTable } from "./DataTable";

import { cases } from "@/mockData/cases";

const getCaseHistory = async (caseNumber: string) => {
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function CaseHistory({ caseNumber }: CaseHistoryProps) {
  const thisCase = cases.find((item) => item.id.toString() === caseNumber);

  const rows = thisCase?.comments || [];

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
  caseNumber: string;
}
