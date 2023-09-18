import { ContactRoleForm } from "@/app/forms/contactRole/ContactRoleForm";
import { createContactRoleFormData } from "@/app/forms/contactRole/contactRoleFormUtils";
import { ContactRole } from "@/app/types/opportunities";
import { getMenuItems, getOpportunityData } from "@/app/utils/getData";

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
  const accountID = opportunityData.OpportunityDetail.Opportunities_AccountId;

  return (
    <ContactRoleForm
      formTitle="Edit Contact Role"
      defaultValues={values}
      menuItems={menuItems}
      accountID={accountID}
    />
  );
};

export default EditContactRole;
