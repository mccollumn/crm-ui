import React from "react";
import { MenuItem } from "@/app/types/types";
import {
  convertBooleanToString,
  convertDateToISOString,
  convertNumberToString,
  isObjectEmpty,
} from "@/app/utils/utils";
import { useForm } from "../useForm";
import { removeNullsFromObject, getChangedValues } from "@/app/utils/utils";
import { AccountData, AccountFormData } from "@/app/types/accounts";

export const useAccountForm = ({
  menuItems,
}: //   defaultValues,
useAccountFormProps) => {
  const initialMenuOptions = {
    Owner: [],
    // ParentAccount: [],
    // AccountRecordType: [],
    AccountType: [],
    // MigrateToNewOrg: [],
    // Territory: [],
    Region: [],
    // SuperRegion: [],
    // PartnerStatus: [],
    CollectionsContact: [],
    // AnnualServerCalls: [],
    // Industry: [],
    // Ownership: [],
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
    // Account Types
    const setAccounts = async () => {
      try {
        if (!menuItems) return [];
        const options = menuItems
          .filter((item: MenuItem) => item.Menu_Name === "AccountType")
          .map((option) => {
            return { id: option.Menu_Value, value: option.Menu_Display };
          });
        setCustomMenuOptions("AccountType", options);
      } catch {
        console.error("Could not retrieve list of account types");
      }
    };
    setAccounts();

    // Account Owner
    const setOwners = async () => {
      try {
        const results = await fetch("/api/users/internal");
        const owners = await results.json();
        if (isObjectEmpty(owners)) return;
        const options = owners.data.map((owner: any) => {
          return { id: owner.Users_ID, name: owner.Users_Name };
        });
        setCustomMenuOptions("Owner", options);
        setCustomMenuOptions("CollectionsContact", options);
      } catch {
        console.error("Could not retrieve list of users");
      }
    };
    setOwners();

    // Set menu options that are already known (i.e. aren't based on user input)
    // setMenuOptions("AccountRecordType");
    // appendMenuOptions("AccountType");
    // setMenuOptions("MigrateToNewOrg");
    // setMenuOptions("Territory");
    setMenuOptions("Region");
    // setMenuOptions("SuperRegion");
    // setMenuOptions("PartnerStatus");
    // setMenuOptions("AnnualServerCalls");
    // setMenuOptions("Industry");
    // setMenuOptions("Ownership");
  }, [appendMenuOptions, menuItems, setCustomMenuOptions, setMenuOptions]);

  const createAccountFormSubmissionData = (
    values: AccountFormData,
    accountData?: AccountData
  ) => {
    const data = {
      AccountDetail: {
        Accounts_AccountID: values.accountID,
        Accounts_AlternateAccountName: values.alternateName,
        Accounts_IsFedState: convertBooleanToString(values.isFederalState),
        Accounts_GovtType: values.governmentType,
        Accounts_MSA: values.msa,
        Accounts_Name: values.name,
        Accounts_OwnerId: values.owner.id,
        OwnerName: values.owner.name,
        Accounts_Phone: values.phone,
        Accounts_Super_Region: values.superRegion,
        Accounts_Type: values.type.id,
        AccountsType_Description: values.type.value,
      },
      AddressInformation: {
        AccountsAddress_ID: values.address.id,
        AccountsAddress_BillingCity: values.address.billing.city,
        AccountsAddress_BillingCountry: values.address.billing.country,
        AccountsAddress_BillingPostalCode: values.address.billing.postalCode,
        AccountsAddress_BillingState: values.address.billing.state,
        AccountsAddress_BillingStreet: values.address.billing.street,
        AccountsAddress_ShippingCity: values.address.shipping.city,
        AccountsAddress_ShippingCountry: values.address.shipping.country,
        AccountsAddress_ShippingPostalCode: values.address.shipping.postalCode,
        AccountsAddress_ShippingState: values.address.shipping.state,
        AccountsAddress_ShippingStreet: values.address.shipping.street,
      },
      AccountCreditStatus: {
        AccountsCredit_Hold: convertBooleanToString(
          values.collections.creditHold
        ),
      },
      Collections: {
        AccountsCollection_ID: values.collections.id,
        AccountsCollection_AccountID: values.collections.accountID,
        AccountsCollection_AnticipatedSuspDate: convertDateToISOString(
          values.collections.suspensionDate
        ),
        AccountsCollection_LastConversationNote:
          values.collections.lastConversationNote,
        AccountsCollection_PassedToCollectionDate: convertDateToISOString(
          values.collections.passedToDebtCollectionDate
        ),
        AccountsCollection_ServiceSuspensionDate: convertDateToISOString(
          values.collections.serviceSuspensionDate
        ),
        AccountsCollection_ServicesToBeSuspended:
          values.collections.servicesToSuspend,
        AccountsCollection_Status: values.collections.status,
        AccountsCollection_ContactID: values.collections.contact.id,
        Contact_Fullname: values.collections.contact.name,
        AccountsCollection_Correspondence: values.collections.correspondence,
        AccountsCollection_PastDueAmount: values.collections.pastDueAmount,
        Accounts_NoTechnicalSupport: convertBooleanToString(
          values.collections.noSupport
        ),
        Accounts_Alert: values.collections.supportAccountAlert,
      },
      SoftwareEntitlements: {
        AccountsSoftware_ID: values.entitlement.id,
        AccountsSoftware_Base_Mnt_Expiration_Date: convertDateToISOString(
          values.entitlement.baseMntExpireDate
        ),
        AccountsSoftware_Entitled_Server_Calls: values.entitlement.serverCalls,
        AccountsSoftware_Installations: convertNumberToString(
          values.entitlement.installations
        ),
        AccountsSoftware_Mnt_Expiration_Date: convertDateToISOString(
          values.entitlement.mntExpireDate
        ),
        AccountsSoftware_Most_Recent_Activated_Version:
          values.entitlement.activatedVersion,
        AccountsSoftware_Term_License: convertBooleanToString(
          values.entitlement.termLicense
        ),
      },
      TotalOrderValue: {
        AccountsTotal_ID: values.orderValue.id,
        AccountsTotal_AccountID: values.orderValue.accountID,
        AccountsTotal_Analytics: values.orderValue.analytics,
        AccountsTotal_Consulting: values.orderValue.consulting,
        AccountsTotal_OrderValue: values.orderValue.total,
        AccountsTotal_Other: values.orderValue.other,
        AccountsTotal_PartnerProducts: values.orderValue.partnerProducts,
        AccountsTotal_Services: values.orderValue.services,
        AccountsTotal_Training: values.orderValue.training,
      },
    };
    let newFormData: any = removeNullsFromObject(data);

    // We only want to submit form values that were modified
    newFormData = getChangedValues(newFormData, accountData);

    // Add the account ID back in
    if (accountData) {
      newFormData = {
        ...newFormData,
        AccountDetail: {
          ...newFormData.AccountDetail,
          Accounts_AccountID: accountData.AccountDetail.Accounts_AccountID,
        },
        SubmissionDetails: {
          ...newFormData.SubmissionDetails,
          UserID: user?.id || null,
          AccountID: accountData.AccountDetail.Accounts_AccountID || null,
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
    createAccountFormSubmissionData,
  };
};

interface useAccountFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
  /**
   * Default values that will be used to populate the form.
   */
  //   defaultValues?: any;
}
