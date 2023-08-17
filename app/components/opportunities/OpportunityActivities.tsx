import React from "react";
import { DataTable } from "../DataTable";

const getOpportunityActivities = async (opportunityID: string) => {
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function OpportunityActivities({
  opportunityID,
}: OpportunityActivitiesProps) {
  const opportunityActivities = await getOpportunityActivities(opportunityID);

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading activities...</p>}>
          <DataTable
            rows={opportunityActivities}
            columnDefType="opportunityActivities"
            // TODO: Update field name for opportunity number
            queryField="id"
            queryValue={opportunityID}
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface OpportunityActivitiesProps {
  opportunityID: string;
}
