import { CaseForm } from "@/app/forms/CaseForm";
import { getCaseData } from "@/app/utils/getData";
import { getCaseFormMenuItems } from "@/app/forms/CaseFormMenuItems";
import { updateMenuValues } from "@/app/utils/forms";

const EditCase = async ({ params }: { params: { caseID: string } }) => {
  const caseID = params.caseID;
  const caseDataPromise = getCaseData(caseID);
  const menuItemsPromise = getCaseFormMenuItems();
  const [caseData, menuItems] = await Promise.all([
    caseDataPromise,
    menuItemsPromise,
  ]);

  updateMenuValues(menuItems, caseData);

  return (
    <CaseForm
      formTitle="Edit Case"
      defaultValues={caseData}
      menuItems={menuItems}
    />
  );
};

export default EditCase;
