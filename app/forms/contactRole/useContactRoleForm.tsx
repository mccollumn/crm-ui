import React from "react";
import { MenuItem } from "@/app/types/types";
import {
  convertBooleanToString,
  getChangedValues,
  isObjectEmpty,
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
  const initialMenuOptions = {
    Contact: [],
    Role: [],
  };

  const {
    setMenuOptions,
    setCustomMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
  } = useForm({
    initialMenuOptions,
    menuItems,
  });

  React.useEffect(() => {
    // Account Contacts
    const setContacts = async () => {
      try {
        const results = await fetch(`/api/contacts/${accountID}`);
        const contacts = await results.json();
        if (isObjectEmpty(contacts)) return;
        const options = contacts.data.map((contact: any) => {
          return {
            id: contact.Contacts_ID,
            name: contact.Contacts_Name,
          };
        });
        setCustomMenuOptions("Contact", options);
      } catch {
        console.error("Could not retrieve list of contacts");
      }
    };
    setContacts();

    // Set menu options that are already known (i.e. aren't based on user input)
    setMenuOptions("Role");
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
      OpportunityContactRoles_Role: values.role,
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
    return newFormData;
  };

  return {
    setMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
    createContactRoleFormSubmissionData,
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
