import React from "react";
import { MenuItem } from "@/app/types/types";
import {
  convertBooleanToString,
  convertDateToISOString,
  convertNumberToString,
  getChangedValues,
  isObjectEmpty,
  removeNullsFromObject,
} from "@/app/utils/utils";
import { useForm } from "../useForm";
import { AssetData, AssetFormData } from "@/app/types/assets";

export const useAssetForm = ({ menuItems }: useAssetFormProps) => {
  const initialMenuOptions = {
    Product: [],
    Account: [],
    Opportunity: [],
    Status: [],
    SupportPlanType: [],
  };

  const {
    setMenuOptions,
    setCustomMenuOptions,
    appendMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
    user,
    FormatCurrency,
    FormatNumber,
  } = useForm({
    initialMenuOptions,
    menuItems,
  });

  React.useEffect(() => {
    // Products
    const setProducts = async () => {
      try {
        const results = await fetch("/api/products");
        const products = await results.json();
        if (isObjectEmpty(products)) return;
        const options = products.data.map((product: any) => {
          return {
            id: product.Product2_ID,
            name: product.Product2_Name,
            code: product.Product2_ProductCode,
            description: product.Product2_ProductDescriptionLong,
            isActive: product.Product2_IsActive,
          };
        });
        setCustomMenuOptions("Product", options);
      } catch {
        console.error("Could not retrieve list of products");
      }
    };
    setProducts();

    // Active Accounts
    const setAccounts = async () => {
      try {
        const results = await fetch("/api/accounts/active");
        const accounts = await results.json();
        if (isObjectEmpty(accounts)) return;
        const options = accounts.data.map((account: any) => {
          return {
            id: account.Accounts_AccountID,
            name: account.Accounts_Name,
            site: account.Accounts_Site,
          };
        });
        setCustomMenuOptions("Account", options);
      } catch {
        console.error("Could not retrieve list of accounts");
      }
    };
    setAccounts();

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
    setMenuOptions("Product");
    setMenuOptions("Status");
    setMenuOptions("SupportPlanType");
  }, [setCustomMenuOptions, setMenuOptions]);

  const createAssetFormSubmissionData = (
    values: AssetFormData,
    assetData?: AssetData
  ) => {
    const data = {
      AssetDetail: {
        Assets_ID: values.id,
        Assets_AccountID: values.account.id,
        Accounts_Name: values.account.name,
        Assets_Description: values.description,
        Assets_IsTermLicense: convertBooleanToString(values.isTermLicense),
        Assets_Name: values.name,
        Assets_OpportunityID: values.opportunity.id,
        Opportunities_Name: values.opportunity.name,
        Assets_PageViews: values.pageViews,
        Assets_Product2Id: values.product.id,
        Product2_Name: values.product.name,
        Assets_PurchaseDate: values.purchaseDate,
        Assets_Quantity: convertNumberToString(values.quantity),
        Assets_SerialNumber: values.serialNumber,
        Assets_Status: values.status,
      },
      AssetSupportDetails: {
        Assets_ID: values.id,
        Assets_MaintenanceStatus: values.support.status,
        Assets_SupportPlanBegin: convertDateToISOString(
          values.support.beginDate
        ),
        Assets_SupportPlanEnd: convertDateToISOString(values.support.endDate),
        Assets_SupportPlanType: values.support.planType,
      },
      AssetSystemInformation: {
        Assets_ID: values.id,
        Assets_CreatedByID: values.system.createdBy.id,
        Users_Name: values.system.createdBy.name,
        Assets_CreatedDate: convertDateToISOString(values.system.createDate),
        Assets_LastModifiedByID: values.system.lastModifiedBy.id,
        Assets_LastModifiedDate: convertDateToISOString(
          values.system.lastModifiedDate
        ),
        Assets_PV: values.pageViews,
      },
      SubmissionDetails: {
        UserID: user?.id || null,
        AccountID: values?.account?.id || null,
        OpportunityID: values?.opportunity?.id || null,
      },
    };
    let newFormData: any = removeNullsFromObject(data);

    // We only want to submit form values that were modified
    newFormData = getChangedValues(newFormData, assetData);

    // Add the asset and account IDs back in
    if (assetData) {
      newFormData = {
        ...newFormData,
        AssetDetail: {
          ...newFormData.AssetDetail,
          Assets_ID: assetData.AssetDetail.Assets_ID,
          Assets_AccountID: assetData.AssetDetail.Assets_AccountID,
        },
        AssetSupportDetails: {
          ...newFormData.AssetSupportDetails,
          Assets_ID: assetData.AssetSupportDetails.Assets_ID,
        },
        AssetSystemInformation: {
          ...newFormData,
          Assets_ID: assetData.AssetSystemInformation.Assets_ID,
        },
        SubmissionDetails: {
          ...newFormData.SubmissionDetails,
          AccountID: assetData.AssetDetail.Assets_AccountID || null,
          AssetID: assetData.AssetDetail.Assets_ID || null,
          OpportunityID: assetData.AssetDetail.Assets_OpportunityID || null,
          ProductID: assetData.AssetDetail.Assets_Product2Id || null,
        },
      };
    }
    return newFormData;
  };

  return {
    setMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
    FormatCurrency,
    FormatNumber,
    createAssetFormSubmissionData,
  };
};

interface useAssetFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
}
