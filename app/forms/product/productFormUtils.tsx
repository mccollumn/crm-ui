import { Product } from "@/app/types/opportunities";

/**
 * Generates an object containing the default values for a new/empty product form.
 * @returns Initial product form data.
 */
const generateInitialProductFormData = async () => {
  const initialProductFormData = {
    id: null,
    product: {
      id: null,
      name: null,
      code: null,
      unitPrice: null,
    },
    quantity: null,
    discount: null,
    totalPrice: null,
  };

  return initialProductFormData;
};

/**
 * Returns a product data object to be passed to the product form.
 * @param productData Data from an existing product. (optional)
 * @returns Product data object.
 */
export const createProductFormData = async (productData?: Product) => {
  const initialProductFormData = await generateInitialProductFormData();

  if (!productData) {
    return initialProductFormData;
  }

  return {
    ...initialProductFormData,
    id: productData.OpportunityLineItems_ID,
    product: {
      id: productData.OpportunityLineItems_Product2ID,
      name: productData.Product_Name,
      code: productData.OpportunityLineItems_ProductCode,
      unitPrice: productData.OpportunityLineItems_UnitPrice,
    },
    quantity: productData.OpportunityLineItems_Quantity,
    discount: productData.OpportunityLineItems_Discount,
    totalPrice: productData.OpportunityLineItems_TotalPrice,
  };
};
