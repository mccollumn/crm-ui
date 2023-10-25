import React from "react";
import { DataTable } from "../DataTable";
import { ButtonNav } from "../navigation/ButtonNav";
import { OpportunityData } from "@/app/types/opportunities";
import { getOpportunityData } from "@/app/utils/getData";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

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
        <React.Suspense fallback={<>Loading quotes...</>}>
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
