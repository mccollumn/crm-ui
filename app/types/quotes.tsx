export interface QuoteData {
  QuoteDetail: QuoteDetail;
  QuotePaymentInfo: QuotePaymentInfo;
  QuoteTotals: QuoteTotals;
  QuoteProductTotals: QuoteProductTotals;
  QuoteDiscounts: QuoteDiscounts;
  QuoteEntitlements: QuoteEntitlements;
  QuoteContacts: QuoteContact[];
  QuoteProducts: QuoteProduct[];
  QuoteFullfillment: QuoteFullfillment;
  QuoteSalesOrders: QuoteSalesOrder[];
}

interface QuoteDetail {
  Quotes_ID: string;
  Quotes_AccountName: string | null;
  Quotes_Comments: string | null;
  Quotes_CurrencyCode: string | null;
  Quotes_CurrencySymbol: string | null;
  Quotes_IsChannel: "0" | "1";
  Quotes_Name: string | null;
  Quotes_OpportunityID: string | null;
  Opportunities_Name: string | null;
  Quotes_OwnerID: string | null;
  Owners_Name: string | null;
  Quotes_ValidThrough: string | null;
}

interface QuotePaymentInfo {
  Quotes_ID: string;
  Quotes_BillingFrequency: string | null;
  Quotes_PaymentMethod: string | null;
  Quotes_PaymentDocumentNumber: string | null;
  Quotes_PaymentTerms: string | null;
  Quotes_PaymentTermsResult: string | null;
}

interface QuoteTotals {
  Quotes_ID: string;
  Quotes_ExchangeRateToUSD: string | null;
  Quotes_TotalListPrice: string | null;
  Quotes_TotalOneYearAmount: string | null;
  Quotes_TotalPrice: string | null;
  Quotes_TotalPriceProducts: string | null;
  Quotes_USDTotalListPrice: string | null;
  Quotes_USDTotalOneYearAmount: string | null;
  Quotes_USDTotalPrice: string | null;
}

interface QuoteProductTotals {
  Quotes_ID: string;
  Quotes_TotalAnalyticsMaintenance: string | null;
  Quotes_TotalAnalyticsSoftware: string | null;
  Quotes_TotalCONTRNOTH: string | null;
}

interface QuoteDiscounts {
  Quotes_ID: string;
  Quotes_DiscountPickList: string | null;
  Quotes_DiscountReason: string | null;
  Quotes_HighestProductDiscount: string | null;
  Quotes_HighestServicesDiscount: string | null;
  Quotes_NetQuoteDiscount: string | null;
}

interface QuoteEntitlements {
  Quotes_ID: string;
  Quotes_AnalyticsPageViews: "0" | "1";
  Quotes_ExistingAnalyticsPageViews: "0" | "1";
}

interface QuoteContact {}

interface QuoteProduct {
  QuoteProducts_ID: string;
  QuoteProducts_Discount: string | null;
  QuoteProducts_Name: string | null;
  QuoteProducts_Product2ID: string | null;
  Product_Name: string | null;
  QuoteProducts_ProductCode: string | null;
  QuoteProducts_ProductFamily: string | null;
  QuoteProducts_Quantity: string | null;
  QuoteProducts_QuoteID: string | null;
  QuoteProducts_SKUGroup: string | null;
  QuoteProducts_TotalSalePrice: string | null;
  QuoteProducts_UOM: string | null;
}

interface QuoteFullfillment {
  QuoteFulfillment_ID: string;
  QuoteFulfillment_CreatedByID: string | null;
  QuoteFulfillment_CreatedDate: string | null;
  QuoteFulfillment_FulfillmentDate: string | null;
  QuoteFulfillment_LicenseKeyID: string | null;
  QuoteFulfillment_Name: string | null;
}

interface QuoteSalesOrder {
  SalesOrders_ID: string;
  SalesOrders_AccountID: string | null;
  SalesOrders_Contract: string | null;
  SalesOrders_CreatedById: string | null;
  SalesOrders_CreatedDate: string | null;
  SalesOrders_DocumentNumber: string | null;
  SalesOrders_DocumentType: string | null;
  Account_Name: string | null;
  SalesOrders_CurrencyIsoCode: string | null;
  SalesOrders_Date: string | null;
  SalesOrders_EndCustomerAccountID: string | null;
  End_Customer_Account_Name: string | null;
  SalesOrders_LastModifiedById: string | null;
  SalesOrders_LastModifiedDate: string | null;
  SalesOrders_Name: string | null;
  SalesOrders_Total: string | null;
}

export type QuoteFormData = {
  id?: string | null;
  name?: string | null;
  owner: {
    id?: string | null;
    name?: string | null;
  };
  opportunity: {
    id?: string | null;
    name?: string | null;
  };
  isChannel?: boolean | null;
  quoteComments?: string | null;
  status?: string | null;
  officeLocation?: string | null;
  currencyCode?: string | null;
  totalPrice?: string | null;
  USDTotalPrice?: string | null;
  validThrough?: Date | null;
  USDTotalOneYearAmount?: string | null;
  isPrimary?: boolean | null;
  lastSendDate?: Date | null;
  payment: {
    method?: string | null;
    docNumber?: string | null;
    billingFrequency?: string | null;
    terms?: string | null;
  };
  comments: {
    exchangeRate?: number | null;
    discountReason?: string | null;
    discountReasons?: string | null;
  };
  entitlements: {
    pageViews?: string | null;
    existingPageViews?: string | null;
  };
};
