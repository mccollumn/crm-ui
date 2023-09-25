"use client";

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
  const { setIsLoading, isLoading, createCaseCommentFormSubmissionData } =
    useCaseCommentForm();

  const onSuccess = async (values: any) => {
    setIsLoading(true);
    let id = caseData?.CaseInformation.Cases_ID;
    const data = createCaseCommentFormSubmissionData(
      values,
      id,
      caseCommentData
    );
    console.log("Success values", values);
    console.log("Submitted Data:", data);
    const url = id ? "/api/cases/update/comment" : "/api/cases/insert/comment";
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const response = await fetch(request);
    console.log("Response:", response);

    if (!response.ok) {
      console.error("Unable to submit data:", response.statusText);
      router.push("/error");
    }

    if (!id) {
      const responseData = await response.json();
      id = responseData.CaseComments_CaseID;
    }
    // Invalidate cached case data
    fetch("/api/revalidate/tag?tag=case");
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
