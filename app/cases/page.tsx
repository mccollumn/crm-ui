import React from "react";
import { Title } from "../components/Title";
import { ButtonNav } from "../components/navigation/ButtonNav";
import { DataTable } from "../components/DataTable";
import "server-only";

const getCases = async () => {
  const res = await fetch(`${process.env.API_ENDPOINT}/cases/api/`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const cases = await res.json();
  return cases.cases;
};

const Cases = async ({ contactID = "" }: CasesProps) => {
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
};

interface CasesProps {
  contactID?: string;
}

export default Cases;
