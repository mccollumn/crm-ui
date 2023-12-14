"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Backdrop, CircularProgress } from "@mui/material";
import { cloneQuoteProduct } from "@/app/opportunities/clone/clone";

const CloneQuoteProduct = ({
  params,
}: {
  params: { opportunityID: string; quoteID: string; productID: string };
}) => {
  const { opportunityID, quoteID, productID } = params;
  const router = useRouter();

  const clone = async () => {
    // Get data for existing quote product
    const response = await fetch(`/api/quote_products/${productID}`);
    const responseData = await response.json();
    const productData = responseData.data;

    const newQuoteProductID = await cloneQuoteProduct(productData, quoteID);
    console.log("New quote product created:", newQuoteProductID.ID);

    return newQuoteProductID;
  };

  const productIDRef = React.useRef<string>();
  React.useEffect(() => {
    const runClone = async () => {
      const newProductID = await clone();
      productIDRef.current = newProductID.ID;

      // Invalidate cached quote data
      await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/revalidate/tag?tag=quote`
      );

      router.back();
    };
    if (!productIDRef.current) {
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

export default CloneQuoteProduct;
