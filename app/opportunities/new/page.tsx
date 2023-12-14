import { OpportunityForm } from "@/app/forms/opportunity/OpportunityForm";
import { createOpportunityFormData } from "@/app/forms/opportunity/opportunityFormUtils";
import { getAccountData, getMenuItems } from "@/app/utils/getData";

const NewOpportunity = async ({
  searchParams,
}: {
  searchParams: { accountID: string };
}) => {
  const accountID = searchParams.accountID;
  const accountData = accountID ? await getAccountData(accountID) : null;
  const menuItems = await getMenuItems();
  const values = await createOpportunityFormData({ accountData });

  return (
    <OpportunityForm
      formTitle="New Opportunity"
      defaultValues={values}
      menuItems={menuItems}
    />
  );
};

export default NewOpportunity;
