export interface AccountData {
  AccountDetail: AccountDetail;
  AddressInformation: AddressInformation;
  AccountCreditStatus: AccountCreditStatus;
  Collections: Collections;
  TotalOrderValue: TotalOrderValue;
}

interface AccountDetail {
  Accounts_AccountID: string;
  Accounts_AlternateAccountName?: string | null;
  Accounts_Fax?: string | null;
  Accounts_IsFedState: "0" | "1";
  Accounts_GovtType?: string | null;
  Accounts_Name: string;
  Accounts_OwnerId: string;
  OwnerName: string;
  Accounts_Phone?: string | null;
  Accounts_Site?: string | null;
  Accounts_Super_Region?: string | null;
  Accounts_Type?: string | null;
  AccountType_Description: string | null;
  Accounts_Vertical?: string | null;
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
  Accounts_AutoRenewOP: "0" | "1";
  Accounts_AutoRenewNotes?: string | null;
  AccountsCredit_DeniedReason?: string | null;
  AccountsCredit_Hold: "0" | "1";
  AccountsCredit_HoldReason?: string | null;
  AccountsCredit_Last_Modified?: string | null;
  AccountsCredit_Limit?: string | null;
  AccountsCredit_Notes?: string | null;
  AccountsCredit_Status?: string | null;
  Accounts_OPCancellationNoticeDel?: string | null;
  Accounts_PORequired: "0" | "1";
  Accounts_PORequiredNotes?: string | null;
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
