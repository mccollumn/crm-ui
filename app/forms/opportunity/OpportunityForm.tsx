"use client";

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
import { OpportunityData } from "@/app/types/opportunities";
import { isSuccessfulResponse } from "@/app/utils/utils";

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
    createOpportunitytFormSubmissionData,
  } = useOpportunityForm({
    menuItems,
  });

  const onSuccess = async (values: any) => {
    setIsLoading(true);
    const data = createOpportunitytFormSubmissionData(values, opportunityData);
    console.log("Success values", values);
    console.log("Submitted Data:", data);
    let id = defaultValues.id;
    const url = id ? "/api/opportunities/update" : "/api/opportunities/insert";
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

    if (!id) {
      const responseData = await response.json();
      id = responseData?.res?.ID;
    }
    // Invalidate cached opportunity data
    fetch("/api/revalidate/tag?tag=opportunity");
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
              {/* Opportunity Type */}
              <AutocompleteElement
                label="Opportunity Type"
                name="opportunityType"
                required
                autocompleteProps={{ size: "small" }}
                options={menuOptions.OpportunityType}
              />
              {/* Product */}
              <AutocompleteElement
                label="Product"
                name="product.name"
                required
                autocompleteProps={{ size: "small" }}
                options={menuOptions.Product}
              />
              {/* Product Family */}
              <AutocompleteElement
                label="Product Family"
                name="product.family"
                required
                autocompleteProps={{ size: "small" }}
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
              {/* Contains New Business */}
              <CheckboxElement
                label="Contains New Business"
                name="newBusiness"
                size="small"
              />
              {/* Ops Audit */}
              {/* <CheckboxElement label="Ops Audit" name="" size="small" /> */}
              {/* Order Exception */}
              {/* <CheckboxElement label="Order Exception" name="" size="small" /> */}
              {/* Order Exception Notes */}
              {/* <TextareaAutosizeElement
              label="Order Exception Notes"
              name=""
              rows={3}
              size="small"
            /> */}
              {/* Split Opportunity */}
              {/* <CheckboxElement label="Split Opportunity" name="" size="small" /> */}
              {/* Quarter Bank */}
              {/* <CheckboxElement label="Quarter Bank" name="" size="small" /> */}
              {/* Fast Notes/Next Steps */}
              <TextareaAutosizeElement
                label="Fast Notes/Next Steps"
                name="fastNotes"
                rows={3}
                size="small"
              />
              {/* Optimize Product Type */}
              {/* <AutocompleteElement
              label="Optimize Product Type"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
              {/* Migration External ID */}
              {/* <TextFieldElement
              label="Migration External ID"
              name=""
              type="number"
              size="small"
            /> */}
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Opportunity Record Type */}
              {/* <AutocompleteElement
              label="Opportunity Record Type"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
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
                  size: "small",
                  onChange: (_, value) => {
                    setMenuOptions("Status", value);
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
                  size: "small",
                  disabled: !menuOptions.Status.length,
                }}
                options={menuOptions.Status}
              />
              {/* Term (months) */}
              <AutocompleteElement
                label="Term (months)"
                name="term"
                autocompleteProps={{ size: "small" }}
                options={menuOptions.Term}
              />
              {/* Multi-Year Year 1 Amount */}
              <TextFieldElement
                label="Multi-Year Year 1 Amount"
                name="oneYearAmount"
                size="small"
                InputProps={{ inputComponent: FormatCurrency as any }}
              />
              {/* CHAMPP */}
              {/* <TextareaAutosizeElement
              label="CHAMPP"
              name=""
              rows={3}
              size="small"
            /> */}
            </Stack>
          </Grid>
          <FormDivider>Renewal Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Baseline Renewal Amount */}
              <TextFieldElement
                label="Baseline Renewal Amount"
                name="renewal.baselineAmount"
                size="small"
                InputProps={{ inputComponent: FormatCurrency as any }}
              />
              {/* Services Renewal Amount */}
              <TextFieldElement
                label="Services Renewal Amount"
                name="renewal.servicesAmount"
                size="small"
                InputProps={{ inputComponent: FormatCurrency as any }}
              />
              {/* Multi-Year Add Back */}
              <CheckboxElement
                label="Multi-Year Add Back"
                name="renewal.multiYearAddBack"
                size="small"
              />
            </Stack>
          </Grid>
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
                autocompleteProps={{ size: "small" }}
                options={menuOptions.RenewalStatus}
              />
              {/* Renewal Status Comments & Next Steps */}
              <TextareaAutosizeElement
                label="Renewal Status Comments & Next Steps"
                name="renewal.comments"
                rows={3}
                size="small"
              />
              {/* Resell */}
              <AutocompleteElement
                label="Resell"
                name="renewal.resell"
                autocompleteProps={{ size: "small" }}
                options={menuOptions.Resell}
              />
            </Stack>
          </Grid>
          {/* <FormDivider>Additional Information</FormDivider> */}
          {/* <Grid item xs={12}> */}
          {/* <Stack spacing={1}> */}
          {/* Opportunity Notes */}
          {/* <TextareaAutosizeElement
              label="Opportunity Notes"
              name=""
              rows={3}
              size="small"
            /> */}
          {/* Compelling Event */}
          {/* <TextareaAutosizeElement
              label="Compelling Event"
              name=""
              rows={3}
              size="small"
            /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <FormDivider>Win/Loss/Competitive Detail</FormDivider> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Winner */}
          {/* <AutocompleteElement
              label="Winner"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
          {/* Current/Prior Vendor */}
          {/* <AutocompleteElement
              label="Current/Prior Vendor"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
          {/* Win Type */}
          {/* <AutocompleteElement
              label="Win Type"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
          {/* Competitors */}
          {/* <MultiSelectElement
              label="Competitors"
              name=""
              preserveOrder
              showChips
              options={[]}
            /> */}
          {/* Business Value of Solution to Customer */}
          {/* <TextareaAutosizeElement
              label="Business Value of Solution to Customer"
              name=""
              rows={3}
              size="small"
            /> */}
          {/* Change from Renewal Baseline Reason */}
          {/* <TextareaAutosizeElement
              label="Change from Renewal Baseline Reason"
              name=""
              rows={3}
              size="small"
            /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Primary Win/Loss Reason */}
          {/* <AutocompleteElement
              label="Primary Win/Loss Reason"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
          {/* Primary Win/Loss Detail */}
          {/* <TextareaAutosizeElement
              label="Primary Win/Loss Detail"
              name=""
              rows={3}
              size="small"
            /> */}
          {/* Secondary Win/Loss Reason */}
          {/* <AutocompleteElement
              label="Secondary Win/Loss Reason"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
          {/* Secondary Win/Loss Detail */}
          {/* <TextareaAutosizeElement
              label="Secondary Win/Loss Detail"
              name=""
              rows={3}
              size="small"
            /> */}
          {/* Additional Win/Loss Detail */}
          {/* <TextareaAutosizeElement
              label="Additional Win/Loss Detail"
              name=""
              rows={3}
              size="small"
            /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          <FormDivider>Partner Details</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Originating Partner */}
              <AutocompleteElement
                label="Originating Partner"
                name="partner.originatingPartner"
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
                options={menuOptions.Account}
              />
              {/* Fulfilling Partner */}
              <AutocompleteElement
                label="Fulfilling Partner"
                name="partner.fulfillingPartner"
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
                options={menuOptions.Account}
              />
              {/* Referring Partner */}
              <AutocompleteElement
                label="Referring Partner"
                name="partner.referringPartner"
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
          {/* <FormDivider>Solutions Engineering</FormDivider> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* SE Involved */}
          {/* <AutocompleteElement
              label="SE Involved"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
          {/* Product Fit */}
          {/* <AutocompleteElement
              label="Product Fit"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
          {/* SE Engagement */}
          {/* <AutocompleteElement
              label="SE Engagement"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* SE Next Steps */}
          {/* <TextareaAutosizeElement
              label="SE Next Steps"
              name=""
              rows={3}
              size="small"
            /> */}
          {/* SE Comments */}
          {/* <TextareaAutosizeElement
              label="SE Comments"
              name=""
              rows={3}
              size="small"
            /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <FormDivider>Clarizen Project Information</FormDivider> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Project Trigger Type */}
          {/* <TextFieldElement
              label="Project Trigger Type"
              name=""
              size="small"
            /> */}
          {/* Parent Project ID */}
          {/* <TextFieldElement label="Parent Project ID" name="" size="small" /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Order Number */}
          {/* <TextFieldElement label="Order Number" name="" size="small" /> */}
          {/* Order Date */}
          {/* <DateFnsProvider>
              <DatePickerElement label="Order Date" name="" />
            </DateFnsProvider> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <FormDivider>Marketing Information</FormDivider> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Lead Source */}
          {/* <AutocompleteElement
              label="Lead Source"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
          {/* Initial Contact Email */}
          {/* <TextFieldElement
              label="Initial Contact Email"
              name=""
              size="small"
              type="email"
            /> */}
          {/* Original Campaign Source */}
          {/* <AutocompleteElement
              label="Original Campaign Source"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Primary Campaign Source */}
          {/* <AutocompleteElement
              label="Primary Campaign Source"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
          {/* Marketing Generated */}
          {/* <CheckboxElement label="Marketing Generated" name="" size="small" /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <FormDivider>Commission Information</FormDivider> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Sales Rep ID */}
          {/* <TextFieldElement label="Sales Rep ID" name="" size="small" /> */}
          {/* SharePoint Overlay Contributor */}
          {/* <AutocompleteElement
              label="SharePoint Overlay Contributor"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
          {/* Exception */}
          {/* <CheckboxElement label="Exception" name="" size="small" /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Commission Comments */}
          {/* <TextareaAutosizeElement
              label="Commission Comments"
              name=""
              rows={3}
              size="small"
            /> */}
          {/* OD Switcher */}
          {/* <CheckboxElement label="OD Switcher" name="" size="small" /> */}
          {/* Multi-Year Uplift */}
          {/* <CheckboxElement label="Multi-Year Uplift" name="" size="small" /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          <FormDivider>Stage Tracking Information</FormDivider>
          <Grid item xs={12}>
            <Stack spacing={1}>
              {/* Converted from Lead ID */}
              {/* <TextFieldElement
              label="Converted from Lead ID"
              name=""
              size="small"
            /> */}
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
              {/* Holdover Expiration */}
              {/* <DateFnsProvider>
              <DatePickerElement
                label="Holdover Expiration"
                name=""
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider> */}
              {/* Type */}
              <AutocompleteElement
                label="Type"
                name="type"
                autocompleteProps={{ size: "small" }}
                options={menuOptions.Type}
              />
              {/* Refresh Product Family */}
              {/* <CheckboxElement
              label="Refresh Product Family"
              name=""
              size="small"
            /> */}
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Territory Override */}
              {/* <AutocompleteElement
              label="Territory Override"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
              {/* Territory Tracker */}
              <TextFieldElement
                label="Territory Tracker"
                name="territory"
                size="small"
              />
              {/* Deal Alert Sent */}
              {/* <CheckboxElement label="Deal Alert Sent" name="" size="small" /> */}
              {/* Quote Submitted */}
              {/* <CheckboxElement label="Quote Submitted" name="" size="small" /> */}
              {/* Do Not Run Trigger Test */}
              {/* <CheckboxElement
              label="Do Not Run Trigger Test"
              name=""
              size="small"
            /> */}
            </Stack>
          </Grid>
        </Grid>
      </FormWrapper>
    </>
  );
};
