import { DataTable } from "../DataTable";
import { ButtonNav } from "../navigation/ButtonNav";

import { cases } from "@/mockData/cases";
import React from "react";

const getCase = async (caseID: string) => {
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function CaseComments({ caseID }: CaseCommentsProps) {
  const thisCase = cases.find((item) => item.id.toString() === caseID);
  const rows = thisCase?.comments || [];

  return (
    <>
      <ButtonNav size="small" path={`/cases/new/${caseID}/comment/`}>
        New
      </ButtonNav>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading cases...</p>}>
          <DataTable rows={rows} columnDefType="caseComments" data={thisCase} />
        </React.Suspense>
      </div>
    </>
  );
}

interface CaseCommentsProps {
  caseID: string;
}
