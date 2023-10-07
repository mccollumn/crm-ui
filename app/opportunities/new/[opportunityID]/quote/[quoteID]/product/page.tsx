import { QuoteProductForm } from "@/app/forms/quote/QuoteProductForm";
import { createQuoteProductFormData } from "@/app/forms/quote/quoteProductFormUtils";
import { getMenuItems, getQuoteData } from "@/app/utils/getData";

const NewProduct = async ({
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
  const values = await createQuoteProductFormData({ quoteData });

  return (
    <QuoteProductForm
      formTitle="Add Product"
      defaultValues={values}
      menuItems={menuItems}
      quoteData={quoteData}
    />
  );
};

export default NewProduct;
