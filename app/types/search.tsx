export type AccountResult = {
  Accounts_AccountID: string | null;
  Accounts_Name: string | null;
  Accounts_OwnerId: string | null;
  Users_Name: string | null;
  AccountsType_Description: string | null;
};

export type CaseResult = {
  Cases_ID: string | null;
  Cases_AccountID: string | null;
  Accounts_Name: string | null;
  Cases_CaseNumber: string | null;
  Cases_CreatedDate: string | null;
  Cases_OwnerId: string | null;
  Owner_Name: string | null;
  Cases_ProductName: string | null;
  Cases_Status: string | null;
  Cases_SubStatus: string | null;
  Cases_Subject: string | null;
};

export type CaseCommentResult = {
  CaseComments_ID: string | null;
  CaseComments_CaseID: string | null;
  CaseComments_CommentBody: string | null;
  CaseComments_CreatedById: string | null;
  Owner_Name: string | null;
  CaseComments_CreatedDate: string | null;
};

export type ContactResult = {
  Contacts_ID: string | null;
  Contacts_AccountId: string | null;
  Accounts_Name: string | null;
  Contacts_CreatedDate: string | null;
  Contacts_Email: string | null;
  Contacts_LastActivityDate: string | null;
  Contacts_Name: string | null;
  Contacts_Title: string | null;
};

export type AssetResult = {
  Assets_ID: string | null;
  Assets_AccountID: string | null;
  Accounts_Name: string | null;
  Assets_Name: string | null;
  Assets_SerialNumber: string | null;
};

export type OpportunityResult = {
  Opportunities_ID: string | null;
  Opportunities_AccountId: string | null;
  Account_Name: string | null;
  Opportunities_Amount: string | null;
  Opportunities_CloseDate: string | null;
  Opportunities_ForecastStatus: string | null;
  Opportunities_OpportunityType: string | null;
  Opportunities_OwnerID: string | null;
  Owner_Name: string | null;
  Opportunities_StageName: string | null;
};

export type SearchResults = {
  Accounts: AccountResult[];
  Cases: CaseResult[];
  "Case Comments": CaseCommentResult[];
  Contacts: ContactResult[];
  Assets: AssetResult[];
  Opportunities: OpportunityResult[];
};
