import React from "react";
import { MenuItem } from "@/app/types/types";
import { isObjectEmpty } from "@/app/utils/utils";
import { useForm } from "../useForm";

export const useLicenseKeyForm = ({ menuItems }: useLicenseKeyFormProps) => {
  const initialMenuOptions = {
    Account: [],
    Type: [],
    Status: [],
    SystemStatus: [],
    CreatedBy: [],
  };

  const {
    setMenuOptions,
    setCustomMenuOptions,
    appendMenuOptions,
    menuOptions,
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

    // Created By
    const setUsers = async () => {
      try {
        const results = await fetch("/api/users/internal");
        const users = await results.json();
        if (isObjectEmpty(users)) return;
        const options = users.data.map((owner: any) => {
          return { id: owner.Users_ID, name: owner.Users_Name };
        });
        setCustomMenuOptions("CreatedBy", options);
      } catch {
        console.error("Could not retrieve list of users");
      }
    };
    setUsers();

    // Set menu options that are already known (i.e. aren't based on user input)
    setMenuOptions("Type");
    setMenuOptions("Status");
    setMenuOptions("SystemStatus");
  }, [setCustomMenuOptions, setMenuOptions]);

  return {
    setMenuOptions,
    menuOptions,
    FormatCurrency,
    FormatNumber,
  };
};

interface useLicenseKeyFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
}
