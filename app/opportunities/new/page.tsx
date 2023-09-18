import { OpportunityForm } from "@/app/forms/opportunity/OpportunityForm";
import { createOpportunityFormData } from "@/app/forms/opportunity/opportunityFormUtils";
import { getMenuItems } from "@/app/utils/getData";

const NewOpportunity = async () => {
  const menuItems = await getMenuItems();
  const values = await createOpportunityFormData();

  return (
    <OpportunityForm
      formTitle="New Opportunity"
      defaultValues={values}
      menuItems={menuItems}
    />
  );
};

export default NewOpportunity;
