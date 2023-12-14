export interface CaseData {
  CaseInformation: CaseInformation;
  CaseProfile: CaseProfile;
  CaseEmails: CaseEmail[];
  CaseComments: CaseComment[];
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
  Cases_IsEscalated: "0" | "1";
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
  Cases_IsTAMCase: "0" | "1";
  Cases_Priority: string;
  Cases_ProductDeliveryMethod: string;
  Cases_ProductName: string | null;
  Cases_ProductSubVersion?: string | null;
  Cases_ProductVersion?: string | null;
  Cases_Reason: string;
  Cases_Severity: string;
  Cases_Subject: string;
  Cases_Type?: string | null;
}

interface CaseEmail {
  EmailMessages_ID: string;
  EmailMessages_FromAddress: string;
  EmailMessages_HasAttachment: "0" | "1";
  EmailMessages_MessageDate: string;
  EmailMessages_Status: string;
  EmailMessages_Subject: string;
}

export interface CaseComment {
  CaseComments_ID: string;
  CaseComments_CaseID: string;
  CaseComments_CommentBody: string;
  CaseComments_CreatedById?: string | null;
  CreatedBy_Name?: string | null;
  CaseComments_CreatedDate: string;
  CaseComments_IsDeleted: "0" | "1";
  CaseComments_IsPublic: "0" | "1";
  CaseComments_LastModifiedById?: string | null;
  LastModifiedBy_Name?: string | null;
  CaseComments_LastModifiedDate?: string | null;
}

export type CaseFormData = {
  caseID?: string | null;
  caseNumber?: string | null;
  subject?: string | null;
  account: {
    id?: string | null;
    name?: string | null;
    site?: string | null;
    description?: string | null;
  };
  contact: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    fax?: string | null;
    phone?: string | null;
    mobile?: string | null;
  };
  origin?: string | null;
  status?: string | null;
  subStatus?: string | null;
  hibernateEndDate?: Date | null;
  owner: { id?: string | null; name?: string | null };
  subOwner: { id?: string | null; name?: string | null };
  product: {
    deliveryMethod?: string | null;
    name?: string | null;
    version?: string | null;
    subVersion?: string | null;
  };
  bugNumber?: string | null;
  bugDescription?: string | null;
  type?: string | null;
  reason?: string | null;
  category?: string | null;
  priority?: string | null;
  severity?: string | null;
  isTamCase?: boolean | null;
  description?: string | null;
};

export type CaseCommentFormData = {
  caseCommentID?: string | null;
  caseID?: string | null;
  comment?: string | null;
  isPublic?: boolean | null;
};
