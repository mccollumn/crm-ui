"use client";

import { FormWrapper } from "../FormWrapper";
import { Backdrop, CircularProgress, Grid, Stack } from "@mui/material";
import {
  AutocompleteElement,
  CheckboxElement,
  DateTimePickerElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import { FormProps } from "../../types/types";
import { isSuccessfulResponse } from "@/app/utils/utils";
import { useQuoteProductForm } from "./useQuoteProductForm";
import { QuoteData } from "@/app/types/quotes";
import { FormDivider } from "../FormDivider";
import DateFnsProvider from "@/app/providers/DateFnsProvider";

interface QuoteProductFormProps extends FormProps {
  quoteData: QuoteData;
}

export const QuoteProductForm = ({
  formTitle,
  defaultValues,
  menuItems,
  quoteData,
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
  });

  const onSuccess = async (values: any) => {
    setIsLoading(true);
    const data = createQuoteProductFormSubmissionData(values, quoteData);
    console.log("Success values", values);
    console.log("Submitted Data:", data);
    const url = "/api/opportunities/update/quote";
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

    // Invalidate cached quote data
    fetch("/api/revalidate/tag?tag=quote");
    setIsLoading(false);
    const opportunityID = quoteData.QuoteDetail.Quotes_OpportunityID;
    const quoteID = quoteData.QuoteDetail.Quotes_ID;
    router.push(`/opportunities/view/${opportunityID}/quote/${quoteID}`);
  };

  const onCancel = () => {
    router.back();
  };

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
              {/* TODO: Default value of current quote name */}
              <AutocompleteElement
                label="Quote"
                name=""
                required
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
                name=""
                required
                options={menuOptions.SaleType}
              />
              {/* Product */}
              <AutocompleteElement
                label="Product"
                name="product"
                required
                autocompleteProps={{
                  getOptionLabel: (option) => option.name || "",
                  renderOption: (props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        <b>{option.name}</b>
                        <pre
                          style={{ margin: 0 }}
                        >{` - ${option.code} (${option.unitPrice})`}</pre>
                      </li>
                    );
                  },
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
                name=""
                size="small"
              />
              {/* QM Editable */}
              <CheckboxElement label="QM Editable" name="" size="small" />
              {/* Quote Fulfillment */}
              <AutocompleteElement
                label="Quote Fulfillment"
                name=""
                options={menuOptions}
              />
              {/* Product Family */}
              <AutocompleteElement
                label="Product Family"
                name="product.family"
                options={menuOptions.Family}
              />
              {/* One Year Amount */}
              <TextFieldElement
                label="One Year Amount"
                name=""
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
                name=""
                options={menuOptions}
              />
              {/* Unit List Price */}
              <TextFieldElement
                label="Unit List Price"
                name=""
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
                name=""
                size="small"
                InputProps={{ inputComponent: FormatPercent as any }}
              />
            </Stack>
          </Grid>
          <FormDivider>CPM Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* CPM Volume */}
              <TextFieldElement
                label="CPM Volume"
                name=""
                size="small"
                InputProps={{ inputComponent: FormatNumber as any }}
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
                options={menuOptions.SkuGroup}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Start Date */}
              <DateFnsProvider>
                <DateTimePickerElement
                  label="Start Date"
                  name=""
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
              {/* End Date */}
              <DateFnsProvider>
                <DateTimePickerElement
                  label="End Date"
                  name=""
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
            </Stack>
          </Grid>
          <FormDivider>Entitlement Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Entitlement ID */}
              <TextFieldElement label="Entitlement ID" name="" size="small" />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Fulfillment Status */}
              <AutocompleteElement
                label="Fulfillment Status"
                name=""
                options={menuOptions}
              />
            </Stack>
          </Grid>
        </Grid>
      </FormWrapper>
    </>
  );
};
