import { FormWrapper } from "./FormWrapper";
import { FormDivider } from "./FormDivider";
import { FormCheckbox } from "./FormCheckbox";
import { useForm } from "@/app/forms/useForm";
import { Grid, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export type CaseCommentFormData = {
  public: boolean;
  comment: string;
};

type CaseCommentFormProps = CaseCommentFormData & {
  setData: any;
  formTitle: string;
};

export const INITIAL_DATA = {
  public: false,
  comment: "",
};

export const CaseCommentForm = ({
  setData,
  formTitle,
  ...props
}: CaseCommentFormProps) => {
  const router = useRouter();

  const { handleInputChange, handleCheckboxChange, updateFields } = useForm(
    (setData = { setData })
  );

  const handleCancel = () => {
    router.back();
  };
  console.log(props);
  return (
    <FormWrapper
      title={formTitle}
      submitButtonText="Save"
      resetButtonText="Cancel"
      onCancel={handleCancel}
      {...props}
    >
      <Grid container spacing={1}>
        <FormDivider>Information</FormDivider>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <TextField
              required
              multiline
              minRows={3}
              fullWidth
              type="text"
              size="small"
              label="Comment"
              id="comment"
              value={props.comment}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <FormCheckbox
              id="public"
              label="Public"
              checked={props.public}
              onChange={handleCheckboxChange}
            />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
