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

type AssetFormProps = {
  formTitle: string;
  onSuccess: any;
  onCancel: any;
  defaultValues?: any;
};

const initialValues = {};

export const AssetForm = ({
  formTitle,
  onSuccess,
  onCancel,
  defaultValues = initialValues,
  ...props
}: AssetFormProps) => {
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
            {/* Asset Name */}
            <TextFieldElement
              label="Asset Name"
              name=""
              required
              size="small"
            />
            {/* Product */}
            <AutocompleteElement
              label="Product"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Serial Number */}
            <TextFieldElement
              label="Serial Number"
              name=""
              type="number"
              size="small"
            />
            {/* Account */}
            <AutocompleteElement
              label="Account"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Opportunity */}
            <AutocompleteElement
              label="Opportunity"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Contact */}
            <AutocompleteElement
              label="Contact"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Status */}
            <AutocompleteElement
              label="Status"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Quantity */}
            <TextFieldElement
              label="Quantity"
              name=""
              type="number"
              size="small"
            />
            {/* Is Term License */}
            <CheckboxElement label="Is Term License" name="" size="small" />
            {/* Purchase Date */}
            <DateFnsProvider>
              <DatePickerElement label="Purchase Date" name="" />
            </DateFnsProvider>
            {/* Has Master */}
            <CheckboxElement label="Has Master" name="" size="small" />
            {/* Migration External ID */}
            <TextFieldElement
              label="Migration External ID"
              name=""
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {/* Description */}
            <TextareaAutosizeElement
              label="Description"
              name=""
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Support Details</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Anniversary Date */}
            <DateFnsProvider>
              <DatePickerElement label="Anniversary Date" name="" />
            </DateFnsProvider>
          </Stack>
        </Grid>
        <FormDivider>Activation Info</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Support Plan Type */}
            <AutocompleteElement
              label="Support Plan Type"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Support Plan Begin */}
            <DateFnsProvider>
              <DatePickerElement label="Support Plan Begin" name="" />
            </DateFnsProvider>
            {/* Support Plan End */}
            <DateFnsProvider>
              <DatePickerElement label="Support Plan End" name="" />
            </DateFnsProvider>
          </Stack>
        </Grid>
        <FormDivider>System Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* PV */}
            <TextFieldElement label="PV" name="" type="number" size="small" />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
