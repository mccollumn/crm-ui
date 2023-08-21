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

type ContactFormProps = {
  formTitle: string;
  onSuccess: any;
  onCancel: any;
  defaultValues?: any;
};

const initialValues = {};

export const ContactForm = ({
  formTitle,
  onSuccess,
  onCancel,
  defaultValues = initialValues,
  ...props
}: ContactFormProps) => {
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
        <FormDivider>Contact Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Contact Owner */}
            <AutocompleteElement
              label="Contact Owner"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            <p>
              <b>Name</b>
            </p>
            {/* Salutation */}
            <AutocompleteElement
              label="Salutation"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* First Name */}
            <TextFieldElement label="First Name" name="" size="small" />
            {/* Last Name */}
            <TextFieldElement label="Last Name" name="" required size="small" />
            {/* Account Name */}
            <AutocompleteElement
              label="Account Name"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Title */}
            <TextFieldElement label="Title" name="" size="small" />
            {/* Reports To */}
            <AutocompleteElement
              label="Reports To"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Job Role */}
            <AutocompleteElement
              label="Job Role"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Contact Role */}
            <AutocompleteElement
              label="Contact Role"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Email */}
            <TextFieldElement
              label="Email"
              name=""
              required
              size="small"
              type="email"
            />
            {/* Unconfirmed Email */}
            <CheckboxElement label="Unconfirmed Email" name="" size="small" />
            {/* Most Recent Product Interest */}
            <AutocompleteElement
              label="Most Recent Product Interest"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Interest */}
            <MultiSelectElement
              label="Interest"
              name=""
              preserveOrder
              showChips
              options={[]}
            />
            {/* Do Not Send Support Survey */}
            <CheckboxElement
              label="Do Not Send Support Survey"
              name=""
              size="small"
            />
            {/* Webtrends OC */}
            <AutocompleteElement
              label="Webtrends OC"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* HTML Login */}
            <CheckboxElement label="HTML Login" name="" size="small" />
            {/* Flash Login */}
            <CheckboxElement label="Flash Login" name="" size="small" />
            {/* EOL Product */}
            <TextFieldElement label="EOL Product" name="" size="small" />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Relationship to Webtrends */}
            <MultiSelectElement
              label="Relationship to Webtrends"
              name=""
              preserveOrder
              showChips
              options={[]}
            />
            {/* Contact Status */}
            <AutocompleteElement
              label="Contact Status"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* MQL Date */}
            <DateFnsProvider>
              <DatePickerElement label="MQL Date" name="" />
            </DateFnsProvider>
            {/* Lead Source */}
            <AutocompleteElement
              label="Lead Source"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Phone */}
            <TextFieldElement label="Phone" name="" size="small" />
            {/* Mobile */}
            <TextFieldElement label="Mobile" name="" size="small" />
            {/* Other Phone */}
            <TextFieldElement label="Other Phone" name="" size="small" />
            {/* Fax */}
            <TextFieldElement label="Fax" name="" size="small" />
            {/* Flash Login */}
            <CheckboxElement label="Flash Login" name="" size="small" />
            {/* Named Support Contact */}
            <AutocompleteElement
              label="Named Support Contact"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Support Contract Administrator */}
            <AutocompleteElement
              label="Support Contract Administrator"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Target Account Type */}
            <AutocompleteElement
              label="Target Account Type"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <FormDivider>Social Media Presence</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* LinkedIn Profile */}
            <TextFieldElement label="LinkedIn Profile" name="" size="small" />
            {/* Social Media Properties */}
            <TextareaAutosizeElement
              label="Social Media Properties"
              name=""
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Marked for Deletion */}
            <CheckboxElement label="Marked for Deletion" name="" size="small" />
            {/* Twitter ID */}
            <TextFieldElement label="Twitter ID" name="" size="small" />
          </Stack>
        </Grid>
        <FormDivider>Address Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            <p>
              <b>Mailing Address</b>
            </p>
            {/* Mailing Street */}
            <TextareaAutosizeElement
              label="Mailing Street"
              name=""
              rows={3}
              size="small"
            />
            {/* Mailing City */}
            <TextFieldElement label="Mailing City" name="" size="small" />
            {/* Mailing State/Province */}
            <TextFieldElement
              label="Mailing State/Province"
              name=""
              size="small"
            />
            {/* Mailing Zip/Postal Code */}
            <TextFieldElement
              label="Mailing Zip/Postal Code"
              name=""
              size="small"
            />
            {/* Mailing Country */}
            <TextFieldElement label="Mailing Country" name="" size="small" />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            <p>
              <b>Other Address</b>
            </p>
            {/* Other Street */}
            <TextareaAutosizeElement
              label="Other Street"
              name=""
              rows={3}
              size="small"
            />
            {/* Other City */}
            <TextFieldElement label="Other City" name="" size="small" />
            {/* Other State/Province */}
            <TextFieldElement
              label="Other State/Province"
              name=""
              size="small"
            />
            {/* Other Zip/Postal Code */}
            <TextFieldElement
              label="Other Zip/Postal Code"
              name=""
              size="small"
            />
            {/* Other Country */}
            <TextFieldElement label="Other Country" name="" size="small" />
            {/* Super Region */}
            <AutocompleteElement
              label="Super Region"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <FormDivider>ADR/ISR Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* ADR/ISR Generated */}
            <AutocompleteElement
              label="ADR/ISR Generated"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Meeting Scheduled Date */}
            <DateFnsProvider>
              <DatePickerElement label="Meeting Scheduled Date" name="" />
            </DateFnsProvider>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Meeting Rescheduled Date */}
            <DateFnsProvider>
              <DatePickerElement label="Meeting Rescheduled Date" name="" />
            </DateFnsProvider>
            {/* Meeting Occurred Date */}
            <DateFnsProvider>
              <DatePickerElement label="Meeting Occurred Date" name="" />
            </DateFnsProvider>
          </Stack>
        </Grid>
        <FormDivider>Description Information</FormDivider>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {/* Product Interest */}
            <MultiSelectElement
              label="Product Interest"
              name=""
              preserveOrder
              showChips
              options={[]}
            />
            {/* Comments */}
            <TextareaAutosizeElement
              label="Comments"
              name=""
              rows={3}
              size="small"
            />
            {/* Lead Notes */}
            <TextareaAutosizeElement
              label="Lead Notes"
              name=""
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Marketing Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Lead Source Details */}
            <TextFieldElement
              label="Lead Source Details"
              name=""
              size="small"
            />
            {/* Lead Source Original */}
            <TextFieldElement
              label="Lead Source Original"
              name=""
              size="small"
            />
            {/* Lead Source Details Original */}
            <TextFieldElement
              label="Lead Source Details Original"
              name=""
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Email Remarketing Lead Date */}
            <DateFnsProvider>
              <DatePickerElement label="Email Remarketing Lead Date" name="" />
            </DateFnsProvider>
            {/* Most Recent Activity */}
            <TextFieldElement
              label="Most Recent Activity"
              name=""
              size="small"
            />
            {/* Most Recent Response Type */}
            <TextFieldElement
              label="Most Recent Response Type"
              name=""
              size="small"
            />
            {/* SharePoint Contact */}
            <CheckboxElement label="SharePoint Contact" name="" size="small" />
          </Stack>
        </Grid>
        <FormDivider>Demographic Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Preferred Language */}
            <AutocompleteElement
              label="Preferred Language"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Time Zone */}
            <AutocompleteElement
              label="Time Zone"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <FormDivider>Communication Preferences</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Email Opt Out */}
            <CheckboxElement label="Email Opt Out" name="" size="small" />
            {/* Do Not Call */}
            <CheckboxElement label="Do Not Call" name="" size="small" />
            {/* No Install Admin Newsletter */}
            <CheckboxElement
              label="No Install Admin Newsletter"
              name=""
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Double Opt-In */}
            <CheckboxElement label="Double Opt-In" name="" size="small" />
            {/* Double Opt-In Timestamp */}
            <DateFnsProvider>
              <DateTimePickerElement label="Double Opt-In Timestamp" name="" />
            </DateFnsProvider>
          </Stack>
        </Grid>
        <FormDivider>System Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* NPS Score */}
            <AutocompleteElement
              label="NPS Score"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* NPS Reason Promoter */}
            <TextareaAutosizeElement
              label="NPS Reason Promoter"
              name=""
              rows={3}
              size="small"
            />
            {/* Default Account */}
            <CheckboxElement label="Default Account" name="" size="small" />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* NPS Comments */}
            <TextareaAutosizeElement
              label="NPS Comments"
              name=""
              rows={3}
              size="small"
            />
            {/* NPS Reason Detractor */}
            <TextareaAutosizeElement
              label="NPS Reason Detractor"
              name=""
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
