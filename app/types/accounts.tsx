export interface AccountData {
  AccountDetail: AccountDetail;
  AddressInformation: AddressInformation;
  AccountCreditStatus: AccountCreditStatus;
  Collections: Collections;
  SoftwareEntitlements: SoftwareEntitlements;
  TotalOrderValue: TotalOrderValue;
  Assets: Asset[];
  LicenseKeys: LicenseKey[];
}

interface AccountDetail {
  Accounts_AccountID: string;
  Accounts_AlternateAccountName?: string | null;
  Accounts_Fax?: string | null;
  Accounts_IsFedState: "0" | "1";
  Accounts_GovtType?: string | null;
  Accounts_MSA: "0" | "1";
  Accounts_Name: string;
  Accounts_OwnerId: string;
  OwnerName: string;
  Accounts_Phone?: string | null;
  Accounts_Site?: string | null;
  Accounts_Super_Region?: string | null;
  Accounts_Type?: string | null;
  AccountsType_Description: string | null;
  // Accounts_Vertical?: string | null;
  Accounts_Website?: string | null;
}

interface AddressInformation {
  AccountsAddress_ID: string;
  AccountsAddress_BillingCity?: string | null;
  AccountsAddress_BillingCountry?: string | null;
  AccountsAddress_BillingPostalCode?: string | null;
  AccountsAddress_BillingState?: string | null;
  AccountsAddress_BillingStreet?: string | null;
  AccountsAddress_ShippingCity?: string | null;
  AccountsAddress_ShippingCountry?: string | null;
  AccountsAddress_ShippingPostalCode?: string | null;
  AccountsAddress_ShippingState?: string | null;
  AccountsAddress_ShippingStreet?: string | null;
}

interface AccountCreditStatus {
  AccountsCredit_ID: string;
  AccountsCredit_AutoRenewOP: "0" | "1";
  AccountsCredit_AutoRenewNotes?: string | null;
  AccountsCredit_DeniedReason?: string | null;
  AccountsCredit_Hold: "0" | "1";
  AccountsCredit_HoldReason?: string | null;
  AccountsCredit_Last_Modified?: string | null;
  AccountsCredit_Limit?: string | null;
  AccountsCredit_Notes?: string | null;
  AccountsCredit_Status?: string | null;
  AccountsCredit_OPCancellationNoticeDel?: string | null;
  AccountsCredit_PORequired: "0" | "1";
  AccountsCredit_PORequiredNotes?: string | null;
}

interface Collections {
  AccountsCollection_ID?: string | null;
  AccountsCollection_AccountID?: string | null;
  AccountsCollection_AnticipatedSuspDate?: string | null;
  AccountsCollection_LastConversationNote?: string | null;
  AccountsCollection_PassedToCollectionDate?: string | null;
  AccountsCollection_ServiceSuspensionDate?: string | null;
  AccountsCollection_ServicesToBeSuspended?: string | null;
  AccountsCollection_Status?: string | null;
  CollectionStatus_Description?: string | null;
  AccountsCollection_ContactID?: string | null;
  Contact_Fullname?: string | null;
  AccountsCollection_Correspondence?: string | null;
  AccountsCollection_PastDueAmount?: string | null;
  Accounts_NoTechnicalSupport: "0" | "1";
  Accounts_Alert?: string | null;
}

interface TotalOrderValue {
  AccountsTotal_ID: string;
  AccountsTotal_AccountID: string;
  AccountsTotal_Analytics?: string | null;
  AccountsTotal_Consulting?: string | null;
  AccountsTotal_OrderValue?: string | null;
  AccountsTotal_Other?: string | null;
  AccountsTotal_PartnerProducts?: string | null;
  AccountsTotal_Services?: string | null;
  AccountsTotal_Training?: string | null;
}

interface SoftwareEntitlements {
  AccountsSoftware_ID: string;
  AccountsSoftware_Base_Mnt_Expiration_Date?: string | null;
  AccountsSoftware_Entitled_Server_Calls?: string | null;
  AccountsSoftware_Installations?: string | null;
  AccountsSoftware_Mnt_Expiration_Date?: string | null;
  AccountsSoftware_Most_Recent_Activated_Version?: string | null;
  AccountsSoftware_Term_License?: string | null;
}

interface Asset {
  Assets_ID: string;
  Assets_Name: string;
  Assets_SerialNumber?: string | null;
  Assets_SupportPlanEnd?: string | null;
  Assets_SupportPlanType?: string | null;
  Assets_Quantity?: string | null;
  Assets_PageViews?: string | null;
  Assets_Status?: string | null;
}

export interface LicenseKey {
  LicenseKeys_ID: string;
  LicenseKeys_Name: string;
  LicenseKeys_KeyType?: string | null;
  LicenseKeys_PageViews?: string | null;
  LicenseKeys_Status?: string | null;
  LicenseKeys_MostRecentActivatedVersion?: string | null;
  LicenseKeys_AnniversaryDate?: string | null;
  LicenseKeys_SystemStatus?: string | null;
  LicenseKeys_ParentKey?: string | null;
  LicenseKeys_KeyCreatedDate?: string | null;
}

export type AccountFormData = {
  accountID?: string | null;
  name?: string | null;
  alternateName?: string | null;
  owner: {
    id?: string | null;
    name?: string | null;
  };
  type: {
    id?: string | null;
    value?: string | null;
  };
  phone?: string | null;
  orderValue: {
    id?: string | null;
    accountID?: string | null;
    total?: string | null;
    analytics?: string | null;
    services?: string | null;
    other?: string | null;
    consulting?: string | null;
    training?: string | null;
    partnerProducts?: string | null;
  };
  isFederalState?: boolean | null;
  governmentType?: string | null;
  msa?: boolean | null;
  superRegion?: string | null;
  address: {
    id?: string | null;
    billing: {
      street?: string | null;
      city?: string | null;
      state?: string | null;
      postalCode?: string | null;
      country?: string | null;
    };
    shipping: {
      street?: string | null;
      city?: string | null;
      state?: string | null;
      postalCode?: string | null;
      country?: string | null;
    };
  };
  collections: {
    id?: string | null;
    accountID?: string | null;
    contact: {
      id?: string | null;
      name?: string | null;
    };
    statusID?: string | null;
    status?: string | null;
    pastDueAmount?: string | null;
    suspensionDate?: Date | null;
    passedToDebtCollectionDate?: Date | null;
    correspondence?: string | null;
    creditHold?: boolean | null;
    supportAccountAlert?: string | null;
    noSupport?: boolean | null;
    servicesToSuspend?: string | null;
    serviceSuspensionDate?: Date | null;
    lastConversationNote?: string | null;
  };
  entitlement: {
    id?: string | null;
    serverCalls?: string | null;
    installations?: number | null;
    termLicense?: boolean | null;
    baseMntExpireDate?: Date | null;
    mntExpireDate?: Date | null;
    activatedVersion?: string | null;
  };
};
