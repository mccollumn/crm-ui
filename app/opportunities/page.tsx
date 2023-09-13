import * as React from "react";
import { Title } from "../components/Title";
import { ButtonNav } from "../components/navigation/ButtonNav";
import { DataTable } from "../components/DataTable";
import { getOpenOpportunities } from "../utils/getData";
import "server-only";

export default async function Opportunities({
  accountID = "*",
}: OpportunitiesProps) {
  const opportunitiesList = await getOpenOpportunities();

  return (
    <>
      <Title title="Opportunities" />
      <ButtonNav path="/opportunities/new">New</ButtonNav>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading opportunities...</p>}>
          <DataTable
            rows={opportunitiesList}
            columnDefType="opportunitiesList"
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface OpportunitiesProps {
  accountID?: string;
}
