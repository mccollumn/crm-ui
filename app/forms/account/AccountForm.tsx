"use client";

import React from "react";
import { FormWrapper } from "../FormWrapper";
import { FormDivider } from "../FormDivider";
import {
  AutocompleteElement,
  CheckboxElement,
  DatePickerElement,
  TextFieldElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import { Backdrop, CircularProgress, Grid, Stack } from "@mui/material";
import DateFnsProvider from "../../providers/DateFnsProvider";
import { FormProps } from "@/app/types/types";
import { useAccountForm } from "./useAccountForm";
import { AccountData } from "@/app/types/accounts";

interface AccountFormProps extends FormProps {
  accountData?: AccountData;
}

export const AccountForm = ({
  formTitle,
  defaultValues,
  menuItems,
  accountData,
  ...props
}: AccountFormProps) => {
  const router = useRouter();
  const {
    menuOptions,
    FormatCurrency,
    FormatNumber,
    submitAccount,
    setIsLoading,
    isLoading,
  } = useAccountForm({
    menuItems,
  });
  const onSuccess = async (values: any) => {
    setIsLoading(true);
    const responseData = await submitAccount(
      values,
      defaultValues,
      accountData
    );

    let id = defaultValues.accountID;
    if (!id) {
      id = responseData?.res?.ID;
    }

    setIsLoading(false);
    router.push(`/accounts/view/${id}`);
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
          <FormDivider>Account Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Account Owner */}
              <AutocompleteElement
                label="Account Owner"
                name="owner"
                required
                loading={menuOptions.Owner.length === 0}
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
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
                options={menuOptions.Owner}
              />
              {/* Account Name */}
              <TextFieldElement
                label="Account Name"
                name="name"
                required
                size="small"
              />
              {/* Alternate Account Name */}
              <TextFieldElement
                label="Alternate Account Name"
                name="alternateName"
                size="small"
              />
              {/* Account Type */}
              <AutocompleteElement
                label="Account Type"
                name="type"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  getOptionLabel: (option) => option.display || "",
                  renderOption: (props, option) => {
                    return (
                      <li {...props} key={option.value}>
                        {option.display}
                      </li>
                    );
                  },
                  size: "small",
                }}
                options={menuOptions.AccountType}
              />
              {/* Super Region */}
              <AutocompleteElement
                label="Super Region"
                name="superRegion"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.Region}
                required
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Phone */}
              <TextFieldElement label="Phone" name="phone" size="small" />
              {/* USD Total Order Value */}
              <TextFieldElement
                label="USD Total Order Value"
                name="orderValue.total"
                size="small"
                InputProps={{ inputComponent: FormatCurrency as any }}
              />
              {/* Is Federal */}
              <CheckboxElement
                label="Is Federal or State"
                name="isFederalState"
                size="small"
              />
              {/* Government Type */}
              <TextFieldElement
                label="Government Type"
                name="governmentType"
                size="small"
              />
              {/* MSA */}
              <CheckboxElement label="MSA" name="msa" size="small" />
            </Stack>
          </Grid>
          <FormDivider>Address Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <p>
                <b>Billing Address</b>
              </p>
              {/* Billing Street */}
              <TextareaAutosizeElement
                label="Billing Street"
                name="address.billing.street"
                rows={3}
                size="small"
              />
              {/* Billing City */}
              <TextFieldElement
                label="Billing City"
                name="address.billing.city"
                size="small"
              />
              {/* Billing State/Province */}
              <TextFieldElement
                label="Billing State/Province"
                name="address.billing.state"
                size="small"
              />
              {/* Billing Zip/Postal Code */}
              <TextFieldElement
                label="Billing Zip/Postal Code"
                name="address.billing.postalCode"
                size="small"
              />
              {/* Billing Country */}
              <TextFieldElement
                label="Billing Country"
                name="address.billing.country"
                size="small"
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <p>
                <b>Shipping Address</b>
              </p>
              {/* Shipping Street */}
              <TextareaAutosizeElement
                label="Shipping Street"
                name="address.shipping.street"
                rows={3}
                size="small"
              />
              {/* Shipping City */}
              <TextFieldElement
                label="Shipping City"
                name="address.shipping.city"
                size="small"
              />
              {/* Shipping State/Province */}
              <TextFieldElement
                label="Shipping State/Province"
                name="address.shipping.state"
                size="small"
              />
              {/* Shipping Zip/Postal Code */}
              <TextFieldElement
                label="Shipping Zip/Postal Code"
                name="address.shipping.postalCode"
                size="small"
              />
              {/* Shipping Country */}
              <TextFieldElement
                label="Shipping Country"
                name="address.shipping.country"
                size="small"
              />
            </Stack>
          </Grid>
          <FormDivider>Collections</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Collections Contact */}
              <AutocompleteElement
                label="Collections Contact"
                name="collections.contact"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
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
                options={menuOptions.CollectionsContact}
              />
              {/* Collection Status */}
              <TextFieldElement
                label="Collection Status"
                name="collections.status"
                size="small"
              />
              {/* Collection Past Due Amount */}
              <TextFieldElement
                label="Collection Past Due Amount"
                name="collections.pastDueAmount"
                size="small"
                InputProps={{ inputComponent: FormatCurrency as any }}
              />
              {/* Anticipated Suspension Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Anticipated Suspension Date"
                  name="collections.suspensionDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
              {/* Passed to Debt Collection Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Passed to Debt Collection Date"
                  name="collections.passedToDebtCollectionDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
              {/* Collections Correspondence */}
              <TextareaAutosizeElement
                label="Collections Correspondence"
                name="collections.correspondence"
                rows={3}
                size="small"
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Credit Hold */}
              <CheckboxElement
                label="Credit Hold"
                name="collections.creditHold"
                size="small"
              />
              {/* Support Account Alert */}
              <TextareaAutosizeElement
                label="Support Account Alert"
                name="collections.supportAccountAlert"
                rows={3}
                size="small"
              />
              {/* No Technical Support */}
              <CheckboxElement
                label="No Technical Support"
                name="collections.noSupport"
                size="small"
              />
              {/* Services to be Suspended */}
              <TextFieldElement
                label="Services to be Suspended"
                name="collections.servicesToSuspend"
                size="small"
              />
              {/* Services Suspension Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Services Suspension Date"
                  name="collections.serviceSuspensionDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
              {/* Last Conversation Note */}
              <TextareaAutosizeElement
                label="Last Conversation Note"
                name="collections.lastConversationNote"
                rows={3}
                size="small"
              />
            </Stack>
          </Grid>
          <FormDivider>Total Order Value of Products Owned</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* USD Total Analytics */}
              <TextFieldElement
                label="USD Total Analytics"
                name="orderValue.total"
                size="small"
                InputProps={{ inputComponent: FormatCurrency as any }}
              />
              {/* USD Total Consulting */}
              <TextFieldElement
                label="USD Total Consulting"
                name="orderValue.consulting"
                size="small"
                InputProps={{ inputComponent: FormatCurrency as any }}
              />
              {/* USD Total Services */}
              <TextFieldElement
                label="USD Total Services"
                name="orderValue.services"
                size="small"
                InputProps={{ inputComponent: FormatCurrency as any }}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* USD Total Training */}
              <TextFieldElement
                label="USD Total Training"
                name="orderValue.training"
                size="small"
                InputProps={{ inputComponent: FormatCurrency as any }}
              />
              {/* USD Total Partner Products */}
              <TextFieldElement
                label="USD Total Partner Products"
                name="orderValue.partnerProducts"
                size="small"
                InputProps={{ inputComponent: FormatCurrency as any }}
              />
              {/* USD Total Other */}
              <TextFieldElement
                label="USD Total Other"
                name="orderValue.other"
                size="small"
                InputProps={{ inputComponent: FormatCurrency as any }}
              />
            </Stack>
          </Grid>
          <FormDivider>Software Entitlement Info</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Software Entitled Server Calls */}
              <TextFieldElement
                label="Software Entitled Server Calls"
                name="entitlement.serverCalls"
                size="small"
                InputProps={{ inputComponent: FormatNumber as any }}
              />
              {/* Software Installations */}
              <TextFieldElement
                label="Software Installations"
                name="entitlement.installations"
                type="number"
                size="small"
              />
              {/* Software Term License */}
              <CheckboxElement
                label="Software Term License"
                name="entitlement.termLicense"
                size="small"
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Software Base Mnt Expiration Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Software Base Mnt Expiration Date"
                  name="entitlement.baseMntExpireDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
              {/* Software Mnt Expiration Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Software Mnt Expiration Date"
                  name="entitlement.mntExpireDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
              {/* Software Most Recent Activated Version */}
              <TextFieldElement
                label="Software Most Recent Activated Version"
                name="entitlement.activatedVersion"
                size="small"
              />
              {/* Extended Maintenance for Legacy End Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Extended Maintenance for Legacy End Date"
                  name="entitlement.extMntExpireDate"
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
