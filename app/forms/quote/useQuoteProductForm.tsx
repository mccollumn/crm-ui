import React from "react";
import { MenuItem } from "@/app/types/types";
import {
  getChangedValues,
  isObjectEmpty,
  removeNullsFromObject,
} from "@/app/utils/utils";
import { useForm } from "../useForm";
import { Product } from "@/app/types/opportunities";
import { QuoteData, QuoteProductFormData } from "@/app/types/quotes";

export const useQuoteProductForm = ({
  menuItems,
  quoteData,
}: useProductFormProps) => {
  const initialMenuOptions = {
    Quote: [],
    SalesType: [],
    Product: [],
    Fulfillment: [],
    Family: [],
    Currency: [],
    SkuGroup: [],
    FulfillmentStatus: [],
  };

  const {
    setMenuOptions,
    setCustomMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
    FormatPercent,
    FormatNumber,
    FormatCurrency,
  } = useForm({
    initialMenuOptions,
    menuItems,
  });
  const [productSelected, setProductSelected] = React.useState<Product>();

  React.useEffect(() => {
    // Quotes
    const setQuotes = async () => {
      try {
        const opportunityID = quoteData.QuoteDetail.Quotes_OpportunityID;
        const results = await fetch(`/api/opportunities/${opportunityID}`);
        const opportunityData = await results.json();
        if (isObjectEmpty(opportunityData)) return;
        const options = opportunityData.data.OpportunityQuotes.map(
          (quote: any) => {
            return {
              id: quote.Quotes_ID,
              name: quote.Quotes_Name,
              status: quote.Quotes_Status,
              primary: quote.Quotes_Primary,
            };
          }
        );
        setCustomMenuOptions("Quote", options);
      } catch {
        console.error("Could not retrieve quote data");
      }
    };
    setQuotes();

    // Products
    const setProducts = async () => {
      try {
        const results = await fetch("/api/products");
        const productList = await results.json();
        if (isObjectEmpty(productList)) return;
        const activeProductsList = productList.data.filter(
          (product: any) => product.Product2_IsActive === "1"
        );
        const options = activeProductsList.map((product: any) => {
          return {
            id: product.Product2_ID,
            name: product.Product2_Name,
            code: product.Product2_ProductCode,
            description: product.Product2_ProductDescriptionLong,
          };
        });
        setCustomMenuOptions("Product", options);
      } catch {
        console.error("Could not retrieve product list");
      }
    };
    setProducts();

    // Fulfillment
    // TODO: Enable after API is passing fulfillment array
    // const setFulfillment = async () => {
    //   try {
    //     const quoteFulfillments = quoteData.QuoteFullfillment;
    //     const options = quoteFulfillments.map((fulfillment: any) => {
    //       return {
    //         id: fulfillment.QuoteFulfillment_ID,
    //         name: fulfillment.QuoteFulfillment_Name,
    //         date: fulfillment.QuoteFulfillment_FulfillmentDate,
    //       };
    //     });
    //     setCustomMenuOptions("Product", options);
    //   } catch {
    //     console.error("Could not retrieve fulfillment list");
    //   }
    // };
    // setFulfillment();

    // Set menu options that are already known (i.e. aren't based on user input)
    setMenuOptions("SalesType");
    setMenuOptions("Currency");
    setMenuOptions("SkuGroup");
    setMenuOptions("FulfillmentStatus");
    setMenuOptions("Family");
  }, [
    quoteData.QuoteDetail.Quotes_OpportunityID,
    setCustomMenuOptions,
    setMenuOptions,
  ]);

  const createQuoteProductFormSubmissionData = (
    values: QuoteProductFormData,
    quoteData?: QuoteData
  ) => {
    const data = {
      QuoteProducts_ID: values.id,
      QuoteProducts_Discount: values.discount,
      QuoteProducts_Name: values.product.lineItemId,
      QuoteProducts_Product2ID: values.product.id,
      Product_Name: values.product.name,
      QuoteProducts_ProductCode: values.product.code,
      QuoteProducts_ProductFamily: values.product.family,
      QuoteProducts_Quantity: values.quantity,
      QuoteProducts_QuoteID: values.quote.id,
      QuoteProducts_SKUGroup: values.skuGroup,
      QuoteProducts_TotalSalePrice: values.totalSalePrice,
      QuoteProducts_UOM: values.uom,
    };
    let newFormData: any = removeNullsFromObject(data);

    // We only want to submit form values that were modified
    const productData = quoteData?.QuoteProducts.find(
      (product) => product.QuoteProducts_ID === values.id
    );
    newFormData = getChangedValues(newFormData, productData);

    // Add the quote and product IDs back in
    if (productData) {
      newFormData = {
        ...newFormData,
        QuoteProducts_ID: productData.QuoteProducts_ID,
        QuoteProducts_QuoteID: productData.QuoteProducts_QuoteID,
      };
    }

    const newQuoteData = {
      QuoteDetail: {
        Quotes_ID: quoteData?.QuoteDetail.Quotes_ID,
        Quotes_OpportunityID: quoteData?.QuoteDetail.Quotes_OpportunityID,
      },
      QuoteProducts: [newFormData],
    };

    return newQuoteData;
  };

  return {
    setMenuOptions,
    setIsLoading,
    isLoading,
    productSelected,
    setProductSelected,
    menuOptions,
    FormatPercent,
    FormatNumber,
    FormatCurrency,
    createQuoteProductFormSubmissionData,
  };
};

interface useProductFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
  /**
   * Quote data
   */
  quoteData: QuoteData;
}