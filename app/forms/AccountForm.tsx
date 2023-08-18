import { FormWrapper } from "./FormWrapper";
import { FormDivider } from "./FormDivider";
import {
  AutocompleteElement,
  CheckboxElement,
  DatePickerElement,
  TextFieldElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import { Grid, Stack } from "@mui/material";
import DateFnsProvider from "../providers/DateFnsProvider";

type CaseFormProps = {
  formTitle: string;
  onSuccess: any;
  onCancel: any;
  defaultValues?: any;
};

const initialValues = {};

export const AccountForm = ({
  formTitle,
  onSuccess,
  onCancel,
  defaultValues = initialValues,
  ...props
}: CaseFormProps) => {
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
        <FormDivider>Account Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Account Owner */}
            <AutocompleteElement
              label="Account Owner"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Account Name */}
            <TextFieldElement
              label="Account Name"
              name=""
              required
              size="small"
            />
            {/* Alternate Account Name */}
            <TextFieldElement
              label="Alternate Account Name"
              name=""
              size="small"
            />
            {/* Parent Account */}
            <AutocompleteElement
              label="Parent Account"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Account Record Type */}
            <AutocompleteElement
              label="Account Record Type"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Account Type */}
            <AutocompleteElement
              label="Account Type"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Type Last Change Date */}
            <DateFnsProvider>
              <DatePickerElement label="Type Last Change Date" name="" />
            </DateFnsProvider>
            {/* Vertical */}
            <AutocompleteElement
              label="Vertical"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Website */}
            <TextFieldElement label="Website" name="" size="small" />
            {/* Misc. Info */}
            <TextFieldElement label="Misc. Info" name="" size="small" />
            {/* Migrate to New Org */}
            <AutocompleteElement
              label="Migrate to New Org"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
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
            {/* Client Health */}
            <AutocompleteElement
              label="Client Health"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Client Unhealthy Reason */}
            <AutocompleteElement
              label="Client Unhealthy Reason"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Client Unhealthy Reason Other */}
            <TextareaAutosizeElement
              label="Client Unhealthy Reason Other"
              name=""
              rows={3}
              size="small"
            />
            {/* Fax */}
            <TextFieldElement label="Fax" name="" size="small" />
            {/* Phone */}
            <TextFieldElement label="Phone" name="" size="small" />
            {/* Target Account Type */}
            <AutocompleteElement
              label="Target Account Type"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Global Account */}
            <CheckboxElement label="Global Account" name="" size="small" />
            {/* USD Total Order Value */}
            <TextFieldElement
              label="USD Total Order Value"
              name=""
              size="small"
            />
            {/* Is Federal */}
            <CheckboxElement label="Is Federal" name="" size="small" />
            {/* Is State */}
            <CheckboxElement label="Is State" name="" size="small" />
            {/* Territory */}
            <AutocompleteElement
              label="Territory"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Region */}
            <AutocompleteElement
              label="Region"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Super Region */}
            <AutocompleteElement
              label="Super Region"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
              required
            />
            {/* MSA */}
            <CheckboxElement label="MSA" name="" size="small" />
            {/* Partner Status */}
            <AutocompleteElement
              label="Partner Status"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <FormDivider>Address Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            <p>
              <b>Billing Address</b>
            </p>
            {/* Billing Street */}
            <TextareaAutosizeElement
              label="Billing Street"
              name=""
              rows={3}
              size="small"
            />
            {/* Billing City */}
            <TextFieldElement label="Billing City" name="" size="small" />
            {/* Billing State/Province */}
            <TextFieldElement
              label="Billing State/Province"
              name=""
              size="small"
            />
            {/* Billing Zip/Postal Code */}
            <TextFieldElement
              label="Billing Zip/Postal Code"
              name=""
              size="small"
            />
            {/* Billing Country */}
            <TextFieldElement label="Billing Country" name="" size="small" />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            <p>
              <b>Shipping Address</b>
            </p>
            {/* Shipping Street */}
            <TextareaAutosizeElement
              label="Shipping Street"
              name=""
              rows={3}
              size="small"
            />
            {/* Shipping City */}
            <TextFieldElement label="Shipping City" name="" size="small" />
            {/* Shipping State/Province */}
            <TextFieldElement
              label="Shipping State/Province"
              name=""
              size="small"
            />
            {/* Shipping Zip/Postal Code */}
            <TextFieldElement
              label="Shipping Zip/Postal Code"
              name=""
              size="small"
            />
            {/* Shipping Country */}
            <TextFieldElement label="Shipping Country" name="" size="small" />
          </Stack>
        </Grid>
        <FormDivider>Account Credit Status</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Credit Last Modified */}
            <DateFnsProvider>
              <DatePickerElement label="Credit Last Modified" name="" />
            </DateFnsProvider>
            {/* Credit Status */}
            <AutocompleteElement
              label="Credit Status"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Credit Denied Reason */}
            <TextFieldElement
              label="Credit Denied Reason"
              name=""
              rows={3}
              size="small"
            />
            {/* Credit Global Fortune 500 */}
            <CheckboxElement
              label="Credit Global Fortune 500"
              name=""
              size="small"
            />
            {/* Auto Renew */}
            <CheckboxElement
              label="Credit Global Fortune 500"
              name=""
              size="small"
            />
            {/* Cancellation Notice */}
            <TextFieldElement
              label="Cancellation Notice"
              name=""
              size="small"
            />
            {/* Auto Renew Notes */}
            <TextareaAutosizeElement
              label="Auto Renew Notes"
              name=""
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Credit Limit */}
            <TextFieldElement
              label="Credit Limit"
              name=""
              type="number"
              size="small"
            />
            {/* PO Required */}
            <AutocompleteElement
              label="PO Required"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* PO Required Notes */}
            <TextareaAutosizeElement
              label="PO Required Notes"
              name=""
              rows={3}
              size="small"
            />
            {/* Credit Notes */}
            <TextareaAutosizeElement
              label="Credit Notes"
              name=""
              rows={3}
              size="small"
            />
            {/* No Accounting Communication */}
            <CheckboxElement
              label="No Accounting Communication"
              name=""
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Collections</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Collections Contact */}
            <AutocompleteElement
              label="Collections Contact"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Collection Status */}
            <TextFieldElement label="Collection Status" name="" size="small" />
            {/* Collection Past Due Amount */}
            <TextFieldElement
              label="Collection Status"
              name=""
              type="number"
              size="small"
            />
            {/* Anticipated Suspension Date */}
            <TextFieldElement
              label="Anticipated Suspension Date"
              name=""
              size="small"
            />
            {/* Passed to Debt Collection Date */}
            <TextFieldElement
              label="Passed to Debt Collection Date"
              name=""
              size="small"
            />
            {/* Collections Correspondence */}
            <TextareaAutosizeElement
              label="Collections Correspondence"
              name=""
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Credit Hold */}
            <CheckboxElement label="Credit Hold" name="" size="small" />
            {/* Support Account Alert */}
            <TextareaAutosizeElement
              label="Support Account Alert"
              name=""
              rows={3}
              size="small"
            />
            {/* No Technical Support */}
            <CheckboxElement
              label="No Technical Support"
              name=""
              size="small"
            />
            {/* Service Suspended */}
            <CheckboxElement label="Service Suspended" name="" size="small" />
            {/* Services to be Suspended */}
            <TextFieldElement
              label="Passed to Debt Collection Date"
              name=""
              size="small"
            />
            {/* Services Suspension Date */}
            <TextFieldElement
              label="Services Suspension Date"
              name=""
              size="small"
            />
            {/* Last Conversation Note */}
            <TextareaAutosizeElement
              label="Last Conversation Note"
              name=""
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Additional Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Analytics Vendor */}
            <AutocompleteElement
              label="Analytics Vendor"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Optimize Vendor */}
            <AutocompleteElement
              label="Optimize Vendor"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Big Data Connector */}
            <TextFieldElement label="Big Data Connector" name="" size="small" />
            {/* Email Vendor */}
            <AutocompleteElement
              label="Email Vendor"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Description */}
            <TextareaAutosizeElement
              label="Description"
              name=""
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Analytics Vendor Contract End */}
            <DateFnsProvider>
              <DatePickerElement
                label="Analytics Vendor Contract End"
                name=""
              />
            </DateFnsProvider>
            {/* Optimize Vendor Contract End */}
            <DateFnsProvider>
              <DatePickerElement label="Optimize Vendor Contract End" name="" />
            </DateFnsProvider>
            {/* Health Check */}
            <TextareaAutosizeElement
              label="Health Check"
              name=""
              rows={3}
              size="small"
            />
            {/* SharePoint Site */}
            <CheckboxElement label="SharePoint Site" name="" size="small" />
          </Stack>
        </Grid>
        <FormDivider>Total Order Value of Products Owned</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* USD Total Analytics */}
            <TextFieldElement
              label="USD Total Analytics"
              name=""
              type="number"
              size="small"
            />
            {/* USD Total VDM */}
            <TextFieldElement
              label="USD Total VDM"
              name=""
              type="number"
              size="small"
            />
            {/* USD Total Optimize */}
            <TextFieldElement
              label="USD Total Optimize"
              name=""
              type="number"
              size="small"
            />
            {/* USD Total Services */}
            <TextFieldElement
              label="USD Total Services"
              name=""
              type="number"
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* USD Total Ads */}
            <TextFieldElement
              label="USD Total Ads"
              name=""
              type="number"
              size="small"
            />
            {/* USD Total Apps */}
            <TextFieldElement
              label="USD Total Apps"
              name=""
              type="number"
              size="small"
            />
            {/* USD Total Other */}
            <TextFieldElement
              label="USD Total Other"
              name=""
              type="number"
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Additional Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* OP Customer */}
            <CheckboxElement label="OP Customer" name="" size="small" />
            {/* Annual Server Calls */}
            <AutocompleteElement
              label="Annual Server Calls"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Alexa Ranking */}
            <TextFieldElement
              label="Alexa Ranking"
              name=""
              type="number"
              size="small"
            />
            {/* Alexa Ranking Top 10,000 */}
            <CheckboxElement
              label="Alexa Ranking Top 10,000"
              name=""
              size="small"
            />
            {/* eCommerce */}
            <CheckboxElement label="eCommerce" name="" size="small" />
            {/* Monthly Ad Spend */}
            <TextFieldElement
              label="Monthly Ad Spend"
              name=""
              type="number"
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* comScore Annual Page Views */}
            <TextFieldElement
              label="comScore Annual Page Views"
              name=""
              type="number"
              size="small"
            />
            {/* comScore Daily Visitors */}
            <TextFieldElement
              label="comScore Daily Visitors"
              name=""
              type="number"
              size="small"
            />
            {/* comScore Ranking */}
            <TextFieldElement
              label="comScore Ranking"
              name=""
              type="number"
              size="small"
            />
            {/* comScore Unique Monthly Visitors */}
            <TextFieldElement
              label="comScore Unique Monthly Visitors"
              name=""
              type="number"
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Corporate Demographics</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Legal Name */}
            <TextFieldElement
              label="Legal Name"
              name=""
              type="number"
              size="small"
            />
            {/* Industry */}
            <AutocompleteElement
              label="Industry"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Annual Revenue */}
            <TextFieldElement
              label="Annual Revenue"
              name=""
              type="number"
              size="small"
            />
            {/* Employees */}
            <TextFieldElement
              label="Employees"
              name=""
              type="number"
              size="small"
            />
            {/* Location Type */}
            <TextFieldElement label="Location Type" name="" size="small" />
            {/* Ownership */}
            <AutocompleteElement
              label="Ownership"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Tax Exempt */}
            <CheckboxElement label="Tax Exempt" name="" size="small" />
            {/* Tax Exempt ID */}
            <TextFieldElement label="Tax Exempt ID" name="" size="small" />
            {/* Ticker Symbol */}
            <TextFieldElement label="Ticker Symbol" name="" size="small" />
            {/* SIC Code */}
            <TextFieldElement label="SIC Code" name="" size="small" />
            {/* SIC Description */}
            <TextFieldElement label="SIC Description" name="" size="small" />
          </Stack>
        </Grid>
        <FormDivider>Customer Contract Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* On Demand Max Contract End Date */}
            <DateFnsProvider>
              <DatePickerElement
                label="On Demand Max Contract End Date"
                name=""
              />
            </DateFnsProvider>
            {/* Ads Max Contract End Date */}
            <DateFnsProvider>
              <DatePickerElement label="Ads Max Contract End Date" name="" />
            </DateFnsProvider>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Optimize Max Contract End Date */}
            <DateFnsProvider>
              <DatePickerElement
                label="Optimize Max Contract End Date"
                name=""
              />
            </DateFnsProvider>
            {/* Streams Max Contract End Date */}
            <DateFnsProvider>
              <DatePickerElement
                label="Streams Max Contract End Date"
                name=""
              />
            </DateFnsProvider>
          </Stack>
        </Grid>
        <FormDivider>MyWebtrends</FormDivider>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {/* Support Override for Entitlement */}
            <CheckboxElement
              label="Support Override for Entitlement"
              name=""
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Software Entitlement Info</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Software Entitled Server Calls */}
            <TextFieldElement
              label="Software Entitled Server Calls"
              name=""
              type="number"
              size="small"
            />
            {/* Software Entitled Events */}
            <TextFieldElement
              label="Software Entitled Events"
              name=""
              type="number"
              size="small"
            />
            {/* Software Installations */}
            <TextFieldElement
              label="Software Installations"
              name=""
              type="number"
              size="small"
            />
            {/* Software Term License */}
            <CheckboxElement
              label="Software Term License"
              name=""
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Software Base Mnt Expiration Date */}
            <DateFnsProvider>
              <DatePickerElement
                label="Software Base Mnt Expiration Date"
                name=""
              />
            </DateFnsProvider>
            {/* Software Mnt Expiration Date */}
            <DateFnsProvider>
              <DatePickerElement label="Software Mnt Expiration Date" name="" />
            </DateFnsProvider>
            {/* Software Most Recent Activated Version */}
            <TextFieldElement
              label="Software Most Recent Activated Version"
              name=""
              type="number"
              size="small"
            />
            {/* Extended Maintenance for Legacy End Date */}
            <DateFnsProvider>
              <DatePickerElement
                label="Extended Maintenance for Legacy End Date"
                name=""
              />
            </DateFnsProvider>
          </Stack>
        </Grid>
        <FormDivider>Other Product Details</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* EPS Customer */}
            <CheckboxElement label="EPS Customer" name="" size="small" />
            {/* EPS Assigned TAM */}
            <AutocompleteElement
              label="EPS Assigned TAM"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* EPS Hours Per Week */}
            <TextFieldElement
              label="EPS Hours Per Week"
              name=""
              type="number"
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* EPS Contract End */}
            <DateFnsProvider>
              <DatePickerElement label="EPS Contract End" name="" />
            </DateFnsProvider>
            {/* EPS Contract Start */}
            <DateFnsProvider>
              <DatePickerElement label="EPS Contract Start" name="" />
            </DateFnsProvider>
            {/* EPS Hours Per Month */}
            <TextFieldElement
              label="EPS Hours Per Month"
              name=""
              type="number"
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>System Information</FormDivider>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {/* ODUI Notification Processed */}
            <CheckboxElement
              label="ODUI Notification Processed"
              name=""
              size="small"
            />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
