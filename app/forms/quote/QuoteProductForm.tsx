"use client";

import React from "react";
import { FormWrapper } from "../FormWrapper";
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
import { isSuccessfulResponse } from "@/app/utils/utils";
import { useQuoteProductForm } from "./useQuoteProductForm";
import { QuoteData, QuoteProductData } from "@/app/types/quotes";
import { FormDivider } from "../FormDivider";
import DateFnsProvider from "@/app/providers/DateFnsProvider";

interface QuoteProductFormProps extends FormProps {
  quoteData: QuoteData;
  quoteProductData?: QuoteProductData;
}

export const QuoteProductForm = ({
  formTitle,
  defaultValues,
  menuItems,
  quoteData,
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
    FormatNumber,
    FormatCurrency,
    FormatPercent,
    createQuoteProductFormSubmissionData,
  } = useQuoteProductForm({
    menuItems,
    quoteData,
  });

  const onSuccess = async (values: any) => {
    setIsLoading(true);
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

    // Refresh the page cache
    React.startTransition(() => {
      router.refresh();
    });
    // Invalidate cached quote data
    await fetch("/api/revalidate/tag?tag=quote");
    setIsLoading(false);
    const opportunityID = quoteData.QuoteDetail.Quotes_OpportunityID;
    const quoteID = quoteData.QuoteDetail.Quotes_ID;
    router.push(`/opportunities/view/${opportunityID}/quote/${quoteID}`);
  };

  const onCancel = () => {
    router.back();
  };

  const productFilterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: any) => `${option.name} ${option.code}`,
  });

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
                autocompleteProps={{ size: "small" }}
                options={menuOptions.SaleType}
              />
              {/* Product */}
              <AutocompleteElement
                label="Product"
                name="product"
                required
                loading={menuOptions.Product.length === 0}
                autocompleteProps={{
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
              {/* Parent Quote Product ID */}
              <TextFieldElement
                label="Parent Quote Product ID"
                name="parentQuoteProductId"
                size="small"
              />
              {/* QM Editable */}
              <CheckboxElement label="QM Editable" name="" size="small" />
              {/* Quote Fulfillment */}
              <AutocompleteElement
                label="Quote Fulfillment"
                name="fulfillment"
                loading={menuOptions.Fulfillment.length === 0}
                autocompleteProps={{
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
                autocompleteProps={{ size: "small" }}
                options={menuOptions.ProductFamily}
              />
              {/* One Year Amount */}
              <TextFieldElement
                label="One Year Amount"
                name="oneYearAmount"
                size="small"
                InputProps={{ inputComponent: FormatCurrency as any }}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Currency */}
              <AutocompleteElement
                label="Currency"
                name="currency"
                autocompleteProps={{ size: "small" }}
                options={menuOptions.QuoteProductCurrency}
              />
              {/* Unit List Price */}
              <TextFieldElement
                label="Unit List Price"
                name="unitListPrice"
                size="small"
                InputProps={{ inputComponent: FormatCurrency as any }}
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
              <TextFieldElement label="Term" name="" size="small" />
              {/* Discount */}
              <TextFieldElement
                label="Discount"
                name="discount"
                size="small"
                InputProps={{ inputComponent: FormatPercent as any }}
              />
              {/* Total-Net-Price Discount */}
              <TextFieldElement
                label="Total-Net-Price Discount"
                name="totalNetPriceDiscount"
                size="small"
                InputProps={{ inputComponent: FormatPercent as any }}
              />
            </Stack>
          </Grid>
          {/* <FormDivider>CPM Information</FormDivider> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* CPM Volume */}
          {/* <TextFieldElement
                label="CPM Volume"
                name=""
                size="small"
                InputProps={{ inputComponent: FormatNumber as any }}
              /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          <FormDivider>Product Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* SKU Group */}
              <AutocompleteElement
                label="SKU Group"
                name="skuGroup"
                required
                autocompleteProps={{ size: "small" }}
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
              {/* Entitlement ID */}
              {/* <TextFieldElement label="Entitlement ID" name="" size="small" /> */}
              {/* Fulfillment Status */}
              <AutocompleteElement
                label="Fulfillment Status"
                name="fulfillment.status"
                autocompleteProps={{ size: "small" }}
                options={menuOptions.FulfillmentStatus}
              />
            </Stack>
          </Grid>
          {/* <Grid item xs={6}>
            <Stack spacing={1}>
            </Stack>
          </Grid> */}
        </Grid>
      </FormWrapper>
    </>
  );
};
