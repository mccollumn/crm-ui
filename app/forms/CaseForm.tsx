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
            <TextField
              required
              type="text"
              size="small"
              label="Account Name"
              id="accountName"
              value={props.accountName}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            <FormDropdownMenu
              label="Status"
              id="status"
              value={props.status}
              onChange={(e, value) => updateFields({ status: value || "" })}
              options={STATUS_OPTIONS}
              required
            />
            <FormDatePicker
              label="Hibernate End Date"
              value={props.hibernateDate ? new Date(props.hibernateDate) : null}
              onChange={(value) => updateFields({ hibernateDate: value })}
            />
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
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
