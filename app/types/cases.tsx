export interface CaseData {
  CaseInformation: CaseInformation;
  CaseProfile: CaseProfile;
  CaseEmails: CaseEmails[];
  CaseComments: CaseComments[];
}

export interface CaseInformation {
  Accounts_Name: string;
  Cases_ID: string;
  Cases_AccountID: string;
  Cases_CaseNumber: string;
  Cases_ClosedDate?: string | null;
  Cases_ContactEmail?: string | null;
  Cases_ContactFax?: string | null;
  Cases_ContactId?: string | null;
  Cases_ContactSFId?: string | null;
  Cases_ContactMobile?: string | null;
  Cases_ContactPhone?: string | null;
  Cases_CreatedById: string | null;
  Cases_CreatedDate: string | null;
  Cases_HibernateEndDate?: string | null;
  Cases_IsClosed: "0" | "1";
  Cases_IsDeleted: "0" | "1";
  Cases_IsEscalated: "0" | "1" | "" | true | false;
  Cases_OpenOppValueOfAccount?: string | null;
  Cases_Origin: string;
  Cases_OriginalCreatedDate?: string | null;
  Cases_OwnerId: string | null;
  Cases_SourceId?: string | null;
  Cases_Status: string;
  Cases_SubStatus: string;
  Cases_Subject: string;
  Cases_SubOwner?: string | null;
  Cases_SuppliedEmail?: string | null;
  Cases_SuppliedName?: string | null;
  Contacts_FullName: string;
  CreatedBy_Name: string;
  Owner_Name: string;
}

export interface CaseProfile {
  Cases_BugDescription?: string | null;
  Cases_BugNumber?: string | null;
  Cases_CaseType: string;
  Cases_Category: string;
  Cases_Description?: string | null;
  Cases_IsTAMCase: "0" | "1" | "" | true | false;
  Cases_Priority: string;
  Cases_ProductDeliveryMethod: string;
  Cases_ProductName: string;
  Cases_ProductSubVersion?: string | null;
  Cases_ProductVersion?: string | null;
  Cases_Reason: string;
  Cases_Severity: string;
  Cases_Subject: string;
  Cases_Type?: string | null;
}

interface CaseEmails {
  EmailMessages_ID: string;
  EmailMessages_FromAddress: string;
  EmailMessages_HasAttachment: "0" | "1";
  EmailMessages_MessageDate: string;
  EmailMessages_Status: string;
  EmailMessages_Subject: string;
}

interface CaseComments {
  CaseComments_ID: string;
  CaseComments_CommentBody: string;
  CaseComments_CreatedById?: string | null;
  CaseComments_CreatedDate: string;
  CaseComments_IsDeleted: "0" | "1";
  CaseComments_IsPublic: "0" | "1";
  CaseComments_LastModifiedById?: string | null;
  CaseComments_LastModifiedDate?: string | null;
}
