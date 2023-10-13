import { QuoteData, QuoteProductData } from "@/app/types/quotes";

/**
 * Generates an object containing the default values for a new/empty quote product form.
 * @returns Initial quote product form data.
 */
const generateInitialQuoteProductFormData = async (
  quoteData?: QuoteData,
  productData?: QuoteProductData
) => {
  let existingQuoteID =
    productData?.QuoteProductDetail?.QuoteProducts_QuoteID ||
    quoteData?.QuoteDetail?.Quotes_ID ||
    null;
  let existingQuoteName =
    productData?.QuoteProductDetail?.Quotes_Name ||
    quoteData?.QuoteDetail?.Quotes_Name ||
    null;

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
      id: existingQuoteID,
      name: existingQuoteName,
    },
    fulfillment: {
      id: null,
      name: null,
      status: null,
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
    startDate: null,
    endDate: null,
  };

  return initialQuoteProductFormData;
};

/**
 * Returns a quote product data object to be passed to the quote product form.
 * @param quoteData Data from an existing quote. (optional)
 * @param productData Data for existing quote product. (optional)
 * @returns Quote product data object.
 */
export const createQuoteProductFormData = async ({
  quoteData,
  productData,
}: CreateQuoteProductFormDataProps) => {
  const initialQuoteProductFormData = await generateInitialQuoteProductFormData(
    quoteData,
    productData
  );

  if (!productData) {
    return initialQuoteProductFormData;
  }

  return {
    ...initialQuoteProductFormData,
    id: productData.QuoteProductDetail.QuoteProducts_ID,
    product: {
      id: productData.QuoteProductDetail.QuoteProducts_Product2ID,
      lineItemId: productData.QuoteProductDetail.QuoteProducts_Name,
      name: productData.QuoteProductDetail.Product2_Name,
      code: productData.QuoteProductDetail.QuoteProducts_ProductCode,
      family: productData.QuoteProductDetail.QuoteProducts_ProductFamily,
      unitPrice: productData.QuoteProductDetail.QuoteProducts_UnitListPrice,
    },
    quote: {
      id: productData.QuoteProductDetail.QuoteProducts_QuoteID,
      name: productData.QuoteProductDetail.Quotes_Name,
    },
    fulfillment: {
      id: productData.QuoteProductDetail.QuoteProducts_QuoteFulfillmentID,
      name: productData.QuoteProductDetail.QuoteFulfillment_Name,
      status: productData.QuoteProductDetail.QuoteProducts_FulfillmentStatus,
    },
    quantity: productData.QuoteProductDetail.QuoteProducts_Quantity,
    discount: productData.QuoteProductDetail.QuoteProducts_Discount,
    totalNetPriceDiscount:
      productData.QuoteProductDetail.QuoteProducts_TotalNetPriceDiscount,
    totalSalePrice: productData.QuoteProductDetail.QuoteProducts_TotalSalePrice,
    oneYearAmount: productData.QuoteProductDetail.QuoteProducts_OneYearAmount,
    currency: productData.QuoteProductDetail.QuoteProducts_CurrencyIsoCode,
    // unitListPrice: productData.QuoteProductDetail.QuoteProducts_UnitListPrice,
    term: productData.QuoteProductDetail.QuoteProducts_Term,
    skuGroup: productData.ProductInfo.QuoteProducts_SKUGroup,
    uom: productData.QuoteProductDetail.QuoteProducts_UOM,
    saleType: productData.QuoteProductDetail.QuoteProducts_SaleType,
    parentQuoteProductId: "",
    qmEditable: !!Number(""),
    startDate: productData.ProductInfo.QuoteProducts_StartDate,
    endDate: productData.ProductInfo.QuoteProducts_EndDate,
  };
};

interface CreateQuoteProductFormDataProps {
  quoteData?: QuoteData;
  productData?: QuoteProductData;
}
