import { CaseForm } from "@/app/forms/CaseForm";
import { getCaseData, getMenuItems } from "@/app/utils/getData";

const EditCase = async ({ params }: { params: { caseID: string } }) => {
  const caseID = params.caseID;
  const caseData = await getCaseData(caseID);
  const menuItemsAll = await getMenuItems();

  // TODO: Finish menu items
  const menuItems: any = {
    productNames: {
      options: menuItemsAll.filter(
        (item: any) => item.Menu_Name === "ProductName"
      ),
      caseDataSectionKey: "CaseProfile",
      caseDataMenuKey: "Cases_ProductName",
    },
    productVersions: {
      options: menuItemsAll.filter(
        (item: any) => item.Menu_Name === "ProductVersion"
      ),
      caseDataSectionKey: "CaseProfile",
      caseDataMenuKey: "Cases_ProductVersion",
    },
  };

  updateMenuValues(menuItems, caseData);

  return (
    <CaseForm
      formTitle="Edit Case"
      defaultValues={caseData}
      menuItems={menuItems}
    />
  );
};

/**
 * Replaces menu value strings in the case data with the corresponding menu item object.
 */
const updateMenuValues = (menuItems: any, caseData: any) => {
  Object.keys(menuItems).forEach((menuName: string) => {
    const section = menuItems[menuName].caseDataSectionKey;
    const menu = menuItems[menuName].caseDataMenuKey;

    if (!caseData[section][menu]) return;
    const menuValue = menuItems[menuName].options.find(
      (item: any) => item.Menu_Value === caseData[section][menu]
    );

    if (menuValue) {
      caseData[section][menu] = menuValue;
      return;
    }
    caseData[section][menu] = {
      Menu_Name: menuName,
      Menu_Display: caseData[section][menu],
    };
  });
};

export default EditCase;
