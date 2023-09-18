import { AssetData } from "@/app/types/assets";
import { AccountData } from "@/app/types/accounts";
import { getAccountData } from "@/app/utils/getData";
import { unEscape } from "@/app/utils/utils";

/**
 * Generates an object containing the default values for a new/empty asset form.
 * @returns Initial asset form data.
 */
const generateInitialAssetFormData = async (accountID: string) => {
  const accountData: AccountData = await getAccountData(accountID);

  const initialAssetFormData = {
    id: null,
    name: null,
    serialNumber: null,
    status: null,
    account: {
      id: accountData.AccountDetail.Accounts_AccountID || null,
      name: accountData.AccountDetail.Accounts_Name || null,
    },
    description: null,
    isTermLicense: false,
    opportunity: { id: null, name: null },
    product: { id: null, name: null },
    pageViews: null,
    purchaseDate: null,
    quantity: null,
    support: {
      status: null,
      beginDate: null,
      endDate: null,
      planType: null,
    },
    system: {
      createdBy: { id: null, name: null },
      createDate: null,
      lastModifiedBy: { id: null, name: null },
      lastModifiedDate: null,
    },
  };

  return initialAssetFormData;
};

/**
 * Returns an asset data object to be passed to the asset form.
 * @param assetData Data from an existing asset. (optional)
 * @returns Asset data object.
 */
export const createAssetFormData = async (
  accountID: string,
  assetData?: AssetData
) => {
  const initialAssetFormData = await generateInitialAssetFormData(accountID);

  if (!assetData) {
    return initialAssetFormData;
  }

  return {
    ...initialAssetFormData,
    id: assetData.AssetDetail.Assets_ID,
    name: assetData.AssetDetail.Assets_Name,
    serialNumber: assetData.AssetDetail.Assets_SerialNumber,
    status: assetData.AssetDetail.Assets_Status,
    account: {
      id: assetData.AssetDetail.Assets_AccountID,
      name: assetData.AssetDetail.Accounts_Name,
    },
    description: assetData.AssetDetail.Assets_Description,
    isTermLicense: !!Number(assetData.AssetDetail.Assets_IsTermLicense),
    opportunity: {
      id: assetData.AssetDetail.Assets_OpportunityID,
      name: unEscape(assetData.AssetDetail.Opportunities_Name || ""),
    },
    product: {
      id: assetData.AssetDetail.Assets_Product2Id,
      name: assetData.AssetDetail.Product2_Name,
    },
    pageViews: assetData.AssetDetail.Assets_PageViews,
    purchaseDate: assetData.AssetDetail.Assets_PurchaseDate,
    quantity: assetData.AssetDetail.Assets_Quantity,
    support: {
      status: assetData.AssetSupportDetails.Assets_MaintenanceStatus,
      beginDate: assetData.AssetSupportDetails.Assets_SupportPlanBegin,
      endDate: assetData.AssetSupportDetails.Assets_SupportPlanEnd,
      planType: assetData.AssetSupportDetails.Assets_SupportPlanType,
    },
    system: {
      createdBy: {
        id: assetData.AssetSystemInformation.Assets_CreatedByID,
        name: assetData.AssetSystemInformation.Users_Name,
      },
      createDate: assetData.AssetSystemInformation.Assets_CreatedDate,
      lastModifiedBy: {
        id: assetData.AssetSystemInformation.Assets_LastModifiedByID,
        name: "",
      },
      lastModifiedDate:
        assetData.AssetSystemInformation.Assets_LastModifiedDate,
    },
  };
};
