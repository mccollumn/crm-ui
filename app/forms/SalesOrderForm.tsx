import { FormWrapper } from "./FormWrapper";
import { FormDivider } from "./FormDivider";
import { Grid, Stack } from "@mui/material";
import {
  AutocompleteElement,
  CheckboxElement,
  DatePickerElement,
  TextFieldElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import DateFnsProvider from "../providers/DateFnsProvider";

type SalesOrderFormProps = {
  formTitle: string;
  onSuccess: any;
  onCancel: any;
  defaultValues?: any;
};

const initialValues = {};

export const SalesOrderForm = ({
  formTitle,
  onSuccess,
  onCancel,
  defaultValues = initialValues,
  ...props
}: SalesOrderFormProps) => {
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
            {/* Sales Order Number */}
            <TextFieldElement
              label="Sales Order Number"
              name=""
              required
              size="small"
            />
            {/* Account */}
            <AutocompleteElement
              label="Account"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Opportunity */}
            <AutocompleteElement
              label="Opportunity"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Document Number */}
            <TextFieldElement
              label="Document Number"
              name=""
              required
              size="small"
            />
            {/* Document Type */}
            <TextFieldElement label="Document Type" name="" size="small" />
            {/* Terms */}
            <TextFieldElement label="Terms" name="" size="small" />
            {/* Reference Number */}
            <TextFieldElement label="Reference Number" name="" size="small" />
            {/* Quote */}
            <AutocompleteElement
              label="Quote"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* End Customer Account */}
            <AutocompleteElement
              label="End Customer Account"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Is Channel */}
            <CheckboxElement label="Is Channel" name="" size="small" />
            {/* Order Number */}
            <TextFieldElement label="Order Number" name="" size="small" />
            {/* SO Record Update */}
            <DateFnsProvider>
              <DatePickerElement label="SO Record Update" name="" />
            </DateFnsProvider>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Parent Entity */}
            <AutocompleteElement
              label="Parent Entity"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Intacct Entity */}
            <AutocompleteElement
              label="Intacct Entity"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Owner */}
            <AutocompleteElement
              label="Owner"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Date */}
            <DateFnsProvider>
              <DatePickerElement label="Date" name="" />
            </DateFnsProvider>
            {/* State */}
            <TextareaAutosizeElement
              label="State"
              name=""
              rows={3}
              size="small"
            />
            {/* Ship Date */}
            <DateFnsProvider>
              <DatePickerElement label="Ship Date" name="" />
            </DateFnsProvider>
            {/* Currency */}
            <AutocompleteElement
              label="Currency"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Subtotal */}
            <TextFieldElement
              label="Subtotal"
              name=""
              type="number"
              size="small"
            />
            {/* Total */}
            <TextFieldElement
              label="Total"
              name=""
              type="number"
              size="small"
            />
            {/* Message */}
            <TextareaAutosizeElement
              label="Message"
              name=""
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>USD Totals</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Exchange Rate to USD */}
            <TextFieldElement
              label="Exchange Rate to USD"
              name=""
              type="number"
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Renewal Opportunity</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Renewal Opportunity Status */}
            <AutocompleteElement
              label="Renewal Opportunity Status"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Renewal Opportunity */}
            <AutocompleteElement
              label="Renewal Opportunity"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Renewal Processor Message */}
            <TextareaAutosizeElement
              label="Renewal Processor Message"
              name=""
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Bill to/Ship to Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Bill to Company Name */}
            <TextFieldElement
              label="Bill to Company Name"
              name=""
              size="small"
            />
            {/* Bill to Name */}
            <TextFieldElement label="Bill to Name" name="" size="small" />
            {/* Bill to Address 1 */}
            <TextFieldElement label="Bill to Address 1" name="" size="small" />
            {/* Bill to Address 2 */}
            <TextFieldElement label="Bill to Address 2" name="" size="small" />
            {/* Bill to City */}
            <TextFieldElement label="Bill to City" name="" size="small" />
            {/* Bill to State */}
            <TextFieldElement label="Bill to State" name="" size="small" />
            {/* Bill to Zip Code */}
            <TextFieldElement label="Bill to Zip Code" name="" size="small" />
            {/* Bill to Country */}
            <TextFieldElement label="Bill to Country" name="" size="small" />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Ship to Company Name */}
            <TextFieldElement
              label="Ship to Company Name"
              name=""
              size="small"
            />
            {/* Ship to Name */}
            <TextFieldElement label="Ship to Name" name="" size="small" />
            {/* Ship to Address 1 */}
            <TextFieldElement label="Ship to Address 1" name="" size="small" />
            {/* Ship to Address 2 */}
            <TextFieldElement label="Ship to Address 2" name="" size="small" />
            {/* Ship to City */}
            <TextFieldElement label="Ship to City" name="" size="small" />
            {/* Ship to State */}
            <TextFieldElement label="Ship to State" name="" size="small" />
            {/* Ship to Zip Code */}
            <TextFieldElement label="Ship to Zip Code" name="" size="small" />
            {/* Ship to Country */}
            <TextFieldElement label="Ship to Country" name="" size="small" />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
