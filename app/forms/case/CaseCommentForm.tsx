"use client";

import React from "react";
import { FormWrapper } from "../FormWrapper";
import { FormDivider } from "../FormDivider";
import { Backdrop, CircularProgress, Grid, Stack } from "@mui/material";
import { CheckboxElement, TextareaAutosizeElement } from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import { useCaseCommentForm } from "./useCaseCommentForm";
import { CaseComment, CaseData } from "@/app/types/cases";

export const CaseCommentForm = ({
  formTitle,
  defaultValues,
  caseCommentData,
  caseData,
  ...props
}: CaseCommentFormProps) => {
  const router = useRouter();
  const { setIsLoading, isLoading, submitCaseComment } = useCaseCommentForm();

  const onSuccess = async (values: any) => {
    setIsLoading(true);
    const responseData = await submitCaseComment(
      values,
      caseData,
      caseCommentData
    );

    const id = caseData?.CaseInformation.Cases_ID || defaultValues.caseID;

    setIsLoading(false);
    router.push(`/cases/view/${id}`);
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
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
              <CheckboxElement label="Public" name="isPublic" />
            </Stack>
          </Grid>
        </Grid>
      </FormWrapper>
    </>
  );
};

interface CaseCommentFormProps {
  formTitle: string;
  defaultValues?: any;
  caseCommentData?: CaseComment;
  caseData: CaseData;
}
