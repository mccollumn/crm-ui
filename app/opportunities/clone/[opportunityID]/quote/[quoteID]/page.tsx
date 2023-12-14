"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Backdrop, CircularProgress } from "@mui/material";
import { cloneQuote, cloneQuoteProduct } from "@/app/opportunities/clone/clone";
import { QuoteData } from "@/app/types/quotes";

const CloneQuote = ({
  params,
}: {
  params: { opportunityID: string; quoteID: string };
}) => {
  const { opportunityID, quoteID } = params;
  const router = useRouter();

  const clone = async () => {
    // Get data for existing quote
    const responseQuote = await fetch(`/api/quotes/${quoteID}`);
    const responseQuoteData = await responseQuote.json();
    const quoteData: QuoteData = responseQuoteData.data;
    // Generate new quote data and submit
    const newQuoteID = await cloneQuote(quoteData, opportunityID);
    console.log("New quote created:", newQuoteID.ID);
    // Iterate over each quote product
    quoteData.QuoteProducts.forEach(async (product) => {
      // Get data for existing quote product
      const responseQuoteProduct = await fetch(
        `/api/quote_products/${product.QuoteProducts_ID}`
      );
      const responseQuoteProductData = await responseQuoteProduct.json();
      const quoteProductData = responseQuoteProductData.data;
      // Generate new quote product data and submit
      const newQuoteProductID = await cloneQuoteProduct(
        quoteProductData,
        newQuoteID.ID
      );
      console.log("New quote product created:", newQuoteProductID.ID);
    });
    return newQuoteID;
  };

  const quoteIDRef = React.useRef<string>();
  React.useEffect(() => {
    const runClone = async () => {
      const newQuoteID = await clone();
      quoteIDRef.current = newQuoteID.ID;

      // Invalidate cached quote data
      await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/revalidate/tag?tag=quote`
      );

      router.replace(
        `/opportunities/view/${opportunityID}/quote/${newQuoteID.ID}`
      );
    };
    if (!quoteIDRef.current) {
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

export default CloneQuote;
