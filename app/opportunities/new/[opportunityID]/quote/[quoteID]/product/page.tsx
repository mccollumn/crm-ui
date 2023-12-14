import { createOpportunityFormData } from "@/app/forms/opportunity/opportunityFormUtils";
import { QuoteProductForm } from "@/app/forms/quote/QuoteProductForm";
import { createQuoteFormData } from "@/app/forms/quote/quoteFormUtils";
import { createQuoteProductFormData } from "@/app/forms/quote/quoteProductFormUtils";
import {
  getMenuItems,
  getOpportunityData,
  getQuoteData,
} from "@/app/utils/getData";

const NewQuoteProduct = async ({
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
  const values = await createQuoteProductFormData({ quoteData });
  const quoteValues = await createQuoteFormData(opportunityData, quoteData);
  const opportunityValues = await createOpportunityFormData({
    opportunityData,
  });

  return (
    <QuoteProductForm
      formTitle="Add Product"
      defaultValues={values}
      quoteValues={quoteValues}
      opportunityValues={opportunityValues}
      menuItems={menuItems}
      quoteData={quoteData}
      opportunityData={opportunityData}
    />
  );
};

export default NewQuoteProduct;
