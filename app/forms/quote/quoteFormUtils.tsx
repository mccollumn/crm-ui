import { OpportunityData, Quote } from "@/app/types/opportunities";
import { QuoteData, QuoteFormData } from "@/app/types/quotes";
import { getDefaultOwner } from "@/app/utils/forms";
import { getOpportunityData } from "@/app/utils/getData";
import { unEscape } from "@/app/utils/utils";

/**
 * Generates an object containing the default values for a new/empty quote form.
 * @returns Initial quote form data.
 */
const generateInitialQuoteFormData = async (
  opportunityData: OpportunityData
  // quoteData: QuoteData | undefined
) => {
  const defaultOwner = await getDefaultOwner();
  const opportunityID =
    opportunityData?.OpportunityDetail?.Opportunities_ID || null;
  const opportunityName = unEscape(
    opportunityData?.OpportunityDetail?.Opportunities_Name || ""
  );
  // const opportunityID = quoteData?.QuoteDetail.Quotes_OpportunityID;
  // const opportunityName = quoteData?.QuoteDetail.Opportunities_Name;

  const initialOpportunityFormData: QuoteFormData = {
    id: null,
    name: null,
    owner: defaultOwner,
    opportunity: {
      id: opportunityID,
      name: opportunityName,
    },
    isChannel: false,
    quoteComments: null,
    status: null,
    officeLocation: null,
    currencyCode: null,
    totalPrice: null,
    USDTotalPrice: null,
    validThrough: null,
    USDTotalOneYearAmount: null,
    isPrimary: false,
    lastSendDate: null,
    // audit: {
    //   status: null,
    //   notes: null,
    // },
    payment: {
      method: null,
      docNumber: null,
      billingFrequency: null,
      terms: null,
      // termsAudit: null,
    },
    comments: {
      exchangeRate: 1,
      discountReason: null,
      discountReasons: null,
    },
    entitlements: {
      pageViews: null,
      existingPageViews: null,
      // serverCalls: null,
      // existingServerCalls: null,
      // refreshData: false,
    },
  };

  return initialOpportunityFormData;
};

/**
 * Returns a quote data object to be passed to the quote form.
 * @param QuoteData Data from an existing quote. (optional)
 * @returns Quote data object.
 */
export const createQuoteFormData = async (
  opportunityData: OpportunityData,
  quoteData?: QuoteData
) => {
  const initialOpportunityFormData = await generateInitialQuoteFormData(
    opportunityData
    // quoteData
  );

  if (!quoteData) {
    return initialOpportunityFormData;
  }

  return {
    ...initialOpportunityFormData,
    // TODO: Fill in missing info
    id: quoteData.QuoteDetail.Quotes_ID,
    name: quoteData.QuoteDetail.Quotes_Name,
    owner: {
      id: quoteData.QuoteDetail.Quotes_OwnerID,
      name: quoteData.QuoteDetail.Owners_Name,
    },
    opportunity: {
      id: quoteData.QuoteDetail.Quotes_OpportunityID,
      name: unEscape(quoteData.QuoteDetail.Opportunities_Name || ""),
    },
    isChannel: !!Number(quoteData.QuoteDetail.Quotes_IsChannel),
    quoteComments: quoteData.QuoteDetail.Quotes_Comments,
    status: null,
    officeLocation: null,
    currencyCode: quoteData.QuoteDetail.Quotes_CurrencyCode,
    totalPrice: quoteData.QuoteTotals.Quotes_TotalPrice,
    USDTotalPrice: quoteData.QuoteTotals.Quotes_USDTotalPrice,
    validThrough: quoteData.QuoteDetail.Quotes_ValidThrough,
    USDTotalOneYearAmount: quoteData.QuoteTotals.Quotes_USDTotalOneYearAmount,
    isPrimary: !!Number(null),
    lastSendDate: null,
    // audit: {
    //   status: null,
    //   notes: null,
    // },
    payment: {
      method: quoteData.QuotePaymentInfo.Quotes_PaymentMethod,
      docNumber: quoteData.QuotePaymentInfo.Quotes_PaymentDocumentNumber,
      billingFrequency: quoteData.QuotePaymentInfo.Quotes_BillingFrequency,
      terms: quoteData.QuotePaymentInfo.Quotes_PaymentTerms,
      // termsAudit: null,
    },
    comments: {
      exchangeRate: quoteData.QuoteTotals.Quotes_ExchangeRateToUSD,
      discountReason: quoteData.QuoteDiscounts.Quotes_DiscountReason,
      discountReasons: quoteData.QuoteDiscounts.Quotes_DiscountPickList,
    },
    entitlements: {
      pageViews: quoteData.QuoteEntitlements.Quotes_AnalyticsPageViews,
      existingPageViews:
        quoteData.QuoteEntitlements.Quotes_ExistingAnalyticsPageViews,
      // serverCalls: null,
      // existingServerCalls: null,
      // refreshData: !!Number(false),
    },
  };
};
