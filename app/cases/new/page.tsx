import { CaseForm } from "@/app/forms/CaseForm";
import { getCaseFormMenuItems } from "@/app/forms/CaseFormMenuItems";

const NewCase = async () => {
  const menuItems = await getCaseFormMenuItems();

  return <CaseForm formTitle="New Case" menuItems={menuItems} />;
};

export default NewCase;
