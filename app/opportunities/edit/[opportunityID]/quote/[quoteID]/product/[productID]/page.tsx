import { createOpportunityFormData } from "@/app/forms/opportunity/opportunityFormUtils";
import { QuoteProductForm } from "@/app/forms/quote/QuoteProductForm";
import { createQuoteFormData } from "@/app/forms/quote/quoteFormUtils";
import { createQuoteProductFormData } from "@/app/forms/quote/quoteProductFormUtils";
import {
  getMenuItems,
  getOpportunityData,
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
  const opportunityDataPromise = getOpportunityData(opportunityID);
  const menuItemsPromise = getMenuItems();
  const [quoteData, productData, opportunityData, menuItems] =
    await Promise.all([
      quoteDataPromise,
      quoteProductDataPromise,
      opportunityDataPromise,
      menuItemsPromise,
    ]);
  const productName = productData.QuoteProductDetail.Product2_Name;
  const values = await createQuoteProductFormData({ productData });
  const quoteValues = await createQuoteFormData(opportunityData, quoteData);
  const opportunityValues = await createOpportunityFormData({
    opportunityData,
  });

  return (
    <QuoteProductForm
      formTitle={`Edit Quote Product - ${productName}`}
      defaultValues={values}
      quoteValues={quoteValues}
      opportunityValues={opportunityValues}
      menuItems={menuItems}
      quoteData={quoteData}
      opportunityData={opportunityData}
      quoteProductData={productData}
    />
  );
};

export default EditQuoteProduct;
