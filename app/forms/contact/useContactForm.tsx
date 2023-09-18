import React from "react";
import { MenuItem } from "@/app/types/types";
import { isObjectEmpty } from "@/app/utils/utils";
import { useForm } from "../useForm";

export const useContactForm = ({ menuItems }: useContactFormProps) => {
  const initialMenuOptions = {
    Owner: [],
    Account: [],
    Salutation: [],
    JobRole: [],
    ContactRole: [],
    Relationship: [],
    ContactStatus: [],
    // SuperRegion: [],
  };

  const { setMenuOptions, setCustomMenuOptions, menuOptions } = useForm({
    initialMenuOptions,
    menuItems,
  });

  React.useEffect(() => {
    // Active Accounts
    const setAccounts = async () => {
      try {
        const results = await fetch("/api/accounts/active");
        const accounts = await results.json();
        if (isObjectEmpty(accounts)) return;
        const options = accounts.data.map((account: any) => {
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

    // Contact Owner
    const setOwners = async () => {
      try {
        const results = await fetch("/api/users/internal");
        const owners = await results.json();
        if (isObjectEmpty(owners)) return;
        const options = owners.data.map((owner: any) => {
          return { id: owner.Users_ID, name: owner.Users_Name };
        });
        setCustomMenuOptions("Owner", options);
        setCustomMenuOptions("CollectionsContact", options);
      } catch {
        console.error("Could not retrieve list of users");
      }
    };
    setOwners();

    // Set menu options that are already known (i.e. aren't based on user input)
    setMenuOptions("Salutation");
    setMenuOptions("JobRole");
    setMenuOptions("ContactRole");
    setMenuOptions("Relationship");
    setMenuOptions("ContactStatus");
    // setMenuOptions("SuperRegion");
  }, [setCustomMenuOptions, setMenuOptions]);

  return {
    setMenuOptions,
    menuOptions,
  };
};

interface useContactFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
}
