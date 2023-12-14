import { FormWrapper } from "./FormWrapper";
import { FormDivider } from "./FormDivider";
import { Grid, Stack } from "@mui/material";
import {
  AutocompleteElement,
  DateTimePickerElement,
  MultiSelectElement,
  TextFieldElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import DateFnsProvider from "../providers/DateFnsProvider";

type TaskFormProps = {
  formTitle: string;
  onSuccess: any;
  onCancel: any;
  defaultValues?: any;
};

const initialValues = {
  subject: "",
};

export const TaskForm = ({
  formTitle,
  onSuccess,
  onCancel,
  defaultValues = initialValues,
  ...props
}: TaskFormProps) => {
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
        <FormDivider>Task Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Subject */}
            <TextFieldElement
              label="Subject"
              name="subject"
              required
              size="small"
            />
            {/* Type */}
            <AutocompleteElement
              label="Type"
              name="type"
              autocompleteProps={{
                autoSelect: true,
                autoHighlight: true,
                size: "small",
              }}
              options={[]}
            />
            {/* Assigned To */}
            <MultiSelectElement
              label="Assigned To"
              name=""
              preserveOrder
              showChips
              options={[]}
            />
            {/* Due Date */}
            <DateFnsProvider>
              <DateTimePickerElement
                label="Due Date"
                name=""
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider>
            {/* Name */}
            <AutocompleteElement
              label="Name"
              name=""
              autocompleteProps={{
                autoSelect: true,
                autoHighlight: true,
                size: "small",
              }}
              options={[]}
            />
            {/* Related To */}
            <AutocompleteElement
              label="Related To"
              name=""
              autocompleteProps={{
                autoSelect: true,
                autoHighlight: true,
                size: "small",
              }}
              options={[]}
            />
            {/* Conversation Outcome */}
            <AutocompleteElement
              label="Conversation Outcome"
              name=""
              autocompleteProps={{
                autoSelect: true,
                autoHighlight: true,
                size: "small",
              }}
              options={[]}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Status */}
            <AutocompleteElement
              label="Status"
              name=""
              required
              options={[]}
              autocompleteProps={{
                autoSelect: true,
                autoHighlight: true,
                size: "small",
              }}
            />
            {/* Priority */}
            <AutocompleteElement
              label="Priority"
              name=""
              required
              autocompleteProps={{
                autoSelect: true,
                autoHighlight: true,
                size: "small",
              }}
              options={[]}
            />
          </Stack>
        </Grid>
        <FormDivider>Description Information</FormDivider>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {/* Comments */}
            <TextareaAutosizeElement
              label="Comments"
              name=""
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>System Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Sent to Channel */}
            <DateFnsProvider>
              <DateTimePickerElement
                label="Sent to Channel"
                name=""
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}></Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
