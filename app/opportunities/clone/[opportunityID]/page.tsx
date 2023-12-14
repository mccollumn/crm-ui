"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Backdrop, CircularProgress } from "@mui/material";
import { cloneOpportunity } from "../clone";

const CloneOpportunity = ({
  params,
}: {
  params: { opportunityID: string };
}) => {
  const opportunityID = params.opportunityID;
  const router = useRouter();

  const clone = async () => {
    // Get data for existing opportunity
    const response = await fetch(`/api/opportunities/${opportunityID}`);
    const responseData = await response.json();
    const opportunityData = responseData.data;

    // Generate new opportunity data (excluding quotes) and submit
    const newOpportunityID = await cloneOpportunity(opportunityData);
    console.log("New opportunity created:", newOpportunityID.ID);

    // Iterate over the original opportunity quotes
    // opportunityData.OpportunityQuotes.forEach(async (quote) => {
    //   // Get data for existing quote
    //   const quoteData: QuoteData = await getQuoteData(quote.Quotes_ID);
    //   // Generate new quote data and submit
    //   const newQuoteID = await cloneQuote(quoteData, newOpportunityID.ID);
    //   // Iterate over each quote product
    //   quoteData.QuoteProducts.forEach(async (product) => {
    //     // Get data for existing quote product
    //     const productData = await getQuoteProductData(product.QuoteProducts_ID);
    //     // Generate new quote product data and submit
    //     const newQuoteProductID = await cloneQuoteProduct(
    //       productData,
    //       newQuoteID.ID
    //     );
    //   });
    // });

    return newOpportunityID;
  };

  const opportunityIDRef = React.useRef<string>();
  React.useEffect(() => {
    const runClone = async () => {
      const newOpportunityID = await clone();
      opportunityIDRef.current = newOpportunityID.ID;

      // Invalidate cached opportunity data
      await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/revalidate/tag?tag=opportunity`
      );

      router.replace(`/opportunities/view/${opportunityIDRef.current}`);
    };
    if (!opportunityIDRef.current) {
      runClone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default CloneOpportunity;
