import React from "react";
import { useRouter } from "next/navigation";
import { MenuItem } from "@/app/types/types";
import {
  convertBooleanToString,
  convertDateToISOString,
  getChangedValues,
  isSuccessfulResponse,
  cleanObject,
} from "@/app/utils/utils";
import { useForm } from "../useForm";
import { LicenseKeyData, LicenseKeyFormData } from "@/app/types/licenseKeys";

export const useLicenseKeyForm = ({ menuItems }: useLicenseKeyFormProps) => {
  const router = useRouter();
  const initialMenuOptions = {
    Account: [],
    KeyType: [],
    KeyStatus: [],
    SystemStatus: [],
    CreatedBy: [],
  };

  const {
    setMenuOptions,
    setCustomMenuOptions,
    appendMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
    user,
    FormatCurrency,
    FormatNumber,
  } = useForm({
    initialMenuOptions,
    menuItems,
  });

  React.useEffect(() => {
    // Active Accounts
    const setAccounts = async () => {
      try {
        const results = await fetch(
          `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/account/list/accounts/type/active`
        );
        const accounts = await results.json();
        if (!Array.isArray(accounts)) return;
        const options = accounts.map((account: any) => {
          return {
            id: account.Accounts_AccountID,
            name: account.Accounts_Name,
            site: account.Accounts_Site,
          };
        });
        setCustomMenuOptions("Account", options);
      } catch {
        console.error("Could not retrieve list of accounts");
      }
    };
    setAccounts();

    // Created By
    const setUsers = async () => {
      try {
        const results = await fetch(
          `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/user/list/internal`
        );
        const users = await results.json();
        if (!Array.isArray(users)) return;
        const options = users.map((owner: any) => {
          return { id: owner.Users_ID, name: owner.Users_Name };
        });
        setCustomMenuOptions("CreatedBy", options);
      } catch {
        console.error("Could not retrieve list of users");
      }
    };
    setUsers();

    // Set menu options that are already known (i.e. aren't based on user input)
    setMenuOptions("KeyType");
    setMenuOptions("KeyStatus");
    setMenuOptions("SystemStatus");
  }, [setCustomMenuOptions, setMenuOptions]);

  const createLicenseKeyFormSubmissionData = (
    values: LicenseKeyFormData,
    licenseKeyData?: LicenseKeyData
  ) => {
    const data = {
      LicenseKeyDetail: {
        LicenseKeys_ID: values.id,
        LicenseKeys_AccountId: values.account.id,
        Account_Name: values.account.name,
        LicenseKeys_KeyType: values.type,
        LicenseKeys_MaintenanceExpirationDate: convertDateToISOString(
          values.maintenanceExpirationDate
        ),
        LicenseKeys_Name: values.key,
        LicenseKeys_Notes: values.notes,
        LicenseKeys_OriginalVersion: values.originalVersion,
        LicenseKeys_PageViews: values.pageViews,
        LicenseKeys_ParentKey: values.parentKey,
        LicenseKeys_Status: values.status,
        LicenseKeys_SystemStatus: values.systemStatus,
        LicenseKeys_Version: values.version,
      },
      AuthKeyDetail: {
        LicenseKeys_ID: values.id,
        LicenseKeys_AnniversaryDate: convertDateToISOString(
          values.anniversaryDate
        ),
      },
      AddOnKeyDetail: {
        LicenseKeys_ID: values.id,
        LicenseKeys_IsApplied: convertBooleanToString(values.isApplied),
        LicenseKeys_LastAppliedDate: convertDateToISOString(
          values.lastAppliedDate
        ),
      },
      ActivationInfo: {
        LicenseKeys_ID: values.id,
        LicenseKeys_MostRecentActivatedVersion: values.activatedVersion,
        LicenseKeys_MostRecentActivationDate: convertDateToISOString(
          values.activationDate
        ),
      },
      SystemInfo: {
        LicenseKeys_ID: values.id,
        LicenseKeys_CreatedByID: values.system.createdBy.id,
        LicenseKeys_CreatedDate: convertDateToISOString(
          values.system.createdDate
        ),
        LicenseKeys_KeyCreatedBy: values.system.createdBy.name,
      },
      SubmissionDetails: {
        UserID: user?.id || null,
        AccountID: values?.account?.id || null,
      },
    };
    let newFormData: any = cleanObject(data);

    // We only want to submit form values that were modified
    newFormData = getChangedValues(newFormData, licenseKeyData);

    // Add the account ID back in
    if (licenseKeyData) {
      newFormData = {
        ...newFormData,
        LicenseKeyDetail: {
          ...newFormData.LicenseKeyDetail,
          LicenseKeys_ID: licenseKeyData.LicenseKeyDetail.LicenseKeys_ID,
          LicenseKeys_AccountId:
            licenseKeyData.LicenseKeyDetail.LicenseKeys_AccountId,
        },
        AuthKeyDetail: {
          ...newFormData.AuthKeyDetail,
          LicenseKeys_ID: licenseKeyData.AuthKeyDetail.LicenseKeys_ID,
        },
        AddOnKeyDetail: {
          ...newFormData.AddOnKeyDetail,
          LicenseKeys_ID: licenseKeyData.AddOnKeyDetail.LicenseKeys_ID,
        },
        ActivationInfo: {
          ...newFormData.ActivationInfo,
          LicenseKeys_ID: licenseKeyData.ActivationInfo.LicenseKeys_ID,
        },
        SystemInfo: {
          ...newFormData.SystemInfo,
          LicenseKeys_ID: licenseKeyData.SystemInfo.LicenseKeys_ID,
        },
        SubmissionDetails: {
          ...newFormData.SubmissionDetails,
          AccountID:
            licenseKeyData.LicenseKeyDetail.LicenseKeys_AccountId || null,
        },
      };
    }
    return newFormData;
  };

  const submitLicenseKey = async (
    values: LicenseKeyFormData,
    defaultValues: LicenseKeyFormData,
    licenseKeyData?: LicenseKeyData
  ) => {
    const data = await createLicenseKeyFormSubmissionData(
      values,
      licenseKeyData
    );
    console.log("Success values", values);
    console.log("Submitted Data:", data);
    const isEdit = !!defaultValues?.id;
    const url = isEdit
      ? "/api/accounts/update/license-key"
      : "/api/accounts/insert/license-key";
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const response = await fetch(request);

    if (!(await isSuccessfulResponse(response))) {
      setIsLoading(false);
      router.push("/error");
      return;
    }

    const responseData = await response.json();

    // Refresh the page cache
    React.startTransition(() => {
      router.refresh();
    });
    // Invalidate cached account data
    await fetch("/api/revalidate/tag?tag=account");
    await fetch("/api/revalidate/tag?tag=licenseKey");

    return responseData;
  };

  return {
    setMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
    FormatCurrency,
    FormatNumber,
    createLicenseKeyFormSubmissionData,
    submitLicenseKey,
  };
};

interface useLicenseKeyFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
}
