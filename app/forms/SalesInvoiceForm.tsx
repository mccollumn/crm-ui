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

type SalesInvoiceFormProps = {
  formTitle: string;
  onSuccess: any;
  onCancel: any;
  defaultValues?: any;
};

const initialValues = {};

export const SalesInvoiceForm = ({
  formTitle,
  onSuccess,
  onCancel,
  defaultValues = initialValues,
  ...props
}: SalesInvoiceFormProps) => {
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
            {/* Sales Invoice Name */}
            <TextFieldElement
              label="Sales Invoice Name"
              name=""
              required
              size="small"
            />
            {/* Document Type */}
            <TextFieldElement label="Document Type" name="" size="small" />
            {/* Account */}
            <AutocompleteElement
              label="Account"
              name=""
              autocompleteProps={{
                autoSelect: true,
                autoHighlight: true,
                size: "small",
              }}
              options={[]}
            />
            {/* End Customer Account */}
            <AutocompleteElement
              label="End Customer Account"
              name=""
              autocompleteProps={{
                autoSelect: true,
                autoHighlight: true,
                size: "small",
              }}
              options={[]}
            />
            {/* Opportunity */}
            <AutocompleteElement
              label="Opportunity"
              name=""
              autocompleteProps={{
                autoSelect: true,
                autoHighlight: true,
                size: "small",
              }}
              options={[]}
            />
            {/* Document Number */}
            <TextFieldElement
              label="Document Number"
              name=""
              required
              size="small"
            />
            {/* Order Number */}
            <TextFieldElement label="Order Number" name="" size="small" />
            {/* Reference Number */}
            <TextFieldElement label="Reference Number" name="" size="small" />
            {/* Terms */}
            <TextFieldElement label="Terms" name="" size="small" />
            {/* Message */}
            <TextareaAutosizeElement
              label="Message"
              name=""
              rows={3}
              size="small"
            />
            {/* Is Channel */}
            <CheckboxElement label="Is Channel" name="" size="small" />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Date */}
            <DateFnsProvider>
              <DatePickerElement
                label="Date"
                name=""
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider>
            {/* Owner */}
            <AutocompleteElement
              label="Owner"
              name=""
              autocompleteProps={{
                autoSelect: true,
                autoHighlight: true,
                size: "small",
              }}
              options={[]}
            />
            {/* State */}
            <TextFieldElement label="State" name="" size="small" />
            {/* Ship Date */}
            <DateFnsProvider>
              <DatePickerElement
                label="Ship Date"
                name=""
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider>
            {/* Currency */}
            <AutocompleteElement
              label="Currency"
              name=""
              autocompleteProps={{
                autoSelect: true,
                autoHighlight: true,
                size: "small",
              }}
              options={[]}
            />
            {/* Intacct Entity */}
            <AutocompleteElement
              label="Intacct Entity"
              name=""
              autocompleteProps={{
                autoSelect: true,
                autoHighlight: true,
                size: "small",
              }}
              options={[]}
            />
            {/* Parent Entity */}
            <AutocompleteElement
              label="Parent Entity"
              name=""
              autocompleteProps={{
                autoSelect: true,
                autoHighlight: true,
                size: "small",
              }}
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
            {/* Migration External ID */}
            <TextFieldElement
              label="Migration External ID"
              name=""
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Payment Info</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Payment Status */}
            <TextFieldElement label="Payment Status" name="" size="small" />
            {/* Amount Due */}
            <TextFieldElement
              label="Amount Due"
              name=""
              type="number"
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Invoice Amount */}
            <TextFieldElement
              label="Invoice Amount"
              name=""
              type="number"
              size="small"
            />
            {/* Amount Paid */}
            <TextFieldElement
              label="Amount Paid"
              name=""
              type="number"
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
