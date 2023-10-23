import React from "react";
import { DataTable } from "../DataTable";
import {
  getOpportunityData,
  getQuoteData,
  getQuoteProductData,
} from "@/app/utils/getData";
import { ButtonNav } from "../navigation/ButtonNav";
import { QuoteData, QuoteProductData } from "@/app/types/quotes";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const QuoteProducts = async ({ quoteID }: QuoteProductsProps) => {
  const quoteData: QuoteData = await getQuoteData(quoteID);
  const quoteProducts = await Promise.all(
    quoteData.QuoteProducts.map(async (product) => {
      const data: QuoteProductData = await getQuoteProductData(
        product.QuoteProducts_ID
      );
      return { ...data.QuoteProductDetail, ...data.ProductInfo };
    })
  );
  const opportunityID = quoteData.QuoteDetail.Quotes_OpportunityID;
  let opportunityData = {};
  if (opportunityID) {
    opportunityData = await getOpportunityData(opportunityID);
  }

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
};

interface QuoteProductsProps {
  quoteID: string;
}

export default QuoteProducts;
