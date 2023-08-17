import * as React from "react";
import { Title } from "../components/Title";
import { ButtonNav } from "../components/ButtonNav";
import { DataTable } from "../components/DataTable";
import "server-only";

const getOpportunities = async () => {
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // return res.json();
  return [{ id: "1", opportunityName: "Opportunity of a Lifetime" }];
};

export default async function Opportunities({
  accountNumber = "*",
}: OpportunitiesProps) {
  const opportunitiesList = await getOpportunities();

  return (
    <>
      <Title title="Opportunities" />
      <ButtonNav path="/opportunities/new">New</ButtonNav>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading opportunities...</p>}>
          <DataTable
            rows={opportunitiesList}
            columnDefType="opportunitiesList"
            // TODO: Update this filed name with correct value for account number
            queryField="id"
            queryValue={accountNumber}
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface OpportunitiesProps {
  accountNumber?: string;
}
