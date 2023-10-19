import React from "react";
import { MenuItem } from "@/app/types/types";
import {
  convertBooleanToString,
  convertDateToISOString,
  getChangedValues,
  isObjectEmpty,
  removeNullsFromObject,
} from "@/app/utils/utils";
import { useForm } from "../useForm";
import { CaseCommentFormData, CaseData, CaseFormData } from "@/app/types/cases";

export const useCaseForm = ({ menuItems, defaultValues }: useCaseFormProps) => {
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
      const results = await fetch(`/api/contacts/${accountID}`);
      const contacts = await results.json();
      if (isObjectEmpty(contacts)) return;
      const options = contacts.data.map((contact: any) => {
        return {
          id: contact.Contacts_ID,
          name: contact.Contacts_Name,
          email: contact.Contacts_Email,
        };
      });
      setCustomMenuOptions("Contact", options);
    },
    [setCustomMenuOptions]
  );

  React.useEffect(() => {
    // Accounts
    const setAccounts = async () => {
      try {
        const results = await fetch("/api/accounts");
        const accounts = await results.json();
        if (isObjectEmpty(accounts)) return;
        const options = accounts.data.map((account: any) => {
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
        const results = await fetch("/api/users/internal");
        const owners = await results.json();
        if (isObjectEmpty(owners)) return;
        const options = owners.data.map((owner: any) => {
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
    setMenuOptions("Sub-Status", "Open");
    setMenuOptions("CaseOrigin");
    setMenuOptions("Priority");
    setMenuOptions("Severity");
    setMenuOptions("ProductVersion", defaultValues?.product.name || "");
    setMenuOptions("CaseType", defaultValues?.type || "");
    setMenuOptions("Reason", defaultValues?.reason || "");
    setMenuOptions("Category", defaultValues?.category || "");
  }, [
    defaultValues?.category,
    defaultValues?.owner.name,
    defaultValues?.product.name,
    defaultValues?.reason,
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
    };
    let newFormData: any = removeNullsFromObject(data);

    // We only want to submit form values that were modified
    newFormData = getChangedValues(newFormData, caseData);

    // Add the case ID back in
    if (caseData) {
      newFormData = {
        ...newFormData,
        CaseInformation: {
          ...newFormData.CaseInformation,
          Cases_ID: caseData.CaseInformation.Cases_ID,
        },
      };
    }
    return newFormData;
  };

  const createCaseCommentFormSubmissionData = (
    values: CaseCommentFormData,
    caseData?: CaseData
  ) => {
    const data = {
      CaseComments_ID: values.caseID,
      CaseComments_CommentBody: values.comment,
      CaseComments_IsPublic: convertBooleanToString(values.isPublic),
    };
    let newFormData: any = removeNullsFromObject(data);

    // We only want to submit form values that were modified
    newFormData = getChangedValues(newFormData, caseData);

    // Add the case ID back in
    if (caseData) {
      newFormData = {
        ...newFormData,
        CaseInformation: {
          ...newFormData.CaseInformation,
          Cases_ID: caseData.CaseInformation.Cases_ID,
        },
        SubmissionDetails: {
          ...newFormData.SubmissionDetails,
          UserID: user?.id || null,
          AccountID: caseData.CaseInformation.Cases_AccountID || null,
          CaseID: caseData.CaseInformation.Cases_ID || null,
        },
      };
    }
    return newFormData;
  };

  return {
    setMenuOptions,
    getContactOptions,
    setAccountSelected,
    setIsLoading,
    isLoading,
    menuOptions,
    accountSelected,
    createCaseFormSubmissionData,
    createCaseCommentFormSubmissionData,
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
