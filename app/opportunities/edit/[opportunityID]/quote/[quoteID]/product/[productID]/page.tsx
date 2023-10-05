import { QuoteProductForm } from "@/app/forms/quote/QuoteProductForm";
import { createQuoteProductFormData } from "@/app/forms/quote/quoteProductFormUtils";
import { QuoteProduct } from "@/app/types/quotes";
import { getMenuItems, getQuoteData } from "@/app/utils/getData";

const EditQuoteProduct = async ({
  params,
}: {
  params: { opportunityID: string; quoteID: string; productID: string };
}) => {
  const opportunityID = params.opportunityID;
  const quoteID = params.quoteID;
  const productID = params.productID;

  const quoteDataPromise: Promise<any> = getQuoteData(quoteID);
  const menuItemsPromise = getMenuItems();
  const [quoteData, menuItems] = await Promise.all([
    quoteDataPromise,
    menuItemsPromise,
  ]);
  const productData = quoteData.QuoteProducts.find(
    (product: QuoteProduct) => product.QuoteProducts_ID === productID
  );
  const productName = productData.Product_Name;
  const values = await createQuoteProductFormData(quoteData, productData);

  return (
    <QuoteProductForm
      formTitle={`Edit Quote Product - ${productName}`}
      defaultValues={values}
      menuItems={menuItems}
      quoteData={quoteData}
    />
  );
};

export default EditQuoteProduct;
