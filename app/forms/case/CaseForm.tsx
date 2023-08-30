"use client";

import React from "react";
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
import { useSession } from "next-auth/react";
import DateFnsProvider from "@/app/providers/DateFnsProvider";
import { CaseInformation, CaseProfile } from "@/app/types/cases";
import { getInputName } from "@/app/utils/forms";
import { useCaseForm } from "./useCaseForm";

type CaseFormProps = {
  formTitle: string;
  defaultValues?: any;
  menuItems: { [key: string]: any };
};

type CaseInfo = {
  CaseInformation: CaseInformation;
  CaseProfile: CaseProfile;
};

const initialValues: CaseInfo = {
  CaseInformation: {
    Cases_ID: "",
    Cases_AccountID: "",
    Accounts_Name: "",
    Cases_CaseNumber: "",
    Cases_ClosedDate: null,
    Cases_ContactEmail: "",
    Cases_ContactFax: "",
    Cases_ContactId: "",
    Contacts_FullName: "",
    Cases_ContactMobile: "",
    Cases_ContactPhone: "",
    Cases_CreatedById: "",
    CreatedBy_Name: "",
    Cases_CreatedDate: null,
    Cases_HibernateEndDate: null,
    Cases_IsClosed: "0",
    Cases_IsDeleted: "0",
    Cases_IsEscalated: "0",
    Cases_OpenOppValueOfAccount: "",
    Cases_Origin: "",
    Cases_OriginalCreatedDate: null,
    Cases_OwnerId: "",
    Owner_Name: "",
    Cases_SourceId: "",
    Cases_Status: "Open",
    Cases_SubStatus: "",
    Cases_Subject: "",
    Cases_SubOwner: "",
    Cases_SuppliedEmail: "",
    Cases_SuppliedName: "",
  },
  CaseProfile: {
    Cases_BugDescription: "",
    Cases_BugNumber: "",
    Cases_CaseType: "",
    Cases_Category: "",
    Cases_Description: "",
    Cases_IsTAMCase: "",
    Cases_Priority: "",
    Cases_ProductDeliveryMethod: "On Premises",
    Cases_ProductName: "",
    Cases_ProductSubVersion: "",
    Cases_ProductVersion: "",
    Cases_Reason: "",
    Cases_Severity: "",
    Cases_Subject: "",
    Cases_Type: "",
  },
};

