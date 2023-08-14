import { FormWrapper } from "./FormWrapper";
import { FormDivider } from "./FormDivider";
import { FormCheckbox } from "./FormCheckbox";
import { FormDatePicker } from "./FormDatePicker";
import { FormDropdownMenu } from "./FormDropdownMenu";
import { useForm } from "@/app/forms/useForm";
import { Grid, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export type CaseFormData = {
  subject: string;
  accountName: string;
  status: string;
  hibernateDate: string | null;
  isTamCase: boolean;
  description: string;
};

type CaseFormProps = CaseFormData & {
  setData: any;
  formTitle: string;
};

export const INITIAL_DATA = {
  subject: "",
  accountName: "",
  status: "",
  hibernateDate: null,
  isTamCase: false,
  description: "",
};

const STATUS_OPTIONS = ["Open", "Closed", "Hibernate"];

export const CaseForm = ({ setData, formTitle, ...props }: CaseFormProps) => {
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
        <FormDivider>Case Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Subject */}
            <TextField
              autoFocus
              required
              type="text"
              size="small"
              label="Subject"
              id="subject"
              value={props.subject}
              onChange={handleInputChange}
            />
            {/* Account Name */}
            <FormDropdownMenu
              label="Account Name"
              id="accountName"
              value={props.accountName}
              onChange={(e, value) =>
                updateFields({ accountName: value || "" })
              }
              options={[]}
              required
            />
            {/* Contact Name */}
            <FormDropdownMenu
              label="Contact Name"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={[]}
              required
            />
            {/* Case Origin */}
            <FormDropdownMenu
              label="Case Origin"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={[]}
              required
            />
            {/* Case Site */}
            <TextField
              autoFocus
              type="text"
              size="small"
              label="Case Site"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Parent Case */}
            <FormDropdownMenu
              label="Parent Case"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={[]}
            />
            {/* Reference Case ID */}
            <TextField
              autoFocus
              type="text"
              size="small"
              label="Reference Case ID"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Status */}
            <FormDropdownMenu
              label="Status"
              id="status"
              value={props.status}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={STATUS_OPTIONS}
              required
            />
            {/* Sub-Status */}
            <FormDropdownMenu
              label="Sub-Status"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={[]}
              required
            />
            {/* Hibernate End Date */}
            <FormDatePicker
              label="Hibernate End Date"
              value={props.hibernateDate ? new Date(props.hibernateDate) : null}
              onChange={(value) => updateFields({ hibernateDate: value })}
            />
            {/* Case Owner */}
            <FormDropdownMenu
              label="Case Owner"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={[]}
              required
            />
            {/* Case Sub-Owner */}
            <FormDropdownMenu
              label="Case Sub-Owner"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={[]}
            />
          </Stack>
        </Grid>
        <FormDivider>Case Profile</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Product Delivery Method */}
            <FormDropdownMenu
              label="Product Delivery Method"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({ accountName: value || "" })
              }
              options={[]}
              required
            />
            {/* Product Name */}
            <FormDropdownMenu
              label="Product Name"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={[]}
              required
            />
            {/* Product Version */}
            <FormDropdownMenu
              label="Product Version"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={[]}
              required
            />
            {/* Product Sub-Version */}
            <FormDropdownMenu
              label="Product Sub-Version"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={[]}
              required
            />
            {/* Bug Number */}
            <TextField
              autoFocus
              type="text"
              size="small"
              label="Bug Number"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Bug Description */}
            <TextField
              autoFocus
              type="text"
              size="small"
              label="Bug Description"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Case Type */}
            <FormDropdownMenu
              label="Case Type"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={STATUS_OPTIONS}
              required
            />
            {/* Reason */}
            <FormDropdownMenu
              label="Reason"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={[]}
              required
            />
            {/* Category */}
            <FormDropdownMenu
              label="Category"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={[]}
              required
            />
            {/* Priority */}
            <FormDropdownMenu
              label="Priority"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={[]}
              required
            />
            {/* Severity */}
            <FormDropdownMenu
              label="Severity"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={[]}
              required
            />
            {/* Is TAM Case */}
            <FormCheckbox
              id="isTamCase"
              label="Is TAM Case"
              checked={props.isTamCase}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Description Information</FormDivider>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {/* Description */}
            <TextField
              required
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Description"
              id="description"
              value={props.description}
              onChange={handleInputChange}
            />
            {/* Internal Comments */}
            <TextField
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Internal Comments"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Visible in Self-Service Portal */}
            <FormCheckbox
              // id="<fill>"
              label="Visible in Self-Service Portal"
              checked={props.isTamCase}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Case Escalation Details</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Escalation Status */}
            <FormDropdownMenu
              label="Escalation Status"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) =>
                updateFields({ accountName: value || "" })
              }
              options={[]}
            />
            {/* Escalation Source */}
            <FormDropdownMenu
              label="Escalation Source"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={[]}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Escalation Type */}
            <FormDropdownMenu
              label="Escalation Type"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={STATUS_OPTIONS}
            />
            {/* Escalation Flag */}
            <FormDropdownMenu
              label="Escalation Flag"
              // id="<fill>"
              // value={props.<fill>}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={[]}
            />
          </Stack>
        </Grid>
        <FormDivider>Web Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Web Company */}
            <TextField
              autoFocus
              type="text"
              size="small"
              label="Web Company"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Web Name */}
            <TextField
              autoFocus
              type="text"
              size="small"
              label="Web Name"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Web Phone */}
            <TextField
              autoFocus
              type="text"
              size="small"
              label="Web Phone"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
            {/* Web Email */}
            <TextField
              autoFocus
              type="text"
              size="small"
              label="Web Email"
              // id="<fill>"
              // value={props.<fill>}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <FormDivider>Assignment</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Assign using active assignment rule */}
            <FormCheckbox
              // id="<fill>"
              label="Assign using active assignment rule"
              checked={props.isTamCase}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Send notification email to contact */}
            <FormCheckbox
              // id="<fill>"
              label="Assign using active assignment rule"
              checked={props.isTamCase}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
