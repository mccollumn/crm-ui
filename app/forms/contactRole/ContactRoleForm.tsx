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
  accountID,
  ...props
}: ContactRoleFormProps) => {
  const router = useRouter();
  const contactRoleID = defaultValues.OpportunityContactRoles_ID;
  const { menuOptions, setMenuOptions } = useContactRoleForm({
    menuItems,
    accountID,
  });

  const onSuccess = async (values: any) => {
    console.log("Success values", values);
    let id = contactRoleID;
    // TODO:
    // Map menu values to appropriate fields
    // PUT data
    if (id) {
      const data = await fetch("/opportunities/api/new/");
      // Verify successful response
    } else {
      // POST new account
      // Set id to new account ID
    }
    router.push(`/opportunities/view/${accountID}`);
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
