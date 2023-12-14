import React from "react";
import { useRouter } from "next/navigation";
import { MenuItem } from "@/app/types/types";
import {
  convertBooleanToString,
  getChangedValues,
  isSuccessfulResponse,
  removeNullsFromObject,
} from "@/app/utils/utils";
import { useForm } from "../useForm";
import {
  ContactRoleFormData,
  OpportunityData,
} from "@/app/types/opportunities";

export const useContactRoleForm = ({
  menuItems,
  accountID,
}: useContactRoleFormProps) => {
  const router = useRouter();
  const initialMenuOptions = {
    Contact: [],
    ContactRole: [],
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

  React.useEffect(() => {
    // Account Contacts
    const setContacts = async () => {
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
            accountName: contact.Accounts_Name,
          };
        });
        setCustomMenuOptions("Contact", options);
      } catch {
        console.error("Could not retrieve list of contacts");
      }
    };
    setContacts();

    // Set menu options that are already known (i.e. aren't based on user input)
    setMenuOptions("ContactRole");
  }, [accountID, setCustomMenuOptions, setMenuOptions]);

  const createContactRoleFormSubmissionData = (
    values: ContactRoleFormData,
    opportunityData?: OpportunityData
  ) => {
    const data = {
      OpportunityContactRoles_ID: values.id,
      OpportunityContactRoles_ContactId: values.contact.id,
      Contacts_Name: values.contact.name,
      // "Contacts_Email": "carol.tacconi@nsmtp.kp.org",
      // "Contacts_Phone": "(925) 924-7541",
      OpportunityContactRoles_IsPrimary: convertBooleanToString(
        values.contact.isPrimary
      ),
      OpportunityContactRoles_Role: values.role.name,
    };
    let newFormData: any = removeNullsFromObject(data);

    // We only want to submit form values that were modified
    const contactRoleData = opportunityData?.OpportunityQuoteContactRoles.find(
      (role) => role.OpportunityContactRoles_ID === values.id
    );
    newFormData = getChangedValues(newFormData, contactRoleData);

    // Add the quote and opportunity IDs back in
    if (contactRoleData) {
      newFormData = {
        ...newFormData,
        OpportunityContactRoles_ID: contactRoleData.OpportunityContactRoles_ID,
      };
    }

    const newOpportunityData = {
      OpportunityDetail: {
        Opportunities_ID: opportunityData?.OpportunityDetail.Opportunities_ID,
        Opportunities_AccountId:
          opportunityData?.OpportunityDetail.Opportunities_AccountId,
      },
      OpportunityQuoteContactRoles: [newFormData],
      SubmissionDetails: {
        ...newFormData.SubmissionDetails,
        UserID: user?.id || null,
        AccountID:
          opportunityData?.OpportunityDetail.Opportunities_AccountId || null,
        OpportunityID:
          opportunityData?.OpportunityDetail.Opportunities_ID || null,
        ContactID: values.contact.id || null,
        ContactRoleID: values.id || null,
      },
    };

    return newOpportunityData;
  };

  const submitContactRole = async (
    values: ContactRoleFormData,
    opportunityData?: OpportunityData
  ) => {
    const data = await createContactRoleFormSubmissionData(
      values,
      opportunityData
    );
    console.log("Success values", values);
    console.log("Submitted Data:", data);
    const url = "/api/opportunities/update";
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
    await fetch("/api/revalidate/tag?tag=opportunity");

    return responseData;
  };

  return {
    setMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
    createContactRoleFormSubmissionData,
    submitContactRole,
  };
};

interface useContactRoleFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
  /**
   * Account from which contacts will be retreived.
   */
  accountID: string;
}
