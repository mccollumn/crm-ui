import React from "react";
import { MenuItem } from "@/app/types/types";
import { getChangedValues, removeNullsFromObject } from "@/app/utils/utils";
import { useForm } from "../useForm";
import { Product } from "@/app/types/opportunities";
import { QuoteData, QuoteProductFormData } from "@/app/types/quotes";

export const useQuoteProductForm = ({ menuItems }: useProductFormProps) => {
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

  const createQuoteProductFormSubmissionData = (
    values: QuoteProductFormData,
    quoteData?: QuoteData
  ) => {
    const data = {
      QuoteProducts_ID: values.id,
      QuoteProducts_Discount: values.discount,
      QuoteProducts_Name: values.product.lineItemId,
      QuoteProducts_Product2ID: values.product.id,
      Product_Name: values.product.name,
      QuoteProducts_ProductCode: values.product.code,
      QuoteProducts_ProductFamily: values.product.family,
      QuoteProducts_Quantity: values.quantity,
      QuoteProducts_QuoteID: values.quoteId,
      QuoteProducts_SKUGroup: values.skuGroup,
      QuoteProducts_TotalSalePrice: values.totalSalePrice,
      QuoteProducts_UOM: values.uom,
    };
    let newFormData: any = removeNullsFromObject(data);

    // We only want to submit form values that were modified
    const productData = quoteData?.QuoteProducts.find(
      (product) => product.QuoteProducts_ID === values.id
    );
    newFormData = getChangedValues(newFormData, productData);

    // Add the quote and product IDs back in
    if (productData) {
      newFormData = {
        ...newFormData,
        QuoteProducts_ID: productData.QuoteProducts_ID,
        QuoteProducts_QuoteID: productData.QuoteProducts_QuoteID,
      };
    }

    const newQuoteData = {
      QuoteDetail: {
        Quotes_ID: quoteData?.QuoteDetail.Quotes_ID,
        Quotes_OpportunityID: quoteData?.QuoteDetail.Quotes_OpportunityID,
      },
      QuoteProducts: [newFormData],
    };

    return newQuoteData;
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
    createQuoteProductFormSubmissionData,
  };
};

interface useProductFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
}
