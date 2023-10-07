import React from "react";
import { MenuItem } from "@/app/types/types";
import {
  convertDateToISOString,
  getChangedValues,
  isObjectEmpty,
  removeNullsFromObject,
} from "@/app/utils/utils";
import { useForm } from "../useForm";
import { Product } from "@/app/types/opportunities";
import {
  QuoteData,
  QuoteProductData,
  QuoteProductFormData,
} from "@/app/types/quotes";

export const useQuoteProductForm = ({
  menuItems,
  quoteData,
}: useProductFormProps) => {
  const initialMenuOptions = {
    Quote: [],
    SaleType: [],
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
    user,
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
    quoteProductData?: QuoteProductData
  ) => {
    const totalListPrice = calculateTotalListPrice(
      values.term,
      values.product.unitPrice,
      values.quantity
    );
    const annualCost = calculateAnnualCost(values.totalSalePrice, values.term);
    const blendedDiscount = calculateBlendedDiscount(
      values.totalSalePrice,
      totalListPrice,
      values.quantity
    );
    const unitNetPrice = calculateUnitNetPrice(
      values.product.unitPrice,
      values.discount
    );
    const RevRecTemplate = calculateRevRecTemplate(values.skuGroup);
    const data = {
      QuoteProductDetail: {
        QuoteProducts_ID: values.id,
        QuoteProducts_AnnualCost: annualCost,
        QuoteProducts_BlendedDiscount: blendedDiscount,
        QuoteProducts_Discount: values.discount,
        QuoteProducts_FulfillmentStatus: values.fulfillment.status,
        QuoteProducts_Name: values.product.lineItemId,
        QuoteProducts_OneYearAmount: values.oneYearAmount,
        QuoteProducts_Product2ID: values.product.id,
        Product2_Name: values.product.name,
        QuoteProducts_ProductCode: values.product.code,
        QuoteProducts_ProductFamily: values.product.family,
        QuoteProducts_Quantity: values.quantity,
        QuoteProducts_QuoteFulfillmentID: values.fulfillment.id,
        QuoteFulfillment_Name: values.fulfillment.name,
        QuoteProducts_QuoteID: values.quote.id,
        Quotes_Name: values.quote.name,
        QuoteProducts_SaleType: values.saleType,
        QuoteProducts_Term: values.term,
        QuoteProducts_TotalListPrice: totalListPrice,
        QuoteProducts_TotalNetPriceDiscount: values.totalNetPriceDiscount,
        QuoteProducts_TotalSalePrice: values.totalSalePrice,
        QuoteProducts_UnitListPrice: values.product.unitPrice,
        QuoteProducts_UnitNetPrice: unitNetPrice,
        QuoteProducts_UOM: values.uom,
      },
      ProductInfo: {
        QuoteProducts_EndDate: convertDateToISOString(values.endDate),
        QuoteProducts_RevRecTemplate: RevRecTemplate,
        QuoteProducts_SKUGroup: values.skuGroup,
        QuoteProducts_StartDate: convertDateToISOString(values.startDate),
      },
    };
    let newFormData: any = removeNullsFromObject(data);

    // We only want to submit form values that were modified
    newFormData = getChangedValues(newFormData, quoteProductData);

    // Add the quote and product IDs back in
    if (quoteProductData) {
      newFormData = {
        ...newFormData,
        QuoteProductDetail: {
          ...newFormData.QuoteProductDetail,
          QuoteProducts_ID:
            quoteProductData.QuoteProductDetail.QuoteProducts_ID,
          QuoteProducts_QuoteID:
            quoteProductData.QuoteProductDetail.QuoteProducts_QuoteID,
        },
        SubmissionDetails: {
          QuoteProducts_ID:
            quoteProductData.QuoteProductDetail.QuoteProducts_ID,
          QuoteProducts_QuoteID:
            quoteProductData.QuoteProductDetail.QuoteProducts_QuoteID,
        },
      };
    }

    newFormData = {
      ...newFormData,
      SubmissionDetails: {
        ...newFormData.SubmissionDetails,
        UserID: user?.id || null,
      },
    };

    return newFormData;
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

const calculateAnnualCost = (
  totalSalePrice: string | null | undefined,
  term: string | null | undefined
) => {
  if (!totalSalePrice || !term) return null;
  return (Number(totalSalePrice) * 12) / Number(term);
};

const calculateBlendedDiscount = (
  totalSalePrice: string | null | undefined,
  totalListPrice: number | string | null | undefined,
  quantity: string | null | undefined
) => {
  if (!totalSalePrice || !totalListPrice || !quantity) return null;
  return (
    1 - Number(totalSalePrice) / (Number(totalListPrice) * Number(quantity))
  );
};

const calculateTotalListPrice = (
  term: string | null | undefined,
  unitListPrice: string | null | undefined,
  quantity: string | null | undefined
) => {
  if (!term || !unitListPrice || !quantity) return null;
  if (Number(term) >= 12) {
    return Number(unitListPrice) * Number(quantity) * (Number(term) / 12);
  }
  return Number(unitListPrice) * Number(quantity);
};

const calculateUnitNetPrice = (
  unitListPrice: string | null | undefined,
  discount: string | null | undefined
) => {
  if (!unitListPrice || !discount) return null;
  return Number(unitListPrice) * (1 - Number(discount));
};

const calculateRevRecTemplate = (skuGroup: string | null | undefined) => {
  if (!skuGroup) return null;
  if (skuGroup === "CON-Consulting") {
    return "Pro Svcs Consulting";
  }
  return "Monthly Flexible";
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
