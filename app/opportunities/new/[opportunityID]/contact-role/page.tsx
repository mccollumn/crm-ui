import { Title } from "@/app/components/Title";
import { ButtonNav } from "@/app/components/navigation/ButtonNav";
import { ContactRoleForm } from "@/app/forms/contactRole/ContactRoleForm";
import { createContactRoleFormData } from "@/app/forms/contactRole/contactRoleFormUtils";
import { getMenuItems, getOpportunityData } from "@/app/utils/getData";

const NewContactRole = async ({
  params,
}: {
  params: { opportunityID: string };
}) => {
  const opportunityID = params.opportunityID;
  const opportunityDataPromise = getOpportunityData(opportunityID);
  const menuItemsPromise = getMenuItems();
  const valuesPromise = createContactRoleFormData();
  const [opportunityData, menuItems, values] = await Promise.all([
    opportunityDataPromise,
    menuItemsPromise,
    valuesPromise,
  ]);

  return (
    <ContactRoleForm
      formTitle="New Contact Role"
      defaultValues={values}
      menuItems={menuItems}
      opportunityData={opportunityData}
    />
  );
};

export default NewContactRole;
