import { FormWrapper } from "./FormWrapper";
import { FormDivider } from "./FormDivider";
import { FormCheckbox } from "./FormCheckbox";
import { FormDatePicker } from "./FormDatePicker";
import { FormDropdownMenu } from "./FormDropdownMenu";
import { useForm } from "@/app/forms/useForm";
import { Grid, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export type AccountFormData = {
  accountType: string;
  accountName: string;
};

type CaseFormProps = AccountFormData & {
  setData: any;
  formTitle: string;
};

export const INITIAL_DATA = {
  accountType: "",
  accountName: "",
};

const ACCOUNT_RECORD_TYPE_OPTIONS = [
  "Prospect/Customer Account",
  "Partner Account",
];

export const AccountForm = ({
  setData,
  formTitle,
  ...props
}: CaseFormProps) => {
  const router = useRouter();

  const { handleInputChange, handleCheckboxChange, updateFields } = useForm(
    (setData = { setData })
  );

  const handleCancel = () => {
    router.back();
  };

  return (
    <FormWrapper
      title={formTitle}
      submitButtonText="Save"
      resetButtonText="Cancel"
      onCancel={handleCancel}
    >
      <Grid container spacing={1}>
        <FormDivider>Account Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Account Owner */}
            <FormDropdownMenu
              label="Account Owner"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
              required
            />
            {/* Account Name */}
            <TextField
              required
              type="text"
              size="small"
              label="Account Name"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Alternate Account Name */}
            <TextField
              type="text"
              size="small"
              label="Alternate Account Name"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Parent Account */}
            <FormDropdownMenu
              label="Parent Account"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Account Record Type */}
            <FormDropdownMenu
              label="Account Record Type"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={ACCOUNT_RECORD_TYPE_OPTIONS}
              required
            />
            {/* Account Type */}
            <FormDropdownMenu
              label="Account Type"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={ACCOUNT_RECORD_TYPE_OPTIONS}
            />
            {/* Type Last Change Date */}
            <FormDatePicker
              label="Type Last Change Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* Vertical */}
            <FormDropdownMenu
              label="Vertical"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={ACCOUNT_RECORD_TYPE_OPTIONS}
              required
            />
            {/* Website */}
            <TextField
              type="text"
              size="small"
              label="Website"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Misc. Info */}
            <TextField
              type="text"
              size="small"
              label="Misc. Info"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Migrate to New Org */}
            <FormDropdownMenu
              label="Migrate to New Org"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Migration External ID */}
            <TextField
              type="text"
              size="small"
              label="Migration External ID"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Client Health */}
            <FormDropdownMenu
              label="Client Health"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Client Unhealthy Reason */}
            <FormDropdownMenu
              label="Client Unhealthy Reason"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
              required
            />
            {/* Client Unhealthy Reason Other */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Client Unhealthy Reason Other"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Fax */}
            <TextField
              type="text"
              size="small"
              label="Fax"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Phone */}
            <TextField
              type="text"
              size="small"
              label="Phone"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Target Account Type */}
            <FormDropdownMenu
              label="Target Account Type"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Global Account */}
            <FormCheckbox
              label="Global Account"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* USD Total Order Value */}
            <TextField
              type="number"
              size="small"
              label="USD Total Order Value"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Is Federal */}
            <FormCheckbox
              label="Is Federal"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Is State */}
            <FormCheckbox
              label="Is State"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Territory */}
            <FormDropdownMenu
              label="Territory"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Region */}
            <FormDropdownMenu
              label="Region"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Super Region */}
            <FormDropdownMenu
              label="Super Region"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
              required
            />
            {/* MSA */}
            <FormCheckbox
              label="MSA"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Partner Status */}
            <FormDropdownMenu
              label="Partner Status"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
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
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Billing Street"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Billing City */}
            <TextField
              type="text"
              size="small"
              label="Billing City"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Billing State/Province */}
            <TextField
              type="text"
              size="small"
              label="Billing State/Province"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Billing Zip/Postal Code */}
            <TextField
              type="text"
              size="small"
              label="Billing Zip/Postal Code"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Billing Country */}
            <TextField
              type="text"
              size="small"
              label="Billing Country"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            <p>
              <b>Shipping Address</b>
            </p>
            {/* Shipping Street */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Shipping Street"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Shipping City */}
            <TextField
              type="text"
              size="small"
              label="Shipping City"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Shipping State/Province */}
            <TextField
              type="text"
              size="small"
              label="Shipping State/Province"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Shipping Zip/Postal Code */}
            <TextField
              type="text"
              size="small"
              label="Shipping Zip/Postal Code"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Shipping Country */}
            <TextField
              type="text"
              size="small"
              label="Shipping Country"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Account Credit Status</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Credit Last Modified */}
            <FormDatePicker
              label="Credit Last Modified"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* Credit Status */}
            <FormDropdownMenu
              label="Credit Status"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Credit Denied Reason */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Credit Denied Reason"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Credit Global Fortune 500 */}
            <FormCheckbox
              label="Credit Global Fortune 500"
              // id="<fill>"
              //   checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Auto Renew */}
            <FormCheckbox
              label="Credit Global Fortune 500"
              // id="<fill>"
              //   checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Cancellation Notice */}
            <TextField
              type="text"
              size="small"
              label="Cancellation Notice"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Auto Renew Notes */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Auto Renew Notes"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Credit Limit */}
            <TextField
              type="number"
              size="small"
              label="Credit Limit"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* PO Required */}
            <FormDropdownMenu
              label="PO Required"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* PO Required Notes */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="PO Required Notes"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Credit Notes */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Credit Notes"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* No Accounting Communication */}
            <FormCheckbox
              label="No Accounting Communication"
              // id="<fill>"
              //   checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Collections</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Collections Contact */}
            <FormDropdownMenu
              label="Collections Contact"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Collection Status */}
            <TextField
              type="text"
              size="small"
              label="Collection Status"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Collection Past Due Amount */}
            <TextField
              type="number"
              size="small"
              label="Collection Status"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Anticipated Suspension Date */}
            <TextField
              type="text"
              size="small"
              label="Anticipated Suspension Date"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Passed to Debt Collection Date */}
            <TextField
              type="text"
              size="small"
              label="Passed to Debt Collection Date"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Collections Correspondence */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Collections Correspondence"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Credit Hold */}
            <FormCheckbox
              label="Credit Hold"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Support Account Alert */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Support Account Alert"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* No Technical Support */}
            <FormCheckbox
              label="No Technical Support"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Service Suspended */}
            <FormCheckbox
              label="Service Suspended"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Services to be Suspended */}
            <TextField
              type="text"
              size="small"
              label="Passed to Debt Collection Date"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Services Suspension Date */}
            <TextField
              type="text"
              size="small"
              label="Services Suspension Date"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Last Conversation Note */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Last Conversation Note"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Additional Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Analytics Vendor */}
            <FormDropdownMenu
              label="Analytics Vendor"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Optimize Vendor */}
            <FormDropdownMenu
              label="Optimize Vendor"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Big Data Connector */}
            <TextField
              type="text"
              size="small"
              label="Big Data Connector"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Email Vendor */}
            <FormDropdownMenu
              label="Email Vendor"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Description */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Description"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Analytics Vendor Contract End */}
            <FormDatePicker
              label="Analytics Vendor Contract End"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* Optimize Vendor Contract End */}
            <FormDatePicker
              label="Optimize Vendor Contract End"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* Health Check */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Health Check"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* SharePoint Site */}
            <FormCheckbox
              label="SharePoint Site"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Total Order Value of Products Owned</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* USD Total Analytics */}
            <TextField
              type="number"
              size="small"
              label="USD Total Analytics"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* USD Total VDM */}
            <TextField
              type="number"
              size="small"
              label="USD Total VDM"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* USD Total Optimize */}
            <TextField
              type="number"
              size="small"
              label="USD Total Optimize"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* USD Total Services */}
            <TextField
              type="number"
              size="small"
              label="USD Total Services"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* USD Total Ads */}
            <TextField
              type="number"
              size="small"
              label="USD Total Ads"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* USD Total Apps */}
            <TextField
              type="number"
              size="small"
              label="USD Total Apps"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* USD Total Other */}
            <TextField
              type="number"
              size="small"
              label="USD Total Other"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Additional Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* OP Customer */}
            <FormCheckbox
              label="OP Customer"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Annual Server Calls */}
            <FormDropdownMenu
              label="Annual Server Calls"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Alexa Ranking */}
            <TextField
              type="number"
              size="small"
              label="Alexa Ranking"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Alexa Ranking Top 10,000 */}
            <FormCheckbox
              label="Alexa Ranking Top 10,000"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* eCommerce */}
            <FormCheckbox
              label="eCommerce"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Monthly Ad Spend */}
            <TextField
              type="number"
              size="small"
              label="Monthly Ad Spend"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* comScore Annual Page Views */}
            <TextField
              type="number"
              size="small"
              label="comScore Annual Page Views"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* comScore Daily Visitors */}
            <TextField
              type="number"
              size="small"
              label="comScore Daily Visitors"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* comScore Ranking */}
            <TextField
              type="number"
              size="small"
              label="comScore Ranking"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* comScore Unique Monthly Visitors */}
            <TextField
              type="number"
              size="small"
              label="comScore Unique Monthly Visitors"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Corporate Demographics</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Legal Name */}
            <TextField
              type="number"
              size="small"
              label="Legal Name"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Industry */}
            <FormDropdownMenu
              label="Industry"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Annual Revenue */}
            <TextField
              type="number"
              size="small"
              label="Annual Revenue"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Employees */}
            <TextField
              type="number"
              size="small"
              label="Employees"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Location Type */}
            <TextField
              type="text"
              size="small"
              label="Location Type"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Ownership */}
            <FormDropdownMenu
              label="Ownership"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Tax Exempt */}
            <FormCheckbox
              label="Tax Exempt"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Tax Exempt ID */}
            <TextField
              type="text"
              size="small"
              label="Tax Exempt ID"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Ticker Symbol */}
            <TextField
              type="text"
              size="small"
              label="Ticker Symbol"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* SIC Code */}
            <TextField
              type="text"
              size="small"
              label="SIC Code"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* SIC Description */}
            <TextField
              type="text"
              size="small"
              label="SIC Description"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Customer Contract Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* On Demand Max Contract End Date */}
            <FormDatePicker
              label="On Demand Max Contract End Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* Ads Max Contract End Date */}
            <FormDatePicker
              label="Ads Max Contract End Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Optimize Max Contract End Date */}
            <FormDatePicker
              label="Optimize Max Contract End Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* Streams Max Contract End Date */}
            <FormDatePicker
              label="Streams Max Contract End Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
          </Stack>
        </Grid>
        <FormDivider>MyWebtrends</FormDivider>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {/* Support Override for Entitlement */}
            <FormCheckbox
              label="Support Override for Entitlement"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Software Entitlement Info</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Software Entitled Server Calls */}
            <TextField
              type="number"
              size="small"
              label="Software Entitled Server Calls"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Software Entitled Events */}
            <TextField
              type="number"
              size="small"
              label="Software Entitled Events"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Software Installations */}
            <TextField
              type="number"
              size="small"
              label="Software Installations"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Software Term License */}
            <FormCheckbox
              label="Software Term License"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Software Base Mnt Expiration Date */}
            <FormDatePicker
              label="Software Base Mnt Expiration Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* Software Mnt Expiration Date */}
            <FormDatePicker
              label="Software Mnt Expiration Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* Software Most Recent Activated Version */}
            <TextField
              type="number"
              size="small"
              label="Software Most Recent Activated Version"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Extended Maintenance for Legacy End Date */}
            <FormDatePicker
              label="Extended Maintenance for Legacy End Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
          </Stack>
        </Grid>
        <FormDivider>Other Product Details</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* EPS Customer */}
            <FormCheckbox
              label="EPS Customer"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* EPS Assigned TAM */}
            <FormDropdownMenu
              label="EPS Assigned TAM"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* EPS Hours Per Week */}
            <TextField
              type="number"
              size="small"
              label="EPS Hours Per Week"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* EPS Contract End */}
            <FormDatePicker
              label="EPS Contract End"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* EPS Contract Start */}
            <FormDatePicker
              label="EPS Contract Start"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* EPS Hours Per Month */}
            <TextField
              type="number"
              size="small"
              label="EPS Hours Per Month"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <FormDivider>System Information</FormDivider>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {/* ODUI Notification Processed */}
            <FormCheckbox
              label="ODUI Notification Processed"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
