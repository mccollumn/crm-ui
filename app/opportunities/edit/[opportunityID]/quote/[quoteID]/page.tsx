import { createOpportunityFormData } from "@/app/forms/opportunity/opportunityFormUtils";
import { QuoteForm } from "@/app/forms/quote/QuoteForm";
import { createQuoteFormData } from "@/app/forms/quote/quoteFormUtils";
import {
  getMenuItems,
  getOpportunityData,
  getQuoteData,
} from "@/app/utils/getData";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const EditQuote = async ({
  params,
}: {
  params: { opportunityID: string; quoteID: string };
}) => {
  const opportunityID = params.opportunityID;
  const quoteID = params.quoteID;
  const quoteDataPromise = getQuoteData(quoteID);
  const opportunityDataPromise = getOpportunityData(opportunityID);
  const menuItemsPromise = getMenuItems();
  const [quoteData, opportunityData, menuItems] = await Promise.all([
    quoteDataPromise,
    opportunityDataPromise,
    menuItemsPromise,
  ]);
  const quoteName = quoteData?.QuoteDetail.Quotes_Name;
  const values = await createQuoteFormData(opportunityData, quoteData);
  const opportunityValues = await createOpportunityFormData({
    opportunityData,
  });

  return (
    <QuoteForm
      formTitle={`Edit Quote - ${quoteName}`}
      defaultValues={values}
      opportunityValues={opportunityValues}
      menuItems={menuItems}
      quoteData={quoteData}
      opportunityData={opportunityData}
    />
  );
};

export default EditQuote;
