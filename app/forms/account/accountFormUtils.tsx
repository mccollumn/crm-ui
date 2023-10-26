import { AccountData, AccountFormData } from "@/app/types/accounts";
import { getDefaultOwner } from "@/app/utils/forms";

/**
 * Generates and object containing the default values for a new/empty account form.
 * @returns Initial account form data.
 */
const generateInitialAccountFormData = async () => {
  const defaultOwner = await getDefaultOwner();

  const initialAccountFormData: AccountFormData = {
    accountID: null,
    name: null,
    alternateName: null,
    // parentAccount: {
    //   id: null,
    //   name: null,
    //   site: null,
    // },
    owner: defaultOwner,
    type: {
      display: null,
      value: null,
      //   lastChangeDate: null,
    },
    // miscInfo: null,
    // migrateToNewOrg: null,
    // migrationExternalID: null,
    phone: null,
    orderValue: {
      id: null,
      accountID: null,
      total: null,
      analytics: null,
      //   vdm: null,
      //   optimize: null,
      services: null,
      //   ads: null,
      //   apps: null,
      other: null,
      consulting: null,
      training: null,
      partnerProducts: null,
    },
    isFederalState: null,
    governmentType: null,
    // territory: null,
    // region: null,
    superRegion: null,
    msa: null,
    // partnerStatus: null,
    address: {
      id: null,
      billing: {
        street: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
      },
      shipping: {
        street: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
      },
    },
    collections: {
      id: null,
      accountID: null,
      contact: {
        id: null,
        name: null,
      },
      statusID: null,
      status: null,
      pastDueAmount: null,
      suspensionDate: null,
      passedToDebtCollectionDate: null,
      correspondence: null,
      creditHold: null,
      supportAccountAlert: null,
      noSupport: null,
      // serviceSuspended: false, // Not currently included
      servicesToSuspend: null,
      serviceSuspensionDate: null,
      lastConversationNote: null,
    },
    // opCustomer: true,
    // annualServerCalls: null,
    // alexaRanking: null,
    // alexaRankingTop10k: null,
    // eCommerce: false,
    // monthlyAdSpend: null,
    // comScore: {
    //   annualPageViewa: null,
    //   dailyVisitors: null,
    //   ranking: null,
    //   uniqueMonthlyVisitors: null,
    // },
    // demographics: {
    //   legalName: null,
    //   industry: null,
    //   annualRevenue: null,
    //   employees: null,
    //   locationType: null,
    //   ownership: null,
    //   taxExpemt: false,
    //   taxExemptID: null,
    //   tickerSymbol: null,
    //   sicCode: null,
    //   sicDescription: null,
    // },
    // contract: {
    //   odMaxEndDate: null,
    //   adsMaxEndDate: null,
    // },
    // supportOverrideForEntitlement: false,
    entitlement: {
      id: null,
      serverCalls: null,
      // events: null,
      installations: null,
      termLicense: null,
      baseMntExpireDate: null,
      mntExpireDate: null,
      // extMntExpireDate: null,
      activatedVersion: null,
    },
  };

  return initialAccountFormData;
};

/**
 * Returns an account data object to be passed to the account form.
 * @param accountData Data from an existing account. (optional)
 * @returns Account data object.
 */
