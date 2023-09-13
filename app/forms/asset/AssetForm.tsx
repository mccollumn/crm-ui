"use client";

import { FormWrapper } from "../FormWrapper";
import { FormDivider } from "../FormDivider";
import { Grid, Stack } from "@mui/material";
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
import { useAssetForm } from "./useAssetForm";

export const AssetForm = ({
  formTitle,
  defaultValues,
  menuItems,
  ...props
}: FormProps) => {
  const router = useRouter();
  const { menuOptions, FormatNumber } = useAssetForm({ menuItems });

  const assetID = defaultValues.id;

  const onSuccess = async (values: any) => {
    console.log("Success values", values);
    let id = assetID;
    // TODO:
    // Map menu values to appropriate fields
    // PUT data
    if (id) {
      const data = await fetch("/accounts/api/new/");
      // Verify successful response
    } else {
      // POST new account
      // Set id to new account ID
    }
    router.push(`/accounts/view/${id}`);
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
        <FormDivider>Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Asset Name */}
            <TextFieldElement
              label="Asset Name"
              name="name"
              required
              size="small"
            />
            {/* Product */}
            <AutocompleteElement
              label="Product"
              name="product"
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
              options={menuOptions.Product}
            />
            {/* Serial Number */}
            <TextFieldElement
              label="Serial Number"
              name="serialNumber"
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
            {/* Opportunity */}
            <AutocompleteElement
              label="Opportunity"
              name="opportunity"
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
              options={menuOptions.Opportunity}
            />
            {/* Contact */}
            {/* <AutocompleteElement
              label="Contact"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Status */}
            <AutocompleteElement
              label="Status"
              name="status"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.Status}
            />
            {/* Quantity */}
            <TextFieldElement
              label="Quantity"
              name="quantity"
              type="number"
              size="small"
            />
            {/* Is Term License */}
            <CheckboxElement
              label="Is Term License"
              name="isTermLicense"
              size="small"
            />
            {/* Purchase Date */}
            <DateFnsProvider>
              <DatePickerElement
                label="Purchase Date"
                name="purchaseDate"
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider>
            {/* Has Master */}
            {/* <CheckboxElement label="Has Master" name="" size="small" /> */}
            {/* Migration External ID */}
            {/* <TextFieldElement
              label="Migration External ID"
              name=""
              size="small"
            /> */}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {/* Description */}
            <TextareaAutosizeElement
              label="Description"
              name="description"
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        {/* <FormDivider>Support Details</FormDivider> */}
        {/* <Grid item xs={6}> */}
        {/* <Stack spacing={1}> */}
        {/* Anniversary Date */}
        {/* <DateFnsProvider>
              <DatePickerElement
                label="Anniversary Date"
                name=""
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider> */}
        {/* </Stack> */}
        {/* </Grid> */}
        <FormDivider>Activation Info</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Support Plan Type */}
            <AutocompleteElement
              label="Support Plan Type"
              name="support.planType"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.SupportPlanType}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Support Plan Begin */}
            <DateFnsProvider>
              <DatePickerElement
                label="Support Plan Begin"
                name="support.beginDate"
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider>
            {/* Support Plan End */}
            <DateFnsProvider>
              <DatePickerElement
                label="Support Plan End"
                name="support.endDate"
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider>
          </Stack>
        </Grid>
        <FormDivider>System Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* PV */}
            <TextFieldElement
              label="PV"
              name="pageViews"
              size="small"
              InputProps={{ inputComponent: FormatNumber as any }}
            />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
