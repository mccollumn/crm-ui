import React from "react";
import { MenuItem } from "@/app/types/types";
import { isObjectEmpty } from "@/app/utils/utils";
import { useForm } from "../useForm";

export const useContactRoleForm = ({
  menuItems,
  accountID,
}: useContactRoleFormProps) => {
  const initialMenuOptions = {
    Contact: [],
    Role: [],
  };

  const { setMenuOptions, setCustomMenuOptions, menuOptions } = useForm({
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

  return {
    setMenuOptions,
    menuOptions,
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
