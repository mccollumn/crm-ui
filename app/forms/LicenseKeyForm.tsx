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

type LicenseKeyFormProps = {
  formTitle: string;
  onSuccess: any;
  onCancel: any;
  defaultValues?: any;
};

const initialValues = {};

export const LicenseKeyForm = ({
  formTitle,
  onSuccess,
  onCancel,
  defaultValues = initialValues,
  ...props
}: LicenseKeyFormProps) => {
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
            {/* License Key */}
            <TextFieldElement
              label="License Key"
              name=""
              required
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
            {/* Key Type */}
            <AutocompleteElement
              label="Key Type"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Page Views */}
            <TextFieldElement
              label="Page Views"
              name=""
              type="number"
              size="small"
            />
            {/* Events */}
            <TextFieldElement
              label="Events"
              name=""
              type="number"
              size="small"
            />
            {/* Maintenance Expiration Date */}
            <DateFnsProvider>
              <DatePickerElement label="Maintenance Expiration Date" name="" />
            </DateFnsProvider>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Parent Key */}
            <TextFieldElement label="Parent Key" name="" size="small" />
            {/* Original Version */}
            <TextFieldElement label="Original Version" name="" size="small" />
            {/* Version */}
            <TextFieldElement label="Version" name="" size="small" />
            {/* Status */}
            <AutocompleteElement
              label="Status"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* System Status */}
            <AutocompleteElement
              label="System Status"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Notes */}
            <TextareaAutosizeElement
              label="Notes"
              name=""
              rows={3}
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
        <FormDivider>Auth Key Related Info</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Anniversary Date */}
            <DateFnsProvider>
              <DatePickerElement label="Anniversary Date" name="" />
            </DateFnsProvider>
          </Stack>
        </Grid>
        <FormDivider>AddOn Key Related Info</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Is Applied */}
            <CheckboxElement label="Is Applied" name="" size="small" />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Last Applied Date */}
            <DateFnsProvider>
              <DatePickerElement label="Last Applied Date" name="" />
            </DateFnsProvider>
          </Stack>
        </Grid>
        <FormDivider>Activation Info</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Activated Version */}
            <TextFieldElement label="Activated Version" name="" size="small" />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Activation Date */}
            <DateFnsProvider>
              <DatePickerElement label="Activation Date" name="" />
            </DateFnsProvider>
          </Stack>
        </Grid>
        <FormDivider>System Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Key Created By */}
            <TextFieldElement
              label="Key Created By"
              name=""
              required
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Key Created Date */}
            <DateFnsProvider>
              <DatePickerElement label="Key Created Date" name="" required />
            </DateFnsProvider>
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
