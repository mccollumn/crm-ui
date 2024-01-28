"use client";

import React from "react";
import { FormWrapper } from "../FormWrapper";
import { FormDivider } from "../FormDivider";
import { Backdrop, CircularProgress, Grid, Stack } from "@mui/material";
import {
  AutocompleteElement,
  CheckboxElement,
  MultiSelectElement,
  TextFieldElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import { FormProps } from "@/app/types/types";
import { useContactForm } from "./useContactForm";
import { ContactData } from "@/app/types/contacts";
import { StyledPopper, VirtualizedListbox } from "../VirtualizedListbox";

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
  const { menuOptions, setIsLoading, isLoading, submitContact } =
    useContactForm({ menuItems });

  const onSuccess = async (values: any) => {
    setIsLoading(true);
    const responseData = await submitContact(
      values,
      defaultValues,
      contactData
    );

    let id = defaultValues.contactID;
    if (!id) {
      id = responseData?.res?.ID;
    }

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
              <p>
                <b>Name</b>
              </p>
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
                        }${
                          option.description ? ` (${option.description})` : ""
                        }`}</pre>
                      </li>
                    );
                  },
                  size: "small",
                }}
                options={menuOptions.Account}
              />
              {/* Title */}
              <TextFieldElement label="Title" name="title" size="small" />
              {/* Job Role */}
              <AutocompleteElement
                label="Job Role"
                name="jobRole"
                required
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.JobRole}
              />
              {/* Contact Role */}
              <AutocompleteElement
                label="Contact Role"
                name="contactRole"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
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
              {/* Do Not Send Support Survey */}
              <CheckboxElement
                label="Do Not Send Support Survey"
                name="doNotSendSupportSurvey"
                size="small"
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Relationship */}
              <MultiSelectElement
                label="Relationship"
                name="relationship"
                preserveOrder
                showChips
                size="small"
                options={menuOptions.Relationship}
              />
              {/* Contact Status */}
              <AutocompleteElement
                label="Contact Status"
                name="contactStatus"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.ContactStatus}
              />
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
            </Stack>
          </Grid>
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
            </Stack>
          </Grid>
          <FormDivider>Demographic Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Preferred Language */}
              <AutocompleteElement
                label="Preferred Language"
                name="demographic.preferredLanguage"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
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
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
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
            </Stack>
          </Grid>
        </Grid>
      </FormWrapper>
    </>
  );
};
