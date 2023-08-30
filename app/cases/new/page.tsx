import { CaseForm } from "@/app/forms/case/CaseForm";
import { getCaseFormMenuItems } from "@/app/forms/case/CaseFormMenuItems";

const NewCase = async () => {
  const menuItems = await getCaseFormMenuItems();

  return <CaseForm formTitle="New Case" menuItems={menuItems} />;
};

export default NewCase;
