import React from "react";
import { MenuItem } from "@/app/types/types";
import { isObjectEmpty } from "@/app/utils/utils";
import { useForm } from "../useForm";

// TODO: Update all the menu names. I just guessed what they will be.

export const useCaseForm = ({ menuItems, defaultValues }: useCaseFormProps) => {
  const initialMenuOptions = {
    Account: [],
    Contact: [],
    CaseOrigin: [],
    Status: [],
    SubStatus: [],
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

  const { setMenuOptions, setCustomMenuOptions, menuOptions } = useForm({
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
            description: account.AccountType_Description,
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
    setMenuOptions("ProductName");
    setMenuOptions("ProductDeliveryMethod");
    setMenuOptions("Status");
    setMenuOptions("SubStatus");
    setMenuOptions("CaseOrigin");
    setMenuOptions("Priority");
    setMenuOptions("Severity");
  }, [defaultValues.owner.name, setCustomMenuOptions, setMenuOptions]);

  return {
    setMenuOptions,
    getContactOptions,
    setAccountSelected,
    menuOptions,
    accountSelected,
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
  defaultValues?: any;
}
