"use client";

import React from "react";
import { FormWrapper } from "../FormWrapper";
import { FormDivider } from "../FormDivider";
import { Backdrop, CircularProgress, Grid, Stack } from "@mui/material";
import {
  AutocompleteElement,
  CheckboxElement,
  // CheckboxElement,
  // DatePickerElement,
  // DateTimePickerElement,
  MultiSelectElement,
  TextFieldElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import { FormProps } from "@/app/types/types";
import { useContactForm } from "./useContactForm";
import { ContactData } from "@/app/types/contacts";
import { isSuccessfulResponse } from "@/app/utils/utils";
// import DateFnsProvider from "../providers/DateFnsProvider";

interface ContactFormProps extends FormProps {
  contactData?: ContactData;
}

export const ContactForm = ({
  formTitle,
  defaultValues,
  menuItems,
  contactData,
  ...props
}: ContactFormProps) => {
  const router = useRouter();
  const {
    menuOptions,
    setIsLoading,
    isLoading,
    createContactFormSubmissionData,
  } = useContactForm({ menuItems });

  const onSuccess = async (values: any) => {
    setIsLoading(true);
    const data = await createContactFormSubmissionData(values, contactData);
    console.log("Success values", values);
    console.log("Submitted Data:", data);
    let id = defaultValues.contactID;
    const url = id ? "/api/contacts/update" : "/api/contacts/insert";
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
    // Refresh the page cache
    React.startTransition(() => {
      router.refresh();
    });
    // Invalidate cached account data
    await fetch("/api/revalidate/tag?tag=contact");
    setIsLoading(false);
    router.push(`/contacts/view/${id}`);
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
          <FormDivider>Contact Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Contact Owner */}
              <AutocompleteElement
                label="Contact Owner"
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
              <p>
                <b>Name</b>
              </p>
              {/* Salutation */}
              {/* <AutocompleteElement
              label="Salutation"
              name="salutation"
              autocompleteProps={{
                style: { marginLeft: "20px" },
                size: "small",
              }}
              options={menuOptions.Salutation}
            /> */}
              {/* First Name */}
              <TextFieldElement
                label="First Name"
                name="firstName"
                size="small"
                style={{ marginLeft: "20px" }}
              />
              {/* Last Name */}
              <TextFieldElement
                label="Last Name"
                name="lastName"
                required
                size="small"
                style={{ marginLeft: "20px" }}
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
              {/* Title */}
              <TextFieldElement label="Title" name="title" size="small" />
              {/* Reports To */}
              {/* <AutocompleteElement
              label="Reports To"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
              {/* Job Role */}
              <AutocompleteElement
                label="Job Role"
                name="jobRole"
                required
                autocompleteProps={{ size: "small" }}
                options={menuOptions.JobRole}
              />
              {/* Contact Role */}
              <AutocompleteElement
                label="Contact Role"
                name="contactRole"
                autocompleteProps={{ size: "small" }}
                options={menuOptions.ContactRole}
              />
              {/* Email */}
              <TextFieldElement
                label="Email"
                name="email"
                required
                size="small"
                type="email"
              />
              {/* Unconfirmed Email */}
              <CheckboxElement
                label="Unconfirmed Email"
                name="unconfirmedEmail"
                size="small"
              />
              {/* Most Recent Product Interest */}
              {/* <AutocompleteElement
              label="Most Recent Product Interest"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
              {/* Interest */}
              {/* <MultiSelectElement
              label="Interest"
              name=""
              preserveOrder
              showChips
              options={[]}
            /> */}
              {/* Do Not Send Support Survey */}
              <CheckboxElement
                label="Do Not Send Support Survey"
                name="doNotSendSupportSurvey"
                size="small"
              />
              {/* Webtrends OC */}
              {/* <AutocompleteElement
              label="Webtrends OC"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
              {/* HTML Login */}
              {/* <CheckboxElement label="HTML Login" name="" size="small" /> */}
              {/* Flash Login */}
              {/* <CheckboxElement label="Flash Login" name="" size="small" /> */}
              {/* EOL Product */}
              {/* <TextFieldElement label="EOL Product" name="" size="small" /> */}
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Relationship to Webtrends */}
              <MultiSelectElement
                label="Relationship to Webtrends"
                name="relationship"
                preserveOrder
                showChips
                size="small"
                options={menuOptions.RelationshipToWebtrends}
              />
              {/* Contact Status */}
              <AutocompleteElement
                label="Contact Status"
                name="contactStatus"
                autocompleteProps={{ size: "small" }}
                options={menuOptions.ContactStatus}
              />
              {/* MQL Date */}
              {/* <DateFnsProvider>
              <DatePickerElement label="MQL Date" name="" />
            </DateFnsProvider> */}
              {/* Lead Source */}
              {/* <AutocompleteElement
              label="Lead Source"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
              {/* Phone */}
              <TextFieldElement label="Phone" name="phone" size="small" />
              {/* Mobile */}
              <TextFieldElement label="Mobile" name="mobile" size="small" />
              {/* Other Phone */}
              <TextFieldElement
                label="Other Phone"
                name="otherPhone"
                size="small"
              />
              {/* Fax */}
              {/* <TextFieldElement label="Fax" name="" size="small" /> */}
              {/* Flash Login */}
              {/* <CheckboxElement label="Flash Login" name="" size="small" /> */}
              {/* Named Support Contact */}
              <CheckboxElement
                label="Named Support Contact"
                name="namedSupportContact"
                size="small"
              />
              {/* Support Contract Administrator */}
              <CheckboxElement
                label="Support Contract Administrator"
                name="supportContactAdmin"
                size="small"
              />
              {/* Target Account Type */}
              {/* <AutocompleteElement
              label="Target Account Type"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
            </Stack>
          </Grid>
          {/* <FormDivider>Social Media Presence</FormDivider> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* LinkedIn Profile */}
          {/* <TextFieldElement label="LinkedIn Profile" name="" size="small" /> */}
          {/* Social Media Properties */}
          {/* <TextareaAutosizeElement
              label="Social Media Properties"
              name=""
              rows={3}
              size="small"
            /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Marked for Deletion */}
          {/* <CheckboxElement label="Marked for Deletion" name="" size="small" /> */}
          {/* Twitter ID */}
          {/* <TextFieldElement label="Twitter ID" name="" size="small" /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          <FormDivider>Address Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <p>
                <b>Mailing Address</b>
              </p>
              {/* Mailing Street */}
              <TextareaAutosizeElement
                label="Mailing Street"
                name="address.mailing.street"
                rows={3}
                size="small"
              />
              {/* Mailing City */}
              <TextFieldElement
                label="Mailing City"
                name="address.mailing.city"
                size="small"
              />
              {/* Mailing State/Province */}
              <TextFieldElement
                label="Mailing State/Province"
                name="address.mailing.state"
                size="small"
              />
              {/* Mailing Zip/Postal Code */}
              <TextFieldElement
                label="Mailing Zip/Postal Code"
                name="address.mailing.postalCode"
                size="small"
              />
              {/* Mailing Country */}
              <TextFieldElement
                label="Mailing Country"
                name="address.mailing.country"
                size="small"
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <p>
                <b>Other Address</b>
              </p>
              {/* Other Street */}
              <TextareaAutosizeElement
                label="Other Street"
                name="address.other.street"
                rows={3}
                size="small"
              />
              {/* Other City */}
              <TextFieldElement
                label="Other City"
                name="address.other.city"
                size="small"
              />
              {/* Other State/Province */}
              <TextFieldElement
                label="Other State/Province"
                name="address.other.state"
                size="small"
              />
              {/* Other Zip/Postal Code */}
              <TextFieldElement
                label="Other Zip/Postal Code"
                name="address.other.postalCode"
                size="small"
              />
              {/* Other Country */}
              <TextFieldElement
                label="Other Country"
                name="address.other.country"
                size="small"
              />
              {/* Super Region */}
              {/* <AutocompleteElement
              label="Super Region"
              name="address.superRegion"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.SuperRegion}
            /> */}
            </Stack>
          </Grid>
          {/* <FormDivider>ADR/ISR Information</FormDivider> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* ADR/ISR Generated */}
          {/* <AutocompleteElement
              label="ADR/ISR Generated"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
          {/* Meeting Scheduled Date */}
          {/* <DateFnsProvider>
              <DatePickerElement label="Meeting Scheduled Date" name="" />
            </DateFnsProvider> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Meeting Rescheduled Date */}
          {/* <DateFnsProvider>
              <DatePickerElement label="Meeting Rescheduled Date" name="" />
            </DateFnsProvider> */}
          {/* Meeting Occurred Date */}
          {/* <DateFnsProvider>
              <DatePickerElement label="Meeting Occurred Date" name="" />
            </DateFnsProvider> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <FormDivider>Description Information</FormDivider> */}
          {/* <Grid item xs={12}> */}
          {/* <Stack spacing={1}> */}
          {/* Product Interest */}
          {/* <MultiSelectElement
              label="Product Interest"
              name=""
              preserveOrder
              showChips
              options={[]}
            /> */}
          {/* Comments */}
          {/* <TextareaAutosizeElement
              label="Comments"
              name=""
              rows={3}
              size="small"
            /> */}
          {/* Lead Notes */}
          {/* <TextareaAutosizeElement
              label="Lead Notes"
              name=""
              rows={3}
              size="small"
            /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <FormDivider>Marketing Information</FormDivider> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Lead Source Details */}
          {/* <TextFieldElement
              label="Lead Source Details"
              name=""
              size="small"
            /> */}
          {/* Lead Source Original */}
          {/* <TextFieldElement
              label="Lead Source Original"
              name=""
              size="small"
            /> */}
          {/* Lead Source Details Original */}
          {/* <TextFieldElement
              label="Lead Source Details Original"
              name=""
              size="small"
            /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Email Remarketing Lead Date */}
          {/* <DateFnsProvider>
              <DatePickerElement label="Email Remarketing Lead Date" name="" />
            </DateFnsProvider> */}
          {/* Most Recent Activity */}
          {/* <TextFieldElement
              label="Most Recent Activity"
              name=""
              size="small"
            /> */}
          {/* Most Recent Response Type */}
          {/* <TextFieldElement
              label="Most Recent Response Type"
              name=""
              size="small"
            /> */}
          {/* SharePoint Contact */}
          {/* <CheckboxElement label="SharePoint Contact" name="" size="small" /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          <FormDivider>Demographic Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Preferred Language */}
              <AutocompleteElement
                label="Preferred Language"
                name="demographic.preferredLanguage"
                autocompleteProps={{ size: "small" }}
                options={menuOptions.PreferredLanguage}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Time Zone */}
              <AutocompleteElement
                label="Time Zone"
                name="demographic.timezone"
                autocompleteProps={{ size: "small" }}
                options={menuOptions.TimeZone}
              />
            </Stack>
          </Grid>
          <FormDivider>Communication Preferences</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Email Opt Out */}
              <CheckboxElement
                label="Email Opt Out"
                name="communication.emailOptOut"
                size="small"
              />
              {/* Do Not Call */}
              <CheckboxElement
                label="Do Not Call"
                name="communication.doNotCall"
                size="small"
              />
              {/* No Install Admin Newsletter */}
              {/* <CheckboxElement
              label="No Install Admin Newsletter"
              name=""
              size="small"
            /> */}
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Postal Mail Opt Out */}
              <CheckboxElement
                label="Postal Mail Opt Out"
                name="communication.postalMailOptOut"
                size="small"
              />
              {/* Do Not Remarket */}
              <CheckboxElement
                label="Do Not Remarket"
                name="communication.doNotRemarket"
                size="small"
              />
              {/* Double Opt-In */}
              {/* <CheckboxElement label="Double Opt-In" name="" size="small" /> */}
              {/* Double Opt-In Timestamp */}
              {/* <DateFnsProvider>
              <DateTimePickerElement label="Double Opt-In Timestamp" name="" />
            </DateFnsProvider> */}
            </Stack>
          </Grid>
          {/* <FormDivider>System Information</FormDivider> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* NPS Score */}
          {/* <AutocompleteElement
              label="NPS Score"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
          {/* NPS Reason Promoter */}
          {/* <TextareaAutosizeElement
              label="NPS Reason Promoter"
              name=""
              rows={3}
              size="small"
            /> */}
          {/* Default Account */}
          {/* <CheckboxElement label="Default Account" name="" size="small" /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* NPS Comments */}
          {/* <TextareaAutosizeElement
              label="NPS Comments"
              name=""
              rows={3}
              size="small"
            /> */}
          {/* NPS Reason Detractor */}
          {/* <TextareaAutosizeElement
              label="NPS Reason Detractor"
              name=""
              rows={3}
              size="small"
            /> */}
          {/* </Stack> */}
          {/* </Grid> */}
        </Grid>
      </FormWrapper>
    </>
  );
};
