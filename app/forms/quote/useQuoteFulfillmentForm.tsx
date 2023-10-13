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
import { Product } from "@/app/types/opportunities";
import {
  QuoteData,
  QuoteFulfillmentData,
  QuoteFulfillmentFormData,
} from "@/app/types/quotes";
import { AccountData, LicenseKey } from "@/app/types/accounts";

export const useQuoteFulfillmentForm = ({
  menuItems,
  quoteData,
  accountData,
}: useQuoteFulfillmentFormProps) => {
  const initialMenuOptions = {
    Quote: [],
    LicenseKey: [],
    Currency: [],
    SupportPlanType: [],
  };

  const {
    setMenuOptions,
    setCustomMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
    user,
    FormatPercent,
    FormatNumber,
    FormatCurrency,
  } = useForm({
    initialMenuOptions,
    menuItems,
  });

  React.useEffect(() => {
    // Quotes
    const setQuotes = async () => {
      try {
        const opportunityID = quoteData.QuoteDetail.Quotes_OpportunityID;
        const results = await fetch(`/api/opportunities/${opportunityID}`);
        const opportunityData = await results.json();
        if (isObjectEmpty(opportunityData)) return;
        const options = opportunityData.data.OpportunityQuotes.map(
          (quote: any) => {
            return {
              id: quote.Quotes_ID,
              name: quote.Quotes_Name,
              status: quote.Quotes_Status,
              primary: quote.Quotes_Primary,
            };
          }
        );
        setCustomMenuOptions("Quote", options);
      } catch {
        console.error("Could not retrieve quote data");
      }
    };
    setQuotes();

    // License Keys
    const setLicenseKeys = async () => {
      const licenseKeys = accountData.LicenseKeys;
      const options = licenseKeys.map((key: LicenseKey) => {
        return {
          id: key.LicenseKeys_ID,
          name: key.LicenseKeys_Name,
          type: key.LicenseKeys_KeyType,
          status: key.LicenseKeys_Status,
        };
      });
      setCustomMenuOptions("LicenseKey", options);
    };
    setLicenseKeys();

    // Set menu options that are already known (i.e. aren't based on user input)
    setMenuOptions("Currency");
    setMenuOptions("SupportPlanType");
  }, [
    accountData.LicenseKeys,
    quoteData.QuoteDetail.Quotes_OpportunityID,
    setCustomMenuOptions,
    setMenuOptions,
  ]);

  const createQuoteFulfillmentFormSubmissionData = (
    values: QuoteFulfillmentFormData,
    quoteFulfillmentData?: QuoteFulfillmentData
  ) => {
    const data = {
      QuoteFulfillmentDetail: {
        QuoteFulfillment_ID: values.id,
        QuoteFulfillment_CurrencyIsoCode: values.currency,
        QuoteFulfillment_Details: values.details,
        QuoteFulfillment_FulfillmentDate: convertDateToISOString(values.date),
        QuoteFulfillment_LicenseKeyID: values.licenseKey.id,
        LicenseKeys_Name: values.licenseKey.name,
        QuoteFulfillment_Name: values.name,
        QuoteFulfillment_QuoteID: values.quote.id,
        Quotes_Name: values.quote.name,
      },
      AssetSupportDetails: {
        Assets_IsTermLicense: convertBooleanToString(values.licenseKey.isTerm),
        Assets_SupportPlanBegin: convertDateToISOString(
          values.support.beginDate
        ),
        Assets_SupportPlanEnd: convertDateToISOString(values.support.endDate),
        Assets_SupportPlanType: values.support.planType,
      },
    };
    let newFormData: any = removeNullsFromObject(data);

    // We only want to submit form values that were modified
    newFormData = getChangedValues(newFormData, quoteFulfillmentData);

    // Add the quote, license key, and fulfillment IDs back in
    if (quoteFulfillmentData) {
      newFormData = {
        ...newFormData,
        QuoteFulfillmentDetail: {
          ...newFormData.QuoteFulfillmentDetail,
          QuoteFulfillment_ID:
            quoteFulfillmentData.QuoteFulfillmentDetail.QuoteFulfillment_ID,
          QuoteFulfillment_LicenseKeyID:
            quoteFulfillmentData.QuoteFulfillmentDetail
              .QuoteFulfillment_LicenseKeyID,
          QuoteFulfillment_QuoteID:
            quoteFulfillmentData.QuoteFulfillmentDetail
              .QuoteFulfillment_QuoteID,
        },
      };
    }

    newFormData = {
      ...newFormData,
      SubmissionDetails: {
        ...newFormData.SubmissionDetails,
        UserID: user?.id || null,
        AccountID: accountData?.AccountDetail?.Accounts_AccountID || null,
        OpportunityID: quoteData?.QuoteDetail?.Quotes_OpportunityID || null,
      },
    };

    return newFormData;
  };

  return {
    setMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
    FormatPercent,
    FormatNumber,
    FormatCurrency,
    createQuoteFulfillmentFormSubmissionData,
  };
};

interface useQuoteFulfillmentFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
  /**
   * Quote data
   */
  quoteData: QuoteData;
  /**
   * Account data
   */
  accountData: AccountData;
}
