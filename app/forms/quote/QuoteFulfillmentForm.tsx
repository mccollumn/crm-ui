"use client";

import React from "react";
import { FormWrapper } from "../FormWrapper";
import { Backdrop, CircularProgress, Grid, Stack } from "@mui/material";
import {
  AutocompleteElement,
  CheckboxElement,
  DatePickerElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import { FormProps } from "../../types/types";
import { QuoteData, QuoteFulfillmentData } from "@/app/types/quotes";
import { FormDivider } from "../FormDivider";
import DateFnsProvider from "@/app/providers/DateFnsProvider";
import { ButtonNav } from "@/app/components/navigation/ButtonNav";
import { useQuoteFulfillmentForm } from "./useQuoteFulfillmentForm";
import { AccountData } from "@/app/types/accounts";

interface QuoteFulfillmentFormProps extends FormProps {
  quoteData: QuoteData;
  accountData: AccountData;
  quoteFulfillmentData?: QuoteFulfillmentData;
}

export const QuoteFulfillmentForm = ({
  formTitle,
  defaultValues,
  menuItems,
  quoteData,
  accountData,
  quoteFulfillmentData,
  ...props
}: QuoteFulfillmentFormProps) => {
  const router = useRouter();
  const {
    menuOptions,
    setIsLoading,
    isLoading,
    FormatNumber,
    FormatCurrency,
    FormatPercent,
    submitQuoteFulfillment,
  } = useQuoteFulfillmentForm({
    menuItems,
    quoteData,
    accountData,
  });
  const accountID = accountData.AccountDetail.Accounts_AccountID;
  const assetID = defaultValues.support.assetID;

  const onSuccess = async (values: any) => {
    setIsLoading(true);
    await submitQuoteFulfillment(values, defaultValues, quoteFulfillmentData);
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
              {/* Details */}
              <TextareaAutosizeElement
                label="Details"
                name="details"
                rows={3}
                size="small"
              />
              {/* Fulfillment Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Fulfillment Date"
                  name="date"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
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
                options={menuOptions.QuoteFulfillmentCurrency}
              />
              {/* License Key */}
              <AutocompleteElement
                label="License Key"
                name="licenseKey"
                required
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  getOptionLabel: (option) => option.name || "",
                  renderOption: (props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        <b>{option.name}</b>
                        <pre style={{ margin: 0 }}>{`${
                          option.type ? ` - ${option.type}` : ""
                        }${option.status ? ` (${option.status})` : ""}`}</pre>
                      </li>
                    );
                  },
                  size: "small",
                }}
                options={menuOptions.LicenseKey}
              />
              <ButtonNav
                size="small"
                path={`/accounts/new/${accountID}/license-key/`}
                style={{ width: "125px" }}
              >
                New License Key
              </ButtonNav>
            </Stack>
          </Grid>
          {!defaultValues?.id && (
            <>
              <FormDivider>Support Details</FormDivider>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  {/* Support Plan Type */}
                  <AutocompleteElement
                    label="Support Plan Type"
                    name="support.planType"
                    required
                    autocompleteProps={{
                      autoSelect: true,
                      autoHighlight: true,
                      size: "small",
                      readOnly: defaultValues.support.planType ? true : false,
                      disabled: defaultValues.support.planType ? true : false,
                    }}
                    options={menuOptions.SupportPlanType}
                  />
                  {/* Is Term License */}
                  <CheckboxElement
                    label="Is Term License"
                    name="licenseKey.isTermLicense"
                    size="small"
                    readOnly={defaultValues.licenseKey.isTerm}
                    disabled={defaultValues.licenseKey.isTerm}
                  />
                  {assetID && (
                    <ButtonNav
                      size="small"
                      path={`/accounts/edit/${accountID}/asset/${assetID}`}
                      style={{ width: "125px" }}
                    >
                      Edit Asset
                    </ButtonNav>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  {/* Support Plan Begin */}
                  <DateFnsProvider>
                    <DatePickerElement
                      label="Support Plan Begin"
                      name="support.beginDate"
                      required
                      readOnly={defaultValues.support.beginDate}
                      disabled={defaultValues.support.beginDate}
                      inputProps={{ size: "small" }}
                    />
                  </DateFnsProvider>
                  {/* Support Plan End */}
                  <DateFnsProvider>
                    <DatePickerElement
                      label="Support Plan End"
                      name="support.endDate"
                      required
                      readOnly={defaultValues.support.endDate}
                      disabled={defaultValues.support.endDate}
                      inputProps={{ size: "small" }}
                    />
                  </DateFnsProvider>
                </Stack>
              </Grid>
            </>
          )}
        </Grid>
      </FormWrapper>
    </>
  );
};
