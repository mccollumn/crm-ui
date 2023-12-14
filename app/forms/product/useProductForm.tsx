import React from "react";
import { useRouter } from "next/navigation";
import { MenuItem } from "@/app/types/types";
import {
  getChangedValues,
  isObjectEmpty,
  isSuccessfulResponse,
  removeNullsFromObject,
} from "@/app/utils/utils";
import { useForm } from "../useForm";
import { OpportunityData, ProductFormData } from "@/app/types/opportunities";
import { ProductData } from "@/app/types/products";

export const useProductForm = ({ menuItems }: useProductFormProps) => {
  const router = useRouter();
  const initialMenuOptions = {
    Product: [],
  };

  const {
    setMenuOptions,
    setCustomMenuOptions,
    setIsLoading,
    isLoading,
    menuOptions,
    user,
    FormatPercent,
    FormatNumber,
    FormatCurrency,
  } = useForm({
    initialMenuOptions,
    menuItems,
  });
  const [productSelected, setProductSelected] = React.useState<any>();
  const [listPrice, setListPrice] = React.useState<any>(null);

  React.useEffect(() => {
    // Products
    const setProducts = async () => {
      try {
        const results = await fetch(
          `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/product/list`
        );
        const products = await results.json();
        if (!Array.isArray(products)) return;
        const options = products.map((product: any) => {
          return {
            id: product.Product2_ID,
            name: product.Product2_Name,
            code: product.Product2_ProductCode,
            description: product.Product2_ProductDescriptionLong,
            isActive: product.Product2_IsActive,
          };
        });
        setCustomMenuOptions("Product", options);
      } catch {
        console.error("Could not retrieve list of products");
      }
    };
    setProducts();
  }, [setCustomMenuOptions]);

  React.useEffect(() => {
    // Product List Price
    const setPrice = async (productSelected: any) => {
      try {
        const productID = productSelected?.id;
        if (!productID) return;
        const results = await fetch(
          `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/product/productid/${productID}`
        );
        const product: ProductData = await results.json();
        if (isObjectEmpty(product)) return;
        setListPrice(product.ProductDetail.Product2_UnitPrice);
      } catch {
        console.error("Could not retrieve product data");
      }
    };
    setPrice(productSelected);
  }, [productSelected]);

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
      SubmissionDetails: {
        UserID: user?.id || null,
      },
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
      SubmissionDetails: {
        ...newFormData.SubmissionDetails,
        AccountID:
          opportunityData?.OpportunityDetail.Opportunities_AccountId || null,
        OpportunityID:
          opportunityData?.OpportunityDetail.Opportunities_ID || null,
      },
    };

    return newOpportunityData;
  };

  const submitProduct = async (
    values: ProductFormData,
    opportunityData?: OpportunityData
  ) => {
    const data = await createProductFormSubmissionData(values, opportunityData);
    console.log("Success values", values);
    console.log("Submitted Data:", data);
    const url = "/api/opportunities/update";
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const response = await fetch(request);

    if (!(await isSuccessfulResponse(response))) {
      setIsLoading(false);
      router.push("/error");
      return;
    }

    const responseData = await response.json();

    // Refresh the page cache
    React.startTransition(() => {
      router.refresh();
    });
    // Invalidate cached account data
    await fetch("/api/revalidate/tag?tag=opportunity");

    return responseData;
  };

  return {
    setMenuOptions,
    setIsLoading,
    isLoading,
    productSelected,
    setProductSelected,
    listPrice,
    menuOptions,
    FormatPercent,
    FormatNumber,
    FormatCurrency,
    createProductFormSubmissionData,
    submitProduct,
  };
};

interface useProductFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
}
