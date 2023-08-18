import { FormWrapper } from "./FormWrapper";
import { Grid, Stack } from "@mui/material";
import { AutocompleteElement } from "react-hook-form-mui";

type ContactRoleFormProps = {
  formTitle: string;
  onSuccess: any;
  onCancel: any;
  defaultValues?: any;
};

const initialValues = {};

export const ContactRoleForm = ({
  formTitle,
  onSuccess,
  onCancel,
  defaultValues = initialValues,
  ...props
}: ContactRoleFormProps) => {
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
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Contact */}
            <AutocompleteElement
              label="Contact"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Role */}
            <AutocompleteElement
              label="Role"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
