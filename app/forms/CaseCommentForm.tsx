import { FormWrapper } from "./FormWrapper";
import { FormDivider } from "./FormDivider";
import { Grid, Stack } from "@mui/material";
import { CheckboxElement, TextareaAutosizeElement } from "react-hook-form-mui";

type CaseCommentFormProps = {
  formTitle: string;
  onSuccess: any;
  onCancel: any;
  defaultValues?: any;
};

const initialValues = {
  id: "",
  public: false,
};

export const CaseCommentForm = ({
  formTitle,
  onSuccess,
  onCancel,
  defaultValues = initialValues,
  ...props
}: CaseCommentFormProps) => {
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
        <FormDivider>Information</FormDivider>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <TextareaAutosizeElement
              label="Comment"
              name="comment"
              required
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <CheckboxElement label="Public" name="public" />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
