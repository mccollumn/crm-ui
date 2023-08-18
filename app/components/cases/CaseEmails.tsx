import React from "react";
import { DataTable } from "../DataTable";

const getCaseEmails = async (caseID: string) => {
  //TODO: Retieve emails for the provided case number
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function CaseEmails({ caseID }: CaseEmailsProps) {
  const caseEmails = await getCaseEmails(caseID);

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
