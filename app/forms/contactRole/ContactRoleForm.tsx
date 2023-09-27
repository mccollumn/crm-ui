"use client";

import { FormWrapper } from "../FormWrapper";
import { Grid, Stack } from "@mui/material";
import { AutocompleteElement, CheckboxElement } from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import { FormProps } from "../../types/types";
import { useContactRoleForm } from "./useContactRoleForm";

interface ContactRoleFormProps extends FormProps {
  accountID: string;
}

export const ContactRoleForm = ({
  formTitle,
  defaultValues,
  menuItems,
  opportunityID,
  ...props
}: ContactRoleFormProps) => {
  const router = useRouter();
  const contactRoleID = defaultValues.OpportunityContactRoles_ID;
  const {
    menuOptions,
    setIsLoading,
    isLoading,
    createContactRoleFormSubmissionData,
  } = useContactRoleForm({
    menuItems,
    accountID,
  });

  const onSuccess = async (values: any) => {
    setIsLoading(true);
    const data = createContactRoleFormSubmissionData(values, quoteData);
    console.log("Success values", values);
    console.log("Submitted Data:", data);
    let isEdit = !!defaultValues?.id;
    const url = isEdit
      ? "/api/opportunities/update/quote"
      : "/api/opportunities/insert/quote";
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

    // Invalidate cached account data
    fetch("/api/revalidate/tag?tag=quote");
    setIsLoading(false);
    router.push(`/opportunities/view/${opportunityID}`);
  };

  const onCancel = () => {
    router.back();
  };

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
              name="contact"
              autocompleteProps={{
                getOptionLabel: (option) => option.name || "",
                renderOption: (props, option) => {
                  console.log("Contact option:", option);
                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
                },
                size: "small",
              }}
              options={menuOptions.Contact}
            />
            {/* Is Primary */}
            <CheckboxElement
              label="Is Primary"
              name="contact.isPrimary"
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Role */}
            <AutocompleteElement
              label="Role"
              name="role.name"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.Role}
            />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
