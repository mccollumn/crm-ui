export interface ProductData {
  ProductDetail: ProductDetail;
  ProductCategorization: ProductCategorization;
  DescriptionInformation: DescriptionInformation;
  SystemInformation: SystemInformation;
}

interface ProductDetail {
  Product2_ID: string;
  Product2_IsActive?: "0" | "1";
  Product2_IsCoop?: "0" | "1";
  Product2_Name?: string | null;
  Product2_ProductCode?: string | null;
  Product2_TermBased?: "0" | "1";
  Product2_UOM?: string | null;
  Product2_UnitPrice?: string | null;
}

interface ProductCategorization {
  Product2_Category?: string | null;
  Product2_Family?: string | null;
  Product2_Feature?: string | null;
  Product2_SkuGroup?: string | null;
  Product2_Version?: string | null;
  Product2_VolumeType?: string | null;
}

interface DescriptionInformation {
  Product2_Description?: string | null;
  Product2_ProductDescriptionLong?: string | null;
  Product2_Comments?: string | null;
  Product2_TCID?: string | null;
  TCs_Name?: string | null;
}

interface SystemInformation {
  Product2_CreatedByID?: string | null;
  CreatedBy_Name?: string | null;
  Product2_CreatedDate?: string | null;
  Product2_LastModifiedByID?: string | null;
  LastModifiedBy_Name?: string | null;
  Product2_LastModifiedDate?: string | null;
  Product2_SystemProductFamily?: string | null;
}
