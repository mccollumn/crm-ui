import { createOpportunityFormData } from "@/app/forms/opportunity/opportunityFormUtils";
import { QuoteForm } from "@/app/forms/quote/QuoteForm";
import { createQuoteFormData } from "@/app/forms/quote/quoteFormUtils";
import { getMenuItems, getOpportunityData } from "@/app/utils/getData";

const NewQuote = async ({ params }: { params: { opportunityID: string } }) => {
  const opportunityID = params.opportunityID;
  const menuItemsPromise = getMenuItems();
  const opportunityDataPromise = getOpportunityData(opportunityID);
  const [menuItems, opportunityData] = await Promise.all([
    menuItemsPromise,
    opportunityDataPromise,
  ]);
  const values = await createQuoteFormData(opportunityData);
  const opportunityValues = await createOpportunityFormData({
    opportunityData,
  });

  return (
    <QuoteForm
      formTitle="New Quote"
      defaultValues={values}
      opportunityValues={opportunityValues}
      menuItems={menuItems}
      opportunityData={opportunityData}
    />
  );
};

export default NewQuote;
