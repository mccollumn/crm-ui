import { QuoteForm } from "@/app/forms/quote/QuoteForm";
import { createQuoteFormData } from "@/app/forms/quote/quoteFormUtils";
import { getMenuItems } from "@/app/utils/getData";

const NewQuote = async ({ params }: { params: { opportunityID: string } }) => {
  const opportunityID = params.opportunityID;
  const menuItemsPromise = getMenuItems();
  const valuesPromise = createQuoteFormData();
  const [menuItems, values] = await Promise.all([
    menuItemsPromise,
    valuesPromise,
  ]);

  return (
    <QuoteForm
      formTitle="New Quote"
      defaultValues={values}
      menuItems={menuItems}
      opportunityID={opportunityID}
    />
  );
};

export default NewQuote;
