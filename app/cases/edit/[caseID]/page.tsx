import { CaseForm } from "@/app/forms/case/CaseForm";
import { getCaseData, getMenuItems } from "@/app/utils/getData";
import { createCaseFormData } from "@/app/forms/case/caseFormUtils";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const EditCase = async ({ params }: { params: { caseID: string } }) => {
  const caseID = params.caseID;
  const caseDataPromise = getCaseData(caseID);
  const menuItemsPromise = getMenuItems();
  const [caseData, menuItems] = await Promise.all([
    caseDataPromise,
    menuItemsPromise,
  ]);
  const caseNumber = caseData?.CaseInformation?.Cases_CaseNumber;
  const values = await createCaseFormData(caseData);

  return (
    <CaseForm
      formTitle={`Edit Case - ${caseNumber}`}
      defaultValues={values}
      menuItems={menuItems}
      caseData={caseData}
    />
  );
};

export default EditCase;
