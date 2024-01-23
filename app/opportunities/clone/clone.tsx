import { OpportunityData } from "@/app/types/opportunities";
import { QuoteData, QuoteProductData } from "@/app/types/quotes";
import { getUser } from "@/app/utils/clientUtils";
import { addYear, removeNullsFromObject, unEscape } from "@/app/utils/utils";

/**
 * Clones an existing opportunity.
 * Close date for new opportunity is incremented one year.
 * Quotes, sales orders, and sales invoices are not included in the new opportunity.
 * @param opportunityData Source opportunity data to be cloned.
 * @returns ID of new opportunity.
 */
export const cloneOpportunity = async (opportunityData: OpportunityData) => {
  const accountID = opportunityData.OpportunityDetail.Opportunities_AccountId;
  const user = await getUser();
  const newCloseDate = addYear(
    opportunityData.OpportunityDetail.Opportunities_CloseDate
  );
  const newBaselineRenewalDate = addYear(
    opportunityData.OpportunityRenewalInfo.Opportunities_BaselineRenewalDate
  );
  const defaultStage = "04 Commit";
  const newOpportunity = {
    OpportunityDetail: removeNullsFromObject({
      ...opportunityData.OpportunityDetail,
      Opportunities_ID: null,
      Opportunities_Name: unEscape(
        opportunityData.OpportunityDetail.Opportunities_Name || ""
      ),
      Opportunities_CloseDate: newCloseDate,
      Opportunities_ContainsNewBusiness: null,
      Opportunities_ForecastStatus: null,
      Opportunities_Probability: null,
      Opportunities_StageName: defaultStage,
    }),
    OpportunitySolutionsOverview: removeNullsFromObject({
      ...opportunityData.OpportunitySolutionsOverview,
      Opportunities_ID: null,
    }),
    OpportunityRenewalInfo: removeNullsFromObject({
      ...opportunityData.OpportunityRenewalInfo,
      Opportunities_ID: null,
      Opportunities_BaselineRenewalDate: newBaselineRenewalDate,
      Opportunities_RenewalStatus: null,
    }),
    OpportunityAdditonalInfo: removeNullsFromObject({
      ...opportunityData.OpportunityAdditonalInfo,
      Opportunities_ID: null,
    }),
    OpportunityWinLossDetail: removeNullsFromObject({
      ...opportunityData.OpportunityWinLossDetail,
      Opportunities_ID: null,
    }),
    OpportunityPartnerDetail: removeNullsFromObject({
      ...opportunityData.OpportunityPartnerDetail,
      Opportunities_ID: null,
    }),
    OpportunityQuoteContactRoles:
      opportunityData.OpportunityQuoteContactRoles.map((role) => {
        delete role.OpportunityContactRoles_ID;
        return removeNullsFromObject(role);
      }),
    OpportunityAmounts: opportunityData.OpportunityAmounts.map((amount) => {
      delete amount.OpportunityAmounts_ID;
      return removeNullsFromObject(amount);
    }),
    OpportunityProducts: opportunityData.OpportunityProducts.map((product) => {
      delete product.OpportunityLineItems_ID;
      return removeNullsFromObject(product);
    }),
    SubmissionDetails: {
      UserID: user?.id || null,
      AccountID: accountID,
    },
  };

  const request = new Request("/api/opportunities/insert", {
    method: "POST",
    body: JSON.stringify(newOpportunity),
  });
  const response = await fetch(request);
  const responseData = await response.json();
  const newOpportunityData = responseData.res;
  console.log("Submitted Data:", newOpportunity);

  return newOpportunityData;
};

/**
 * Clones an existing quote.
 * Valid through date for new quote is incremented one year.
 * @param quoteData Source quote data to be cloned.
 * @param opportunityID ID of the opportunity that the quote will be associated with.
 * @returns ID of new quote.
 */
export const cloneQuote = async (
  quoteData: QuoteData,
  opportunityID: string
) => {
  const user = await getUser();
  const newQuote = {
    QuoteDetail: removeNullsFromObject({
      ...quoteData.QuoteDetail,
      Quotes_ID: null,
      Quotes_Name: null,
      Quotes_OpportunityID: opportunityID,
    }),
    QuotePaymentInfo: removeNullsFromObject({
      ...quoteData.QuotePaymentInfo,
      Quotes_ID: null,
    }),
    QuoteTotals: removeNullsFromObject({
      ...quoteData.QuoteTotals,
      Quotes_ID: null,
    }),
    QuoteProductTotals: removeNullsFromObject({
      ...quoteData.QuoteProductTotals,
      Quotes_ID: null,
    }),
    QuoteDiscounts: removeNullsFromObject({
      ...quoteData.QuoteDiscounts,
      Quotes_ID: null,
    }),
    QuoteEntitlements: removeNullsFromObject({
      ...quoteData.QuoteEntitlements,
      Quotes_ID: null,
    }),
    QuoteContacts: quoteData.QuoteContacts,
    SubmissionDetails: {
      UserID: user?.id || null,
      OpportunityID: opportunityID,
    },
  };

  const request = new Request("/api/opportunities/insert/quote", {
    method: "POST",
    body: JSON.stringify(newQuote),
  });
  const response = await fetch(request);
  const responseData = await response.json();
  const newQuoteData = responseData.res;
  console.log("Submitted Data:", newQuote);

  return newQuoteData;
};

/**
 * Clones and existing quote product.
 * Start/End dates for the new quote product are incremented one year.
 * @param quoteProductData Source quote product data to be cloned.
 * @param quoteID ID of the quote that the product will be associated with.
 * @returns ID of new quote product.
 */
export const cloneQuoteProduct = async (
  quoteProductData: QuoteProductData,
  quoteID: string
) => {
  const user = await getUser();
  const newQuoteProduct = {
    QuoteProductDetail: removeNullsFromObject({
      ...quoteProductData.QuoteProductDetail,
      QuoteProducts_ID: null,
      QuoteProducts_CreatedByID: null,
      QuoteProducts_CreatedDate: null,
      QuoteProducts_LastModifiedByID: null,
      QuoteProducts_LastModifiedDate: null,
      QuoteProducts_FulfillmentStatus: null,
      QuoteProducts_QuoteFulfillmentID: null,
      QuoteFulfillment_Name: null,
      QuoteProducts_QuoteID: quoteID,
      Quotes_Name: null,
    }),
    ProductInfo: removeNullsFromObject({
      ...quoteProductData.ProductInfo,
    }),
    SubmissionDetails: {
      UserID: user?.id || null,
      QuoteID: quoteID,
    },
  };

  const request = new Request("/api/opportunities/insert/quote/product", {
    method: "POST",
    body: JSON.stringify(newQuoteProduct),
  });
  const response = await fetch(request);
  const responseData = await response.json();
  const newQuoteProductData = responseData.res;
  console.log("Submitted Data:", newQuoteProduct);

  return newQuoteProductData;
};
