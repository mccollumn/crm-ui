import { ContactRoleForm } from "@/app/forms/contactRole/ContactRoleForm";
import { ProductForm } from "@/app/forms/product/ProductForm";
import { createProductFormData } from "@/app/forms/product/productFormUtils";
import { Product } from "@/app/types/opportunities";
import { getMenuItems, getOpportunityData } from "@/app/utils/getData";

const EditProduct = async ({
  params,
}: {
  params: { opportunityID: string; productID: string };
}) => {
  const opportunityID = params.opportunityID;
  const productID = params.productID;

  const opportunityDataPromise: Promise<any> =
    getOpportunityData(opportunityID);
  const menuItemsPromise = getMenuItems();
  const [opportunityData, menuItems] = await Promise.all([
    opportunityDataPromise,
    menuItemsPromise,
  ]);
  const productData = opportunityData.OpportunityProducts.find(
    (product: Product) => product.OpportunityLineItems_ID === productID
  );
  const values = await createProductFormData(productData);
  const productName = productData.Product_Name;

  return (
    <ProductForm
      formTitle={`Edit Product - ${productName}`}
      defaultValues={values}
      menuItems={menuItems}
      opportunityData={opportunityData}
    />
  );
};

export default EditProduct;
