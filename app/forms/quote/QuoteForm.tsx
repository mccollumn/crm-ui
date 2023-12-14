"use client";

import React from "react";
import { FormWrapper } from "../FormWrapper";
import { FormDivider } from "../FormDivider";
import { Backdrop, CircularProgress, Grid, Stack } from "@mui/material";
import {
  AutocompleteElement,
  CheckboxElement,
  DatePickerElement,
  DateTimePickerElement,
  MultiSelectElement,
  TextFieldElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import DateFnsProvider from "../../providers/DateFnsProvider";
import { FormProps } from "../../types/types";
import { useQuoteForm } from "./useQuoteForm";
import { QuoteData, QuoteFormData } from "@/app/types/quotes";
import { useOpportunityForm } from "../opportunity/useOpportunityForm";
import {
  OpportunityData,
  OpportunityFormData,
} from "@/app/types/opportunities";

interface QuoteFormProps extends FormProps {
  quoteData?: QuoteData;
  opportunityValues: OpportunityFormData;
  opportunityData: OpportunityData;
}

export const QuoteForm = ({
  formTitle,
  defaultValues,
  opportunityValues,
  menuItems,
  quoteData,
  opportunityData,
  ...props
}: QuoteFormProps) => {
  const router = useRouter();
  const { menuOptions, FormatNumber, setIsLoading, isLoading, submitQuote } =
    useQuoteForm({
      menuItems,
    });
  const { submitOpportunity } = useOpportunityForm({ menuItems });

  const onSuccess = async (values: QuoteFormData) => {
    setIsLoading(true);
    const opportunityID = opportunityData.OpportunityDetail.Opportunities_ID;

    console.log("Quote - Submitting");
    console.log("Quote - Submitting - values:", values);
    console.log("Quote - Submitting - defaultValues:", defaultValues);
    console.log("Quote - Submitting - quoteData:", quoteData);

    await submitQuote(values, defaultValues, quoteData);

    console.log("Quote - Submitted");

    // Opportunity data needs to be updated if this is the primary quote
    console.log("Quote - Is Primary:", values.isPrimary);

    if (!!Number(values.isPrimary)) {
      console.log("Quote - Fetching Opportunity:", opportunityID);

      const opportunityNewDataResponse = await fetch(
        `/api/opportunities/${opportunityID}`
      );
      const { data: opportunityNewData }: { data: OpportunityData } =
        await opportunityNewDataResponse.json();

      console.log("Quote - Submitting Opportunity");
      console.log(
        "Quote - Submitting Opportunity - opportunityValues:",
        opportunityValues
      );
      console.log(
        "Quote - Submitting Opportunity - opportunityNewData:",
        opportunityNewData
      );

      await submitOpportunity(
        opportunityValues,
        opportunityValues,
        opportunityNewData,
        "auto"
      );

      console.log("Quote - Submitted Opportunity");
    }
    setIsLoading(false);

    console.log("Quote - Routing");
    router.back();
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
              {/* Owner */}
              <AutocompleteElement
                label="Owner"
                name="owner"
                loading={menuOptions.Owner.length === 0}
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
                options={menuOptions.Owner}
              />
              {/* Opportunity */}
              <AutocompleteElement
                label="Opportunity"
                name="opportunity"
                required
                loading={menuOptions.Opportunity.length === 0}
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
                options={menuOptions.Opportunity}
              />
              {/* Is Channel */}
              <CheckboxElement
                label="Is Channel"
                name="isChannel"
                size="small"
              />
              {/* Additional Quote Comments */}
              <TextareaAutosizeElement
                label="Additional Quote Comments"
                name="quoteComments"
                rows={3}
                size="small"
              />
              {/* Notes to OM */}
              <TextareaAutosizeElement
                label="Notes to OM"
                name="notesToOM"
                rows={3}
                size="small"
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Status */}
              <AutocompleteElement
                label="Status"
                name="status"
                options={menuOptions.QuoteStatus}
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
              />
              {/* Quote Office Location */}
              {/* <AutocompleteElement
                label="Quote Office Location"
                name="officeLocation"
                // required
                autocompleteProps={{ size: "small" }}
                options={menuOptions.OfficeLocation}
              /> */}
              {/* Currency */}
              <AutocompleteElement
                label="Currency"
                name="currencyCode"
                required
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.QuoteCurrency}
              />
              {/* Valid Through */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Valid Through"
                  name="validThrough"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
              {/* Primary */}
              <CheckboxElement label="Primary" name="isPrimary" size="small" />
            </Stack>
          </Grid>
          {/* <FormDivider>Audit Information</FormDivider> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Audit Status */}
          {/* <AutocompleteElement
              label="Audit Status"
              name="audit.status"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.AuditStatus}
            /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Audit Notes */}
          {/* <TextareaAutosizeElement
              label="Audit Notes"
              name="audit.notes"
              rows={3}
              size="small"
            /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          <FormDivider>Payment Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Payment Method */}
              <AutocompleteElement
                label="Payment Method"
                name="payment.method"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.PaymentMethod}
              />
              {/* Payment Document Number */}
              <TextFieldElement
                label="Payment Document Number"
                name="payment.docNumber"
                size="small"
              />
              {/* Migration External ID */}
              {/* <TextFieldElement
              label="Migration External ID"
              name=""
              size="small"
            /> */}
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Billing Frequency */}
              <AutocompleteElement
                label="Billing Frequency"
                name="payment.billingFrequency"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.BillingFrequency}
              />
              {/* Payment Terms */}
              <AutocompleteElement
                label="Payment Terms"
                name="payment.terms"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.PaymentTerms}
              />
              {/* Terms Audit */}
              {/* <AutocompleteElement
              label="Terms Audit"
              name="payment.termsAudit"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.TermsAudit}
            /> */}
            </Stack>
          </Grid>
          <FormDivider>Send Quote</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Quote Last Send Date */}
              <DateFnsProvider>
                <DateTimePickerElement
                  label="Quote Last Send Date"
                  name="lastSendDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}></Stack>
          </Grid>
          <FormDivider>Comments</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Sales Notes to OM */}
              {/* <TextareaAutosizeElement
              label="Sales Notes to OM"
              name=""
              rows={3}
              size="small"
            /> */}
              {/* Order Management Comments */}
              {/* <TextareaAutosizeElement
              label="Order Management Comments"
              name=""
              rows={3}
              size="small"
            /> */}
              {/* Current Financial Exchange Rate to USD */}
              <TextFieldElement
                label="Current Financial Exchange Rate to USD"
                name="comments.exchangeRate"
                size="small"
                InputProps={{ inputComponent: FormatNumber as any }}
              />
              {/* Discount Reasons */}
              <MultiSelectElement
                label="Discount Reasons"
                name="comments.discountReasons"
                preserveOrder
                showChips
                size="small"
                options={menuOptions.QuoteDiscountReason}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Discount Reason */}
              <TextareaAutosizeElement
                label="Discount Reason"
                name="comments.discountReason"
                rows={3}
                size="small"
              />
            </Stack>
          </Grid>
          <FormDivider>Entitlements</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Analytics Page Views */}
              <TextFieldElement
                label="Analytics Page Views"
                name="entitlements.pageViews"
                size="small"
                InputProps={{ inputComponent: FormatNumber as any }}
              />
              {/* Analytics Server Calls */}
              {/* <TextFieldElement
              label="Analytics Server Calls"
              name="entitlements.serverCalls"
              type="number"
              size="small"
            /> */}
              {/* Segment Events */}
              {/* <TextFieldElement
              label="Segment Events"
              name=""
              type="number"
              size="small"
            /> */}
              {/* Spotimize Events */}
              {/* <TextFieldElement
              label="Spotimize Events"
              name=""
              type="number"
              size="small"
            /> */}
              {/* Streams Events */}
              {/* <TextFieldElement
              label="Streams Events"
              name=""
              type="number"
              size="small"
            /> */}
              {/* Refresh Entitlement Data */}
              {/* <CheckboxElement
              label="Refresh Entitlement Data"
              name="entitlements.refreshData"
              size="small"
            /> */}
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Analytics Page Views */}
              <TextFieldElement
                label="Existing Analytics Page Views"
                name="entitlements.existingPageViews"
                size="small"
                InputProps={{ inputComponent: FormatNumber as any }}
              />
              {/* Analytics Server Calls */}
              {/* <TextFieldElement
              label="Existing Analytics Server Calls"
              name="entitlements.existingServerCalls"
              type="number"
              size="small"
            /> */}
              {/* Segment Events */}
              {/* <TextFieldElement
              label="Existing Segment Events"
              name=""
              type="number"
              size="small"
            /> */}
              {/* Spotimize Events */}
              {/* <TextFieldElement
              label="Existing Spotimize Events"
              name=""
              type="number"
              size="small"
            /> */}
              {/* Streams Events */}
              {/* <TextFieldElement
              label="Existing Streams Events"
              name=""
              type="number"
              size="small"
            /> */}
            </Stack>
          </Grid>
          {/* <FormDivider>Intacct Information</FormDivider> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Intacct Entity */}
          {/* <AutocompleteElement
              label="Intacct Entity"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Order Date */}
          {/* <DateFnsProvider>
              <DatePickerElement
                label="Order Date"
                name=""
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider> */}
          {/* </Stack> */}
          {/* </Grid> */}
        </Grid>
      </FormWrapper>
    </>
  );
};
