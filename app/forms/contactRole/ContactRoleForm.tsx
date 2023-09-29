"use client";

import { FormWrapper } from "../FormWrapper";
import { Grid, Stack } from "@mui/material";
import { AutocompleteElement, CheckboxElement } from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import { FormProps } from "../../types/types";
import { useContactRoleForm } from "./useContactRoleForm";
import { ContactRole, OpportunityData } from "@/app/types/opportunities";
import { isSuccessfulResponse } from "@/app/utils/utils";

interface ContactRoleFormProps extends FormProps {
  opportunityData: OpportunityData;
  contactRoleData?: ContactRole;
}

export const ContactRoleForm = ({
  formTitle,
  defaultValues,
  menuItems,
  opportunityData,
  // contactRoleData,
  ...props
}: ContactRoleFormProps) => {
  const router = useRouter();
  const accountID = opportunityData.OpportunityDetail.Opportunities_AccountId;
  // const contactRoleID = contactRoleData?.OpportunityContactRoles_ID;
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
    const data = createContactRoleFormSubmissionData(values, opportunityData);
    console.log("Success values", values);
    console.log("Submitted Data:", data);
    // const isEdit = !!defaultValues?.id;
    // const url = isEdit
    //   ? "/api/opportunities/update"
    //   : "/api/opportunities/insert";
    const url = "/api/opportunities/update";
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const response = await fetch(request);

    if (!(await isSuccessfulResponse(response))) {
      setIsLoading(false);
      router.push("/error");
      return;
    }

    // Invalidate cached account data
    fetch("/api/revalidate/tag?tag=quote");
    setIsLoading(false);
    const opportunityID = opportunityData.OpportunityDetail.Opportunities_ID;
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
              required
              autocompleteProps={{
                getOptionLabel: (option) => option.name || "",
                renderOption: (props, option) => {
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
              required
              autocompleteProps={{ size: "small" }}
              options={menuOptions.Role}
            />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
