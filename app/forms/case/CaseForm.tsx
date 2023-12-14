"use client";

import React from "react";
import { useFormWrapper } from "../FormWrapper";
import { FormDivider } from "../FormDivider";
import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  Stack,
  createFilterOptions,
} from "@mui/material";
import {
  AutocompleteElement,
  CheckboxElement,
  DatePickerElement,
  TextFieldElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import DateFnsProvider from "@/app/providers/DateFnsProvider";
import { FormProps } from "@/app/types/types";
import { useCaseForm } from "./useCaseForm";
import { CaseData } from "@/app/types/cases";
import { SupportStatus } from "@/app/components/SupportStatus";
import { StyledPopper, VirtualizedListbox } from "../VirtualizedListbox";

interface CaseFormProps extends FormProps {
  caseData?: CaseData;
}

export const CaseForm = ({
  formTitle,
  defaultValues,
  menuItems,
  caseData,
  ...props
}: CaseFormProps) => {
  const router = useRouter();
  const {
    setMenuOptions,
    getContactOptions,
    setContacts,
    clearMenuOptions,
    setAccountSelected,
    submitCase,
    setIsLoading,
    isLoading,
    menuOptions,
    accountSelected,
  } = useCaseForm({ menuItems, defaultValues });
  const { FormWrapper, formContext } = useFormWrapper(defaultValues);

  const onSuccess = async (values: any) => {
    setIsLoading(true);
    const responseData = await submitCase(values, defaultValues, caseData);

    let id = defaultValues.caseID;
    if (!id) {
      id = responseData?.res?.ID;
    }

    setIsLoading(false);
    router.push(`/cases/view/${id}`);
  };

  const onCancel = () => {
    router.back();
  };

  const [allContactsFlag, setAllContactsFlag] = React.useState(false);
  const onShowAllContacts = () => {
    formContext.resetField("contact");
    clearMenuOptions("Contact");
    setContacts();
    setAllContactsFlag(true);
  };

  const onAccountChange = (value: any) => {
    // If account value was cleared
    if (!value) {
      clearMenuOptions("Contact");
      setContacts();
      setAllContactsFlag(false);
      return;
    }
    setMenuOptions("Contact");
    if (value?.id) {
      clearMenuOptions("Contact");
      getContactOptions(value.id);
    }
    setAccountSelected(value);
  };

  const onContactChange = (value: any) => {
    // Show All Contacts option was clicked
    if (value.id === "-1") {
      onShowAllContacts();
      return;
    }
    // Set the account and repopulate menu with the account's contacts,
    // unless the Show All Contacts option was used.
    if (!allContactsFlag) {
      const account = {
        id: value.accountID,
        name: value.accountName,
      };
      formContext.setValue("account", account);
      setAccountSelected(account);
      getContactOptions(account.id);
    }
  };

  const renderAccountOptions = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: any
  ) => {
    return (
      <li {...props} key={option.id}>
        <b>{option.name}</b>
        <pre style={{ margin: 0 }}>{`${option.site ? ` - ${option.site}` : ""}${
          option.description ? ` (${option.description})` : ""
        }`}</pre>
      </li>
    );
  };

  const renderContactOptions = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: any
  ) => {
    // Show All Contacts option
    if (option.id === "-1") {
      return (
        <li {...props} key={option.id}>
          <Button fullWidth>Show All Contacts</Button>
        </li>
      );
    }
    return (
      <li {...props} key={option.id}>
        <b>{option.name}</b>
        <pre style={{ margin: 0 }}>{`${
          option.email ? ` - ${option.email}` : ""
        }${option.accountName ? ` - ${option.accountName}` : ""}${
          option.title ? ` (${option.title})` : ""
        }`}</pre>
      </li>
    );
  };

  const contactFilterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: any) =>
      `${option.name} ${option.email} ${option.accountName} ${option.title}`,
  });

  // Populate contact options if an account ID was provided when the form loaded
  React.useEffect(() => {
    const accountID = defaultValues.account.id;
    if (!accountID) return;
    getContactOptions(accountID);
  }, [defaultValues.account.id, getContactOptions]);

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
        formContext={formContext}
      >
        <Grid container spacing={1}>
          <SupportStatus accountID={accountSelected?.id} />
          <FormDivider>Case Information</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Subject */}
              <TextFieldElement
                label="Subject"
                name="subject"
                required
                size="small"
              />
              {/* Contact Name */}
              <AutocompleteElement
                label="Contact Name"
                name="contact"
                required
                loading={menuOptions.Contact.length === 0}
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  disableListWrap: true,
                  ListboxComponent: VirtualizedListbox,
                  PopperComponent: StyledPopper,
                  size: "small",
                  getOptionLabel: (option) => option.name || "",
                  renderOption: (props, option) =>
                    renderContactOptions(props, option),
                  filterOptions: contactFilterOptions,
                  onChange: (_, value) => onContactChange(value),
                }}
                options={menuOptions.Contact}
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
                  size: "small",
                  getOptionLabel: (option) => option.name || "",
                  renderOption: (props, option) =>
                    renderAccountOptions(props, option),
                  isOptionEqualToValue(option, value) {
                    return option.id === value.id;
                  },
                  onChange: (_, value) => onAccountChange(value),
                }}
                options={menuOptions.Account}
              />
              {/* Case Origin */}
              <AutocompleteElement
                label="Case Origin"
                name="origin"
                required
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.CaseOrigin}
              />
              {/* Case Site */}
              {/* <TextFieldElement label="Case Site" name="" size="small" /> */}
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
                name="status"
                required
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                  onChange: (_, value) => {
                    clearMenuOptions("Sub-Status");
                    formContext.setValue("subStatus", null);
                    setMenuOptions("Sub-Status", value);
                  },
                }}
                options={menuOptions.CaseStatus}
              />
              {/* Sub-Status */}
              <AutocompleteElement
                label="Sub-Status"
                name="subStatus"
                required={!!menuOptions["Sub-Status"].length}
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                  disabled: !menuOptions["Sub-Status"].length,
                }}
                options={menuOptions["Sub-Status"]}
              />
              {/* Hibernate End Date */}
              <DateFnsProvider>
                <DatePickerElement
                  label="Hibernate End Date"
                  name="hibernateEndDate"
                  inputProps={{ size: "small" }}
                />
              </DateFnsProvider>
              {/* Case Owner */}
              <AutocompleteElement
                label="Case Owner"
                name="owner"
                required
                loading={menuOptions.CaseOwner.length === 0}
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
                options={menuOptions.CaseOwner}
              />
              {/* Case Sub-Owner */}
              <AutocompleteElement
                label="Case Sub-Owner"
                name="subOwner"
                loading={menuOptions.SubOwner.length === 0}
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
                options={menuOptions.SubOwner}
              />
            </Stack>
          </Grid>
          <FormDivider>Case Profile</FormDivider>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Product Delivery Method */}
              <AutocompleteElement
                label="Product Delivery Method"
                name="product.deliveryMethod"
                required
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.ProductDeliveryMethod}
              />
              {/* Product Name */}
              <AutocompleteElement
                label="Product Name"
                name="product.name"
                required
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                  onChange: (_, value) => {
                    clearMenuOptions("ProductVersion");
                    formContext.setValue("product.version", null);
                    setMenuOptions("ProductVersion", value);
                    clearMenuOptions("CaseType");
                    formContext.setValue("type", null);
                    setMenuOptions("CaseType", value);
                  },
                }}
                options={menuOptions.ProductName}
              />
              {/* Product Version */}
              <AutocompleteElement
                label="Product Version"
                name="product.version"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                  onChange: (_, value) =>
                    setMenuOptions("ProductSubVersion", value),
                  disabled: !menuOptions.ProductVersion.length,
                }}
                options={menuOptions.ProductVersion}
              />
              {/* Product Sub-Version */}
              <AutocompleteElement
                label="Product Sub-Version"
                name="product.subVersion"
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                  disabled: !menuOptions.ProductSubVersion.length,
                }}
                options={menuOptions.ProductSubVersion}
              />
              {/* Bug Number */}
              <TextFieldElement
                label="Bug Number"
                name="bugNumber"
                size="small"
              />
              {/* Bug Description */}
              <TextFieldElement
                label="Bug Description"
                name="bugDescription"
                size="small"
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {/* Case Type */}
              <AutocompleteElement
                label="Case Type"
                name="type"
                required={!!menuOptions.CaseType.length}
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                  onChange: (_, value) => {
                    clearMenuOptions("Reason");
                    formContext.setValue("reason", null);
                    setMenuOptions("Reason", value);
                  },
                  disabled: !menuOptions.CaseType.length,
                }}
                options={menuOptions.CaseType}
              />
              {/* Reason */}
              <AutocompleteElement
                label="Reason"
                name="reason"
                required={!!menuOptions.Reason.length}
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                  onChange: (_, value) => {
                    clearMenuOptions("Category");
                    formContext.setValue("category", null);
                    setMenuOptions("Category", value);
                  },
                  disabled: !menuOptions.Reason.length,
                }}
                options={menuOptions.Reason}
              />
              {/* Category */}
              <AutocompleteElement
                label="Category"
                name="category"
                required={!!menuOptions.Category.length}
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                  disabled: !menuOptions.Category.length,
                }}
                options={menuOptions.Category}
              />
              {/* Priority */}
              <AutocompleteElement
                label="Priority"
                name="priority"
                required
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.Priority}
              />
              {/* Severity */}
              <AutocompleteElement
                label="Severity"
                name="severity"
                required
                autocompleteProps={{
                  autoSelect: true,
                  autoHighlight: true,
                  size: "small",
                }}
                options={menuOptions.Severity}
              />
              {/* Is TAM Case */}
              <CheckboxElement
                label="Is TAM Case"
                name="isTamCase"
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
                name="description"
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
          {/* <FormDivider>Assignment</FormDivider> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Assign using active assignment rule */}
          {/* <CheckboxElement
                label="Assign using active assignment rule"
                name=""
                size="small"
              /> */}
          {/* </Stack> */}
          {/* </Grid> */}
          {/* <Grid item xs={6}> */}
          {/* <Stack spacing={1}> */}
          {/* Send notification email to contact */}
          {/* <CheckboxElement
                label="Send notification email to contact"
                name=""
                size="small"
              /> */}
          {/* </Stack> */}
          {/* </Grid> */}
        </Grid>
      </FormWrapper>
    </>
  );
};
