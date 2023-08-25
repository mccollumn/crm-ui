"use client";

import { FormWrapper } from "./FormWrapper";
import { FormDivider } from "./FormDivider";
import { Grid, Stack } from "@mui/material";
import {
  AutocompleteElement,
  CheckboxElement,
  DatePickerElement,
  TextFieldElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import DateFnsProvider from "../providers/DateFnsProvider";
import { CaseInformation, CaseProfile } from "../types/cases";
import React from "react";

type CaseFormProps = {
  formTitle: string;
  // onSuccess: any;
  // onCancel: any;
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
    Cases_Status: "",
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
    Cases_IsTAMCase: "0",
    Cases_Priority: "",
    Cases_ProductDeliveryMethod: "",
    Cases_ProductName: "",
    Cases_ProductSubVersion: "",
    Cases_ProductVersion: "",
    Cases_Reason: "",
    Cases_Severity: "",
    Cases_Subject: "",
    Cases_Type: "",
  },
};

const STATUS_OPTIONS = ["Open", "Closed", "Hibernate"];

export const CaseForm = ({
  formTitle,
  // onSuccess,
  // onCancel,
  defaultValues = initialValues,
  menuItems,
  ...props
}: CaseFormProps) => {
  const router = useRouter();

  const [subStatus, setSubStatus] = React.useState([]);
  const [productNames, setProductNames] = React.useState([]);
  const [productVersions, setProductVersions] = React.useState([]);
  const [productSubVersions, setProductSubVersions] = React.useState([]);
  const [caseType, setCaseType] = React.useState([]);
  const [reason, setReason] = React.useState([]);
  const [category, setCategory] = React.useState([]);

  const caseID = defaultValues.CaseInformation.Cases_ID;

  const onSuccess = async (values: any) => {
    console.log("Success values", values);
    let id = caseID;
    // TODO:
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
            <AutocompleteElement
              label="Account Name"
              name="CaseInformation.Accounts_Name"
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Contact Name */}
            <AutocompleteElement
              label="Contact Name"
              name="CaseInformation.Contacts_FullName"
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Case Origin */}
            <AutocompleteElement
              label="Case Origin"
              name="CaseInformation.Cases_Origin"
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
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
              name="CaseInformation.Cases_Status"
              required
              autocompleteProps={{ size: "small" }}
              options={STATUS_OPTIONS}
            />
            {/* Sub-Status */}
            <AutocompleteElement
              label="Sub-Status"
              name="CaseInformation.Cases_SubStatus"
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Hibernate End Date */}
            <DateFnsProvider>
              <DatePickerElement
                label="Hibernate End Date"
                name="CaseInformation.Cases_HibernateEndDate"
              />
            </DateFnsProvider>
            {/* Case Owner */}
            <AutocompleteElement
              label="Case Owner"
              name="CaseInformation.Owner_Name"
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Case Sub-Owner */}
            <AutocompleteElement
              label="Case Sub-Owner"
              name="CaseInformation.Cases_SubOwner"
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
          </Stack>
        </Grid>
        <FormDivider>Case Profile</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Product Delivery Method */}
            <AutocompleteElement
              label="Product Delivery Method"
              name="CaseProfile.Cases_ProductDeliveryMethod"
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Product Name */}
            <AutocompleteElement
              label="Product Name"
              name="CaseProfile.Cases_ProductName"
              required
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) => option.Menu_Display,
              }}
              options={menuItems.productNames.options}
            />
            {/* Product Version */}
            <AutocompleteElement
              label="Product Version"
              name="CaseProfile.Cases_ProductVersion"
              required
              autocompleteProps={{
                size: "small",
                getOptionLabel: (option) => option.Menu_Display,
              }}
              options={menuItems.productVersions.options}
            />
            {/* Product Sub-Version */}
            <AutocompleteElement
              label="Product Sub-Version"
              name="CaseProfile.Cases_ProductSubVersion"
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
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
              name="CaseProfile.Cases_Type"
              required
              autocompleteProps={{ size: "small" }}
              options={STATUS_OPTIONS}
            />
            {/* Reason */}
            <AutocompleteElement
              label="Reason"
              name="CaseProfile.Cases_Reason"
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Category */}
            <AutocompleteElement
              label="Category"
              name="CaseProfile.Cases_Category"
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Priority */}
            <AutocompleteElement
              label="Priority"
              name="CaseProfile.Cases_Priority"
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Severity */}
            <AutocompleteElement
              label="Severity"
              name="CaseProfile.Cases_Severity"
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            />
            {/* Is TAM Case */}
            <CheckboxElement
              label="Is TAM Case"
              name="CaseProfile.Cases_IsTAMCase"
              size="small"
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
