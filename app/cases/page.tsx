import * as React from "react";
import { ButtonNav } from "../components/ButtonNav";
import { DataTable } from "../components/DataTable";
import "server-only";

import { cases } from "../../mockData/cases";

const getCases = async () => {
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // return res.json();
  return cases;
};

export default async function Cases() {
  const casesList = await getCases();

  return (
    <>
      <ButtonNav path="/cases/new">New</ButtonNav>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading cases...</p>}>
          <DataTable rows={casesList} columnDefType="casesList" />
        </React.Suspense>
      </div>
    </>
  );
}
