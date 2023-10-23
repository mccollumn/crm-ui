import { QuoteProductForm } from "@/app/forms/quote/QuoteProductForm";
import { createQuoteProductFormData } from "@/app/forms/quote/quoteProductFormUtils";
import { QuoteProduct } from "@/app/types/quotes";
import {
  getMenuItems,
  getQuoteData,
  getQuoteProductData,
} from "@/app/utils/getData";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const EditQuoteProduct = async ({
  params,
}: {
  params: { opportunityID: string; quoteID: string; productID: string };
}) => {
  const opportunityID = params.opportunityID;
  const quoteID = params.quoteID;
  const productID = params.productID;
  const quoteDataPromise: Promise<any> = getQuoteData(quoteID);
  const quoteProductDataPromise = getQuoteProductData(productID);
  const menuItemsPromise = getMenuItems();
  const [quoteData, productData, menuItems] = await Promise.all([
    quoteDataPromise,
    quoteProductDataPromise,
    menuItemsPromise,
  ]);
  const productName = productData.QuoteProductDetail.Product2_Name;
  const values = await createQuoteProductFormData({ productData });

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
