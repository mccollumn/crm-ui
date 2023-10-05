"use client";

import { FormWrapper } from "../FormWrapper";
import { Backdrop, CircularProgress, Grid, Stack } from "@mui/material";
import { AutocompleteElement, TextFieldElement } from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import { FormProps } from "../../types/types";
import { OpportunityData, Product } from "@/app/types/opportunities";
import { isSuccessfulResponse } from "@/app/utils/utils";
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
    productSelected,
    FormatNumber,
    FormatCurrency,
    FormatPercent,
    createProductFormSubmissionData,
  } = useProductForm({
    menuItems,
    // accountID,
  });

  const onSuccess = async (values: any) => {
    setIsLoading(true);
    const data = createProductFormSubmissionData(values, opportunityData);
    console.log("Success values", values);
    console.log("Submitted Data:", data);
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
    fetch("/api/revalidate/tag?tag=opportunity");
    setIsLoading(false);
    const opportunityID = opportunityData.OpportunityDetail.Opportunities_ID;
    router.push(`/opportunities/view/${opportunityID}`);
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
          <Grid item xs={12}>
            <Stack spacing={1}>
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
                        <b>{option.name}</b>
                        <pre
                          style={{ margin: 0 }}
                        >{` - ${option.code} (${option.unitPrice})`}</pre>
                      </li>
                    );
                  },
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
              {/* TODO: Confirm that this is populating when a product is selected */}
              <TextFieldElement
                label="List Price"
                name="product.unitPrice"
                disabled
                size="small"
                value={productSelected?.OpportunityLineItems_UnitPrice || ""}
                InputProps={{ inputComponent: FormatCurrency as any }}
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
