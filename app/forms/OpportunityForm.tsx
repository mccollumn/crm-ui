import { FormWrapper } from "./FormWrapper";
import { FormDivider } from "./FormDivider";
import { Grid, Stack } from "@mui/material";
import {
  AutocompleteElement,
  CheckboxElement,
  DatePickerElement,
  MultiSelectElement,
  TextFieldElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import DateFnsProvider from "../providers/DateFnsProvider";

type OpportunityFormProps = {
  formTitle: string;
  onSuccess: any;
  onCancel: any;
  defaultValues?: any;
};

const initialValues = {};

export const OpportunityForm = ({
  formTitle,
  onSuccess,
  onCancel,
  defaultValues = initialValues,
  ...props
}: OpportunityFormProps) => {
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
        <FormDivider>Opportunity Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Opportunity Owner */}
            <AutocompleteElement
              label="Opportunity Owner"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Opportunity Name */}
            <TextFieldElement
              label="Opportunity Name"
              name=""
              required
              size="small"
            />
            {/* Account Name */}
            <AutocompleteElement
              label="Account Name"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Opportunity Type */}
            <AutocompleteElement
              label="Opportunity Type"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Product */}
            <AutocompleteElement
              label="Product"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Product Family */}
            <AutocompleteElement
              label="Product Family"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Interest */}
            <MultiSelectElement
              label="Interest"
              name=""
              required
              preserveOrder
              showChips
              options={[]}
            />
            {/* Contains New Business */}
            <CheckboxElement
              label="Contains New Business"
              name=""
              size="small"
            />
            {/* Ops Audit */}
            <CheckboxElement label="Ops Audit" name="" size="small" />
            {/* Order Exception */}
            <CheckboxElement label="Order Exception" name="" size="small" />
            {/* Order Exception Notes */}
            <TextareaAutosizeElement
              label="Order Exception Notes"
              name=""
              rows={3}
              size="small"
            />
            {/* Split Opportunity */}
            <CheckboxElement label="Split Opportunity" name="" size="small" />
            {/* Quarter Bank */}
            <CheckboxElement label="Quarter Bank" name="" size="small" />
            {/* Fast Notes/Next Steps */}
            <TextareaAutosizeElement
              label="Fast Notes/Next Steps"
              name=""
              rows={3}
              size="small"
            />
            {/* Optimize Product Type */}
            <AutocompleteElement
              label="Optimize Product Type"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Migration External ID */}
            <TextFieldElement
              label="Migration External ID"
              name=""
              type="number"
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Opportunity Record Type */}
            <AutocompleteElement
              label="Opportunity Record Type"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Amount */}
            <TextFieldElement
              label="Amount"
              name=""
              type="number"
              size="small"
            />
            {/* Stage */}
            <AutocompleteElement
              label="Stage"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Close Date */}
            <DateFnsProvider>
              <DatePickerElement label="Close Date" name="" required />
            </DateFnsProvider>
            {/* Probability */}
            <TextFieldElement
              label="Probability"
              name=""
              type="number"
              size="small"
            />
            {/* Forecast Status */}
            <AutocompleteElement
              label="Forecast Status"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Term (months) */}
            <AutocompleteElement
              label="Term (months)"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Multi-Year Year 1 Amount */}
            <TextFieldElement
              label="Multi-Year Year 1 Amount"
              name=""
              type="number"
              size="small"
            />
            {/* CHAMPP */}
            <TextareaAutosizeElement
              label="CHAMPP"
              name=""
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Renewal Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Baseline Renewal Amount */}
            <TextFieldElement
              label="Baseline Renewal Amount"
              name=""
              type="number"
              size="small"
            />
            {/* Services Renewal Amount */}
            <TextFieldElement
              label="Services Renewal Amount"
              name=""
              type="number"
              size="small"
            />
            {/* Multi-Year Add Back */}
            <CheckboxElement label="Multi-Year Add Back" name="" size="small" />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Baseline Renewal Date */}
            <DateFnsProvider>
              <DatePickerElement label="Baseline Renewal Date" name="" />
            </DateFnsProvider>
            {/* Renewal Status */}
            <AutocompleteElement
              label="Renewal Status"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Renewal Status Comments & Next Steps */}
            <TextareaAutosizeElement
              label="Renewal Status Comments & Next Steps"
              name=""
              rows={3}
              size="small"
            />
            {/* Resell */}
            <AutocompleteElement
              label="Resell"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <FormDivider>Additional Information</FormDivider>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {/* Opportunity Notes */}
            <TextareaAutosizeElement
              label="Opportunity Notes"
              name=""
              rows={3}
              size="small"
            />
            {/* Compelling Event */}
            <TextareaAutosizeElement
              label="Compelling Event"
              name=""
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Win/Loss/Competitive Detail</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Winner */}
            <AutocompleteElement
              label="Winner"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Current/Prior Vendor */}
            <AutocompleteElement
              label="Current/Prior Vendor"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Win Type */}
            <AutocompleteElement
              label="Win Type"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Competitors */}
            <MultiSelectElement
              label="Competitors"
              name=""
              preserveOrder
              showChips
              options={[]}
            />
            {/* Business Value of Solution to Customer */}
            <TextareaAutosizeElement
              label="Business Value of Solution to Customer"
              name=""
              rows={3}
              size="small"
            />
            {/* Change from Renewal Baseline Reason */}
            <TextareaAutosizeElement
              label="Change from Renewal Baseline Reason"
              name=""
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Primary Win/Loss Reason */}
            <AutocompleteElement
              label="Primary Win/Loss Reason"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Primary Win/Loss Detail */}
            <TextareaAutosizeElement
              label="Primary Win/Loss Detail"
              name=""
              rows={3}
              size="small"
            />
            {/* Secondary Win/Loss Reason */}
            <AutocompleteElement
              label="Secondary Win/Loss Reason"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Secondary Win/Loss Detail */}
            <TextareaAutosizeElement
              label="Secondary Win/Loss Detail"
              name=""
              rows={3}
              size="small"
            />
            {/* Additional Win/Loss Detail */}
            <TextareaAutosizeElement
              label="Additional Win/Loss Detail"
              name=""
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Partner Details</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Originating Partner */}
            <AutocompleteElement
              label="Originating Partner"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Fulfilling Partner */}
            <AutocompleteElement
              label="Fulfilling Partner"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Referring Partner */}
            <AutocompleteElement
              label="Referring Partner"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Influencing Partner */}
            <AutocompleteElement
              label="Influencing Partner"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Channel Deal */}
            <CheckboxElement label="Channel Deal" name="" size="small" />
          </Stack>
        </Grid>
        <FormDivider>Solutions Engineering</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* SE Involved */}
            <AutocompleteElement
              label="SE Involved"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Product Fit */}
            <AutocompleteElement
              label="Product Fit"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* SE Engagement */}
            <AutocompleteElement
              label="SE Engagement"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* SE Next Steps */}
            <TextareaAutosizeElement
              label="SE Next Steps"
              name=""
              rows={3}
              size="small"
            />
            {/* SE Comments */}
            <TextareaAutosizeElement
              label="SE Comments"
              name=""
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Clarizen Project Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Project Trigger Type */}
            <TextFieldElement
              label="Project Trigger Type"
              name=""
              size="small"
            />
            {/* Parent Project ID */}
            <TextFieldElement label="Parent Project ID" name="" size="small" />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Order Number */}
            <TextFieldElement label="Order Number" name="" size="small" />
            {/* Order Date */}
            <DateFnsProvider>
              <DatePickerElement label="Order Date" name="" />
            </DateFnsProvider>
          </Stack>
        </Grid>
        <FormDivider>Marketing Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Lead Source */}
            <AutocompleteElement
              label="Lead Source"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Initial Contact Email */}
            <TextFieldElement
              label="Initial Contact Email"
              name=""
              size="small"
            />
            {/* Original Campaign Source */}
            <AutocompleteElement
              label="Original Campaign Source"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Primary Campaign Source */}
            <AutocompleteElement
              label="Primary Campaign Source"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Marketing Generated */}
            <CheckboxElement label="Marketing Generated" name="" size="small" />
          </Stack>
        </Grid>
        <FormDivider>Commission Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Sales Rep ID */}
            <TextFieldElement label="Sales Rep ID" name="" size="small" />
            {/* SharePoint Overlay Contributor */}
            <AutocompleteElement
              label="SharePoint Overlay Contributor"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Exception */}
            <CheckboxElement label="Exception" name="" size="small" />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Commission Comments */}
            <TextareaAutosizeElement
              label="Commission Comments"
              name=""
              rows={3}
              size="small"
            />
            {/* OD Switcher */}
            <CheckboxElement label="OD Switcher" name="" size="small" />
            {/* Multi-Year Uplift */}
            <CheckboxElement label="Multi-Year Uplift" name="" size="small" />
          </Stack>
        </Grid>
        <FormDivider>Stage Tracking Information</FormDivider>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {/* Converted from Lead ID */}
            <TextFieldElement
              label="Converted from Lead ID"
              name=""
              size="small"
            />
            {/* Stage 1 Date */}
            <TextFieldElement label="Stage 1 Date" name="" size="small" />
            {/* Stage 2 Date */}
            <TextFieldElement label="Stage 2 Date" name="" size="small" />
            {/* Stage 3 Date */}
            <TextFieldElement label="Stage 3 Date" name="" size="small" />
            {/* Stage 4 Date */}
            <TextFieldElement label="Stage 4 Date" name="" size="small" />
            {/* Stage 5 Date */}
            <TextFieldElement label="Stage 5 Date" name="" size="small" />
          </Stack>
        </Grid>
        <FormDivider>System Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Holdover Expiration */}
            <DateFnsProvider>
              <DatePickerElement label="Holdover Expiration" name="" />
            </DateFnsProvider>
            {/* Type */}
            <AutocompleteElement
              label="Type"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Refresh Product Family */}
            <CheckboxElement
              label="Refresh Product Family"
              name=""
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Territory Override */}
            <AutocompleteElement
              label="Territory Override"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Territory Tracker */}
            <TextFieldElement label="Territory Tracker" name="" size="small" />
            {/* Deal Alert Sent */}
            <CheckboxElement label="Deal Alert Sent" name="" size="small" />
            {/* Quote Submitted */}
            <CheckboxElement label="Quote Submitted" name="" size="small" />
            {/* Do Not Run Trigger Test */}
            <CheckboxElement
              label="Do Not Run Trigger Test"
              name=""
              size="small"
            />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
