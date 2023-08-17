import { FormWrapper } from "./FormWrapper";
import { FormDivider } from "./FormDivider";
import { FormCheckbox } from "./FormCheckbox";
import { FormDatePicker } from "./FormDatePicker";
import { FormDropdownMenu } from "./FormDropdownMenu";
import { useForm } from "@/app/forms/useForm";
import { Grid, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export type AssetFormData = {
  id: string;
};

type AssetFormProps = AssetFormData & {
  setData: any;
  formTitle: string;
};

export const INITIAL_DATA = {
  id: "",
};

export const AssetForm = ({ setData, formTitle, ...props }: AssetFormProps) => {
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
            {/* Asset Name */}
            <TextField
              required
              type="text"
              size="small"
              label="Asset Name"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
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
            {/* Serial Number */}
            <TextField
              type="number"
              size="small"
              label="Serial Number"
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
            {/* Opportunity */}
            <FormDropdownMenu
              required
              label="Opportunity"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Contact */}
            <FormDropdownMenu
              required
              label="Contact"
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
            {/* Quantity */}
            <TextField
              type="number"
              size="small"
              label="Quantity"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Is Term License */}
            <FormCheckbox
              label="Is Term License"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Purchase Date */}
            <FormDatePicker
              label="Purchase Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* Has Master */}
            <FormCheckbox
              label="Has Master"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
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
        <Grid item xs={12}>
          <Stack spacing={1}>
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
        <FormDivider>Support Details</FormDivider>
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
        <FormDivider>Activation Info</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Support Plan Type */}
            <FormDropdownMenu
              label="Support Plan Type"
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
            {/* Support Plan Begin */}
            <FormDatePicker
              label="Support Plan Begin"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* Support Plan End */}
            <FormDatePicker
              label="Support Plan End"
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
            {/* PV */}
            <TextField
              type="number"
              size="small"
              label="PV"
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
