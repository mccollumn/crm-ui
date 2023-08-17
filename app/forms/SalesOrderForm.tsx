import { FormWrapper } from "./FormWrapper";
import { FormDivider } from "./FormDivider";
import { FormCheckbox } from "./FormCheckbox";
import { FormDatePicker } from "./FormDatePicker";
import { FormDropdownMenu } from "./FormDropdownMenu";
import { useForm } from "@/app/forms/useForm";
import { Grid, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export type SalesOrderFormData = {
  id: string;
};

type SalesOrderFormProps = SalesOrderFormData & {
  setData: any;
  formTitle: string;
};

export const INITIAL_DATA = {
  id: "",
};

export const SalesOrderForm = ({
  setData,
  formTitle,
  ...props
}: SalesOrderFormProps) => {
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
            {/* Sales Order Number */}
            <TextField
              required
              type="text"
              size="small"
              label="Sales Order Number"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Account */}
            <FormDropdownMenu
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
            {/* Document Number */}
            <TextField
              required
              type="text"
              size="small"
              label="Document Number"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Document Type */}
            <TextField
              type="text"
              size="small"
              label="Document Type"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Terms */}
            <TextField
              type="text"
              size="small"
              label="Terms"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Reference Number */}
            <TextField
              type="text"
              size="small"
              label="Reference Number"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Quote */}
            <FormDropdownMenu
              label="Quote"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* End Customer Account */}
            <FormDropdownMenu
              label="End Customer Account"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Is Channel */}
            <FormCheckbox
              label="Is Channel"
              // id="<fill>"
              // checked={props.<fill>}
              onChange={handleCheckboxChange}
            />
            {/* Order Number */}
            <TextField
              type="text"
              size="small"
              label="Order Number"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* SO Record Update */}
            <FormDatePicker
              label="SO Record Update"
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
            {/* Parent Entity */}
            <FormDropdownMenu
              label="Parent Entity"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Intacct Entity */}
            <FormDropdownMenu
              label="Intacct Entity"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Owner */}
            <FormDropdownMenu
              label="Owner"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Date */}
            <FormDatePicker
              label="Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* State */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="State"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Ship Date */}
            <FormDatePicker
              label="Ship Date"
              //   value={props.<fill> ? new Date(props.<fill>) : null}
              onChange={(value) =>
                updateFields({
                  /*<fill>: value */
                })
              }
            />
            {/* Currency */}
            <FormDropdownMenu
              label="Currency"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Subtotal */}
            <TextField
              type="number"
              size="small"
              label="Subtotal"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Total */}
            <TextField
              type="number"
              size="small"
              label="Total"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Message */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Message"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <FormDivider>USD Totals</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Exchange Rate to USD */}
            <TextField
              type="number"
              size="small"
              label="Exchange Rate to USD"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Renewal Opportunity</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Renewal Opportunity Status */}
            <FormDropdownMenu
              label="Renewal Opportunity Status"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({
                  /* <fill>: value || "" */
                })
              }
              options={[]}
            />
            {/* Renewal Opportunity */}
            <FormDropdownMenu
              label="Renewal Opportunity"
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
            {/* Renewal Processor Message */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Renewal Processor Message"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Bill to/Ship to Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Bill to Company Name */}
            <TextField
              type="text"
              size="small"
              label="Bill to Company Name"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Bill to Name */}
            <TextField
              type="text"
              size="small"
              label="Bill to Name"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Bill to Address 1 */}
            <TextField
              type="text"
              size="small"
              label="Bill to Address 1"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Bill to Address 2 */}
            <TextField
              type="text"
              size="small"
              label="Bill to Address 2"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Bill to City */}
            <TextField
              type="text"
              size="small"
              label="Bill to City"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Bill to State */}
            <TextField
              type="text"
              size="small"
              label="Bill to State"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Bill to Zip Code */}
            <TextField
              type="text"
              size="small"
              label="Bill to Zip Code"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Bill to Country */}
            <TextField
              type="text"
              size="small"
              label="Bill to Country"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Ship to Company Name */}
            <TextField
              type="text"
              size="small"
              label="Ship to Company Name"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Ship to Name */}
            <TextField
              type="text"
              size="small"
              label="Ship to Name"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Ship to Address 1 */}
            <TextField
              type="text"
              size="small"
              label="Ship to Address 1"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Ship to Address 2 */}
            <TextField
              type="text"
              size="small"
              label="Ship to Address 2"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Ship to City */}
            <TextField
              type="text"
              size="small"
              label="Ship to City"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Ship to State */}
            <TextField
              type="text"
              size="small"
              label="Ship to State"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Ship to Zip Code */}
            <TextField
              type="text"
              size="small"
              label="Ship to Zip Code"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Ship to Country */}
            <TextField
              type="text"
              size="small"
              label="Ship to Country"
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
