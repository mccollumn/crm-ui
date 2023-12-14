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
import { AutocompleteElement, TextFieldElement } from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import { FormProps } from "../../types/types";
import { OpportunityData } from "@/app/types/opportunities";
import { useProductForm } from "./useProductForm";

interface ProductFormProps extends FormProps {
  opportunityData: OpportunityData;
}

export const ProductForm = ({
  formTitle,
  defaultValues,
  menuItems,
  opportunityData,
  ...props
}: ProductFormProps) => {
  const router = useRouter();
  const {
    menuOptions,
    setIsLoading,
    isLoading,
    setProductSelected,
    listPrice,
    FormatNumber,
    FormatCurrency,
    FormatPercent,
    submitProduct,
  } = useProductForm({
    menuItems,
  });

  const onSuccess = async (values: any) => {
    setIsLoading(true);
    await submitProduct(values, opportunityData);
    setIsLoading(false);
    const opportunityID = opportunityData.OpportunityDetail.Opportunities_ID;
    router.push(`/opportunities/view/${opportunityID}`);
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
          <Grid item xs={12}>
            <Stack spacing={1}>
              {/* Product */}
              <AutocompleteElement
                label="Product"
                name="product"
                required
                loading={menuOptions.Product.length === 0}
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
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
                  onChange: (_, value) => {
                    setProductSelected(value);
                  },
                }}
                options={menuOptions.Product}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Quantity */}
              <TextFieldElement
                label="Quantity"
                name="quantity"
                required
                size="small"
                InputProps={{ inputComponent: FormatNumber as any }}
              />
              {/* List Price */}
              <TextFieldElement
                label="List Price"
                name="product.unitPrice"
                size="small"
                InputProps={{
                  inputComponent: FormatCurrency as any,
                  value: listPrice,
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Discount */}
              <TextFieldElement
                label="Discount"
                name="discount"
                size="small"
                InputProps={{ inputComponent: FormatPercent as any }}
              />
              {/* Sales Price */}
              <TextFieldElement
                label="Sales Price"
                name="totalPrice"
                required
                size="small"
                InputProps={{ inputComponent: FormatCurrency as any }}
              />
            </Stack>
          </Grid>
        </Grid>
      </FormWrapper>
    </>
  );
};
