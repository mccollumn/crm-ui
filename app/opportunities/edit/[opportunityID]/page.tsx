import { OpportunityForm } from "@/app/forms/opportunity/OpportunityForm";
import { createOpportunityFormData } from "@/app/forms/opportunity/opportunityFormUtils";
import { getMenuItems, getOpportunityData } from "@/app/utils/getData";
import { unEscape } from "@/app/utils/utils";

const EditOpportunity = async ({
  params,
}: {
  params: { opportunityID: string };
}) => {
  const opportunityID = params.opportunityID;
  const opportunityDataPromise = getOpportunityData(opportunityID);
  const menuItemsPromise = getMenuItems();
  const [opportunityData, menuItems] = await Promise.all([
    opportunityDataPromise,
    menuItemsPromise,
  ]);
  const opportunityName = unEscape(
    opportunityData.OpportunityDetail.Opportunities_Name
  );
  const values = await createOpportunityFormData(opportunityData);

  return (
    <OpportunityForm
      formTitle={`Edit Opportunity - ${opportunityName}`}
      defaultValues={values}
      menuItems={menuItems}
    />
  );
};

export default EditOpportunity;
