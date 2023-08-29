import { getMenuItems } from "@/app/utils/getData";

export const getCaseFormMenuItems = async () => {
  const menuItemsAll = await getMenuItems();

  // TODO: Finish menu items... names and keys may not be accurate.
  const menuItems: any = {
    accountName: {
      // TODO: request accounts list
      options: [],
      sectionKey: "CaseInformation",
      menuKey: "Accounts_Name",
    },
    contactName: {
      // TODO: request contacts list
      options: [],
      sectionKey: "CaseInformation",
      menuKey: "Contacts_FullName",
    },
    caseOrigin: {
      options: menuItemsAll.filter((item: any) => item.Menu_Name === "Origin"),
      sectionKey: "CaseInformation",
      menuKey: "Cases_Origin",
    },
    status: {
      options: menuItemsAll.filter((item: any) => item.Menu_Name === "Status"),
      sectionKey: "CaseInformation",
      menuKey: "Cases_Status",
    },
    subStatus: {
      options: menuItemsAll.filter(
        (item: any) => item.Menu_Name === "SubStatus"
      ),
      sectionKey: "CaseInformation",
      menuKey: "Cases_SubStatus",
    },
    caseOwner: {
      // TODO: How should this be populated?
      options: menuItemsAll.filter(
        (item: any) => item.Menu_Name === "Owner_Name"
      ),
      sectionKey: "CaseInformation",
      menuKey: "Owner_Name",
    },
    caseSubOwner: {
      // TODO: How should this be populated?
      options: menuItemsAll.filter(
        (item: any) => item.Menu_Name === "SubOwner"
      ),
      sectionKey: "CaseInformation",
      menuKey: "Cases_SubOwner",
    },
    productDeliveryMethod: {
      options: menuItemsAll.filter(
        (item: any) => item.Menu_Name === "ProductDeliveryMethod"
      ),
      sectionKey: "CaseProfile",
      menuKey: "Cases_ProductDeliveryMethod",
    },
    productName: {
      options: menuItemsAll.filter(
        (item: any) => item.Menu_Name === "ProductName"
      ),
      sectionKey: "CaseProfile",
      menuKey: "Cases_ProductName",
    },
    productVersion: {
      options: menuItemsAll.filter(
        (item: any) => item.Menu_Name === "ProductVersion"
      ),
      sectionKey: "CaseProfile",
      menuKey: "Cases_ProductVersion",
    },
    productSubVersion: {
      options: menuItemsAll.filter(
        (item: any) => item.Menu_Name === "ProductSubVersion"
      ),
      sectionKey: "CaseProfile",
      menuKey: "Cases_ProductSubVersion",
    },
    caseType: {
      options: menuItemsAll.filter(
        (item: any) => item.Menu_Name === "CaseType"
      ),
      sectionKey: "CaseProfile",
      menuKey: "Cases_CaseType",
    },
    reason: {
      options: menuItemsAll.filter((item: any) => item.Menu_Name === "Reason"),
      sectionKey: "CaseProfile",
      menuKey: "Cases_Reason",
    },
    category: {
      options: menuItemsAll.filter(
        (item: any) => item.Menu_Name === "Category"
      ),
      sectionKey: "CaseProfile",
      menuKey: "Cases_Category",
    },
    priority: {
      options: menuItemsAll.filter(
        (item: any) => item.Menu_Name === "Priority"
      ),
      sectionKey: "CaseProfile",
      menuKey: "Cases_Priority",
    },
    severity: {
      options: menuItemsAll.filter(
        (item: any) => item.Menu_Name === "Severity"
      ),
      sectionKey: "CaseProfile",
      menuKey: "Cases_Severity",
    },
  };

  return menuItems;
};
