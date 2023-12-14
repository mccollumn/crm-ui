import { CaseForm } from "@/app/forms/case/CaseForm";
import { createCaseFormData } from "@/app/forms/case/caseFormUtils";
import { getContactData, getMenuItems } from "@/app/utils/getData";

const NewCase = async ({
  searchParams,
}: {
  searchParams: { contactID: string };
}) => {
  const contactID = searchParams.contactID;
  const contactData = contactID ? await getContactData(contactID) : null;
  const menuItems = await getMenuItems();
  const values = await createCaseFormData({ contactData });

  return (
    <CaseForm
      formTitle="New Case"
      defaultValues={values}
      menuItems={menuItems}
    />
  );
};

export default NewCase;
