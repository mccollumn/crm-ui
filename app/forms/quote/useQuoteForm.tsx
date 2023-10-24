import React from "react";
import { MenuItem } from "@/app/types/types";
import {
  convertArrayToString,
  convertBooleanToString,
  convertDateToISOString,
  getChangedValues,
  isObjectEmpty,
  removeNullsFromObject,
} from "@/app/utils/utils";
import { useForm } from "../useForm";
import {
  QuoteData,
  QuoteFormData,
  QuoteProduct,
  QuoteProductData,
} from "@/app/types/quotes";

export const useQuoteForm = ({ menuItems }: useQuoteFormProps) => {
  const initialMenuOptions = {
    Owner: [],
    Opportunity: [],
    QuoteStatus: [],
    OfficeLocation: [],
    QuoteCurrency: [],
    // AuditStatus: [],
    PaymentMethod: [],
    BillingFrequency: [],
    PaymentTerms: [],
    // TermsAudit: [],
    QuoteDiscountReason: [],
  };

  const {
    setMenuOptions,
    setCustomMenuOptions,
    setIsLoading,
    isLoading,
    user,
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
    setMenuOptions("QuoteStatus");
    setMenuOptions("OfficeLocation");
    setMenuOptions("QuoteCurrency");
    // setMenuOptions("AuditStatus");
    setMenuOptions("PaymentMethod");
    setMenuOptions("BillingFrequency");
    setMenuOptions("PaymentTerms");
    // setMenuOptions("TermsAudit");
    setMenuOptions("QuoteDiscountReason");
  }, [setCustomMenuOptions, setMenuOptions]);

  const createQuoteFormSubmissionData = async (
    values: QuoteFormData,
    quoteData?: QuoteData
  ) => {
    const quoteProducts = quoteData?.QuoteProducts || [];

    const quoteProductsData: ProductData[] = await getQuoteProductData(
      quoteProducts
    );
    const totalListPrice = calculateTotalListPrice(quoteProductsData);
    const totalPrice = calculateTotalPrice(quoteProducts);
    const totalPriceProducts = calculateTotalPriceProducts(quoteProducts);
    const totalOneYearAmount = calculateTotalOneYearAmount(quoteProductsData);
    const usdTotalListPrice = calculateUSDTotalListPrice(
      totalListPrice,
      values.comments.exchangeRate
    );
    const usdTotalPrice = calculateUSDTotalPrice(
      totalPrice,
      values.comments.exchangeRate
    );
    const usdTotalOneYearAmount = calculateUSDTotalOneYearAmount(
      totalOneYearAmount,
      values.comments.exchangeRate
    );
    const totalAnalyticsSoftware =
      calculateTotalAnalyticsSoftware(quoteProducts);
    const totalAnalyticsMaintenance =
      calculateTotalAnalyticsMaintenance(quoteProducts);
    const totalConsultingTrainingOther =
      calculateTotalConsultingTrainingOther(quoteProducts);
    const highestProductDiscount =
      calculateHighestProductDiscount(quoteProducts);
    const highestServicesDiscount =
      calculateHighestServicesDiscount(quoteProducts);
    const netQuoteDiscount = calculateNetQuoteDiscount(
      totalPrice,
      totalListPrice
    );
    const paymentTermsResult = calculatePaymentTermsResult(
      values.payment.terms,
      values.payment.billingFrequency
    );

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
        Quotes_SalesNotesToOM: values.notesToOM,
        Quotes_Status: values.status,
        Quotes_ValidThrough: convertDateToISOString(values.validThrough),
      },
      QuotePaymentInfo: {
        Quotes_ID: values.id,
        Quotes_BillingFrequency: values.payment.billingFrequency,
        Quotes_PaymentMethod: values.payment.method,
        Quotes_PaymentDocumentNumber: values.payment.docNumber,
        Quotes_PaymentTerms: values.payment.terms,
        Quotes_PaymentTermsResult: paymentTermsResult,
      },
      QuoteTotals: {
        Quotes_ID: values.id,
        Quotes_ExchangeRateToUSD: values.comments.exchangeRate,
        Quotes_TotalListPrice: totalListPrice,
        Quotes_TotalOneYearAmount: usdTotalOneYearAmount,
        Quotes_TotalPrice: totalPrice,
        Quotes_TotalPriceProducts: totalPriceProducts,
        Quotes_USDTotalListPrice: usdTotalListPrice,
        Quotes_USDTotalOneYearAmount: totalOneYearAmount,
        Quotes_USDTotalPrice: usdTotalPrice,
      },
      QuoteProductTotals: {
        Quotes_ID: values.id,
        Quotes_TotalAnalyticsMaintenance: totalAnalyticsMaintenance,
        Quotes_TotalAnalyticsSoftware: totalAnalyticsSoftware,
        Quotes_TotalCONTRNOTH: totalConsultingTrainingOther,
      },
      QuoteDiscounts: {
        Quotes_ID: values.id,
        Quotes_DiscountPickList: convertArrayToString(
          values.comments.discountReasons
        ),
        Quotes_DiscountReason: values.comments.discountReason,
        Quotes_HighestProductDiscount: highestProductDiscount,
        Quotes_HighestServicesDiscount: highestServicesDiscount,
        Quotes_NetQuoteDiscount: netQuoteDiscount,
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
        SubmissionDetails: {
          ...newFormData.SubmissionDetails,
          UserID: user?.id || null,
          AccountID: quoteData.QuoteDetail.Opportunities_AccountID || null,
          OpportunityID: quoteData.QuoteDetail.Quotes_OpportunityID || null,
          QuoteID: quoteData.QuoteDetail.Quotes_ID || null,
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

const getQuoteProductData = async (quoteProducts: QuoteProduct[]) => {
  const quoteProductsData = await Promise.all(
    quoteProducts?.map(async (product) => {
      if (product.QuoteProducts_ID) {
        const result = await fetch(
          `/api/quote_products/${product.QuoteProducts_ID}`
        );
        return await result.json();
      }
      return {};
    })
  );
  return quoteProductsData;
};

const calculateTotalListPrice = (quoteProductsData: ProductData[]) => {
  const total = quoteProductsData.reduce(
    (total, product) =>
      total +
      Number(product.data.QuoteProductDetail.QuoteProducts_TotalListPrice),
    0
  );
  return String(total);
};

const calculateTotalPrice = (quoteProducts: QuoteProduct[]) => {
  const total = quoteProducts.reduce(
    (total, product) => total + Number(product.QuoteProducts_TotalSalePrice),
    0
  );
  return String(total);
};

const calculateTotalPriceProducts = (quoteProducts: QuoteProduct[]) => {
  const total = quoteProducts
    .filter(
      (product) =>
        product.QuoteProducts_SKUGroup === "LIC-License" ||
        product.QuoteProducts_SKUGroup === "HOS-Hosted" ||
        product.QuoteProducts_SKUGroup === "MNT-Maintenance"
    )
    .reduce(
      (total, product) => total + Number(product.QuoteProducts_TotalSalePrice),
      0
    );
  return String(total);
};

const calculateTotalOneYearAmount = (quoteProductsData: ProductData[]) => {
  const total = quoteProductsData.reduce(
    (total, product) =>
      total +
      Number(product.data.QuoteProductDetail.QuoteProducts_OneYearAmount),
    0
  );
  return String(total);
};

const calculateUSDTotalListPrice = (
  totalListPrice: string,
  exchangeRate: number | null | undefined
) => {
  if (!totalListPrice || !exchangeRate) return null;
  return String(Number(totalListPrice) * exchangeRate);
};

const calculateUSDTotalPrice = (
  totalPrice: string,
  exchangeRate: number | null | undefined
) => {
  if (!totalPrice || !exchangeRate) return null;
  return String(Number(totalPrice) * exchangeRate);
};

const calculateUSDTotalOneYearAmount = (
  totalOneYearAmount: string,
  exchangeRate: number | null | undefined
) => {
  if (!totalOneYearAmount || !exchangeRate) return null;
  return String(Number(totalOneYearAmount) * exchangeRate);
};

const calculateTotalAnalyticsSoftware = (quoteProducts: QuoteProduct[]) => {
  const total = quoteProducts
    .filter(
      (product) =>
        product.QuoteProducts_ProductFamily === "Analytics" &&
        product.QuoteProducts_SKUGroup === "LIC-License"
    )
    .reduce(
      (total, product) => total + Number(product.QuoteProducts_TotalSalePrice),
      0
    );
  return String(total);
};

const calculateTotalAnalyticsMaintenance = (quoteProducts: QuoteProduct[]) => {
  const total = quoteProducts
    .filter(
      (product) =>
        product.QuoteProducts_ProductFamily === "Analytics" &&
        (product.QuoteProducts_SKUGroup === "MNT_LIC-Maintenance" ||
          product.QuoteProducts_SKUGroup === "MNT_HOS-Maintenance")
    )
    .reduce(
      (total, product) => total + Number(product.QuoteProducts_TotalSalePrice),
      0
    );
  return String(total);
};

const calculateTotalConsultingTrainingOther = (
  quoteProducts: QuoteProduct[]
) => {
  const total = quoteProducts
    .filter(
      (product) =>
        product.QuoteProducts_SKUGroup === "CON-Consulting" ||
        product.QuoteProducts_SKUGroup === "TRN-Training" ||
        product.QuoteProducts_SKUGroup === "OTH-Other"
    )
    .reduce(
      (total, product) => total + Number(product.QuoteProducts_TotalSalePrice),
      0
    );
  return String(total);
};

const calculateHighestProductDiscount = (quoteProducts: QuoteProduct[]) => {
  const total = quoteProducts
    .filter(
      (product) =>
        !product.QuoteProducts_SKUGroup?.includes("CON-Consulting") &&
        !product.QuoteProducts_SKUGroup?.includes("TRN-Training")
    )
    .reduce(
      (total, product) => total + Number(product.QuoteProducts_Discount),
      0
    );
  return String(total);
};

const calculateHighestServicesDiscount = (quoteProducts: QuoteProduct[]) => {
  const total = quoteProducts
    .filter(
      (product) =>
        product.QuoteProducts_SKUGroup?.includes("CON-Consulting") ||
        product.QuoteProducts_SKUGroup?.includes("TRN-Training")
    )
    .reduce(
      (total, product) => total + Number(product.QuoteProducts_Discount),
      0
    );
  return String(total);
};

const calculateNetQuoteDiscount = (
  totalPrice: string,
  totalListPrice: string
) => {
  const totalPriceNum = Number(totalPrice);
  const totalListPriceNum = Number(totalListPrice);
  if (totalPriceNum > 0 && totalListPriceNum > 0) {
    return String(1 - totalPriceNum / totalListPriceNum);
  }
  return "0";
};

const calculatePaymentTermsResult = (
  paymentTerms: string | null | undefined,
  billingFrequency: string | null | undefined
) => {
  if (!paymentTerms || !billingFrequency) return null;
  if (paymentTerms === "" && billingFrequency === "") {
    return "Standard";
  }
  if (
    (billingFrequency === "Annually" ||
      billingFrequency === "Multi-Year Upfront" ||
      billingFrequency === "Upfront" ||
      billingFrequency === "As Performed, Hourly") &&
    paymentTerms === "NET 30"
  ) {
    return "Standard";
  }
  return "Non-Standard";
};

type ProductData = {
  ["data"]: QuoteProductData;
};

interface useQuoteFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
}
