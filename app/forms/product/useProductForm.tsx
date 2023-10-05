import React from "react";
import { MenuItem } from "@/app/types/types";
import { getChangedValues, removeNullsFromObject } from "@/app/utils/utils";
import { useForm } from "../useForm";
import {
  OpportunityData,
  Product,
  ProductFormData,
} from "@/app/types/opportunities";

export const useProductForm = ({ menuItems }: useProductFormProps) => {
  const initialMenuOptions = {
    Product: [],
  };

  const {
    setMenuOptions,
    setCustomMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
    FormatPercent,
    FormatNumber,
    FormatCurrency,
  } = useForm({
    initialMenuOptions,
    menuItems,
  });
  const [productSelected, setProductSelected] = React.useState<Product>();

  React.useEffect(() => {
    // Set menu options that are already known (i.e. aren't based on user input)
    setMenuOptions("Product");
  }, [setMenuOptions]);

  const createProductFormSubmissionData = (
    values: ProductFormData,
    opportunityData?: OpportunityData
  ) => {
    const data = {
      OpportunityLineItems_ID: values.id,
      OpportunityLineItems_Product2ID: values.product.id,
      Product_Name: values.product.name,
      OpportunityLineItems_ProductCode: values.product.code,
      OpportunityLineItems_Quantity: values.quantity,
      OpportunityLineItems_Discount: values.discount,
      OpportunityLineItems_TotalPrice: values.totalPrice,
      OpportunityLineItems_UnitPrice: values.product.unitPrice,
    };
    let newFormData: any = removeNullsFromObject(data);

    // We only want to submit form values that were modified
    const productData = opportunityData?.OpportunityProducts.find(
      (product) => product.OpportunityLineItems_ID === values.id
    );
    newFormData = getChangedValues(newFormData, productData);

    // Add the quote and opportunity IDs back in
    if (productData) {
      newFormData = {
        ...newFormData,
        OpportunityLineItems_ID: productData.OpportunityLineItems_ID,
      };
    }

    const newOpportunityData = {
      OpportunityDetail: {
        Opportunities_ID: opportunityData?.OpportunityDetail.Opportunities_ID,
        Opportunities_AccountId:
          opportunityData?.OpportunityDetail.Opportunities_AccountId,
      },
      OpportunityProducts: [newFormData],
    };

    return newOpportunityData;
  };

  return {
    setMenuOptions,
    setIsLoading,
    isLoading,
    productSelected,
    setProductSelected,
    menuOptions,
    FormatPercent,
    FormatNumber,
    FormatCurrency,
    createProductFormSubmissionData,
  };
};

interface useProductFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
}
