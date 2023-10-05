import { OpportunityData } from "@/app/types/opportunities";
import { QuoteData, QuoteProduct } from "@/app/types/quotes";
import { getOpportunityData } from "@/app/utils/getData";

/**
 * Generates an object containing the default values for a new/empty quote product form.
 * @returns Initial quote product form data.
 */
const generateInitialQuoteProductFormData = async (quoteData: QuoteData) => {
  const { Quotes_ID, Quotes_Name } = quoteData.QuoteDetail;

  const initialQuoteProductFormData = {
    id: null,
    product: {
      id: null,
      lineItemId: null,
      name: null,
      code: null,
      family: null,
      unitPrice: null,
    },
    quote: {
      id: Quotes_ID,
      name: Quotes_Name,
    },
    quantity: null,
    discount: null,
    totalNetPriceDiscount: null,
    totalSalePrice: null,
    oneYearAmount: null,
    currency: null,
    unitListPrice: null,
    term: null,
    skuGroup: null,
    uom: null,
    saleType: null,
    parentQuoteProductId: null,
    qmEditable: null,
    cpmVolume: null,
    startDate: null,
    endDate: null,
    entitlementId: null,
    fulfillmentStatus: null,
  };

  return initialQuoteProductFormData;
};

/**
 * Returns a quote product data object to be passed to the quote product form.
 * @param quoteData Data from an existing quote. (optional)
 * @returns Quote product data object.
 */
export const createQuoteProductFormData = async (
  quoteData: QuoteData,
  productData?: QuoteProduct
) => {
  const initialQuoteProductFormData = await generateInitialQuoteProductFormData(
    quoteData
  );

  if (!productData) {
    return initialQuoteProductFormData;
  }

  return {
    ...initialQuoteProductFormData,
    id: productData.QuoteProducts_ID,
    product: {
      id: productData.QuoteProducts_Product2ID,
      lineItemId: productData.QuoteProducts_Name,
      name: productData.Product_Name,
      code: productData.QuoteProducts_ProductCode,
      family: productData.QuoteProducts_ProductFamily,
    },
    quote: {
      id: quoteData.QuoteDetail.Quotes_ID,
      name: quoteData.QuoteDetail.Quotes_Name,
    },
    quantity: productData.QuoteProducts_Quantity,
    discount: productData.QuoteProducts_Discount,
    totalNetPriceDiscount: "",
    totalSalePrice: productData.QuoteProducts_TotalSalePrice,
    oneYearAmount: "",
    currency: "",
    unitListPrice: "",
    term: "",
    skuGroup: productData.QuoteProducts_SKUGroup,
    uom: productData.QuoteProducts_UOM,
    saleType: "",
    parentQuoteProductId: "",
    qmEditable: !!Number(""),
    cpmVolume: "",
    startDate: "",
    endDate: "",
    entitlementId: "",
    fulfillmentStatus: "",
  };
};
