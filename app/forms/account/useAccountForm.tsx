import React from "react";
import { MenuItem } from "@/app/types/types";
import { isObjectEmpty } from "@/app/utils/utils";
import { useForm } from "../useForm";

export const useAccountForm = ({
  menuItems,
}: //   defaultValues,
useAccountFormProps) => {
  const initialMenuOptions = {
    Owner: [],
    // ParentAccount: [],
    // AccountRecordType: [],
    AccountType: [{ id: null, value: "Partner" }],
    // MigrateToNewOrg: [],
    // Territory: [],
    // Region: [],
    SuperRegion: [],
    // PartnerStatus: [],
    CollectionsContact: [],
    // AnnualServerCalls: [],
    // Industry: [],
    // Ownership: [],
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
    // const setAccounts = async () => {
    //   try {
    //     const results = await fetch("/api/accounts/active");
    //     const accounts = await results.json();
    //     if (isObjectEmpty(accounts)) return;
    //     const options = accounts.data.map((account: any) => {
    //       return {
    //         id: account.Accounts_AccountID,
    //         name: account.Accounts_Name,
    //         site: account.Accounts_Site,
    //       };
    //     });
    //     setCustomMenuOptions("ParentAccount", options);
    //   } catch {
    //     console.error("Could not retrieve list of accounts");
    //   }
    // };
    // setAccounts();

    // Account Owner
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
    // setMenuOptions("AccountRecordType");
    appendMenuOptions("AccountType");
    // setMenuOptions("MigrateToNewOrg");
    // setMenuOptions("Territory");
    // setMenuOptions("Region");
    setMenuOptions("SuperRegion");
    // setMenuOptions("PartnerStatus");
    // setMenuOptions("AnnualServerCalls");
    // setMenuOptions("Industry");
    // setMenuOptions("Ownership");
  }, [appendMenuOptions, setCustomMenuOptions, setMenuOptions]);

  return {
    setMenuOptions,
    menuOptions,
    FormatCurrency,
    FormatNumber,
  };
};

interface useAccountFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
  /**
   * Default values that will be used to populate the form.
   */
  //   defaultValues?: any;
}