export const CaseForm = ({
  formTitle,
  defaultValues = initialValues,
  menuItems,
  ...props
}: CaseFormProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    getSubStatusOptions,
    getProductVersionOptions,
    getProductSubVersionOptions,
    getCaseTypeOptions,
    getReasonOptions,
    getCategoryOptions,
    getContactOptions,
    setAccountSelected,
    updateBooleans,
    accountSelected,
    contactNameOptions,
    statusOptions,
    subStatusOptions,
    productNameOptions,
    productVersionOptions,
    productSubVersionOptions,
    caseTypeOptions,
    reasonOptions,
    categoryOptions,
  } = useCaseForm({ defaultValues, menuItems });

  const caseID = defaultValues.CaseInformation.Cases_ID;

  const onSuccess = async (values: any) => {
    console.log("Success values", values);
    let id = caseID;
    // TODO:
    // Map menu values to appropriate fields
    // PUT data
    if (id) {
      const data = await fetch(`/cases/api/${id}/update/`);
      // Verify successful response
    } else {
      // POST new case
      // Set id to new case ID
    }
    router.push(`/cases/view/${id}`);
  };

  const onCancel = () => {
    router.back();
  };

  // Populate contact options if an account ID was provided when the form loaded
  React.useEffect(() => {
    const accountID = defaultValues.CaseInformation.Cases_AccountID;
    if (!accountID) return;
    getContactOptions(accountID);
  }, [defaultValues.CaseInformation.Cases_AccountID, getContactOptions]);

  // Populate owner name if the field does not already have a value
  React.useEffect(() => {
    if (session && !defaultValues.CaseInformation.Owner_Name) {
      defaultValues.CaseInformation.Owner_Name = session?.user?.name;
    }
  }, [defaultValues.CaseInformation, session]);

  // Cahnge binary values from strings to booleans
  updateBooleans(defaultValues);

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
        <FormDivider>Case Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Subject */}
            <TextFieldElement
              label="Subject"
              name="CaseInformation.Cases_Subject"
              required
              size="small"
            />
            {/* Account Name */}
            {/* May need to virtualize the list if performance is bad. */}
            {/* https://mui.com/material-ui/react-autocomplete/#virtualization */}
            <AutocompleteElement
              label="Account Name"
              name={getInputName(menuItems, "accountName")}
              required
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) =>
                  option.Menu_Display ||
                  initialValues.CaseInformation.Accounts_Name,
                renderOption: (props, option) => {
                  return (
                    <li {...props} key={option.Accounts_AccountID}>
                      {`${option.Accounts_Name} - ${option.Accounts_Site} (${option.AccountType_Description})`}
                    </li>
                  );
                },
                onChange: (_, value) => {
                  getContactOptions(value.Accounts_AccountID);
                  setAccountSelected(value);
                },
              }}
              options={menuItems.accountName.options}
            />
            {/* Contact Name */}
            <AutocompleteElement
              label="Contact Name"
              name={getInputName(menuItems, "contactName")}
              required
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) =>
                  option.Contacts_Name ||
                  initialValues.CaseInformation.Contacts_FullName,
                renderOption: (props, option) => {
                  return (
                    <li {...props} key={option.Contacts_ID}>
                      {`${option.Contacts_Name} (${option.Contacts_Email})`}
                    </li>
                  );
                },
                disabled: !accountSelected,
              }}
              // loading={!contactNameOptions.length}
              options={contactNameOptions}
            />
            {/* Case Origin */}
            <AutocompleteElement
              label="Case Origin"
              name={getInputName(menuItems, "caseOrigin")}
              required
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) =>
                  option.Menu_Display ||
                  initialValues.CaseInformation.Cases_Origin,
              }}
              options={menuItems.caseOrigin.options}
            />
            {/* Case Site */}
            <TextFieldElement label="Case Site" name="" size="small" />
            {/* Parent Case */}
            {/* <AutocompleteElement
              label="Parent Case"
              name="CaseInformation."
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
            {/* Reference Case ID */}
            {/* <TextFieldElement label="Reference Case ID" name="" size="small" /> */}
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Status */}
            <AutocompleteElement
              label="Status"
              name={getInputName(menuItems, "status")}
              required
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) =>
                  option.Menu_Display ||
                  initialValues.CaseInformation.Cases_Status,
                onChange: (_, value) => getSubStatusOptions(value.Menu_Value),
              }}
              options={statusOptions}
            />
            {/* Sub-Status */}
            <AutocompleteElement
              label="Sub-Status"
              name={getInputName(menuItems, "subStatus")}
              required={!!subStatusOptions}
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) =>
                  option.Menu_Display ||
                  initialValues.CaseInformation.Cases_SubStatus,
                disabled: !subStatusOptions.length,
              }}
              options={subStatusOptions}
            />
            {/* Hibernate End Date */}
            <DateFnsProvider>
              <DatePickerElement
                label="Hibernate End Date"
                name="CaseInformation.Cases_HibernateEndDate"
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider>
            {/* Case Owner */}
            <AutocompleteElement
              label="Case Owner"
              name={getInputName(menuItems, "caseOwner")}
              required
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) =>
                  option.Menu_Display ||
                  initialValues.CaseInformation.Owner_Name,
              }}
              options={menuItems.caseOwner.options}
            />
            {/* Case Sub-Owner */}
            <AutocompleteElement
              label="Case Sub-Owner"
              name={getInputName(menuItems, "caseSubOwner")}
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) =>
                  option.Menu_Display ||
                  initialValues.CaseInformation.Cases_SubOwner,
              }}
              options={menuItems.caseSubOwner.options}
            />
          </Stack>
        </Grid>
        <FormDivider>Case Profile</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Product Delivery Method */}
            <AutocompleteElement
              label="Product Delivery Method"
              name={getInputName(menuItems, "productDeliveryMethod")}
              required
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) =>
                  option.Menu_Display ||
                  initialValues.CaseProfile.Cases_ProductDeliveryMethod,
              }}
              options={menuItems.productDeliveryMethod.options}
            />
            {/* Product Name */}
            <AutocompleteElement
              label="Product Name"
              name={getInputName(menuItems, "productName")}
              required
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) =>
                  option.Menu_Display ||
                  initialValues.CaseProfile.Cases_ProductName,
                onChange: (_, value) => {
                  getProductVersionOptions(value.Menu_Value);
                  getCaseTypeOptions(value.Menu_Value);
                },
              }}
              options={productNameOptions}
            />
            {/* Product Version */}
            <AutocompleteElement
              label="Product Version"
              name={getInputName(menuItems, "productVersion")}
              required={!!productVersionOptions.length}
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) =>
                  option.Menu_Display ||
                  initialValues.CaseProfile.Cases_ProductVersion,
                onChange: (_, value) =>
                  getProductSubVersionOptions(value.Menu_Value),
                disabled: !productVersionOptions.length,
              }}
              options={productVersionOptions}
            />
            {/* Product Sub-Version */}
            <AutocompleteElement
              label="Product Sub-Version"
              name={getInputName(menuItems, "productSubVersion")}
              required={!!productSubVersionOptions.length}
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) =>
                  option.Menu_Display ||
                  initialValues.CaseProfile.Cases_ProductSubVersion,
                disabled: !productSubVersionOptions.length,
              }}
              options={productSubVersionOptions}
            />
            {/* Bug Number */}
            <TextFieldElement
              label="Bug Number"
              name="CaseProfile.Cases_BugNumber"
              size="small"
            />
            {/* Bug Description */}
            <TextFieldElement
              label="Bug Description"
              name="CaseProfile.Cases_BugDescription"
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Case Type */}
            <AutocompleteElement
              label="Case Type"
              name={getInputName(menuItems, "caseType")}
              required={!!productNameOptions.length}
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) =>
                  option.Menu_Display || initialValues.CaseProfile.Cases_Type,
                onChange: (_, value) => getReasonOptions(value.Menu_Display),
                disabled: !productNameOptions.length,
              }}
              options={caseTypeOptions}
            />
            {/* Reason */}
            <AutocompleteElement
              label="Reason"
              name={getInputName(menuItems, "reason")}
              required={!!caseTypeOptions.length}
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) =>
                  option.Menu_Display || initialValues.CaseProfile.Cases_Reason,
                onChange: (_, value) => getCategoryOptions(value.Menu_Display),
                disabled: !caseTypeOptions.length,
              }}
              options={reasonOptions}
            />
            {/* Category */}
            <AutocompleteElement
              label="Category"
              name={getInputName(menuItems, "category")}
              required={!!reasonOptions.length}
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) =>
                  option.Menu_Display ||
                  initialValues.CaseProfile.Cases_Category,
                disabled: !reasonOptions.length,
              }}
              options={categoryOptions}
            />
            {/* Priority */}
            <AutocompleteElement
              label="Priority"
              name={getInputName(menuItems, "priority")}
              required
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) =>
                  option.Menu_Display ||
                  initialValues.CaseProfile.Cases_Priority,
              }}
              options={menuItems.priority.options}
            />
            {/* Severity */}
            <AutocompleteElement
              label="Severity"
              name={getInputName(menuItems, "severity")}
              required
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) =>
                  option.Menu_Display ||
                  initialValues.CaseProfile.Cases_Severity,
              }}
              options={menuItems.severity.options}
            />
            {/* Is TAM Case */}
            <CheckboxElement
              label="Is TAM Case"
              name="CaseProfile.Cases_IsTAMCase"
              size="small"
              // defaultChecked={
              //   !!Number(defaultValues.CaseProfile.Cases_IsTAMCase)
              // }
              // value={defaultValues.CaseProfile.Cases_IsTAMCase}
            />
          </Stack>
        </Grid>
        <FormDivider>Description Information</FormDivider>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {/* Description */}
            <TextareaAutosizeElement
              label="Description"
              name="CaseProfile.Cases_Description"
              required
              rows={3}
              size="small"
            />
            {/* Internal Comments */}
            {/* <TextareaAutosizeElement
              label="Internal Comments"
              name=""
              rows={3}
              size="small"
            /> */}
            {/* Visible in Self-Service Portal */}
            {/* <CheckboxElement
              label="Visible in Self-Service Portal"
              name=""
              size="small"
            /> */}
          </Stack>
        </Grid>
        {/* <FormDivider>Case Escalation Details</FormDivider> */}
        {/* <Grid item xs={6}> */}
        {/* <Stack spacing={1}> */}
        {/* Escalation Status */}
        {/* <AutocompleteElement
              label="Escalation Status"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
        {/* Escalation Source */}
        {/* <AutocompleteElement
              label="Escalation Source"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
        {/* </Stack> */}
        {/* </Grid> */}
        {/* <Grid item xs={6}> */}
        {/* <Stack spacing={1}> */}
        {/* Escalation Type */}
        {/* <AutocompleteElement
              label="Escalation Type"
              name=""
              autocompleteProps={{ size: "small" }}
              options={STATUS_OPTIONS}
            /> */}
        {/* Escalation Flag */}
        {/* <AutocompleteElement
              label="Escalation Flag"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
        {/* </Stack> */}
        {/* </Grid> */}
        {/* <FormDivider>Web Information</FormDivider> */}
        {/* <Grid item xs={6}> */}
        {/* <Stack spacing={1}> */}
        {/* Web Company */}
        {/* <TextFieldElement label="Web Company" name="" size="small" /> */}
        {/* Web Name */}
        {/* <TextFieldElement label="Web Name" name="" size="small" /> */}
        {/* </Stack> */}
        {/* </Grid> */}
        {/* <Grid item xs={6}> */}
        {/* <Stack spacing={1}> */}
        {/* Web Phone */}
        {/* <TextFieldElement label="Web Phone" name="" size="small" /> */}
        {/* Web Email */}
        {/* <TextFieldElement
              label="Web Email"
              name=""
              size="small"
              type="email"
            /> */}
        {/* </Stack> */}
        {/* </Grid> */}
        <FormDivider>Assignment</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Assign using active assignment rule */}
            <CheckboxElement
              label="Assign using active assignment rule"
              name=""
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Send notification email to contact */}
            <CheckboxElement
              label="Send notification email to contact"
              name=""
              size="small"
            />
          </Stack>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
