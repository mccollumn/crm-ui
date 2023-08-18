import { FormWrapper } from "./FormWrapper";
import { FormDivider } from "./FormDivider";
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
import DateFnsProvider from "../providers/DateFnsProvider";

type QuoteFormProps = {
  formTitle: string;
  onSuccess: any;
  onCancel: any;
  defaultValues?: any;
};

const initialValues = {
  owner: "",
  opportunity: "",
  isChannel: false,
  comments: "",
  status: "1 - NEW",
  officeLocation: "",
};

export const QuoteForm = ({
  formTitle,
  onSuccess,
  onCancel,
  defaultValues = initialValues,
  ...props
}: QuoteFormProps) => {
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
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Opportunity */}
            <AutocompleteElement
              label="Opportunity"
              name="opportunity"
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Is Channel */}
            <CheckboxElement label="Is Channel" name="isChannel" size="small" />
            {/* Additional Quote Comments */}
            <TextareaAutosizeElement
              label="Additional Quote Comments"
              name="comments"
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
              options={[]}
              autocompleteProps={{ size: "small" }}
            />
            {/* Quote Office Location */}
            <AutocompleteElement
              label="Quote Office Location"
              name="officeLocation"
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Currency */}
            <AutocompleteElement
              label="Currency"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Valid Through */}
            <DateFnsProvider>
              <DatePickerElement label="Valid Through" name="" />
            </DateFnsProvider>
            {/* Primary */}
            <CheckboxElement label="Primary" name="" size="small" />
          </Stack>
        </Grid>
        <FormDivider>Audit Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Audit Status */}
            <AutocompleteElement
              label="Audit Status"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Audit Notes */}
            <TextareaAutosizeElement
              label="Audit Notes"
              name="auditNotes"
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
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Payment Method */}
            <TextFieldElement label="Payment Method" name="" size="small" />
            {/* Migration External ID */}
            <TextFieldElement
              label="Migration External ID"
              name=""
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Billing Frequency */}
            <AutocompleteElement
              label="Billing Frequency"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Payment Terms */}
            <AutocompleteElement
              label="Payment Terms"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Terms Audit */}
            <AutocompleteElement
              label="Terms Audit"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <FormDivider>Send Quote</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Quote Last Send Date */}
            <DateFnsProvider>
              <DateTimePickerElement label="Quote Last Send Date" name="" />
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
            <TextareaAutosizeElement
              label="Sales Notes to OM"
              name=""
              rows={3}
              size="small"
            />
            {/* Order Management Comments */}
            <TextareaAutosizeElement
              label="Order Management Comments"
              name=""
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Current Financial Exchange Rate to USD */}
            <TextFieldElement
              label="Current Financial Exchange Rate to USD"
              name=""
              type="number"
              size="small"
            />
            {/* Discount Reason */}
            <TextareaAutosizeElement
              label="Discount Reason"
              name=""
              rows={3}
              size="small"
            />
            {/* Discount Reasons */}
            <MultiSelectElement
              label="Discount Reasons"
              name=""
              preserveOrder
              showChips
              options={[]}
            />
          </Stack>
        </Grid>
        <FormDivider>Entitlements</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Analytics Page Views */}
            <TextFieldElement
              label="Analytics Page Views"
              name=""
              type="number"
              size="small"
            />
            {/* Analytics Server Calls */}
            <TextFieldElement
              label="Analytics Server Calls"
              name=""
              type="number"
              size="small"
            />
            {/* Segment Events */}
            <TextFieldElement
              label="Segment Events"
              name=""
              type="number"
              size="small"
            />
            {/* Spotimize Events */}
            <TextFieldElement
              label="Spotimize Events"
              name=""
              type="number"
              size="small"
            />
            {/* Streams Events */}
            <TextFieldElement
              label="Streams Events"
              name=""
              type="number"
              size="small"
            />
            {/* Refresh Entitlement Data */}
            <CheckboxElement
              label="Refresh Entitlement Data"
              name=""
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Analytics Page Views */}
            <TextFieldElement
              label="Existing Analytics Page Views"
              name=""
              type="number"
              size="small"
            />
            {/* Analytics Server Calls */}
            <TextFieldElement
              label="Existing Analytics Server Calls"
              name=""
              type="number"
              size="small"
            />
            {/* Segment Events */}
            <TextFieldElement
              label="Existing Segment Events"
              name=""
              type="number"
              size="small"
            />
            {/* Spotimize Events */}
            <TextFieldElement
              label="Existing Spotimize Events"
              name=""
              type="number"
              size="small"
            />
            {/* Streams Events */}
            <TextFieldElement
              label="Existing Streams Events"
              name=""
              type="number"
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Intacct Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Intacct Entity */}
            <AutocompleteElement
              label="Intacct Entity"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Order Date */}
            <DateFnsProvider>
              <DatePickerElement label="Order Date" name="" />
            </DateFnsProvider>
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
