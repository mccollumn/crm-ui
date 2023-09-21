export interface AssetData {
  AssetDetail: AssetDetail;
  AssetSupportDetails: AssetSupportDetails;
  AssetSystemInformation: AssetSystemInformation;
}

interface AssetDetail {
  Assets_ID: string;
  Assets_AccountID: string;
  Accounts_Name?: string | null;
  Assets_Description?: string | null;
  Assets_IsTermLicense: "0" | "1";
  Assets_Name?: string | null;
  Assets_OpportunityID?: string | null;
  Opportunities_Name?: string | null;
  Assets_PageViews?: string | null;
  Assets_Product2Id?: string | null;
  Product2_Name?: string | null;
  Assets_PurchaseDate?: string | null;
  Assets_Quantity?: string | null;
  Assets_SerialNumber?: string | null;
  Assets_Status?: string | null;
}

interface AssetSupportDetails {
  Assets_MaintenanceStatus?: string | null;
  Assets_SupportPlanBegin?: string | null;
  Assets_SupportPlanEnd?: string | null;
  Assets_SupportPlanType?: string | null;
}

interface AssetSystemInformation {
  Assets_CreatedByID?: string | null;
  Users_Name?: string | null;
  Assets_CreatedDate?: string | null;
  Assets_LastModifiedByID?: string | null;
  Assets_LastModifiedDate?: string | null;
  Assets_PV?: string | null;
}

export type AssetFormData = {
  id?: string | null;
  name?: string | null;
  serialNumber?: string | null;
  status?: string | null;
  account: {
    id?: string | null;
    name?: string | null;
  };
  description?: string | null;
  isTermLicense?: boolean | null;
  opportunity: { id?: string | null; name?: string | null };
  product: { id?: string | null; name?: string | null };
  pageViews?: string | null;
  purchaseDate?: Date | null;
  quantity?: string | null;
  support: {
    status?: string | null;
    beginDate?: Date | null;
    endDate?: Date | null;
    planType?: string | null;
  };
  system: {
    createdBy: { id?: string | null; name?: string | null };
    createDate?: Date | null;
    lastModifiedBy: { id?: string | null; name?: string | null };
    lastModifiedDate?: Date | null;
  };
};
