import React from "react";
import { DataTable } from "../DataTable";
import { OpportunityData } from "@/app/types/opportunities";
import { getOpportunityData } from "@/app/utils/getData";
import { ButtonNav } from "../navigation/ButtonNav";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function OpportunityProducts({
  opportunityID,
}: OpportunityProductsProps) {
  const opportunityData: OpportunityData = await getOpportunityData(
    opportunityID
  );
  const opportunityProducts = opportunityData.OpportunityProducts;

  return (
    <>
      <ButtonNav
        size="small"
        path={`/opportunities/new/${opportunityID}/product/`}
      >
        New
      </ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<>Loading products...</>}>
          <DataTable
            rows={opportunityProducts}
            columnDefType="opportunityProducts"
            data={opportunityData}
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface OpportunityProductsProps {
  opportunityID: string;
}
