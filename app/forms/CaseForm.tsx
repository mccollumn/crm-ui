import { FormWrapper } from "./FormWrapper";
import { FormDivider } from "./FormDivider";
import { FormCheckbox } from "./FormCheckbox";
import { FormDatePicker } from "./FormDatePicker";
import { FormDropdownMenu } from "./FormDropdownMenu";
import { useForm } from "@/app/forms/useForm";
import { Grid, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  AutocompleteElement,
  CheckboxElement,
  DatePickerElement,
  TextFieldElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import DateFnsProvider from "../providers/DateFnsProvider";

type CaseFormProps = {
  formTitle: string;
  onSuccess: any;
  onCancel: any;
  defaultValues?: any;
};

const initialValues = {
  subject: "",
  accountName: "",
  status: "",
  hibernateDate: null,
  isTamCase: false,
  description: "",
};

const STATUS_OPTIONS = ["Open", "Closed", "Hibernate"];

export const CaseForm = ({
  formTitle,
  onSuccess,
  onCancel,
  defaultValues = initialValues,
  ...props
}: CaseFormProps) => {
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
        <FormDivider>Case Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Subject */}
            <TextFieldElement
              label="Subject"
              name="subject"
              required
              size="small"
            />
            {/* Account Name */}
            <AutocompleteElement
              label="Account Name"
              name="accountName"
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Contact Name */}
            <AutocompleteElement
              label="Contact Name"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Case Origin */}
            <AutocompleteElement
              label="Case Origin"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Case Site */}
            <TextFieldElement label="Case Site" name="" size="small" />
            {/* Parent Case */}
            <AutocompleteElement
              label="Parent Case"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Reference Case ID */}
            <TextFieldElement label="Reference Case ID" name="" size="small" />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Status */}
            <AutocompleteElement
              label="Status"
              name="status"
              required
              autocompleteProps={{ size: "small" }}
              options={STATUS_OPTIONS}
            />
            {/* Sub-Status */}
            <AutocompleteElement
              label="Sub-Status"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Hibernate End Date */}
            <DateFnsProvider>
              <DatePickerElement label="Hibernate End Date" name="" />
            </DateFnsProvider>
            {/* Case Owner */}
            <AutocompleteElement
              label="Case Owner"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Case Sub-Owner */}
            <AutocompleteElement
              label="Case Sub-Owner"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <FormDivider>Case Profile</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Product Delivery Method */}
            <AutocompleteElement
              label="Product Delivery Method"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Product Name */}
            <AutocompleteElement
              label="Product Name"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Product Version */}
            <AutocompleteElement
              label="Product Version"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Product Sub-Version */}
            <AutocompleteElement
              label="Product Sub-Version"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Bug Number */}
            <TextFieldElement label="Bug Number" name="" size="small" />
            {/* Bug Description */}
            <TextFieldElement label="Bug Description" name="" size="small" />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Case Type */}
            <AutocompleteElement
              label="Case Type"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={STATUS_OPTIONS}
            />
            {/* Reason */}
            <AutocompleteElement
              label="Reason"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Category */}
            <AutocompleteElement
              label="Category"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Priority */}
            <AutocompleteElement
              label="Priority"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Severity */}
            <AutocompleteElement
              label="Severity"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Is TAM Case */}
            <CheckboxElement
              label="Is TAM Case"
              name="isTamCase"
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Description Information</FormDivider>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {/* Description */}
            <TextareaAutosizeElement
              label="Description"
              name="description"
              required
              rows={3}
              size="small"
            />
            {/* Internal Comments */}
            <TextareaAutosizeElement
              label="Internal Comments"
              name=""
              rows={3}
              size="small"
            />
            {/* Visible in Self-Service Portal */}
            <CheckboxElement
              label="Visible in Self-Service Portal"
              name=""
              size="small"
            />
          </Stack>
        </Grid>
        <FormDivider>Case Escalation Details</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Escalation Status */}
            <AutocompleteElement
              label="Escalation Status"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Escalation Source */}
            <AutocompleteElement
              label="Escalation Source"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Escalation Type */}
            <AutocompleteElement
              label="Escalation Type"
              name=""
              autocompleteProps={{ size: "small" }}
              options={STATUS_OPTIONS}
            />
            {/* Escalation Flag */}
            <AutocompleteElement
              label="Escalation Flag"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <FormDivider>Web Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Web Company */}
            <TextFieldElement label="Web Company" name="" size="small" />
            {/* Web Name */}
            <TextFieldElement label="Web Name" name="" size="small" />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Web Phone */}
            <TextFieldElement label="Web Phone" name="" size="small" />
            {/* Web Email */}
            <TextFieldElement label="Web Email" name="" size="small" />
          </Stack>
        </Grid>
        <FormDivider>Assignment</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Assign using active assignment rule */}
            <CheckboxElement
              label="Assign using active assignment rule"
              name=""
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Send notification email to contact */}
            <CheckboxElement
              label="Assign using active assignment rule"
              name=""
              size="small"
            />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
