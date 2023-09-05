import { CaseForm } from "@/app/forms/case/CaseForm";
import { createCaseFormData } from "@/app/utils/forms";
import { getMenuItems } from "@/app/utils/getData";

const NewCase = async () => {
  const menuItems = await getMenuItems();
  const values = await createCaseFormData();

  return (
    <CaseForm
      formTitle="New Case"
      defaultValues={values}
      menuItems={menuItems}
    />
  );
};

export default NewCase;
