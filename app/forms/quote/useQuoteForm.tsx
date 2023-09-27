import React from "react";
import { MenuItem } from "@/app/types/types";
import {
  convertBooleanToString,
  convertDateToISOString,
  getChangedValues,
  isObjectEmpty,
  removeNullsFromObject,
} from "@/app/utils/utils";
import { useForm } from "../useForm";
import { QuoteData, QuoteFormData } from "@/app/types/quotes";

export const useQuoteForm = ({ menuItems }: useQuoteFormProps) => {
  const initialMenuOptions = {
    Owner: [],
    Opportunity: [],
    Status: [],
    OfficeLocation: [],
    Currency: [],
    // AuditStatus: [],
    PaymentMethod: [],
    BillingFrequency: [],
    PaymentTerms: [],
    // TermsAudit: [],
    DiscountReason: [],
  };

  const {
    setMenuOptions,
    setCustomMenuOptions,
    setIsLoading,
    isLoading,
    FormatNumber,
    menuOptions,
  } = useForm({
    initialMenuOptions,
    menuItems,
  });

  React.useEffect(() => {
    // Quote Owner
    const setOwners = async () => {
      try {
        const results = await fetch("/api/users/internal");
        const owners = await results.json();
        if (isObjectEmpty(owners)) return;
        const options = owners.data.map((owner: any) => {
          return { id: owner.Users_ID, name: owner.Users_Name };
        });
        setCustomMenuOptions("Owner", options);
      } catch {
        console.error("Could not retrieve list of users");
      }
    };
    setOwners();

    // Open Opportunities
    const setOpportunities = async () => {
      try {
        const results = await fetch("/api/opportunities/open");
        const opportunities = await results.json();
        if (isObjectEmpty(opportunities)) return;
        const options = opportunities.data.map((opportunity: any) => {
          return {
            id: opportunity.Opportunities_ID,
            name: opportunity.Opportunities_Name,
          };
        });
        setCustomMenuOptions("Opportunity", options);
      } catch {
        console.error("Could not retrieve list of opportunities");
      }
    };
    setOpportunities();

    // Set menu options that are already known (i.e. aren't based on user input)
    setMenuOptions("Status");
    setMenuOptions("OfficeLocation");
    setMenuOptions("Currency");
    // setMenuOptions("AuditStatus");
    setMenuOptions("PaymentMethod");
    setMenuOptions("BillingFrequency");
    setMenuOptions("PaymentTerms");
    // setMenuOptions("TermsAudit");
    setMenuOptions("DiscountReason");
  }, [setCustomMenuOptions, setMenuOptions]);

  const createQuoteFormSubmissionData = (
    values: QuoteFormData,
    quoteData?: QuoteData
  ) => {
    const data = {
      QuoteDetail: {
        Quotes_ID: values.id,
        // Quotes_AccountName: "Kaiser Foundation Hospitals",
        Quotes_Comments: values.quoteComments,
        Quotes_CurrencyCode: values.currencyCode,
        // Quotes_CurrencySymbol: "$",
        Quotes_IsChannel: convertBooleanToString(values.isChannel),
        Quotes_Name: values.name,
        Quotes_OpportunityID: values.opportunity.id,
        Opportunities_Name: values.opportunity.name,
        Quotes_OwnerID: values.owner.id,
        Owners_Name: values.owner.name,
        Quotes_ValidThrough: convertDateToISOString(values.validThrough),
      },
      QuotePaymentInfo: {
        Quotes_ID: values.id,
        Quotes_BillingFrequency: values.payment.billingFrequency,
        Quotes_PaymentMethod: values.payment.method,
        Quotes_PaymentDocumentNumber: values.payment.docNumber,
        Quotes_PaymentTerms: values.payment.terms,
        // Quotes_PaymentTermsResult: "Standard",
      },
      QuoteTotals: {
        Quotes_ID: values.id,
        Quotes_ExchangeRateToUSD: values.comments.exchangeRate,
        // Quotes_TotalListPrice: "53080.0000",
        // Quotes_TotalOneYearAmount: "32608.00",
        Quotes_TotalPrice: values.totalPrice,
        // Quotes_TotalPriceProducts: "30708.00",
        // Quotes_USDTotalListPrice: "53080.00",
        Quotes_USDTotalOneYearAmount: values.USDTotalOneYearAmount,
        Quotes_USDTotalPrice: values.USDTotalPrice,
      },
      // QuoteProductTotals: {
      //   Quotes_ID: values.id,
      //   Quotes_TotalAnalyticsMaintenance: ".00",
      //   Quotes_TotalAnalyticsSoftware: "30708.00",
      //   Quotes_TotalCONTRNOTH: "1900.00",
      // },
      QuoteDiscounts: {
        Quotes_ID: values.id,
        Quotes_DiscountPickList: values.comments.discountReasons,
        Quotes_DiscountReason: values.comments.discountReason,
        // Quotes_HighestProductDiscount: "40.000000",
        // Quotes_HighestServicesDiscount: ".000000",
        // Quotes_NetQuoteDiscount: "38.6",
      },
      QuoteEntitlements: {
        Quotes_ID: values.id,
        Quotes_AnalyticsPageViews: values.entitlements.existingPageViews,
        Quotes_ExistingAnalyticsPageViews:
          values.entitlements.existingPageViews,
      },
      // QuoteContacts: [],
      // QuoteProducts: [
      //   {
      //     QuoteProducts_ID: "80552",
      //     QuoteProducts_Discount: "40.000000",
      //     QuoteProducts_Name: "111800",
      //     QuoteProducts_Product2ID: "1638",
      //     Product_Name:
      //       "Webtrends Analytics 9, Advanced Analysis Package - 1 Year Term",
      //     QuoteProducts_ProductCode: "LIC-PACK-V9-2992",
      //     QuoteProducts_ProductFamily: "Analytics",
      //     QuoteProducts_Quantity: "1.0000",
      //     QuoteProducts_QuoteID: values.id,
      //     QuoteProducts_SKUGroup: "LIC-License",
      //     QuoteProducts_TotalSalePrice: "30708.00",
      //     QuoteProducts_UOM: "Each",
      //   },
      //   {
      //     QuoteProducts_ID: "80553",
      //     QuoteProducts_Discount: ".000000",
      //     QuoteProducts_Name: "111801",
      //     QuoteProducts_Product2ID: "2093",
      //     Product_Name:
      //       "Webtrends SW Analytics Pageview Add-on: Advanced Analysis or Commerce Package",
      //     QuoteProducts_ProductCode: "LIC-ADDN-V9-2623",
      //     QuoteProducts_ProductFamily: "Analytics",
      //     QuoteProducts_Quantity: "200.0000",
      //     QuoteProducts_QuoteID: values.id,
      //     QuoteProducts_SKUGroup: "LIC-License",
      //     QuoteProducts_TotalSalePrice: ".00",
      //     QuoteProducts_UOM: "Million",
      //   },
      //   {
      //     QuoteProducts_ID: "80554",
      //     QuoteProducts_Discount: ".000000",
      //     QuoteProducts_Name: "111802",
      //     QuoteProducts_Product2ID: "2675",
      //     Product_Name: "Webtrends Consulting - Fixed Price",
      //     QuoteProducts_ProductCode: "CON-CSTM-V8-2014",
      //     QuoteProducts_ProductFamily: "Services",
      //     QuoteProducts_Quantity: "1.0000",
      //     QuoteProducts_QuoteID: values.id,
      //     QuoteProducts_SKUGroup: "CON-Consulting",
      //     QuoteProducts_TotalSalePrice: "1900.00",
      //     QuoteProducts_UOM: "Each",
      //   },
      // ],
      // QuoteFullfillment: {
      //   QuoteFulfillment_ID: "18833",
      //   QuoteFulfillment_CreatedByID: "31727",
      //   QuoteFulfillment_CreatedDate: "2023-04-13 18:51:10.0000000",
      //   QuoteFulfillment_FulfillmentDate: "2023-04-13 00:00:00.0000000",
      //   QuoteFulfillment_LicenseKeyID: "17434",
      //   QuoteFulfillment_Name: "F-23152",
      // },
      // QuoteSalesOrders: [
      //   {
      //     SalesOrders_ID: "31492",
      //     SalesOrders_AccountID: "3590",
      //     SalesOrders_Contract: null,
      //     SalesOrders_CreatedById: "31727",
      //     SalesOrders_CreatedDate: "2023-04-13 18:45:44.0000000",
      //     SalesOrders_DocumentNumber: "SO-0020574",
      //     SalesOrders_DocumentType: "Order",
      //     Account_Name: "Kaiser Foundation Hospitals",
      //     SalesOrders_CurrencyIsoCode: "USD",
      //     SalesOrders_Date: "2023-04-13 00:00:00.0000000",
      //     SalesOrders_EndCustomerAccountID: "3590",
      //     End_Customer_Account_Name: "Kaiser Foundation Hospitals",
      //     SalesOrders_LastModifiedById: "33640",
      //     SalesOrders_LastModifiedDate: "2023-06-30 02:55:49.0000000",
      //     SalesOrders_Name: "SO-0020574",
      //     SalesOrders_Total: "32608.00",
      //   },
      // ],
    };
    let newFormData: any = removeNullsFromObject(data);

    // We only want to submit form values that were modified
    newFormData = getChangedValues(newFormData, quoteData);

    // Add the quote and opportunity IDs back in
    if (quoteData) {
      newFormData = {
        ...newFormData,
        QuoteDetail: {
          ...newFormData.QuoteDetail,
          Quotes_ID: quoteData.QuoteDetail.Quotes_ID,
          Quotes_OpportunityID: quoteData.QuoteDetail.Quotes_OpportunityID,
        },
        QuotePaymentInfo: {
          ...newFormData.QuotePaymentInfo,
          Quotes_ID: quoteData.QuotePaymentInfo.Quotes_ID,
        },
        QuoteTotals: {
          ...newFormData.QuoteTotals,
          Quotes_ID: quoteData.QuoteTotals.Quotes_ID,
        },
        QuoteDiscounts: {
          ...newFormData.QuoteDiscounts,
          Quotes_ID: quoteData.QuoteDiscounts.Quotes_ID,
        },
        QuoteEntitlements: {
          ...newFormData.QuoteEntitlements,
          Quotes_ID: quoteData.QuoteEntitlements.Quotes_ID,
        },
      };
    }
    return newFormData;
  };

  return {
    setMenuOptions,
    setIsLoading,
    isLoading,
    FormatNumber,
    menuOptions,
    createQuoteFormSubmissionData,
  };
};

interface useQuoteFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
}
