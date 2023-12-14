"use client";

import React from "react";
import { FormWrapper } from "../FormWrapper";
import { FormDivider } from "../FormDivider";
import { Backdrop, CircularProgress, Grid, Stack, createFilterOptions } from "@mui/material";
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
import { AssetData } from "@/app/types/assets";

interface AssetFormProps extends FormProps {
  assetData?: AssetData;
  accountID: string;
}

export const AssetForm = ({
  formTitle,
  defaultValues,
  menuItems,
  assetData,
  accountID,
  ...props
}: AssetFormProps) => {
  const router = useRouter();
  const { menuOptions, FormatNumber, setIsLoading, isLoading, submitAsset } =
    useAssetForm({
      menuItems,
    });

  const onSuccess = async (values: any) => {
    setIsLoading(true);
    await submitAsset(values, defaultValues, assetData);
    setIsLoading(false);
    router.push(`/accounts/view/${accountID}`);
  };

  const onCancel = () => {
    router.back();
  };

  const productFilterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: any) => `${option.name} ${option.code}`,
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
                loading={menuOptions.Product.length === 0}
                autocompleteProps={{
                  getOptionLabel: (option) => option.name || "",
                  renderOption: (props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        <b>{option.name}</b>
                        <pre style={{ margin: 0 }}>{` - ${option.code} (${
                          option.isActive === "1" ? "Active" : "Inactive"
                        })`}</pre>
                      </li>
                    );
                  },
                  filterOptions: productFilterOptions,
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
                loading={menuOptions.Account.length === 0}
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
                loading={menuOptions.Opportunity.length === 0}
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
          <FormDivider>Support Details</FormDivider>
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
    </>
  );
};
