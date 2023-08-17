import React from "react";
import { DataTable } from "../DataTable";

const getOpportunityContactRoles = async (opportunityID: string) => {
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function OpportunityContactRoles({
  opportunityID,
}: OpportunityContactRolesProps) {
  const opportunityContactRoles = await getOpportunityContactRoles(
    opportunityID
  );

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading contact roles...</p>}>
          <DataTable
            rows={opportunityContactRoles}
            columnDefType="opportunityContactRoles"
            // TODO: Update field name for opportunity number
            queryField="id"
            queryValue={opportunityID}
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface OpportunityContactRolesProps {
  opportunityID: string;
}