export const createAccountFormData = async (accountData?: AccountData) => {
  const initialAccountFormData = await generateInitialAccountFormData();

  if (!accountData) {
    return initialAccountFormData;
  }

  return {
    ...initialAccountFormData,
    accountID: accountData.AccountDetail.Accounts_AccountID,
    name: accountData.AccountDetail.Accounts_Name,
    alternateName: accountData.AccountDetail.Accounts_AlternateAccountName,
    owner: {
      id: accountData.AccountDetail.Accounts_OwnerId,
      name: accountData.AccountDetail.OwnerName,
    },
    type: {
      id: accountData.AccountDetail.Accounts_Type,
      value: accountData.AccountDetail.AccountsType_Description,
    },
    phone: accountData.AccountDetail.Accounts_Phone,
    orderValue: {
      id: accountData.TotalOrderValue.AccountsTotal_ID,
      accountID: accountData.TotalOrderValue.AccountsTotal_AccountID,
      total: accountData.TotalOrderValue.AccountsTotal_OrderValue,
      analytics: accountData.TotalOrderValue.AccountsTotal_Analytics,
      services: accountData.TotalOrderValue.AccountsTotal_Services,
      other: accountData.TotalOrderValue.AccountsTotal_Other,
      consulting: accountData.TotalOrderValue.AccountsTotal_Consulting,
      training: accountData.TotalOrderValue.AccountsTotal_Training,
      partnerProducts:
        accountData.TotalOrderValue.AccountsTotal_PartnerProducts,
    },
    isFederalState: !!Number(accountData.AccountDetail.Accounts_IsFedState),
    governmentType: accountData.AccountDetail.Accounts_GovtType,
    msa: !!Number(accountData.AccountDetail.Accounts_MSA),
    superRegion: accountData.AccountDetail.Accounts_Super_Region,
    address: {
      id: accountData.AddressInformation.AccountsAddress_ID,
      billing: {
        street: accountData.AddressInformation.AccountsAddress_BillingStreet,
        city: accountData.AddressInformation.AccountsAddress_BillingCity,
        state: accountData.AddressInformation.AccountsAddress_BillingState,
        postalCode:
          accountData.AddressInformation.AccountsAddress_BillingPostalCode,
        country: accountData.AddressInformation.AccountsAddress_BillingCountry,
      },
      shipping: {
        street: accountData.AddressInformation.AccountsAddress_ShippingStreet,
        city: accountData.AddressInformation.AccountsAddress_ShippingCity,
        state: accountData.AddressInformation.AccountsAddress_ShippingState,
        postalCode:
          accountData.AddressInformation.AccountsAddress_ShippingPostalCode,
        country: accountData.AddressInformation.AccountsAddress_ShippingCountry,
      },
    },
    collections: {
      id: accountData.Collections.AccountsCollection_ID,
      accountID: accountData.Collections.AccountsCollection_AccountID,
      contact: {
        id: accountData.Collections.AccountsCollection_ContactID,
        name: accountData.Collections.Contact_Fullname,
      },
      statusID: accountData.Collections.AccountsCollection_Status,
      status: accountData.Collections.CollectionStatus_Description,
      pastDueAmount: accountData.Collections.AccountsCollection_PastDueAmount,
      suspensionDate:
        accountData.Collections.AccountsCollection_AnticipatedSuspDate,
      passedToDebtCollectionDate:
        accountData.Collections.AccountsCollection_PassedToCollectionDate,
      correspondence: accountData.Collections.AccountsCollection_Correspondence,
      creditHold: !!Number(accountData.AccountCreditStatus.AccountsCredit_Hold),
      supportAccountAlert: accountData.Collections.Accounts_Alert,
      noSupport: !!Number(accountData.Collections.Accounts_NoTechnicalSupport),
      servicesToSuspend:
        accountData.Collections.AccountsCollection_ServicesToBeSuspended,
      serviceSuspensionDate:
        accountData.Collections.AccountsCollection_ServiceSuspensionDate,
      lastConversationNote:
        accountData.Collections.AccountsCollection_LastConversationNote,
    },
    entitlement: {
      id: accountData.SoftwareEntitlements.AccountsSoftware_ID,
      serverCalls:
        accountData.SoftwareEntitlements.AccountsSoftware_Entitled_Server_Calls,
      installations:
        accountData.SoftwareEntitlements.AccountsSoftware_Installations,
      termLicense: !!Number(
        accountData.SoftwareEntitlements.AccountsSoftware_Term_License
      ),
      baseMntExpireDate:
        accountData.SoftwareEntitlements
          .AccountsSoftware_Base_Mnt_Expiration_Date,
      mntExpireDate:
        accountData.SoftwareEntitlements.AccountsSoftware_Mnt_Expiration_Date,
      activatedVersion:
        accountData.SoftwareEntitlements
          .AccountsSoftware_Most_Recent_Activated_Version,
    },
  };
};
