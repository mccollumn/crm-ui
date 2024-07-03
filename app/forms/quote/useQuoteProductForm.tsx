import React from "react";
import { useRouter } from "next/navigation";
import { MenuItem } from "@/app/types/types";
import {
  convertDateToISOString,
  getChangedValues,
  isObjectEmpty,
  isSuccessfulResponse,
  cleanObject,
} from "@/app/utils/utils";
import { useForm } from "../useForm";
import {
  QuoteData,
  QuoteProductData,
  QuoteProductFormData,
  QuoteProductFormProductData,
} from "@/app/types/quotes";
import { ProductData } from "@/app/types/products";

export const useQuoteProductForm = ({
  menuItems,
  quoteData,
}: useProductFormProps) => {
  const router = useRouter();
  const initialMenuOptions = {
    Quote: [],
    SaleType: [],
    Product: [],
    Fulfillment: [],
    ProductFamily: [],
    QuoteProductCurrency: [],
    SkuGroup: [],
    FulfillmentStatus: [],
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
  const [productSelected, setProductSelected] =
    React.useState<QuoteProductFormProductData>();
  const [productData, setProductData] = React.useState<ProductData>();

  // Retrieve information about the selected product
  React.useEffect(() => {
    if (!productSelected) return;
    const productID = productSelected.id;
    const getProductData = async () => {
      try {
        const results = await fetch(
          `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/product/productid/${productID}`
        );
        const productData = await results.json();
        setProductData(productData);
        return productData;
      } catch (error) {
        console.error("Could not retreive product data:", error);
      }
    };
    getProductData();
  }, [productSelected]);

  React.useEffect(() => {
    // Quotes
    const setQuotes = async () => {
      try {
        const opportunityID = quoteData.QuoteDetail.Quotes_OpportunityID;
        const results = await fetch(
          `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/opportunity/opportunityid/${opportunityID}`
        );
        const opportunityData = await results.json();
        if (isObjectEmpty(opportunityData)) return;
        const options = opportunityData.OpportunityQuotes.map((quote: any) => {
          return {
            id: quote.Quotes_ID,
            name: quote.Quotes_Name,
            status: quote.Quotes_Status,
            primary: quote.Quotes_Primary,
          };
        });
        setCustomMenuOptions("Quote", options);
      } catch {
        console.error("Could not retrieve quote data");
      }
    };
    setQuotes();

    // Products
    const setProducts = async () => {
      try {
        const results = await fetch(
          `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/product/list`
        );
        const productList = await results.json();
        if (!Array.isArray(productList)) return;
        const activeProductsList = productList.filter(
          (product: any) => product.Product2_IsActive === "1"
        );
        const options = activeProductsList.map((product: any) => {
          return {
            id: product.Product2_ID,
            name: product.Product2_Name,
            code: product.Product2_ProductCode,
            description: product.Product2_ProductDescriptionLong,
            isActive: product.Product2_IsActive,
            lineItemId: null,
            family: null,
            unitListPrice: null,
          };
        });
        setCustomMenuOptions("Product", options);
      } catch {
        console.error("Could not retrieve product list");
      }
    };
    setProducts();

    // Fulfillment
    const setFulfillment = async () => {
      try {
        const quoteFulfillment = quoteData.QuoteFullfillment;
        const options = [
          {
            id: quoteFulfillment.QuoteFulfillment_ID,
            name: quoteFulfillment.QuoteFulfillment_Name,
            date: quoteFulfillment.QuoteFulfillment_FulfillmentDate,
          },
        ];
        setCustomMenuOptions("Fulfillment", options);
      } catch {
        console.error("Could not retrieve fulfillment list");
      }
    };
    setFulfillment();

    // Set menu options that are already known (i.e. aren't based on user input)
    setMenuOptions("SaleType");
    setMenuOptions("QuoteProductCurrency");
    setMenuOptions("SkuGroup");
    setMenuOptions("FulfillmentStatus");
    setMenuOptions("ProductFamily");
  }, [
    quoteData.QuoteDetail.Quotes_OpportunityID,
    quoteData.QuoteFullfillment,
    setCustomMenuOptions,
    setMenuOptions,
  ]);

  const createQuoteProductFormSubmissionData = (
    values: QuoteProductFormData,
    quoteProductData?: QuoteProductData
  ) => {
    const totalListPrice = calculateTotalListPrice(
      values.term,
      values.product.unitListPrice,
      values.quantity
    );
    const totalSalePrice = calculateTotalSalePrice(
      totalListPrice,
      values.discount
    );
    const annualCost = calculateAnnualCost(totalSalePrice, values.term);
    const blendedDiscount = calculateBlendedDiscount(
      totalSalePrice,
      totalListPrice,
      values.quantity
    );
    const unitNetPrice = calculateUnitNetPrice(
      values.product.unitListPrice,
      values.discount
    );
    const RevRecTemplate = calculateRevRecTemplate(values.skuGroup);
    const data = {
      QuoteProductDetail: {
        QuoteProducts_ID: values.id,
        QuoteProducts_AnnualCost: annualCost,
        QuoteProducts_BlendedDiscount: blendedDiscount,
        QuoteProducts_CurrencyIsoCode: values.currency,
        QuoteProducts_Discount: values.discount,
        QuoteProducts_FulfillmentStatus: values.fulfillment.status,
        QuoteProducts_Name: values.product.lineItemId,
        QuoteProducts_OneYearAmount: annualCost,
        QuoteProducts_Product2ID: values.product.id,
        Product2_Name: values.product.name,
        QuoteProducts_ProductCode: values.product.code,
        QuoteProducts_ProductFamily: values.product.family,
        QuoteProducts_Quantity: values.quantity,
        QuoteProducts_QuoteFulfillmentID: values.fulfillment.id,
        QuoteFulfillment_Name: values.fulfillment.name,
        QuoteProducts_QuoteID: values.quote.id,
        Quotes_Name: values.quote.name,
        QuoteProducts_SaleType: values.saleType,
        QuoteProducts_Term: values.term,
        QuoteProducts_TotalListPrice: totalListPrice,
        QuoteProducts_TotalNetPriceDiscount: values.totalNetPriceDiscount,
        QuoteProducts_TotalSalePrice: totalSalePrice,
        QuoteProducts_UnitListPrice: values.product.unitListPrice,
        QuoteProducts_UnitNetPrice: unitNetPrice,
        QuoteProducts_UOM: values.uom,
      },
      ProductInfo: {
        QuoteProducts_EndDate: convertDateToISOString(values.endDate),
        QuoteProducts_RevRecTemplate: RevRecTemplate,
        QuoteProducts_SKUGroup: values.skuGroup,
        QuoteProducts_StartDate: convertDateToISOString(values.startDate),
      },
      SubmissionDetails: {
        UserID: user?.id || null,
        QuoteID: values?.quote?.id || null,
      },
    };
    let newFormData: any = cleanObject(data);

    // We only want to submit form values that were modified
    newFormData = getChangedValues(newFormData, quoteProductData);

    // Add the quote and product IDs back in
    if (quoteProductData) {
      newFormData = {
        ...newFormData,
        QuoteProductDetail: {
          ...newFormData.QuoteProductDetail,
          QuoteProducts_ID:
            quoteProductData.QuoteProductDetail.QuoteProducts_ID,
          QuoteProducts_QuoteID:
            quoteProductData.QuoteProductDetail.QuoteProducts_QuoteID,
        },
        SubmissionDetails: {
          ...newFormData.SubmissionDetails,
          ProductID: quoteProductData.QuoteProductDetail.QuoteProducts_ID,
          QuoteID: quoteProductData.QuoteProductDetail.QuoteProducts_QuoteID,
        },
      };
    }

    return newFormData;
  };

  const submitQuoteProduct = async (
    values: QuoteProductFormData,
    defaultValues: any,
    quoteProductData?: QuoteProductData
  ) => {
    const data = await createQuoteProductFormSubmissionData(
      values,
      quoteProductData
    );
    console.log("Success values", values);
    console.log("Submitted Data:", data);
    const isEdit = !!defaultValues?.id;
    const url = isEdit
      ? "/api/opportunities/update/quote/product"
      : "/api/opportunities/insert/quote/product";
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
    // Invalidate cached quote data
    await fetch("/api/revalidate/tag?tag=quote");

    return responseData;
  };

  return {
    setMenuOptions,
    setIsLoading,
    isLoading,
    productSelected,
    setProductSelected,
    productData,
    menuOptions,
    FormatPercent,
    FormatNumber,
    FormatCurrency,
    createQuoteProductFormSubmissionData,
    submitQuoteProduct,
  };
};

const calculateAnnualCost = (
  totalSalePrice: string | null | undefined,
  term: string | null | undefined
) => {
  if (!totalSalePrice || !term) return null;
  return String((Number(totalSalePrice) * 12) / Number(term));
};

const calculateBlendedDiscount = (
  totalSalePrice: string | null | undefined,
  totalListPrice: number | string | null | undefined,
  quantity: string | null | undefined
) => {
  if (!totalSalePrice || !totalListPrice || !quantity) return null;
  return String(
    1 - Number(totalSalePrice) / (Number(totalListPrice) * Number(quantity))
  );
};

const calculateTotalListPrice = (
  term: string | null | undefined,
  unitListPrice: string | null | undefined,
  quantity: string | null | undefined
) => {
  if (!unitListPrice || !quantity) return null;
  if (term && Number(term) >= 12) {
    return String(
      Number(unitListPrice) * Number(quantity) * (Number(term) / 12)
    );
  }
  return String(Number(unitListPrice) * Number(quantity));
};

const calculateTotalSalePrice = (
  totalListPrice: string | null | undefined,
  discount: string | null | undefined
) => {
  if (!totalListPrice) return null;
  if (discount && Number(discount) > 0) {
    return String(Number(totalListPrice) * (1 - Number(discount) / 100));
  }
  return totalListPrice;
};

const calculateUnitNetPrice = (
  unitListPrice: string | null | undefined,
  discount: string | null | undefined
) => {
  if (!unitListPrice) return null;
  if (discount && Number(discount) > 0) {
    return String(Number(unitListPrice) * (1 - Number(discount) / 100));
  }
  return unitListPrice;
};

const calculateRevRecTemplate = (skuGroup: string | null | undefined) => {
  if (!skuGroup) return null;
  if (skuGroup === "CON-Consulting") {
    return "Pro Svcs Consulting";
  }
  return "Monthly Flexible";
};

interface useProductFormProps {
  /**
   * Array of all possible menu options.
   */
  menuItems: MenuItem[];
  /**
   * Quote data
   */
  quoteData: QuoteData;
}
