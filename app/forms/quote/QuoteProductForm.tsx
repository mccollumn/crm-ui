"use client";

import React from "react";
import { useFormWrapper } from "../FormWrapper";
import {
  Backdrop,
  CircularProgress,
  Grid,
  Stack,
  createFilterOptions,
} from "@mui/material";
import {
  AutocompleteElement,
  CheckboxElement,
  DatePickerElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import { FormProps } from "../../types/types";
import { useQuoteProductForm } from "./useQuoteProductForm";
import { QuoteData, QuoteFormData, QuoteProductData } from "@/app/types/quotes";
import { FormDivider } from "../FormDivider";
import DateFnsProvider from "@/app/providers/DateFnsProvider";
import { useQuoteForm } from "./useQuoteForm";
import { useOpportunityForm } from "../opportunity/useOpportunityForm";
import {
  OpportunityData,
  OpportunityFormData,
} from "@/app/types/opportunities";

interface QuoteProductFormProps extends FormProps {
  quoteData: QuoteData;
  opportunityData: OpportunityData;
  quoteValues: QuoteFormData;
  opportunityValues: OpportunityFormData;
  quoteProductData?: QuoteProductData;
}

export const QuoteProductForm = ({
  formTitle,
  defaultValues,
  quoteValues,
  opportunityValues,
  menuItems,
  quoteData,
  opportunityData,
  quoteProductData,
  ...props
}: QuoteProductFormProps) => {
  const router = useRouter();
  const {
    menuOptions,
    setIsLoading,
    isLoading,
    setProductSelected,
    productSelected,
    productData,
    FormatNumber,
    FormatCurrency,
    FormatPercent,
    submitQuoteProduct,
  } = useQuoteProductForm({
    menuItems,
    quoteData,
  });
  const { submitQuote } = useQuoteForm({ menuItems });
  const { submitOpportunity } = useOpportunityForm({ menuItems });
  const { FormWrapper, formContext } = useFormWrapper(defaultValues);

  const onSuccess = async (values: any) => {
    setIsLoading(true);
    const opportunityID = quoteData.QuoteDetail.Quotes_OpportunityID;
    const quoteID = quoteData.QuoteDetail.Quotes_ID;

    await submitQuoteProduct(values, defaultValues, quoteProductData);

    // Quote data needs to be updated when a quote product is added/updated.
    const quoteNewDataResponse = await fetch(`/api/quotes/${quoteID}`);
    const { data: quoteNewData }: { data: QuoteData } =
      await quoteNewDataResponse.json();

    console.log("Quote Product - Submitting Quote");
    console.log("Quote Product - Submitting Quote - quoteValues:", quoteValues);
    console.log(
      "Quote Product - Submitting Quote - quoteNewData:",
      quoteNewData
    );

    await submitQuote(quoteValues, quoteValues, quoteNewData);

    console.log("Quote Product - Submitted Quote");

    // Opportunity data needs to be updated when the primary quote is added/updated.
    console.log("Quote Product - Fetching Opportunity:", opportunityID);

    const opportunityNewDataResponse = await fetch(
      `/api/opportunities/${opportunityID}`
    );
    const { data: opportunityNewData }: { data: OpportunityData } =
      await opportunityNewDataResponse.json();

    console.log("Quote - Is Primary:", quoteNewData.QuoteDetail.Quotes_Primary);

    if (quoteNewData.QuoteDetail.Quotes_Primary === "1") {
      console.log("Quote Product - Submitting Opportunity");
      console.log(
        "Quote Product - Submitting Opportunity - opportunityValues:",
        opportunityValues
      );
      console.log(
        "Quote Product - Submitting Opportunity - opportunityNewData:",
        opportunityNewData
      );

      await submitOpportunity(
        opportunityValues,
        opportunityValues,
        opportunityNewData,
        "auto"
      );
      console.log("Quote Product - Submitted Opportunity");
    }
    setIsLoading(false);

    console.log("Quote Product - Routing");
    router.push(`/opportunities/view/${opportunityID}/quote/${quoteID}`);
  };

  const onCancel = () => {
    router.back();
  };

  const productFilterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: any) => `${option.name} ${option.code}`,
  });

  // Set form values when the product selection changes
  React.useEffect(() => {
    formContext.setValue(
      "product.unitListPrice",
      productData?.ProductDetail.Product2_UnitPrice ||
        defaultValues.product.unitPrice
    );
    formContext.setValue(
      "skuGroup",
      productData?.ProductCategorization.Product2_SkuGroup ||
        defaultValues.skuGroup
    );
    formContext.setValue(
      "product.family",
      productData?.ProductCategorization.Product2_Family ||
        defaultValues.product.family
    );
  }, [
    defaultValues.product.family,
    defaultValues.product.unitPrice,
    defaultValues.skuGroup,
    formContext,
    productData,
  ]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <FormWrapper
        title={formTitle}
        submitButtonText="Save"
        resetButtonText="Cancel"
        onSuccess={onSuccess}
        onCancel={onCancel}
        defaultValues={defaultValues}
        formContext={formContext}
      >
        <Grid container spacing={1}>
          <FormDivider>Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Quote */}
              <AutocompleteElement
                label="Quote"
                name="quote"
                required
                loading={menuOptions.Quote.length === 0}
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  getOptionLabel: (option) => option.name || "",
                  renderOption: (props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        {`${option.name}`}
                      </li>
                    );
                  },
                  size: "small",
                }}
                options={menuOptions.Quote}
              />
              {/* Sale Type */}
              <AutocompleteElement
                label="Sale Type"
                name="saleType"
                required
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.SaleType}
              />
              {/* Product */}
              <AutocompleteElement
                label="Product"
                name="product"
                required
                loading={menuOptions.Product.length === 0}
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  getOptionLabel: (option) => option.name || "",
                  renderOption: (props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        <b>{option.name}</b>
                        <pre style={{ margin: 0 }}>{` - ${option.code} (${
                          option.isActive === "1" ? "Active" : "Inactive"
                        })`}</pre>
                      </li>
                    );
                  },
                  filterOptions: productFilterOptions,
                  size: "small",
                  onChange: (_, value) => {
                    setProductSelected(value);
                  },
                }}
                options={menuOptions.Product}
              />
              {/* Quote Fulfillment */}
              <AutocompleteElement
                label="Quote Fulfillment"
                name="fulfillment"
                loading={menuOptions.Fulfillment.length === 0}
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  getOptionLabel: (option) => option.name || "",
                  renderOption: (props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        {`${option.name}`}
                      </li>
                    );
                  },
                  size: "small",
                }}
                options={menuOptions.Fulfillment}
              />
              {/* Product Family */}
              <AutocompleteElement
                label="Product Family"
                name="product.family"
                required
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.ProductFamily}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Currency */}
              <AutocompleteElement
                label="Currency"
                name="currency"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.QuoteProductCurrency}
              />
              {/* Unit List Price */}
              <TextFieldElement
                label="Unit List Price"
                name="product.unitListPrice"
                size="small"
                InputProps={{
                  inputComponent: FormatCurrency as any,
                }}
              />
              {/* Quantity */}
              <TextFieldElement
                label="Quantity"
                name="quantity"
                required
                size="small"
                InputProps={{ inputComponent: FormatNumber as any }}
              />
              {/* Term */}
              <TextFieldElement label="Term" name="term" size="small" />
              {/* Discount */}
              <TextFieldElement
                label="Discount"
                name="discount"
                size="small"
                InputProps={{ inputComponent: FormatPercent as any }}
              />
            </Stack>
          </Grid>
          <FormDivider>Product Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* SKU Group */}
              <AutocompleteElement
                label="SKU Group"
                name="skuGroup"
                required
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.SkuGroup}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Start Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Start Date"
                  name="startDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
              {/* End Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="End Date"
                  name="endDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
            </Stack>
          </Grid>
          <FormDivider>Entitlement Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Fulfillment Status */}
              <AutocompleteElement
                label="Fulfillment Status"
                name="fulfillment.status"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.FulfillmentStatus}
              />
            </Stack>
          </Grid>
        </Grid>
      </FormWrapper>
    </>
  );
};
