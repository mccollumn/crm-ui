import React from "react";
import { DataTable } from "../DataTable";
import { getOpportunityData } from "@/app/utils/getData";
import { OpportunityData } from "@/app/types/opportunities";
import { ButtonNav } from "../navigation/ButtonNav";

const OpportunityContactRoles = async ({
  opportunityID,
}: OpportunityContactRolesProps) => {
  const opportunityData: OpportunityData = await getOpportunityData(
    opportunityID
  );
  const opportunityContactRoles = opportunityData.OpportunityQuoteContactRoles;

  return (
    <>
      <ButtonNav
        size="small"
        path={`/opportunities/new/${opportunityID}/contact-role/`}
      >
        New
      </ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<p>Loading contact roles...</p>}>
          <DataTable
            rows={opportunityContactRoles}
            columnDefType="opportunityContactRoles"
            data={opportunityData}
          />
        </React.Suspense>
      </div>
    </>
  );
};

interface OpportunityContactRolesProps {
  opportunityID: string;
}

export default OpportunityContactRoles;
