import { NextRequest, NextResponse } from "next/server";
import {
  getOpportunityData,
  getQuoteData,
  getQuoteProductData,
  submitNewOpportunity,
  submitNewQuote,
  submitNewQuoteProduct,
} from "@/app/utils/getData";
import { OpportunityData } from "@/app/types/opportunities";
import { QuoteData, QuoteProductData } from "@/app/types/quotes";
import { removeNullsFromObject } from "@/app/utils/utils";
import { add } from "date-fns";

export async function GET(
  request: NextRequest,
  { params }: { params: { opportunityID: string } }
) {
  const opportunityID = params.opportunityID;

  // Get data for existing opportunity
  const opportunityData: OpportunityData = await getOpportunityData(
    opportunityID
  );

  // Generate new opportunity data (excluding quotes) and submit
  const newOpportunityID = await cloneOpportunity(opportunityData);
  console.log("Clone newOpportunityID:", newOpportunityID);

  // Iterate over the original opportunity quotes
  opportunityData.OpportunityQuotes.forEach(async (quote) => {
    // Get data for existing quote
    const quoteData: QuoteData = await getQuoteData(quote.Quotes_ID);
    // Generate new quote data and submit
    const newQuoteID = await cloneQuote(quoteData, newOpportunityID.ID);
    console.log("Clone newQuoteID:", newQuoteID);
    // Iterate over each quote product
    quoteData.QuoteProducts.forEach(async (product) => {
      // Get data for existing quote product
      const productData = await getQuoteProductData(product.QuoteProducts_ID);
      // Generate new quote product data and submit
      const newQuoteProductID = await cloneQuoteProduct(
        productData,
        newQuoteID.ID
      );
      console.log("Clone newQuoteProductID:", newQuoteProductID);
    });
  });

  //   return NextResponse.redirect(
  //     `${process.env.NEXT_PUBLIC_API_ENDPOINT}/opportunities/view/${newOpportunityID.ID}`
  //   );
  return NextResponse.json(newOpportunityID);
}

/**
 * Increments the provided date by one year.
 * @param currentDateStr Date string.
 * @returns New date string.
 */
const addYear = (currentDateStr: string | null) => {
  if (!currentDateStr) {
    return add(new Date(), { years: 1 }).toISOString();
  }
  return add(new Date(currentDateStr), { years: 1 }).toISOString();
};

/**
 * Clones an existing opportunity.
 * Close date for new opportunity is incremented one year.
 * Quotes, sales orders, and sales invoices are not included in the new opportunity.
 * @param opportunityData Source opportunity data to be cloned.
 * @returns ID of new opportunity.
 */
const cloneOpportunity = async (opportunityData: OpportunityData) => {
  const newOpportunity = {
    OpportunityDetail: removeNullsFromObject({
      ...opportunityData.OpportunityDetail,
      Opportunities_ID: null,
      Opportunities_CloseDate: addYear(
        opportunityData.OpportunityDetail.Opportunities_CloseDate
      ),
      Opportunities_ContainsNewBusiness: null,
      Opportunities_ForecastStatus: null,
      Opportunities_Probability: null,
      Opportunities_StageName: null,
    }),
    OpportunitySolutionsOverview: removeNullsFromObject({
      ...opportunityData.OpportunitySolutionsOverview,
      Opportunities_ID: null,
    }),
    OpportunityRenewalInfo: removeNullsFromObject({
      ...opportunityData.OpportunityRenewalInfo,
      Opportunities_ID: null,
      Opportunities_BaselineRenewalDate: addYear(
        opportunityData.OpportunityRenewalInfo.Opportunities_BaselineRenewalDate
      ),
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
  };

  const responseData = await submitNewOpportunity(newOpportunity);
  return responseData;
};

/**
 * Clones an existing quote.
 * Valid through date for new quote is incremented one year.
 * @param quoteData Source quote data to be cloned.
 * @param opportunityID ID of the opportunity that the quote will be associated with.
 * @returns ID of new quote.
 */
const cloneQuote = async (quoteData: QuoteData, opportunityID: string) => {
  const newQuote = {
    QuoteDetail: removeNullsFromObject({
      ...quoteData.QuoteDetail,
      Quotes_ID: null,
      Quotes_Name: null,
      Quotes_OpportunityID: opportunityID,
      Quotes_ValidThrough: addYear(quoteData.QuoteDetail.Quotes_ValidThrough),
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
  };

  const responseData = await submitNewQuote(newQuote);
  return responseData;
};

/**
 * Clones and existing quote product.
 * Start/End dates for the new quote product are incremented one year.
 * @param quoteProductData Source quote product data to be cloned.
 * @param quoteID ID of the quote that the product will be associated with.
 * @returns ID of new quote product.
 */
const cloneQuoteProduct = async (
  quoteProductData: QuoteProductData,
  quoteID: string
) => {
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
      QuoteProducts_StartDate: addYear(
        quoteProductData.ProductInfo.QuoteProducts_StartDate
      ),
      QuoteProducts_EndDate: addYear(
        quoteProductData.ProductInfo.QuoteProducts_EndDate
      ),
    }),
  };

  const responseData = await submitNewQuoteProduct(newQuoteProduct);
  return responseData;
};
