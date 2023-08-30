"use client";

import { FormWrapper } from "../FormWrapper";
import { FormDivider } from "../FormDivider";
import { Grid, Stack } from "@mui/material";
import { CheckboxElement, TextareaAutosizeElement } from "react-hook-form-mui";
import { useRouter } from "next/navigation";

type CaseCommentFormProps = {
  formTitle: string;
  caseID: string;
  defaultValues?: any;
};

const initialValues = {
  CaseComments_CommentBody: "",
  CaseComments_IsPublic: "",
};

export const CaseCommentForm = ({
  formTitle,
  caseID,
  defaultValues = initialValues,
  ...props
}: CaseCommentFormProps) => {
  const router = useRouter();

  const onSuccess = (values: any) => {
    console.log("Success values", values);
    // TODO:
    // PUT data
    // Verify successful response
    router.push(`/cases/view/${caseID}`);
  };

  const onCancel = () => {
    router.back();
  };

  if (typeof defaultValues.CaseComments_IsPublic === "string") {
    defaultValues.CaseComments_IsPublic = !!Number(
      defaultValues.CaseComments_IsPublic
    );
  }

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
              name="CaseComments_CommentBody"
              required
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <CheckboxElement label="Public" name="CaseComments_IsPublic" />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
