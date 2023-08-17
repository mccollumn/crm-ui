import React from "react";
import { DataTable } from "../DataTable";
import { ButtonNav } from "../ButtonNav";

const getOpportunityQuotes = async (opportunityID: string) => {
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function OpportunityQuotes({
  opportunityID,
}: OpportunityQuotesProps) {
  const opportunityQuotes = await getOpportunityQuotes(opportunityID);

  return (
    <>
      <ButtonNav
        size="small"
        path={`/opportunities/new/${opportunityID}/quote/`}
      >
        New
      </ButtonNav>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading quotes...</p>}>
          <DataTable
            rows={opportunityQuotes}
            columnDefType="opportunityQuotes"
            // TODO: Update field name for opportunity number
            queryField="id"
            queryValue={opportunityID}
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface OpportunityQuotesProps {
  opportunityID: string;
}
