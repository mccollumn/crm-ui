import React from "react";
import { DataTable } from "../DataTable";
import { getOpportunityData, getQuoteData } from "@/app/utils/getData";
import { ButtonNav } from "../navigation/ButtonNav";
import { QuoteData } from "@/app/types/quotes";

export default async function QuoteProducts({ quoteID }: QuoteProductsProps) {
  const quoteData: QuoteData = await getQuoteData(quoteID);
  const opportunityID = quoteData.QuoteDetail.Quotes_OpportunityID;
  let opportunityData = {};
  if (opportunityID) {
    opportunityData = await getOpportunityData(opportunityID);
  }
  const quoteProducts = quoteData.QuoteProducts;

  return (
    <>
      <ButtonNav
        size="small"
        path={`/opportunities/new/${opportunityID}/quote/${quoteID}/product`}
      >
        New
      </ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<p>Loading products...</p>}>
          <DataTable
            rows={quoteProducts}
            columnDefType="quoteProducts"
            data={opportunityData}
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface QuoteProductsProps {
  quoteID: string;
}
