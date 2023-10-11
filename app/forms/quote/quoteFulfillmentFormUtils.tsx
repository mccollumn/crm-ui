import { QuoteData, QuoteFulfillmentData } from "@/app/types/quotes";

/**
 * Generates an object containing the default values for a new/empty quote fulfillment form.
 * @returns Initial quote fulfillment form data.
 */
const generateInitialQuoteFulfillmentFormData = async (
  quoteData?: QuoteData,
  fulfillmentData?: QuoteFulfillmentData
) => {
  let existingQuoteID =
    fulfillmentData?.QuoteFulfillmentDetail?.QuoteFulfillment_QuoteID ||
    quoteData?.QuoteDetail?.Quotes_ID ||
    null;
  let existingQuoteName =
    fulfillmentData?.QuoteFulfillmentDetail?.Quotes_Name ||
    quoteData?.QuoteDetail?.Quotes_Name ||
    null;

  const initialQuoteFulfillmentFormData = {
    id: null,
    name: null,
    details: null,
    date: null,
    licenseKey: {
      id: null,
      name: null,
      isTerm: null,
    },
    quote: {
      id: existingQuoteID,
      name: existingQuoteName,
    },
    support: {
      beginDate: null,
      endDate: null,
      planType: null,
    },
  };

  return initialQuoteFulfillmentFormData;
};

/**
 * Returns a quote fulfillment data object to be passed to the quote fulfillment form.
 * @param quoteData Data from an existing quote. (optional)
 * @param fulfillmentData Data for existing quote filfillment. (optional)
 * @returns Quote fulfillment data object.
 */
export const createQuoteFulfillmentFormData = async ({
  quoteData,
  fulfillmentData,
}: CreateQuoteFulfillmentFormDataProps) => {
  const initialQuoteFulfillmentFormData =
    await generateInitialQuoteFulfillmentFormData(quoteData, fulfillmentData);

  if (!fulfillmentData) {
    return initialQuoteFulfillmentFormData;
  }

  return {
    ...initialQuoteFulfillmentFormData,
    id: fulfillmentData.QuoteFulfillmentDetail.QuoteFulfillment_ID,
    name: fulfillmentData.QuoteFulfillmentDetail.QuoteFulfillment_Name,
    details: fulfillmentData.QuoteFulfillmentDetail.QuoteFulfillment_Details,
    date: fulfillmentData.QuoteFulfillmentDetail
      .QuoteFulfillment_FulfillmentDate,
    licenseKey: {
      id: fulfillmentData.QuoteFulfillmentDetail.QuoteFulfillment_LicenseKeyID,
      name: fulfillmentData.QuoteFulfillmentDetail.LicenseKeys_Name,
      isTerm: fulfillmentData.QuoteFulfillmentDetail.Assets_IsTermLicense,
    },
    quote: {
      id: fulfillmentData.QuoteFulfillmentDetail.QuoteFulfillment_QuoteID,
      name: fulfillmentData.QuoteFulfillmentDetail.Quotes_Name,
    },
    support: {
      beginDate: fulfillmentData?.AssetSupportDetails?.Assets_SupportPlanBegin,
      endDate: fulfillmentData?.AssetSupportDetails?.Assets_SupportPlanEnd,
      planType: fulfillmentData?.AssetSupportDetails?.Assets_SupportPlanType,
    },
  };
};

interface CreateQuoteFulfillmentFormDataProps {
  quoteData?: QuoteData;
  fulfillmentData?: QuoteFulfillmentData;
}
