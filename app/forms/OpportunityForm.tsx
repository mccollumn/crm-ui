import { FormWrapper } from "./FormWrapper";
import { FormDivider } from "./FormDivider";
import { FormCheckbox } from "./FormCheckbox";
import { FormDatePicker } from "./FormDatePicker";
import { FormDropdownMenu } from "./FormDropdownMenu";
import { useForm } from "@/app/forms/useForm";
import { Grid, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export type OpportunityFormData = {
  id: string;
};

type OpportunityFormProps = OpportunityFormData & {
  setData: any;
  formTitle: string;
};

export const INITIAL_DATA = {
  id: "",
};

export const OpportunityForm = ({
  setData,
  formTitle,
  ...props
}: OpportunityFormProps) => {
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
        <FormDivider>Opportunity Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Opportunity Owner */}
            <FormDropdownMenu
              required
              label="Opportunity Owner"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Opportunity Name */}
            <TextField
              required
              type="text"
              size="small"
              label="Opportunity Name"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Account Name */}
            <FormDropdownMenu
              required
              label="Account Name"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Opportunity Type */}
            <FormDropdownMenu
              required
              label="Opportunity Type"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Product */}
            <FormDropdownMenu
              required
              label="Product"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Product Family */}
            <FormDropdownMenu
              required
              label="Product Family"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Interest */}
            <FormDropdownMenu
              required
              multiple
              label="Interest"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Contains New Business */}
            <FormCheckbox
              label="Contains New Business"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Ops Audit */}
            <FormCheckbox
              label="Ops Audit"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Order Exception */}
            <FormCheckbox
              label="Order Exception"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Order Exception Notes */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Order Exception Notes"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Split Opportunity */}
            <FormCheckbox
              label="Split Opportunity"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Quarter Bank */}
            <FormCheckbox
              label="Quarter Bank"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Fast Notes/Next Steps */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Fast Notes/Next Steps"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Optimize Product Type */}
            <FormDropdownMenu
              label="Optimize Product Type"
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
              type="number"
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
            {/* Opportunity Record Type */}
            <FormDropdownMenu
              required
              label="Opportunity Record Type"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Amount */}
            <TextField
              type="number"
              size="small"
              label="Amount"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Stage */}
            <FormDropdownMenu
              required
              label="Stage"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Close Date */}
            <FormDatePicker
              label="Close Date"
              required
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* Probability */}
            <TextField
              type="number"
              size="small"
              label="Probability"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Forecast Status */}
            <FormDropdownMenu
              label="Forecast Status"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Term (months) */}
            <FormDropdownMenu
              label="Term (months)"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Multi-Year Year 1 Amount */}
            <TextField
              type="number"
              size="small"
              label="Multi-Year Year 1 Amount"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* CHAMPP */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="CHAMPP"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Renewal Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Baseline Renewal Amount */}
            <TextField
              type="number"
              size="small"
              label="Baseline Renewal Amount"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Services Renewal Amount */}
            <TextField
              type="number"
              size="small"
              label="Services Renewal Amount"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Multi-Year Add Back */}
            <FormCheckbox
              label="Multi-Year Add Back"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Baseline Renewal Date */}
            <FormDatePicker
              label="Baseline Renewal Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* Renewal Status */}
            <FormDropdownMenu
              label="Renewal Status"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Renewal Status Comments & Next Steps */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Renewal Status Comments & Next Steps"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Resell */}
            <FormDropdownMenu
              label="Resell"
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
        <FormDivider>Additional Information</FormDivider>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {/* Opportunity Notes */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Opportunity Notes"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Compelling Event */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Compelling Event"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Win/Loss/Competitive Detail</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Winner */}
            <FormDropdownMenu
              label="Winner"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Current/Prior Vendor */}
            <FormDropdownMenu
              label="Current/Prior Vendor"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Win Type */}
            <FormDropdownMenu
              label="Win Type"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Competitors */}
            <FormDropdownMenu
              label="Competitors"
              multiple
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Business Value of Solution to Customer */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Business Value of Solution to Customer"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Change from Renewal Baseline Reason */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Change from Renewal Baseline Reason"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Primary Win/Loss Reason */}
            <FormDropdownMenu
              label="Primary Win/Loss Reason"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Primary Win/Loss Detail */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Primary Win/Loss Detail"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Secondary Win/Loss Reason */}
            <FormDropdownMenu
              label="Secondary Win/Loss Reason"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Secondary Win/Loss Detail */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Secondary Win/Loss Detail"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Additional Win/Loss Detail */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Additional Win/Loss Detail"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Partner Details</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Originating Partner */}
            <FormDropdownMenu
              label="Originating Partner"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Fulfilling Partner */}
            <FormDropdownMenu
              label="Fulfilling Partner"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Referring Partner */}
            <FormDropdownMenu
              label="Referring Partner"
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
            {/* Influencing Partner */}
            <FormDropdownMenu
              label="Influencing Partner"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Channel Deal */}
            <FormCheckbox
              label="Channel Deal"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Solutions Engineering</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* SE Involved */}
            <FormDropdownMenu
              label="SE Involved"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Product Fit */}
            <FormDropdownMenu
              label="Product Fit"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* SE Engagement */}
            <FormDropdownMenu
              label="SE Engagement"
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
            {/* SE Next Steps */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="SE Next Steps"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* SE Comments */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="SE Comments"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Clarizen Project Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Project Trigger Type */}
            <TextField
              type="text"
              size="small"
              label="Project Trigger Type"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Parent Project ID */}
            <TextField
              type="text"
              size="small"
              label="Parent Project ID"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Order Number */}
            <TextField
              type="text"
              size="small"
              label="Order Number"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Order Date */}
            <FormDatePicker
              label="Order Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
          </Stack>
        </Grid>
        <FormDivider>Marketing Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Lead Source */}
            <FormDropdownMenu
              label="Lead Source"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Initial Contact Email */}
            <TextField
              type="text"
              size="small"
              label="Initial Contact Email"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Original Campaign Source */}
            <FormDropdownMenu
              label="Original Campaign Source"
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
            {/* Primary Campaign Source */}
            <FormDropdownMenu
              label="Primary Campaign Source"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Marketing Generated */}
            <FormCheckbox
              label="Marketing Generated"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Commission Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Sales Rep ID */}
            <TextField
              type="text"
              size="small"
              label="Sales Rep ID"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* SharePoint Overlay Contributor */}
            <FormDropdownMenu
              label="SharePoint Overlay Contributor"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Exception */}
            <FormCheckbox
              label="Exception"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Commission Comments */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Commission Comments"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* OD Switcher */}
            <FormCheckbox
              label="OD Switcher"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Multi-Year Uplift */}
            <FormCheckbox
              label="Multi-Year Uplift"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Stage Tracking Information</FormDivider>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {/* Converted from Lead ID */}
            <TextField
              type="text"
              size="small"
              label="Converted from Lead ID"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Stage 1 Date */}
            <TextField
              type="text"
              size="small"
              label="Stage 1 Date"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Stage 2 Date */}
            <TextField
              type="text"
              size="small"
              label="Stage 2 Date"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Stage 3 Date */}
            <TextField
              type="text"
              size="small"
              label="Stage 3 Date"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Stage 4 Date */}
            <TextField
              type="text"
              size="small"
              label="Stage 4 Date"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Stage 5 Date */}
            <TextField
              type="text"
              size="small"
              label="Stage 5 Date"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <FormDivider>System Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Holdover Expiration */}
            <FormDatePicker
              label="Holdover Expiration"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* Type */}
            <FormDropdownMenu
              label="Type"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Refresh Product Family */}
            <FormCheckbox
              label="Refresh Product Family"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Territory Override */}
            <FormDropdownMenu
              label="Territory Override"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Territory Tracker */}
            <TextField
              type="text"
              size="small"
              label="Territory Tracker"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Deal Alert Sent */}
            <FormCheckbox
              label="Deal Alert Sent"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Quote Submitted */}
            <FormCheckbox
              label="Quote Submitted"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Do Not Run Trigger Test */}
            <FormCheckbox
              label="Do Not Run Trigger Test"
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
