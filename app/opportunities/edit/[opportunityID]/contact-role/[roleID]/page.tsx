import { ContactRoleForm } from "@/app/forms/contactRole/ContactRoleForm";
import { createContactRoleFormData } from "@/app/forms/contactRole/contactRoleFormUtils";
import { ContactRole } from "@/app/types/opportunities";
import { getMenuItems, getOpportunityData } from "@/app/utils/getData";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const EditContactRole = async ({
  params,
}: {
  params: { opportunityID: string; roleID: string };
}) => {
  const opportunityID = params.opportunityID;
  const roleID = params.roleID;

  const opportunityDataPromise: Promise<any> =
    getOpportunityData(opportunityID);
  const menuItemsPromise = getMenuItems();
  const [opportunityData, menuItems] = await Promise.all([
    opportunityDataPromise,
    menuItemsPromise,
  ]);
  const contactRoleData = opportunityData.OpportunityQuoteContactRoles.find(
    (contactRole: ContactRole) =>
      contactRole.OpportunityContactRoles_ID === roleID
  );
  const values = await createContactRoleFormData(contactRoleData);
  const contactName = contactRoleData.Contacts_Name;

  return (
    <ContactRoleForm
      formTitle={`Edit Contact Role - ${contactName}`}
      defaultValues={values}
      menuItems={menuItems}
      opportunityData={opportunityData}
      contactRoleData={contactRoleData}
    />
  );
};

export default EditContactRole;
