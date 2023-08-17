import React from "react";
import { DataTable } from "../DataTable";

const getOpportunityStages = async (opportunityID: string) => {
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function OpportunityStage({
  opportunityID,
}: OpportunityStageProps) {
  const opportunityStages = await getOpportunityStages(opportunityID);

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading stage history...</p>}>
          <DataTable
            rows={opportunityStages}
            columnDefType="opportunityStages"
            // TODO: Update field name for opportunity number
            queryField="id"
            queryValue={opportunityID}
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface OpportunityStageProps {
  opportunityID: string;
}
