import * as React from "react";
import { Title } from "../components/Title";
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

export default async function Cases({ contactID = "" }: CasesProps) {
  const casesList = await getCases();

  return (
    <>
      <Title title="Cases" />
      <ButtonNav path="/cases/new">New</ButtonNav>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading cases...</p>}>
          <DataTable
            rows={casesList}
            columnDefType="casesList"
            // TODO: Update this filed name with correct value for account number
            queryField="id"
            queryValue={contactID}
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface CasesProps {
  contactID?: string;
}
