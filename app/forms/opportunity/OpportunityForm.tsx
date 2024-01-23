"use client";

import React from "react";
import { FormWrapper } from "../FormWrapper";
import { FormDivider } from "../FormDivider";
import { Backdrop, CircularProgress, Grid, Stack } from "@mui/material";
import {
  AutocompleteElement,
  CheckboxElement,
  DatePickerElement,
  MultiSelectElement,
  TextFieldElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import DateFnsProvider from "../../providers/DateFnsProvider";
import { FormProps } from "@/app/types/types";
import { useOpportunityForm } from "./useOpportunityForm";
import {
  OpportunityData,
  OpportunityFormData,
} from "@/app/types/opportunities";
import { StyledPopper, VirtualizedListbox } from "../VirtualizedListbox";

interface OpportunityFormProps extends FormProps {
  opportunityData?: OpportunityData;
}

export const OpportunityForm = ({
  formTitle,
  defaultValues,
  menuItems,
  opportunityData,
  ...props
}: OpportunityFormProps) => {
  const router = useRouter();
  const {
    menuOptions,
    FormatCurrency,
    setMenuOptions,
    setIsLoading,
    isLoading,
    submitOpportunity,
  } = useOpportunityForm({
    menuItems,
  });

  const onSuccess = async (values: OpportunityFormData) => {
    setIsLoading(true);
    const responseData = await submitOpportunity(
      values,
      defaultValues,
      opportunityData
    );

    let id = defaultValues.id;
    if (!id) {
      id = responseData?.res?.ID;
    }

    setIsLoading(false);
    router.push(`/opportunities/view/${id}`);
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
          <FormDivider>Opportunity Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Opportunity Owner */}
              <AutocompleteElement
                label="Opportunity Owner"
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
              {/* Opportunity Name */}
              <TextFieldElement
                label="Opportunity Name"
                name="name"
                required
                size="small"
              />
              {/* Account Name */}
              <AutocompleteElement
                label="Account Name"
                name="account"
                required
                loading={menuOptions.Account.length === 0}
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
                        <pre style={{ margin: 0 }}>{`${
                          option.site ? ` - ${option.site}` : ""
                        }`}</pre>
                      </li>
                    );
                  },
                  size: "small",
                }}
                options={menuOptions.Account}
              />
              {/* Opportunity Type */}
              <AutocompleteElement
                label="Opportunity Type"
                name="opportunityType"
                required
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.OpportunityType}
              />
              {/* Product */}
              <AutocompleteElement
                label="Product"
                name="product.name"
                required
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.Product}
              />
              {/* Product Family */}
              <AutocompleteElement
                label="Product Family"
                name="product.family"
                required
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.ProductFamily}
              />
              {/* Interest */}
              <MultiSelectElement
                label="Interest"
                name="interest"
                required
                preserveOrder
                showChips
                size="small"
                options={menuOptions.Interest}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Amount */}
              <TextFieldElement
                label="Amount"
                name="amount"
                size="small"
                InputProps={{ inputComponent: FormatCurrency as any }}
              />
              {/* Stage */}
              <AutocompleteElement
                label="Stage"
                name="stage.name"
                required
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                  onChange: (_, value) => {
                    setMenuOptions("ForecastStatus", value);
                  },
                }}
                options={menuOptions.Stage}
              />
              {/* Close Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Close Date"
                  name="closeDate"
                  required
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
              {/* Probability (%) */}
              <TextFieldElement
                label="Probability (%)"
                name="probability"
                type="number"
                size="small"
              />
              {/* Forecast Status */}
              <AutocompleteElement
                label="Forecast Status"
                name="forecastStatus"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                  disabled: !menuOptions.ForecastStatus.length,
                }}
                options={menuOptions.ForecastStatus}
              />
              {/* Term (months) */}
              <AutocompleteElement
                label="Term (months)"
                name="term"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions["Term(months)"]}
              />
              {/* Contains New Business */}
              <CheckboxElement
                label="Contains New Business"
                name="newBusiness"
                size="small"
              />
              {/* Fast Notes/Next Steps */}
              <TextareaAutosizeElement
                label="Fast Notes/Next Steps"
                name="fastNotes"
                rows={3}
                size="small"
              />
            </Stack>
          </Grid>
          <FormDivider>Renewal Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Baseline Renewal Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Baseline Renewal Date"
                  name="renewal.baselineRenewalDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
              {/* Renewal Status */}
              <AutocompleteElement
                label="Renewal Status"
                name="renewal.status"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.RenewalStatus}
              />
              {/* Renewal Status Comments & Next Steps */}
              <TextareaAutosizeElement
                label="Renewal Status Comments & Next Steps"
                name="renewal.comments"
                rows={3}
                size="small"
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Multi-Year Add Back */}
              <CheckboxElement
                label="Multi-Year Add Back"
                name="renewal.multiYearAddBack"
                size="small"
              />
              {/* Resell */}
              <AutocompleteElement
                label="Resell"
                name="renewal.resell"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.Resell}
              />
            </Stack>
          </Grid>
          <FormDivider>Partner Details</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Originating Partner */}
              <AutocompleteElement
                label="Originating Partner"
                name="partner.originatingPartner"
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
                options={menuOptions.Account}
              />
              {/* Fulfilling Partner */}
              <AutocompleteElement
                label="Fulfilling Partner"
                name="partner.fulfillingPartner"
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
                options={menuOptions.Account}
              />
              {/* Referring Partner */}
              <AutocompleteElement
                label="Referring Partner"
                name="partner.referringPartner"
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
                options={menuOptions.Account}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Influencing Partner */}
              <AutocompleteElement
                label="Influencing Partner"
                name="partner.influencingPartner"
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
                options={menuOptions.Account}
              />
              {/* Channel Deal */}
              <CheckboxElement
                label="Channel Deal"
                name="partner.channelDeal"
                size="small"
              />
            </Stack>
          </Grid>
          <FormDivider>Stage Tracking Information</FormDivider>
          <Grid item xs={12}>
            <Stack spacing={1}>
              {/* Stage 1 Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Stage 1 Date"
                  name="stage.stageOneDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
              {/* Stage 2 Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Stage 2 Date"
                  name="stage.stageTwoDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
              {/* Stage 3 Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Stage 3 Date"
                  name="stage.stageThreeDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
              {/* Stage 4 Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Stage 4 Date"
                  name="stage.stageFourDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
              {/* Stage 5 Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Stage 5 Date"
                  name="stage.stageFiveDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
            </Stack>
          </Grid>
          <FormDivider>System Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Type */}
              <AutocompleteElement
                label="Type"
                name="type"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.CustomerType}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Territory Tracker */}
              <TextFieldElement
                label="Territory Tracker"
                name="territory"
                size="small"
              />
            </Stack>
          </Grid>
        </Grid>
      </FormWrapper>
    </>
  );
};
