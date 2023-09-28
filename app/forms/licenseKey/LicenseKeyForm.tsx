"use client";

import { FormWrapper } from "../FormWrapper";
import { FormDivider } from "../FormDivider";
import { Backdrop, CircularProgress, Grid, Stack } from "@mui/material";
import {
  AutocompleteElement,
  CheckboxElement,
  DatePickerElement,
  TextFieldElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import DateFnsProvider from "../../providers/DateFnsProvider";
import { FormProps } from "@/app/types/types";
import { useLicenseKeyForm } from "./useLicenseKeyForm";
import { LicenseKeyData } from "@/app/types/licenseKeys";

interface LicenseKeyFormProps extends FormProps {
  licenseKeyData?: LicenseKeyData;
  accountID: string;
}

export const LicenseKeyForm = ({
  formTitle,
  defaultValues,
  menuItems,
  licenseKeyData,
  accountID,
  ...props
}: LicenseKeyFormProps) => {
  const router = useRouter();
  const {
    menuOptions,
    FormatNumber,
    setIsLoading,
    isLoading,
    createLicenseKeyFormSubmissionData,
  } = useLicenseKeyForm({
    menuItems,
  });

  const onSuccess = async (values: any) => {
    setIsLoading(true);
    const data = createLicenseKeyFormSubmissionData(values, licenseKeyData);
    console.log("Success values", values);
    console.log("Submitted Data:", data);
    const isEdit = !!defaultValues?.id;
    const url = isEdit
      ? "/api/accounts/update/license-key"
      : "/api/accounts/insert/license-key";
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const response = await fetch(request);

    if (!response.ok) {
      console.error("Unable to submit data:", response.statusText);
      router.push("/error");
    }

    // Invalidate cached account data
    fetch("/api/revalidate/tag?tag=account");
    fetch("/api/revalidate/tag?tag=licenseKey");

    setIsLoading(false);
    router.push(`/accounts/view/${accountID}`);
  };

  const onCancel = () => {
    router.back();
  };

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
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* License Key */}
              <TextFieldElement
                label="License Key"
                name="key"
                required
                size="small"
              />
              {/* Account */}
              <AutocompleteElement
                label="Account"
                name="account"
                required
                autocompleteProps={{
                  getOptionLabel: (option) => option.name || "",
                  renderOption: (props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        <b>{option.name}</b>
                        <pre style={{ margin: 0 }}>{` - ${option.site}`}</pre>
                      </li>
                    );
                  },
                  size: "small",
                }}
                options={menuOptions.Account}
              />
              {/* Key Type */}
              <AutocompleteElement
                label="Key Type"
                name="type"
                autocompleteProps={{ size: "small" }}
                options={menuOptions.Type}
              />
              {/* Page Views */}
              <TextFieldElement
                label="Page Views"
                name="pageViews"
                size="small"
                InputProps={{ inputComponent: FormatNumber as any }}
              />
              {/* Events */}
              {/* <TextFieldElement
              label="Events"
              name=""
              type="number"
              size="small"
            /> */}
              {/* Maintenance Expiration Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Maintenance Expiration Date"
                  name="maintenanceExpirationDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Parent Key */}
              <TextFieldElement
                label="Parent Key"
                name="parentKey"
                size="small"
              />
              {/* Original Version */}
              <TextFieldElement
                label="Original Version"
                name="originalVersion"
                size="small"
              />
              {/* Version */}
              <TextFieldElement label="Version" name="version" size="small" />
              {/* Status */}
              <AutocompleteElement
                label="Status"
                name="status"
                autocompleteProps={{ size: "small" }}
                options={menuOptions.Status}
              />
              {/* System Status */}
              <AutocompleteElement
                label="System Status"
                name="systemStatus"
                autocompleteProps={{ size: "small" }}
                options={menuOptions.SystemStatus}
              />
              {/* Notes */}
              <TextareaAutosizeElement
                label="Notes"
                name="notes"
                rows={3}
                size="small"
              />
              {/* Migration External ID */}
              {/* <TextFieldElement
              label="Migration External ID"
              name=""
              size="small"
            /> */}
            </Stack>
          </Grid>
          <FormDivider>Auth Key Related Info</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Anniversary Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Anniversary Date"
                  name="anniversaryDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
            </Stack>
          </Grid>
          <FormDivider>AddOn Key Related Info</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Is Applied */}
              <CheckboxElement
                label="Is Applied"
                name="isApplied"
                size="small"
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Last Applied Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Last Applied Date"
                  name="lastAppliedDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
            </Stack>
          </Grid>
          <FormDivider>Activation Info</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Activated Version */}
              <TextFieldElement
                label="Activated Version"
                name="activatedVersion"
                size="small"
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Activation Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Activation Date"
                  name="activationDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
            </Stack>
          </Grid>
          <FormDivider>System Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Key Created By */}
              <AutocompleteElement
                label="Key Created By"
                name="system.createdBy"
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
                options={menuOptions.CreatedBy}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Key Created Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Key Created Date"
                  name="system.createdDate"
                  required
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
            </Stack>
          </Grid>
        </Grid>
      </FormWrapper>
    </>
  );
};
