export interface LicenseKeyData {
  LicenseKeyDetail: LicenseKeyDetail;
  AuthKeyDetail: AuthKeyDetail;
  AddOnKeyDetail: AddOnKeyDetail;
  ActivationInfo: ActivationInfo;
  SystemInfo: SystemInfo;
}

interface LicenseKeyDetail {
  LicenseKeys_ID: string;
  LicenseKeys_AccountId: string | null;
  Account_Name: string | null;
  LicenseKeys_KeyType: string | null;
  LicenseKeys_MaintenanceExpirationDate: string | null;
  LicenseKeys_Name: string | null;
  LicenseKeys_Notes: string | null;
  LicenseKeys_OriginalVersion: string | null;
  LicenseKeys_PageViews: string | null;
  LicenseKeys_ParentKey: string | null;
  LicenseKeys_Status: string | null;
  LicenseKeys_SystemStatus: string | null;
  LicenseKeys_Version: string | null;
}

interface AuthKeyDetail {
  LicenseKeys_AnniversaryDate: string | null;
}

interface AddOnKeyDetail {
  LicenseKeys_IsApplied: "0" | "1";
  LicenseKeys_LastAppliedDate: string | null;
}

interface ActivationInfo {
  LicenseKeys_MostRecentActivatedVersion: string | null;
  LicenseKeys_MostRecentActivationDate: string | null;
}

interface SystemInfo {
  LicenseKeys_CreatedByID: string | null;
  LicenseKeys_CreatedDate: string | null;
  LicenseKeys_KeyCreatedBy: string | null;
  LicenseKeys_KeyCreatedDate: string | null;
  LicenseKeys_LastModifiedById: string | null;
  LastModifiedBy_Name: string | null;
  LicenseKeys_LastModifiedDate: string | null;
}

export type LicenseKeyFormData = {
  id?: string | null;
  key?: string | null;
  account: {
    id?: string | null;
    name?: string | null;
  };
  type?: string | null;
  pageViews?: string | null;
  maintenanceExpirationDate?: string | null;
  parentKey?: string | null;
  originalVersion?: string | null;
  version?: string | null;
  status?: string | null;
  systemStatus?: string | null;
  notes?: string | null;
  anniversaryDate?: string | null;
  isApplied?: boolean | null;
  lastAppliedDate?: string | null;
  activatedVersion?: string | null;
  activationDate?: string | null;
  system: {
    createdBy: {
      id?: string | null;
      name?: string | null;
    };
    createdDate?: string | null;
  };
};
