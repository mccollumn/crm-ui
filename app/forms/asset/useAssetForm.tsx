import React from "react";
import { MenuItem } from "@/app/types/types";
import { isObjectEmpty } from "@/app/utils/utils";
import { useForm } from "../useForm";

export const useAssetForm = ({ menuItems }: useAssetFormProps) => {
  const initialMenuOptions = {
    Product: [],
    Account: [],
    Opportunity: [],
    Status: [],
    SupportPlanType: [],
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
          };
        });
        setCustomMenuOptions("Account", options);
      } catch {
        console.error("Could not retrieve list of accounts");
      }
    };
    setAccounts();

    // Open Opportunities
    const setOpportunities = async () => {
      try {
        const results = await fetch("/api/opportunities/open");
        const opportunities = await results.json();
        if (isObjectEmpty(opportunities)) return;
        const options = opportunities.data.map((opportunity: any) => {
          return {
            id: opportunity.Opportunities_ID,
            name: opportunity.Opportunities_Name,
          };
        });
        setCustomMenuOptions("Opportunity", options);
      } catch {
        console.error("Could not retrieve list of opportunities");
      }
    };
    setOpportunities();

    // Set menu options that are already known (i.e. aren't based on user input)
    setMenuOptions("Product");
    setMenuOptions("Status");
    setMenuOptions("SupportPlanType");
  }, [setCustomMenuOptions, setMenuOptions]);

  return {
    setMenuOptions,
    menuOptions,
    FormatCurrency,
    FormatNumber,
  };
};

interface useAssetFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
}
