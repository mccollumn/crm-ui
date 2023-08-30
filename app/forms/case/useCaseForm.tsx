import React from "react";
import { CaseData } from "@/app/types/cases";

export const useCaseForm = ({ defaultValues, menuItems }: useCaseFormProps) => {
  const [accountSelected, setAccountSelected] = React.useState(
    defaultValues.CaseInformation.Contacts_FullName
  );
  const [contactNameOptions, setContactNameOptions] = React.useState([]);
  const [statusOptions, setStatusOptions] = React.useState(
    menuItems.status.options
  );
  const [subStatusOptions, setSubStatusOptions] = React.useState([]);
  const [productNameOptions, setProductNameOptions] = React.useState(
    menuItems.productName.options
  );
  const [productVersionOptions, setProductVersionOptions] = React.useState([]);
  const [productSubVersionOptions, setProductSubVersionOptions] =
    React.useState([]);
  const [caseTypeOptions, setCaseTypeOptions] = React.useState([]);
  const [reasonOptions, setReasonOptions] = React.useState([]);
  const [categoryOptions, setCategoryOptions] = React.useState([]);

  const getSubStatusOptions = (status: string) => {
    const options = menuItems.productSubStatus.options.filter(
      (item: any) => item.Menu_DependantValue === status
    );
    setSubStatusOptions(options);
  };

  const getProductVersionOptions = (productName: string) => {
    const options = menuItems.productVersion.options.filter(
      (item: any) => item.Menu_DependantValue === productName
    );
    setProductVersionOptions(options);
  };

  const getProductSubVersionOptions = (productVersion: string) => {
    const options = menuItems.productSubVersion.options.filter(
      (item: any) => item.Menu_DependantValue === productVersion
    );
    setProductSubVersionOptions(options);
  };

  const getCaseTypeOptions = (productName: string) => {
    const options = menuItems.caseType.options.filter(
      (item: any) => item.Menu_DependantValue === productName
    );
    setCaseTypeOptions(options);
  };

  const getReasonOptions = (caseType: string) => {
    const options = menuItems.reason.options.filter(
      (item: any) => item.Menu_DependantValue === caseType
    );
    setReasonOptions(options);
  };

  const getCategoryOptions = (reason: string) => {
    const options = menuItems.category.options.filter(
      (item: any) => item.Menu_DependantValue === reason
    );
    setCategoryOptions(options);
  };

  const getContactOptions = React.useCallback(async (accountID: string) => {
    const results = await fetch(`/api/contacts/${accountID}`);
    const options = await results.json();
    setContactNameOptions(options.data);
  }, []);

  const updateBooleans = (caseData: CaseData) => {
    if (typeof caseData.CaseProfile.Cases_IsTAMCase === "string") {
      caseData.CaseProfile.Cases_IsTAMCase = !!Number(
        caseData.CaseProfile.Cases_IsTAMCase
      );
    }
  };

  return {
    getSubStatusOptions,
    getProductVersionOptions,
    getProductSubVersionOptions,
    getCaseTypeOptions,
    getReasonOptions,
    getCategoryOptions,
    getContactOptions,
    setAccountSelected,
    updateBooleans,
    accountSelected,
    contactNameOptions,
    statusOptions,
    subStatusOptions,
    productNameOptions,
    productVersionOptions,
    productSubVersionOptions,
    caseTypeOptions,
    reasonOptions,
    categoryOptions,
  };
};

interface useCaseFormProps {
  defaultValues?: any;
  menuItems: { [key: string]: any };
}
