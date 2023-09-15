import React from "react";
import { MenuItem } from "@/app/types/types";
import { isObjectEmpty } from "@/app/utils/utils";
import { useForm } from "../useForm";

export const useQuoteForm = ({ menuItems }: useQuoteFormProps) => {
  const initialMenuOptions = {
    Owner: [],
    Opportunity: [],
    Status: [],
    OfficeLocation: [],
    Currency: [],
    AuditStatus: [],
    PaymentMethod: [],
    BillingFrequency: [],
    PaymentTerms: [],
    TermsAudit: [],
    DiscountReason: [],
  };

  const { setMenuOptions, setCustomMenuOptions, menuOptions } = useForm({
    initialMenuOptions,
    menuItems,
  });

  React.useEffect(() => {
    // Quote Owner
    const setOwners = async () => {
      try {
        const results = await fetch("/api/users/internal");
        const owners = await results.json();
        if (isObjectEmpty(owners)) return;
        const options = owners.data.map((owner: any) => {
          return { id: owner.Users_ID, name: owner.Users_Name };
        });
        setCustomMenuOptions("Owner", options);
      } catch {
        console.error("Could not retrieve list of users");
      }
    };
    setOwners();

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
    setMenuOptions("Status");
    setMenuOptions("OfficeLocation");
    setMenuOptions("Currency");
    setMenuOptions("AuditStatus");
    setMenuOptions("PaymentMethod");
    setMenuOptions("BillingFrequency");
    setMenuOptions("PaymentTerms");
    setMenuOptions("TermsAudit");
    setMenuOptions("DiscountReason");
  }, [setCustomMenuOptions, setMenuOptions]);

  return {
    setMenuOptions,
    menuOptions,
  };
};

interface useQuoteFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
}
