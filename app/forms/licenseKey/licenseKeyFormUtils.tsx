import { AccountData } from "@/app/types/accounts";
import { LicenseKeyData, LicenseKeyFormData } from "@/app/types/licenseKeys";
import { getAccountData } from "@/app/utils/getData";

/**
 * Generates and object containing the default values for a new/empty license key form.
 * @returns Initial license key form data.
 */
const generateInitialLicenseKeyFormData = async (accountID: string) => {
  const accountData: AccountData = await getAccountData(accountID);

  const initialLicenseKeyFormData: LicenseKeyFormData = {
    id: null,
    key: null,
    account: {
      id: accountData?.AccountDetail?.Accounts_AccountID || null,
      name: accountData?.AccountDetail?.Accounts_Name || null,
    },
    type: null,
    pageViews: null,
    maintenanceExpirationDate: null,
    parentKey: null,
    originalVersion: null,
    version: null,
    status: null,
    systemStatus: null,
    notes: null,
    anniversaryDate: null,
    isApplied: false,
    lastAppliedDate: null,
    activatedVersion: null,
    activationDate: null,
    system: {
      createdBy: {
        id: null,
        name: null,
      },
      createdDate: null,
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
  keyData?: LicenseKeyData
) => {
  const initialAccountFormData = await generateInitialLicenseKeyFormData(
    accountID
  );

  if (!keyData) {
    return initialAccountFormData;
  }

  return {
    ...initialAccountFormData,
    id: keyData.LicenseKeyDetail.LicenseKeys_ID,
    key: keyData.LicenseKeyDetail.LicenseKeys_Name,
    account: {
      id: keyData.LicenseKeyDetail.LicenseKeys_AccountId,
      name: keyData.LicenseKeyDetail.Account_Name,
    },
    type: keyData.LicenseKeyDetail.LicenseKeys_KeyType,
    pageViews: keyData.LicenseKeyDetail.LicenseKeys_PageViews,
    maintenanceExpirationDate:
      keyData.LicenseKeyDetail.LicenseKeys_MaintenanceExpirationDate,
    parentKey: keyData.LicenseKeyDetail.LicenseKeys_ParentKey,
    originalVersion: keyData.LicenseKeyDetail.LicenseKeys_OriginalVersion,
    version: keyData.LicenseKeyDetail.LicenseKeys_Version,
    status: keyData.LicenseKeyDetail.LicenseKeys_Status,
    systemStatus: keyData.LicenseKeyDetail.LicenseKeys_SystemStatus,
    notes: keyData.LicenseKeyDetail.LicenseKeys_Notes,
    anniversaryDate: keyData.AuthKeyDetail.LicenseKeys_AnniversaryDate,
    isApplied: !!Number(keyData.AddOnKeyDetail.LicenseKeys_IsApplied),
    lastAppliedDate: keyData.AddOnKeyDetail.LicenseKeys_LastAppliedDate,
    activatedVersion:
      keyData.ActivationInfo.LicenseKeys_MostRecentActivatedVersion,
    activationDate: keyData.ActivationInfo.LicenseKeys_MostRecentActivationDate,
    system: {
      createdBy: {
        id: keyData.SystemInfo.LicenseKeys_CreatedByID,
        name: keyData.SystemInfo.LicenseKeys_KeyCreatedBy,
      },
      createdDate: keyData.SystemInfo.LicenseKeys_KeyCreatedDate,
    },
  };
};
