import { FormWrapper } from "../FormWrapper";
import { FormDivider } from "../FormDivider";
import { Grid, Stack } from "@mui/material";
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

interface QuoteFormProps extends FormProps {
  accountID: string;
}

export const QuoteForm = ({
  formTitle,
  defaultValues,
  menuItems,
  accountID,
  ...props
}: QuoteFormProps) => {
  const router = useRouter();
  const quoteID = defaultValues.id;
  const { menuOptions, setMenuOptions } = useQuoteForm({
    menuItems,
  });

  const onSuccess = async (values: any) => {
    console.log("Success values", values);
    let id = quoteID;
    // TODO:
    // Map menu values to appropriate fields
    // PUT data
    if (id) {
      const data = await fetch("/opportunities/api/new/");
      // Verify successful response
    } else {
      // POST new account
      // Set id to new account ID
    }
    router.push(`/opportunities/view/${accountID}`);
  };

  const onCancel = () => {
    router.back();
  };

  return (
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
              options={menuOptions.Owner}
            />
            {/* Opportunity */}
            <AutocompleteElement
              label="Opportunity"
              name="opportunity"
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
              options={menuOptions.Opportunity}
            />
            {/* Is Channel */}
            <CheckboxElement label="Is Channel" name="isChannel" size="small" />
            {/* Additional Quote Comments */}
            <TextareaAutosizeElement
              label="Additional Quote Comments"
              name="quoteComments"
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
              options={menuOptions.Status}
              autocompleteProps={{ size: "small" }}
            />
            {/* Quote Office Location */}
            <AutocompleteElement
              label="Quote Office Location"
              name="officeLocation"
              required
              autocompleteProps={{ size: "small" }}
              options={menuOptions.OfficeLocation}
            />
            {/* Currency */}
            <AutocompleteElement
              label="Currency"
              name="currencyCode"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.Currency}
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
        <FormDivider>Audit Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Audit Status */}
            <AutocompleteElement
              label="Audit Status"
              name="audit.status"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.AuditStatus}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Audit Notes */}
            <TextareaAutosizeElement
              label="Audit Notes"
              name="audit.notes"
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Payment Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Payment Method */}
            <AutocompleteElement
              label="Payment Method"
              name="payment.method"
              autocompleteProps={{ size: "small" }}
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
              autocompleteProps={{ size: "small" }}
              options={menuOptions.BillingFrequency}
            />
            {/* Payment Terms */}
            <AutocompleteElement
              label="Payment Terms"
              name="payment.terms"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.PaymentTerms}
            />
            {/* Terms Audit */}
            <AutocompleteElement
              label="Terms Audit"
              name="payment.termsAudit"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.TermsAudit}
            />
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
              type="number"
              size="small"
            />
            {/* Discount Reasons */}
            <MultiSelectElement
              label="Discount Reasons"
              name="comments.discountReasons"
              preserveOrder
              showChips
              size="small"
              options={menuOptions.DiscountReason}
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
              type="number"
              size="small"
            />
            {/* Analytics Server Calls */}
            <TextFieldElement
              label="Analytics Server Calls"
              name="entitlements.serverCalls"
              type="number"
              size="small"
            />
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
            <CheckboxElement
              label="Refresh Entitlement Data"
              name="entitlements.refreshData"
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Analytics Page Views */}
            <TextFieldElement
              label="Existing Analytics Page Views"
              name="entitlements.existingPageViews"
              type="number"
              size="small"
            />
            {/* Analytics Server Calls */}
            <TextFieldElement
              label="Existing Analytics Server Calls"
              name="entitlements.existingServerCalls"
              type="number"
              size="small"
            />
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
  );
};
