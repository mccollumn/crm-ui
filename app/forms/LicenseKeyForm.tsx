import { FormWrapper } from "./FormWrapper";
import { FormDivider } from "./FormDivider";
import { FormCheckbox } from "./FormCheckbox";
import { FormDatePicker } from "./FormDatePicker";
import { FormDropdownMenu } from "./FormDropdownMenu";
import { useForm } from "@/app/forms/useForm";
import { Grid, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export type LicenseKeyFormData = {
  id: string;
};

type LicenseKeyFormProps = LicenseKeyFormData & {
  setData: any;
  formTitle: string;
};

export const INITIAL_DATA = {
  id: "",
};

export const LicenseKeyForm = ({
  setData,
  formTitle,
  ...props
}: LicenseKeyFormProps) => {
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
        <FormDivider>Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* License Key */}
            <TextField
              required
              type="text"
              size="small"
              label="License Key"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Account */}
            <FormDropdownMenu
              required
              label="Account"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Key Type */}
            <FormDropdownMenu
              label="Key Type"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Page Views */}
            <TextField
              type="number"
              size="small"
              label="Page Views"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Events */}
            <TextField
              type="number"
              size="small"
              label="Events"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Maintenance Expiration Date */}
            <FormDatePicker
              label="Maintenance Expiration Date"
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
            {/* Parent Key */}
            <TextField
              type="text"
              size="small"
              label="Parent Key"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Original Version */}
            <TextField
              type="text"
              size="small"
              label="Original Version"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Version */}
            <TextField
              type="text"
              size="small"
              label="Version"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Status */}
            <FormDropdownMenu
              label="Status"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* System Status */}
            <FormDropdownMenu
              label="System Status"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Notes */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Notes"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
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
        <FormDivider>Auth Key Related Info</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Anniversary Date */}
            <FormDatePicker
              label="Anniversary Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
          </Stack>
        </Grid>
        <FormDivider>AddOn Key Related Info</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Is Applied */}
            <FormCheckbox
              label="Is Applied"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Last Applied Date */}
            <FormDatePicker
              label="Last Applied Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
          </Stack>
        </Grid>
        <FormDivider>Activation Info</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Activated Version */}
            <TextField
              type="text"
              size="small"
              label="Activated Version"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Activation Date */}
            <FormDatePicker
              label="Activation Date"
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
            {/* Key Created By */}
            <TextField
              required
              type="text"
              size="small"
              label="Key Created By"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Key Created Date */}
            <FormDatePicker
              required
              label="Key Created Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
