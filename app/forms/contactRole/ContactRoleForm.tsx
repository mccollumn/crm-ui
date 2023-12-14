"use client";

import React from "react";
import { FormWrapper } from "../FormWrapper";
import {
  Backdrop,
  CircularProgress,
  Grid,
  Stack,
  createFilterOptions,
} from "@mui/material";
import { AutocompleteElement, CheckboxElement } from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import { FormProps } from "../../types/types";
import { useContactRoleForm } from "./useContactRoleForm";
import { ContactRole, OpportunityData } from "@/app/types/opportunities";
import { VirtualizedListbox, StyledPopper } from "../VirtualizedListbox";

interface ContactRoleFormProps extends FormProps {
  opportunityData: OpportunityData;
  contactRoleData?: ContactRole;
}

export const ContactRoleForm = ({
  formTitle,
  defaultValues,
  menuItems,
  opportunityData,
  ...props
}: ContactRoleFormProps) => {
  const router = useRouter();
  const accountID = opportunityData.OpportunityDetail.Opportunities_AccountId;
  const { menuOptions, setIsLoading, isLoading, submitContactRole } =
    useContactRoleForm({
      menuItems,
      accountID,
    });

  const onSuccess = async (values: any) => {
    setIsLoading(true);
    await submitContactRole(values, opportunityData);
    setIsLoading(false);
    router.back();
  };

  const onCancel = () => {
    router.back();
  };

  const contactFilterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: any) =>
      `${option.name} ${option.accountName} ${option.title}`,
  });

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
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Contact */}
              <AutocompleteElement
                label="Contact"
                name="contact"
                required
                loading={menuOptions.Contact.length === 0}
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  disableListWrap: true,
                  ListboxComponent: VirtualizedListbox,
                  PopperComponent: StyledPopper,
                  getOptionLabel: (option) => option.name || "",
                  renderOption: (props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        <b>{option.name}</b>
                        <pre style={{ margin: 0 }}>{` - ${option.accountName}${
                          option.title ? ` (${option.title})` : ""
                        }`}</pre>
                      </li>
                    );
                  },
                  filterOptions: contactFilterOptions,
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
                required
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.ContactRole}
              />
            </Stack>
          </Grid>
        </Grid>
      </FormWrapper>
    </>
  );
};
