import React from "react";
import { DataTable } from "../DataTable";
import { ButtonNav } from "../navigation/ButtonNav";
import { OpportunityData } from "@/app/types/opportunities";
import { getOpportunityData } from "@/app/utils/getData";

const OpportunityQuotes = async ({ opportunityID }: OpportunityQuotesProps) => {
  const opportunityData: OpportunityData = await getOpportunityData(
    opportunityID
  );
  const opportunityQuotes = opportunityData.OpportunityQuotes;

  return (
    <>
      <ButtonNav
        size="small"
        path={`/opportunities/new/${opportunityID}/quote/`}
      >
        New
      </ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<p>Loading quotes...</p>}>
          <DataTable
            rows={opportunityQuotes}
            columnDefType="opportunityQuotes"
            data={opportunityData}
          />
        </React.Suspense>
      </div>
    </>
  );
};

interface OpportunityQuotesProps {
  opportunityID: string;
}

export default OpportunityQuotes;
