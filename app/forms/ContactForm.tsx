import { FormWrapper } from "./FormWrapper";
import { FormDivider } from "./FormDivider";
import { FormCheckbox } from "./FormCheckbox";
import { FormDatePicker } from "./FormDatePicker";
import { FormDropdownMenu } from "./FormDropdownMenu";
import { useForm } from "@/app/forms/useForm";
import { Grid, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export type ContactFormData = {
  id: string;
};

type ContactFormProps = ContactFormData & {
  setData: any;
  formTitle: string;
};

export const INITIAL_DATA = {
  id: "",
};

export const ContactForm = ({
  setData,
  formTitle,
  ...props
}: ContactFormProps) => {
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
        <FormDivider>Contact Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Contact Owner */}
            <FormDropdownMenu
              required
              label="Contact Owner"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            <p>
              <b>Name</b>
            </p>
            {/* Salutation */}
            <FormDropdownMenu
              label="Salutation"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* First Name */}
            <TextField
              type="text"
              size="small"
              label="First Name"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Last Name */}
            <TextField
              required
              type="text"
              size="small"
              label="Last Name"
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
            {/* Title */}
            <TextField
              type="text"
              size="small"
              label="Title"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Reports To */}
            <FormDropdownMenu
              label="Reports To"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Job Role */}
            <FormDropdownMenu
              required
              label="Job Role"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Contact Role */}
            <FormDropdownMenu
              label="Contact Role"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Email */}
            <TextField
              required
              type="text"
              size="small"
              label="Email"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Unconfirmed Email */}
            <FormCheckbox
              label="Unconfirmed Email"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Most Recent Product Interest */}
            <FormDropdownMenu
              label="Most Recent Product Interest"
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
              label="Interest"
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
            {/* Do Not Send Support Survey */}
            <FormCheckbox
              label="Do Not Send Support Survey"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Webtrends OC */}
            <FormDropdownMenu
              label="Webtrends OC"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* HTML Login */}
            <FormCheckbox
              label="HTML Login"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Flash Login */}
            <FormCheckbox
              label="Flash Login"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* EOL Product */}
            <TextField
              type="text"
              size="small"
              label="EOL Product"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Relationship to Webtrends */}
            <FormDropdownMenu
              label="Relationship to Webtrends"
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
            {/* Contact Status */}
            <FormDropdownMenu
              label="Contact Status"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* MQL Date */}
            <FormDatePicker
              label="MQL Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* Lead Source */}
            <FormDropdownMenu
              required
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
            {/* Phone */}
            <TextField
              type="text"
              size="small"
              label="Phone"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Mobile */}
            <TextField
              type="text"
              size="small"
              label="Mobile"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Other Phone */}
            <TextField
              type="text"
              size="small"
              label="Other Phone"
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
            {/* Flash Login */}
            <FormCheckbox
              label="Flash Login"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Named Support Contact */}
            <FormDropdownMenu
              label="Named Support Contact"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Support Contract Administrator */}
            <FormDropdownMenu
              label="Support Contract Administrator"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
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
          </Stack>
        </Grid>
        <FormDivider>Social Media Presence</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* LinkedIn Profile */}
            <TextField
              type="text"
              size="small"
              label="LinkedIn Profile"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Social Media Properties */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Social Media Properties"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Marked for Deletion */}
            <FormCheckbox
              label="Marked for Deletion"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Twitter ID */}
            <TextField
              type="text"
              size="small"
              label="Twitter ID"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Address Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            <p>
              <b>Mailing Address</b>
            </p>
            {/* Mailing Street */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Mailing Street"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Mailing City */}
            <TextField
              type="text"
              size="small"
              label="Mailing City"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Mailing State/Province */}
            <TextField
              type="text"
              size="small"
              label="Mailing State/Province"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Mailing Zip/Postal Code */}
            <TextField
              type="text"
              size="small"
              label="Mailing Zip/Postal Code"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Mailing Country */}
            <TextField
              type="text"
              size="small"
              label="Mailing Country"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            <p>
              <b>Other Address</b>
            </p>
            {/* Other Street */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Other Street"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Other City */}
            <TextField
              type="text"
              size="small"
              label="Other City"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Other State/Province */}
            <TextField
              type="text"
              size="small"
              label="Other State/Province"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Other Zip/Postal Code */}
            <TextField
              type="text"
              size="small"
              label="Other Zip/Postal Code"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Other Country */}
            <TextField
              type="text"
              size="small"
              label="Other Country"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
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
            />
          </Stack>
        </Grid>
        <FormDivider>ADR/ISR Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* ADR/ISR Generated */}
            <FormDropdownMenu
              label="ADR/ISR Generated"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Meeting Scheduled Date */}
            <FormDatePicker
              label="Meeting Scheduled Date"
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
            {/* Meeting Rescheduled Date */}
            <FormDatePicker
              label="Meeting Rescheduled Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* Meeting Occurred Date */}
            <FormDatePicker
              label="Meeting Occurred Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
          </Stack>
        </Grid>
        <FormDivider>Description Information</FormDivider>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {/* Product Interest */}
            <FormDropdownMenu
              label="Product Interest"
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
            {/* Comments */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Comments"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Lead Notes */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Lead Notes"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Marketing Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Lead Source Details */}
            <TextField
              type="text"
              size="small"
              label="Lead Source Details"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Lead Source Original */}
            <TextField
              type="text"
              size="small"
              label="Lead Source Original"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Lead Source Details Original */}
            <TextField
              type="text"
              size="small"
              label="Lead Source Details Original"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Email Remarketing Lead Date */}
            <FormDatePicker
              label="Email Remarketing Lead Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* Most Recent Activity */}
            <TextField
              type="text"
              size="small"
              label="Most Recent Activity"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Most Recent Response Type */}
            <TextField
              type="text"
              size="small"
              label="Most Recent Response Type"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* SharePoint Contact */}
            <FormCheckbox
              label="SharePoint Contact"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Demographic Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Preferred Language */}
            <FormDropdownMenu
              label="Preferred Language"
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
            {/* Time Zone */}
            <FormDropdownMenu
              label="Time Zone"
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
        <FormDivider>Communication Preferences</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Email Opt Out */}
            <FormCheckbox
              label="Email Opt Out"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Do Not Call */}
            <FormCheckbox
              label="Do Not Call"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* No Install Admin Newsletter */}
            <FormCheckbox
              label="No Install Admin Newsletter"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Double Opt-In */}
            <FormCheckbox
              label="Double Opt-In"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Double Opt-In Timestamp */}
            <FormDatePicker
              label="Double Opt-In Timestamp"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
          </Stack>
        </Grid>
        <FormDivider>System Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* NPS Score */}
            <FormDropdownMenu
              label="NPS Score"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* NPS Reason Promoter */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="NPS Reason Promoter"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Default Account */}
            <FormCheckbox
              label="Default Account"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* NPS Comments */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="NPS Comments"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* NPS Reason Detractor */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="NPS Reason Detractor"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
