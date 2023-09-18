import { QuoteForm } from "@/app/forms/quote/QuoteForm";
import { createQuoteFormData } from "@/app/forms/quote/quoteFormUtils";
import { getMenuItems, getQuoteData } from "@/app/utils/getData";

const EditQuote = async ({
  params,
}: {
  params: { opportunityID: string; quoteID: string };
}) => {
  const opportunityID = params.opportunityID;
  const quoteID = params.quoteID;
  const quoteDataPromise = getQuoteData(quoteID);
  const menuItemsPromise = getMenuItems();
  const [quoteData, menuItems] = await Promise.all([
    quoteDataPromise,
    menuItemsPromise,
  ]);
  const values = await createQuoteFormData(quoteData);

  return (
    <QuoteForm
      formTitle="Edit Quote"
      defaultValues={values}
      menuItems={menuItems}
      opportunityID={opportunityID}
    />
  );
};

export default EditQuote;
