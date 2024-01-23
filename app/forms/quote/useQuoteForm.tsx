import React from "react";
import { useRouter } from "next/navigation";
import { MenuItem } from "@/app/types/types";
import {
  convertArrayToString,
  convertBooleanToString,
  convertDateToISOString,
  getChangedValues,
  isSuccessfulResponse,
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
  const router = useRouter();
  const initialMenuOptions = {
    Owner: [],
    Opportunity: [],
    QuoteStatus: [],
    OfficeLocation: [],
    QuoteCurrency: [],
    PaymentMethod: [],
    BillingFrequency: [],
    PaymentTerms: [],
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
        const results = await fetch(
          `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/user/list/internal`
        );
        const owners = await results.json();
        if (!Array.isArray(owners)) return;
        const options = owners.map((owner: any) => {
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
        const results = await fetch(
          `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/opportunity/list/open`
        );
        const opportunities = await results.json();
        if (!Array.isArray(opportunities)) return;
        const options = opportunities.map((opportunity: any) => {
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
    setMenuOptions("PaymentMethod");
    setMenuOptions("BillingFrequency");
    setMenuOptions("PaymentTerms");
    setMenuOptions("QuoteDiscountReason");
  }, [setCustomMenuOptions, setMenuOptions]);

  const createQuoteFormSubmissionData = async (
    values: QuoteFormData,
    quoteData?: QuoteData
  ) => {
    const quoteProducts = quoteData?.QuoteProducts || [];

    const quoteProductsData: ProductData[] = await getAllQuoteProductData(
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
        Quotes_Comments: values.quoteComments,
        Quotes_CurrencyCode: values.currencyCode,
        Quotes_IsChannel: convertBooleanToString(values.isChannel),
        Quotes_Name: values.name,
        Quotes_OpportunityID: values.opportunity.id,
        Opportunities_Name: values.opportunity.name,
        Quotes_OwnerID: values.owner.id,
        Owners_Name: values.owner.name,
        Quotes_Primary: convertBooleanToString(values.isPrimary),
        Quotes_SalesNotesToOM: values.notesToOM,
        Quotes_Status: values.status,
        Quotes_ValidThrough: convertDateToISOString(
          new Date(values.validThrough || 0)
        ),
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
        Quotes_ExchangeRateToUSD: String(values.comments.exchangeRate),
        Quotes_TotalListPrice: totalListPrice,
        Quotes_TotalOneYearAmount: totalOneYearAmount,
        Quotes_TotalPrice: totalPrice,
        Quotes_TotalPriceProducts: totalPriceProducts,
        Quotes_USDTotalListPrice: usdTotalListPrice,
        Quotes_USDTotalOneYearAmount: usdTotalOneYearAmount,
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
      SubmissionDetails: {
        UserID: user?.id || null,
        OpportunityID: values?.opportunity?.id || null,
        OwnerID: values?.owner?.id || null,
      },
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
          OwnerID: quoteData.QuoteDetail.Quotes_OwnerID || null,
          QuoteID: quoteData.QuoteDetail.Quotes_ID || null,
        },
      };
    }
    return newFormData;
  };

  const submitQuote = async (
    values: QuoteFormData,
    defaultValues: QuoteFormData,
    quoteData?: QuoteData
  ) => {
    const data = await createQuoteFormSubmissionData(values, quoteData);
    console.log("Success values", values);
    console.log("Submitted Data:", data);
    const isEdit = !!defaultValues?.id;
    const url = isEdit
      ? "/api/opportunities/update/quote"
      : "/api/opportunities/insert/quote";
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const response = await fetch(request);

    if (!(await isSuccessfulResponse(response))) {
      setIsLoading(false);
      router.push("/error");
      return;
    }

    const responseData = await response.json();

    // Refresh the page cache
    React.startTransition(() => {
      router.refresh();
    });
    // Invalidate cached quote data
    await fetch("/api/revalidate/tag?tag=quote");

    return responseData;
  };

  return {
    setMenuOptions,
    setIsLoading,
    isLoading,
    FormatNumber,
    menuOptions,
    createQuoteFormSubmissionData,
    submitQuote,
  };
};

const getAllQuoteProductData = async (quoteProducts: QuoteProduct[]) => {
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
