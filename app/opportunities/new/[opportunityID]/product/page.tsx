import { Title } from "@/app/components/Title";
import { ButtonNav } from "@/app/components/navigation/ButtonNav";
import { ProductForm } from "@/app/forms/product/ProductForm";
import { createProductFormData } from "@/app/forms/product/productFormUtils";
import { getMenuItems, getOpportunityData } from "@/app/utils/getData";

const NewProduct = async ({
  params,
}: {
  params: { opportunityID: string };
}) => {
  const opportunityID = params.opportunityID;
  const opportunityDataPromise = getOpportunityData(opportunityID);
  const menuItemsPromise = getMenuItems();
  const valuesPromise = createProductFormData();
  const [opportunityData, menuItems, values] = await Promise.all([
    opportunityDataPromise,
    menuItemsPromise,
    valuesPromise,
  ]);

  return (
    <ProductForm
      formTitle="Add Product"
      defaultValues={values}
      menuItems={menuItems}
      opportunityData={opportunityData}
    />
  );
};

export default NewProduct;
