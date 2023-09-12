import { AccountData } from "@/app/types/accounts";
import { getAccountData } from "@/app/utils/getData";

/**
 * Generates and object containing the default values for a new/empty license key form.
 * @returns Initial license key form data.
 */
const generateInitialLicenseKeyFormData = async (accountID: string) => {
  const accountData: AccountData = await getAccountData(accountID);

  const initialLicenseKeyFormData = {
    accountID: null,
    name: null,
    alternateName: null,
    // parentAccount: {
    //   id: null,
    //   name: null,
    //   site: null,
    // },
    type: {
      id: null,
      value: null,
      //   lastChangeDate: null,
    },
    // miscInfo: null,
    // migrateToNewOrg: null,
    // migrationExternalID: null,
    phone: null,
    orderValue: {
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
    isFederalState: false,
    governmentType: null,
    // territory: null,
    // region: null,
    superRegion: null,
    // msa: null,
    // partnerStatus: null,
    address: {
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
      creditHold: false,
      supportAccountAlert: null,
      noSupport: false,
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
      serverCalls: null,
      // events: null,
      installations: null,
      termLicense: false,
      baseMntExpireDate: null,
      mntExpireDate: null,
      // extMntExpireDate: null,
      activatedVersion: null,
    },
  };

  return initialLicenseKeyFormData;
};

/**
 * Returns a license key data object to be passed to the license key form.
 * @param keyData Data from an existing license key. (optional)
 * @returns License key data object.
 */
export const createLicenseKeyFormData = async (
  accountID: string,
  keydata?: LicenseKeyData
) => {
  const initialAccountFormData = await generateInitialLicenseKeyFormData(
    accountID
  );

  if (!keydata) {
    return initialAccountFormData;
  }

  return {
    ...initialAccountFormData,
    accountID: keydata.AccountDetail.Accounts_AccountID,
    name: keydata.AccountDetail.Accounts_Name,
    alternateName: keydata.AccountDetail.Accounts_AlternateAccountName,
    // parentAccount: {
    //   id: null,
    //   name: null,
    //   site: null,
    // },
    owner: {
      id: keydata.AccountDetail.Accounts_OwnerId,
      name: keydata.AccountDetail.OwnerName,
    },
    type: {
      id: keydata.AccountDetail.Accounts_Type,
      value: keydata.AccountDetail.AccountType_Description,
      //   lastChangeDate: null,
    },
    // miscInfo: null,
    // migrateToNewOrg: null,
    // migrationExternalID: null,
    phone: keydata.AccountDetail.Accounts_Phone,
    orderValue: {
      total: keydata.TotalOrderValue.AccountsTotal_OrderValue,
      analytics: keydata.TotalOrderValue.AccountsTotal_Analytics,
      //   vdm: null,
      //   optimize: null,
      services: keydata.TotalOrderValue.AccountsTotal_Services,
      //   ads: null,
      //   apps: null,
      other: keydata.TotalOrderValue.AccountsTotal_Other,
      consulting: keydata.TotalOrderValue.AccountsTotal_Consulting,
      training: keydata.TotalOrderValue.AccountsTotal_Training,
      partnerProducts: keydata.TotalOrderValue.AccountsTotal_PartnerProducts,
    },
    isFederalState: !!Number(keydata.AccountDetail.Accounts_IsFedState),
    governmentType: keydata.AccountDetail.Accounts_GovtType,
    // territory: null,
    // region: null,
    superRegion: keydata.AccountDetail.Accounts_Super_Region,
    // msa: null,
    // partnerStatus: null,
    address: {
      billing: {
        street: keydata.AddressInformation.AccountsAddress_BillingStreet,
        city: keydata.AddressInformation.AccountsAddress_BillingCity,
        state: keydata.AddressInformation.AccountsAddress_BillingState,
        postalCode:
          keydata.AddressInformation.AccountsAddress_BillingPostalCode,
        country: keydata.AddressInformation.AccountsAddress_BillingCountry,
      },
      shipping: {
        street: keydata.AddressInformation.AccountsAddress_ShippingStreet,
        city: keydata.AddressInformation.AccountsAddress_ShippingCity,
        state: keydata.AddressInformation.AccountsAddress_ShippingState,
        postalCode:
          keydata.AddressInformation.AccountsAddress_ShippingPostalCode,
        country: keydata.AddressInformation.AccountsAddress_ShippingCountry,
      },
    },
    collections: {
      contact: {
        id: keydata.Collections.AccountsCollection_ContactID,
        name: keydata.Collections.Contact_Fullname,
      },
      statusID: keydata.Collections.AccountsCollection_Status,
      status: keydata.Collections.CollectionStatus_Description,
      pastDueAmount: keydata.Collections.AccountsCollection_PastDueAmount,
      suspensionDate:
        keydata.Collections.AccountsCollection_AnticipatedSuspDate,
      passedToDebtCollectionDate:
        keydata.Collections.AccountsCollection_PassedToCollectionDate,
      correspondence: keydata.Collections.AccountsCollection_Correspondence,
      creditHold: !!Number(keydata.AccountCreditStatus.AccountsCredit_Hold),
      supportAccountAlert: keydata.Collections.Accounts_Alert,
      noSupport: !!Number(keydata.Collections.Accounts_NoTechnicalSupport),
      // serviceSuspended: false, // Not currently included
      servicesToSuspend:
        keydata.Collections.AccountsCollection_ServicesToBeSuspended,
      serviceSuspensionDate:
        keydata.Collections.AccountsCollection_ServiceSuspensionDate,
      lastConversationNote:
        keydata.Collections.AccountsCollection_LastConversationNote,
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
      serverCalls:
        keydata.SoftwareEntitlements.AccountsSoftware_Entitled_Server_Calls,
      // events: null,
      installations:
        keydata.SoftwareEntitlements.AccountsSoftware_Installations,
      termLicense: !!Number(
        keydata.SoftwareEntitlements.AccountsSoftware_Term_License
      ),
      baseMntExpireDate:
        keydata.SoftwareEntitlements.AccountsSoftware_Base_Mnt_Expiration_Date,
      mntExpireDate:
        keydata.SoftwareEntitlements.AccountsSoftware_Mnt_Expiration_Date,
      // extMntExpireDate: null,
      activatedVersion:
        keydata.SoftwareEntitlements
          .AccountsSoftware_Most_Recent_Activated_Version,
    },
  };
};
