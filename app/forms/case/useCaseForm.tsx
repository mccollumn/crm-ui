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
import { CaseData, CaseFormData } from "@/app/types/cases";

export const useCaseForm = ({ menuItems, defaultValues }: useCaseFormProps) => {
  const router = useRouter();
  const initialMenuOptions = {
    Account: [],
    Contact: [],
    CaseOrigin: [],
    CaseStatus: [],
    "Sub-Status": [],
    CaseOwner: [],
    SubOwner: [],
    ProductDeliveryMethod: [],
    ProductName: [],
    ProductVersion: [],
    ProductSubVersion: [],
    CaseType: [],
    Reason: [],
    Category: [],
    Priority: [],
    Severity: [],
  };

  type Menus = keyof typeof initialMenuOptions;

  const {
    setMenuOptions,
    setCustomMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
    user,
  } = useForm({
    initialMenuOptions,
    menuItems,
  });
  const [accountSelected, setAccountSelected] = React.useState(
    defaultValues?.account
  );

  const getContactOptions = React.useCallback(
    async (accountID: string) => {
      if (!accountID) return;
      const results = await fetch(
        `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/contact/list/by/account/${accountID}`
      );
      const contacts = await results.json();
      if (!Array.isArray(contacts)) return;
      const options = contacts.map((contact: any) => {
        return {
          id: contact.Contacts_ID,
          name: contact.Contacts_Name,
          email: contact.Contacts_Email,
          title: contact.Contacts_Title,
          accountName: contact.Accounts_Name,
          accountID: contact.Contacts_AccountId,
        };
      });
      const showAllContactsEntry = {
        id: "-1",
        name: "Show All Contacts",
        email: null,
        title: null,
        accountName: null,
        accountID: null,
      };
      options.push(showAllContactsEntry);
      setCustomMenuOptions("Contact", options);
    },
    [setCustomMenuOptions]
  );

  const clearMenuOptions = React.useCallback(
    (menu: Menus) => {
      setCustomMenuOptions(menu, []);
    },
    [setCustomMenuOptions]
  );

  const setContacts = React.useCallback(async () => {
    try {
      const results = await fetch(
        `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/contact/list`
      );
      const contacts = await results.json();
      if (!Array.isArray(contacts)) return;
      const options = contacts.map((contact: any) => {
        return {
          id: contact.Contacts_ID,
          name: contact.Contacts_Name,
          title: contact.Contacts_Title,
          email: contact.Contacts_Email,
          accountName: contact.Accounts_Name,
          accountID: contact.Contacts_AccountId,
        };
      });
      setCustomMenuOptions("Contact", options);
    } catch {
      console.error("Could not retrieve list of contacts");
    }
  }, [setCustomMenuOptions]);

  React.useEffect(() => {
    // Contacts
    if (!accountSelected?.id) {
      setContacts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountSelected]);

  React.useEffect(() => {
    // Accounts
    const setAccounts = async () => {
      try {
        const results = await fetch(
          `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/account/list/accounts`
        );
        const accounts = await results.json();
        if (!Array.isArray(accounts)) return;
        const options = accounts.map((account: any) => {
          return {
            id: account.Accounts_AccountID,
            name: account.Accounts_Name,
            site: account.Accounts_Site,
            description: account.AccountsType_Description,
          };
        });
        setCustomMenuOptions("Account", options);
      } catch {
        console.error("Could not retrieve list of accounts");
      }
    };
    setAccounts();

    // Case Owner
    const setOwners = async () => {
      try {
        const results = await fetch(
          `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/user/list/internal`
        );
        const owners = await results.json();
        if (!Array.isArray(owners)) return;
        const options = owners.map((owner: any) => {
          return { id: owner.Users_ID, name: owner.Users_Name };
        });
        setCustomMenuOptions("CaseOwner", options);
        setCustomMenuOptions("SubOwner", options);
      } catch {
        console.error("Could not retrieve list of users");
      }
    };
    setOwners();

    // Set menu options that are already known (i.e. aren't based on user input)
    setMenuOptions("ProductName", "On Premises");
    setMenuOptions("ProductDeliveryMethod");
    setMenuOptions("CaseStatus");
    setMenuOptions("Sub-Status", defaultValues?.status || "Open");
    setMenuOptions("CaseOrigin");
    setMenuOptions("Priority");
    setMenuOptions("Severity");
    setMenuOptions("ProductVersion", defaultValues?.product.name || "");
    setMenuOptions("CaseType", defaultValues?.type || "");
    setMenuOptions("Reason", defaultValues?.reason || "");
    setMenuOptions("Category", defaultValues?.category || "");
  }, [
    defaultValues?.category,
    defaultValues?.product.name,
    defaultValues?.reason,
    defaultValues?.status,
    defaultValues?.type,
    setCustomMenuOptions,
    setMenuOptions,
  ]);

  const createCaseFormSubmissionData = (
    values: CaseFormData,
    caseData?: CaseData
  ) => {
    const data = {
      CaseInformation: {
        Cases_ID: values.caseID,
        Cases_AccountID: values.account.id,
        Accounts_Name: values.account.name,
        Cases_CaseNumber: values.caseNumber,
        Cases_ContactEmail: values.contact.email,
        Cases_ContactFax: values.contact.fax,
        Cases_ContactId: values.contact.id,
        Contacts_FullName: values.contact.name,
        Cases_ContactMobile: values.contact.mobile,
        Cases_ContactPhone: values.contact.phone,
        Cases_HibernateEndDate: convertDateToISOString(values.hibernateEndDate),
        Cases_Origin: values.origin,
        Cases_OwnerId: values.owner.id,
        Owner_Name: values.owner.name,
        Cases_Status: values.status,
        Cases_SubStatus: values.subStatus,
        Cases_Subject: values.subject,
        Cases_SubOwner: values.subOwner.name,
      },
      CaseProfile: {
        Cases_ID: values.caseID,
        Cases_BugDescription: values.bugDescription,
        Cases_BugNumber: values.bugNumber,
        Cases_CaseType: values.type,
        Cases_Category: values.category,
        Cases_Description: values.description,
        Cases_IsTAMCase: convertBooleanToString(values.isTamCase),
        Cases_Priority: values.priority,
        Cases_ProductDeliveryMethod: values.product.deliveryMethod,
        Cases_ProductName: values.product.name,
        Cases_ProductSubVersion: values.product.subVersion,
        Cases_ProductVersion: values.product.version,
        Cases_Reason: values.reason,
        Cases_Severity: values.severity,
        Cases_Subject: values.subject,
        Cases_Type: values.type,
      },
      SubmissionDetails: {
        UserID: user?.id || null,
        AccountID: values?.account?.id || null,
        OwnerID: values?.owner?.id || null,
      },
    };
    let newFormData: any = cleanObject(data);

    // We only want to submit form values that were modified
    newFormData = getChangedValues(newFormData, caseData);

    // Add the case IDs back in
    if (caseData) {
      newFormData = {
        ...newFormData,
        CaseInformation: {
          ...newFormData.CaseInformation,
          Cases_ID: caseData.CaseInformation.Cases_ID,
          Cases_AccountID: caseData.CaseInformation.Cases_AccountID,
          Cases_ContactId: caseData.CaseInformation.Cases_ContactId,
          Contacts_FullName: caseData.CaseInformation.Contacts_FullName,
        },
        SubmissionDetails: {
          ...newFormData.SubmissionDetails,
          CaseID: caseData.CaseInformation.Cases_ID || null,
          AccountID: caseData.CaseInformation.Cases_AccountID || null,
          OwnerID: caseData.CaseInformation.Cases_OwnerId || null,
          ContactID: caseData.CaseInformation.Cases_ContactId || null,
        },
      };
    }
    return newFormData;
  };

  const submitCase = async (
    values: CaseFormData,
    defaultValues: CaseFormData,
    caseData?: CaseData
  ) => {
    const data = await createCaseFormSubmissionData(values, caseData);
    console.log("Success values", values);
    console.log("Submitted Data:", data);
    let id = defaultValues.caseID;
    const url = id ? "/api/cases/update" : "/api/cases/insert";
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
    // Invalidate cached case data
    await fetch("/api/revalidate/tag?tag=case");

    return responseData;
  };

  return {
    setMenuOptions,
    getContactOptions,
    setContacts,
    clearMenuOptions,
    setAccountSelected,
    setIsLoading,
    isLoading,
    menuOptions,
    accountSelected,
    createCaseFormSubmissionData,
    submitCase,
  };
};

interface useCaseFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
  /**
   * Default values that will be used to populate the form.
   */
  defaultValues?: CaseFormData;
}
