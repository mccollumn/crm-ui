import { OpportunityData } from "@/app/types/opportunities";
import { QuoteData, QuoteProduct } from "@/app/types/quotes";
import { getOpportunityData } from "@/app/utils/getData";

/**
 * Generates an object containing the default values for a new/empty quote product form.
 * @returns Initial quote product form data.
 */
const generateInitialQuoteProductFormData = async (quoteData: QuoteData) => {
  const getDefaultAccount = async (quoteData: QuoteData) => {
    const opportunityID = quoteData.QuoteDetail.Quotes_OpportunityID;
    if (!opportunityID) return { id: null, name: null };
    const opportunityData: OpportunityData = await getOpportunityData(
      opportunityID
    );
    const { Opportunities_AccountId, Accounts_Name } =
      opportunityData.OpportunityDetail;
    return { id: Opportunities_AccountId, name: Accounts_Name };
  };

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
    quantity: null,
    discount: null,
    totalSalePrice: null,
    quoteId: null,
    skuGroup: null,
    uom: null,
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
  quoteProductID?: string
) => {
  const initialQuoteProductFormData = await generateInitialQuoteProductFormData(
    quoteData
  );
  let productData;
  if (quoteProductID) {
    productData = quoteData.QuoteProducts.find(
      (product) => product.QuoteProducts_ID === quoteProductID
    );
  }

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
    quantity: productData.QuoteProducts_Quantity,
    discount: productData.QuoteProducts_Discount,
    totalSalePrice: productData.QuoteProducts_TotalSalePrice,
    quoteId: productData.QuoteProducts_QuoteID,
    skuGroup: productData.QuoteProducts_SKUGroup,
    uom: productData.QuoteProducts_UOM,
  };
};
