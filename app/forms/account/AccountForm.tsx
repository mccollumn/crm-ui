"use client";

import { FormWrapper } from "../FormWrapper";
import { FormDivider } from "../FormDivider";
import {
  AutocompleteElement,
  CheckboxElement,
  DatePickerElement,
  TextFieldElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import { useRouter } from "next/navigation";
import { Grid, Stack } from "@mui/material";
import DateFnsProvider from "../../providers/DateFnsProvider";
import { FormProps } from "@/app/types/types";
import { useAccountForm } from "./useAccountForm";
import React from "react";

export const AccountForm = ({
  formTitle,
  defaultValues,
  menuItems,
  ...props
}: FormProps) => {
  const router = useRouter();
  const { menuOptions, FormatCurrency, FormatNumber } = useAccountForm({
    menuItems,
  });

  const accountID = defaultValues.accountID;

  const onSuccess = async (values: any) => {
    console.log("Success values", values);
    let id = accountID;
    // TODO:
    // Map menu values to appropriate fields
    // PUT data
    if (id) {
      const data = await fetch("/accounts/api/new/");
      // Verify successful response
    } else {
      // POST new account
      // Set id to new account ID
    }
    router.push(`/accounts/view/${id}`);
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
        <FormDivider>Account Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Account Owner */}
            <AutocompleteElement
              label="Account Owner"
              name="owner"
              required
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
            {/* Account Name */}
            <TextFieldElement
              label="Account Name"
              name="name"
              required
              size="small"
            />
            {/* Alternate Account Name */}
            <TextFieldElement
              label="Alternate Account Name"
              name="alternateName"
              size="small"
            />
            {/* Parent Account */}
            {/* <AutocompleteElement
              label="Parent Account"
              name="parentAccount"
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
              options={menuOptions.ParentAccount}
            /> */}
            {/* Account Record Type */}
            {/* <AutocompleteElement
              label="Account Record Type"
              name="type"
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
            {/* Account Type */}
            <AutocompleteElement
              label="Account Type"
              name="type"
              autocompleteProps={{
                getOptionLabel: (option) => option.value || "",
                renderOption: (props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.value}
                    </li>
                  );
                },
                size: "small",
              }}
              options={menuOptions.AccountType}
            />
            {/* Super Region */}
            <AutocompleteElement
              label="Super Region"
              name="superRegion"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.SuperRegion}
              required
            />
            {/* Type Last Change Date */}
            {/* <DateFnsProvider>
              <DatePickerElement
                label="Type Last Change Date"
                name="type.lastChangeDate"
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider> */}
            {/* Vertical */}
            {/* <AutocompleteElement
              label="Vertical"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
            {/* Website */}
            {/* <TextFieldElement label="Website" name="" size="small" /> */}
            {/* Misc. Info */}
            {/* <TextFieldElement label="Misc. Info" name="miscInfo" size="small" /> */}
            {/* Migrate to New Org */}
            {/* <AutocompleteElement
              label="Migrate to New Org"
              name="migrateToNewOrg"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.MigrateToNewOrg}
            /> */}
            {/* Migration External ID */}
            {/* <TextFieldElement
              label="Migration External ID"
              name="migrationExternalID"
              size="small"
            /> */}
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Client Health */}
            {/* <AutocompleteElement
              label="Client Health"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
            {/* Client Unhealthy Reason */}
            {/* <AutocompleteElement
              label="Client Unhealthy Reason"
              name=""
              required
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
            {/* Client Unhealthy Reason Other */}
            {/* <TextareaAutosizeElement
              label="Client Unhealthy Reason Other"
              name=""
              rows={3}
              size="small"
            /> */}
            {/* Fax */}
            {/* <TextFieldElement label="Fax" name="" size="small" /> */}
            {/* Phone */}
            <TextFieldElement label="Phone" name="phone" size="small" />
            {/* Target Account Type */}
            {/* <AutocompleteElement
              label="Target Account Type"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
            {/* Global Account */}
            {/* <CheckboxElement label="Global Account" name="" size="small" /> */}
            {/* USD Total Order Value */}
            <TextFieldElement
              label="USD Total Order Value"
              name="orderValue.total"
              size="small"
              InputProps={{ inputComponent: FormatCurrency as any }}
            />
            {/* Is Federal */}
            <CheckboxElement
              label="Is Federal or State"
              name="isFederalState"
              size="small"
            />
            {/* Government Type */}
            <TextFieldElement
              label="Government Type"
              name="governmentType"
              size="small"
            />
            {/* Is State */}
            {/* <CheckboxElement label="Is State" name="isState" size="small" /> */}
            {/* Territory */}
            {/* <AutocompleteElement
              label="Territory"
              name="territory"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.Territory}
            /> */}
            {/* Region */}
            {/* <AutocompleteElement
              label="Region"
              name="region"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.Region}
            /> */}
            {/* MSA */}
            {/* <CheckboxElement label="MSA" name="msa" size="small" /> */}
            {/* Partner Status */}
            {/* <AutocompleteElement
              label="Partner Status"
              name="partnerStatus"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.PartnerStatus}
            /> */}
          </Stack>
        </Grid>
        <FormDivider>Address Information</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            <p>
              <b>Billing Address</b>
            </p>
            {/* Billing Street */}
            <TextareaAutosizeElement
              label="Billing Street"
              name="address.billing.street"
              rows={3}
              size="small"
            />
            {/* Billing City */}
            <TextFieldElement
              label="Billing City"
              name="address.billing.city"
              size="small"
            />
            {/* Billing State/Province */}
            <TextFieldElement
              label="Billing State/Province"
              name="address.billing.state"
              size="small"
            />
            {/* Billing Zip/Postal Code */}
            <TextFieldElement
              label="Billing Zip/Postal Code"
              name="address.billing.postalCode"
              size="small"
            />
            {/* Billing Country */}
            <TextFieldElement
              label="Billing Country"
              name="address.billing.country"
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            <p>
              <b>Shipping Address</b>
            </p>
            {/* Shipping Street */}
            <TextareaAutosizeElement
              label="Shipping Street"
              name="address.shipping.street"
              rows={3}
              size="small"
            />
            {/* Shipping City */}
            <TextFieldElement
              label="Shipping City"
              name="address.shipping.city"
              size="small"
            />
            {/* Shipping State/Province */}
            <TextFieldElement
              label="Shipping State/Province"
              name="address.shipping.state"
              size="small"
            />
            {/* Shipping Zip/Postal Code */}
            <TextFieldElement
              label="Shipping Zip/Postal Code"
              name="address.shipping.postalCode"
              size="small"
            />
            {/* Shipping Country */}
            <TextFieldElement
              label="Shipping Country"
              name="address.shipping.country"
              size="small"
            />
          </Stack>
        </Grid>
        {/* <FormDivider>Account Credit Status</FormDivider> */}
        {/* <Grid item xs={6}> */}
        {/* <Stack spacing={1}> */}
        {/* Credit Last Modified */}
        {/* <DateFnsProvider>
              <DatePickerElement label="Credit Last Modified" name="" />
            </DateFnsProvider> */}
        {/* Credit Status */}
        {/* <AutocompleteElement
              label="Credit Status"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
        {/* Credit Denied Reason */}
        {/* <TextFieldElement
              label="Credit Denied Reason"
              name=""
              rows={3}
              size="small"
            /> */}
        {/* Credit Global Fortune 500 */}
        {/* <CheckboxElement
              label="Credit Global Fortune 500"
              name=""
              size="small"
            /> */}
        {/* Auto Renew */}
        {/* <CheckboxElement
              label="Credit Global Fortune 500"
              name=""
              size="small"
            /> */}
        {/* Cancellation Notice */}
        {/* <TextFieldElement
              label="Cancellation Notice"
              name=""
              size="small"
            /> */}
        {/* Auto Renew Notes */}
        {/* <TextareaAutosizeElement
              label="Auto Renew Notes"
              name=""
              rows={3}
              size="small"
            /> */}
        {/* </Stack> */}
        {/* </Grid> */}
        {/* <Grid item xs={6}> */}
        {/* <Stack spacing={1}> */}
        {/* Credit Limit */}
        {/* <TextFieldElement
              label="Credit Limit"
              name=""
              type="number"
              size="small"
            /> */}
        {/* PO Required */}
        {/* <AutocompleteElement
              label="PO Required"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
        {/* PO Required Notes */}
        {/* <TextareaAutosizeElement
              label="PO Required Notes"
              name=""
              rows={3}
              size="small"
            /> */}
        {/* Credit Notes */}
        {/* <TextareaAutosizeElement
              label="Credit Notes"
              name=""
              rows={3}
              size="small"
            /> */}
        {/* No Accounting Communication */}
        {/* <CheckboxElement
              label="No Accounting Communication"
              name=""
              size="small"
            /> */}
        {/* </Stack> */}
        {/* </Grid> */}
        <FormDivider>Collections</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Collections Contact */}
            <AutocompleteElement
              label="Collections Contact"
              name="collections.contact"
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
              options={menuOptions.CollectionsContact}
            />
            {/* Collection Status */}
            <TextFieldElement
              label="Collection Status"
              name="collections.status"
              size="small"
            />
            {/* Collection Past Due Amount */}
            <TextFieldElement
              label="Collection Past Due Amount"
              name="collections.pastDueAmount"
              type="number"
              size="small"
              InputProps={{ inputComponent: FormatCurrency as any }}
            />
            {/* Anticipated Suspension Date */}
            <DateFnsProvider>
              <DatePickerElement
                label="Anticipated Suspension Date"
                name="collections.suspensionDate"
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider>
            {/* Passed to Debt Collection Date */}
            <DateFnsProvider>
              <DatePickerElement
                label="Passed to Debt Collection Date"
                name="collections.passedToDebtCollectionDate"
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider>
            {/* Collections Correspondence */}
            <TextareaAutosizeElement
              label="Collections Correspondence"
              name="collections.correspondence"
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Credit Hold */}
            <CheckboxElement
              label="Credit Hold"
              name="collections.creditHold"
              size="small"
            />
            {/* Support Account Alert */}
            <TextareaAutosizeElement
              label="Support Account Alert"
              name="collections.supportAccountAlert"
              rows={3}
              size="small"
            />
            {/* No Technical Support */}
            <CheckboxElement
              label="No Technical Support"
              name="collections.noSupport"
              size="small"
            />
            {/* Service Suspended */}
            {/* <CheckboxElement
              label="Service Suspended"
              name="collections.serviceSuspended"
              size="small"
            /> */}
            {/* Services to be Suspended */}
            <TextFieldElement
              label="Services to be Suspended"
              name="collections.servicesToSuspend"
              size="small"
            />
            {/* Services Suspension Date */}
            <DateFnsProvider>
              <DatePickerElement
                label="Services Suspension Date"
                name="collections.serviceSuspensionDate"
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider>
            {/* Last Conversation Note */}
            <TextareaAutosizeElement
              label="Last Conversation Note"
              name="collections.lastConversationNote"
              rows={3}
              size="small"
            />
          </Stack>
        </Grid>
        {/* <FormDivider>Additional Information</FormDivider> */}
        {/* <Grid item xs={6}> */}
        {/* <Stack spacing={1}> */}
        {/* Analytics Vendor */}
        {/* <AutocompleteElement
              label="Analytics Vendor"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
        {/* Optimize Vendor */}
        {/* <AutocompleteElement
              label="Optimize Vendor"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
        {/* Big Data Connector */}
        {/* <TextFieldElement label="Big Data Connector" name="" size="small" /> */}
        {/* Email Vendor */}
        {/* <AutocompleteElement
              label="Email Vendor"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
        {/* Description */}
        {/* <TextareaAutosizeElement
              label="Description"
              name=""
              rows={3}
              size="small"
            /> */}
        {/* </Stack> */}
        {/* </Grid> */}
        {/* <Grid item xs={6}> */}
        {/* <Stack spacing={1}> */}
        {/* Analytics Vendor Contract End */}
        {/* <DateFnsProvider>
              <DatePickerElement
                label="Analytics Vendor Contract End"
                name=""
              />
            </DateFnsProvider> */}
        {/* Optimize Vendor Contract End */}
        {/* <DateFnsProvider>
              <DatePickerElement label="Optimize Vendor Contract End" name="" />
            </DateFnsProvider> */}
        {/* Health Check */}
        {/* <TextareaAutosizeElement
              label="Health Check"
              name=""
              rows={3}
              size="small"
            /> */}
        {/* SharePoint Site */}
        {/* <CheckboxElement label="SharePoint Site" name="" size="small" /> */}
        {/* </Stack> */}
        {/* </Grid> */}
        <FormDivider>Total Order Value of Products Owned</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* USD Total Analytics */}
            <TextFieldElement
              label="USD Total Analytics"
              name="orderValue.total"
              size="small"
              InputProps={{ inputComponent: FormatCurrency as any }}
            />
            {/* USD Total VDM */}
            {/* <TextFieldElement
              label="USD Total VDM"
              name=""
              type="number"
              size="small"
            /> */}
            {/* USD Total Optimize */}
            {/* <TextFieldElement
              label="USD Total Optimize"
              name=""
              type="number"
              size="small"
            /> */}
            {/* USD Total Consulting */}
            <TextFieldElement
              label="USD Total Consulting"
              name="orderValue.consulting"
              size="small"
              InputProps={{ inputComponent: FormatCurrency as any }}
            />
            {/* USD Total Services */}
            <TextFieldElement
              label="USD Total Services"
              name="orderValue.services"
              size="small"
              InputProps={{ inputComponent: FormatCurrency as any }}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* USD Total Ads */}
            {/* <TextFieldElement
              label="USD Total Ads"
              name=""
              type="number"
              size="small"
            /> */}
            {/* USD Total Apps */}
            {/* <TextFieldElement
              label="USD Total Apps"
              name=""
              type="number"
              size="small"
            /> */}
            {/* USD Total Training */}
            <TextFieldElement
              label="USD Total Training"
              name="orderValue.training"
              size="small"
              InputProps={{ inputComponent: FormatCurrency as any }}
            />
            {/* USD Total Partner Products */}
            <TextFieldElement
              label="USD Total Partner Products"
              name="orderValue.partnerProducts"
              size="small"
              InputProps={{ inputComponent: FormatCurrency as any }}
            />
            {/* USD Total Other */}
            <TextFieldElement
              label="USD Total Other"
              name="orderValue.other"
              size="small"
              InputProps={{ inputComponent: FormatCurrency as any }}
            />
          </Stack>
        </Grid>
        {/* <FormDivider>Additional Information</FormDivider> */}
        {/* <Grid item xs={6}> */}
        {/* <Stack spacing={1}> */}
        {/* OP Customer */}
        {/* <CheckboxElement label="OP Customer" name="" size="small" /> */}
        {/* Annual Server Calls */}
        {/* <AutocompleteElement
              label="Annual Server Calls"
              name="annualServerCalls"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.AnnualServerCalls}
            /> */}
        {/* Alexa Ranking */}
        {/* <TextFieldElement
              label="Alexa Ranking"
              name=""
              type="number"
              size="small"
            /> */}
        {/* Alexa Ranking Top 10,000 */}
        {/* <CheckboxElement
              label="Alexa Ranking Top 10,000"
              name=""
              size="small"
            /> */}
        {/* eCommerce */}
        {/* <CheckboxElement label="eCommerce" name="eCommerce" size="small" /> */}
        {/* Monthly Ad Spend */}
        {/* <TextFieldElement
              label="Monthly Ad Spend"
              name="monthlyAdSpend"
              type="number"
              size="small"
            /> */}
        {/* </Stack> */}
        {/* </Grid> */}
        {/* <Grid item xs={6}> */}
        {/* <Stack spacing={1}> */}
        {/* comScore Annual Page Views */}
        {/* <TextFieldElement
              label="comScore Annual Page Views"
              name=""
              type="number"
              size="small"
            /> */}
        {/* comScore Daily Visitors */}
        {/* <TextFieldElement
              label="comScore Daily Visitors"
              name=""
              type="number"
              size="small"
            /> */}
        {/* comScore Ranking */}
        {/* <TextFieldElement
              label="comScore Ranking"
              name=""
              type="number"
              size="small"
            /> */}
        {/* comScore Unique Monthly Visitors */}
        {/* <TextFieldElement
              label="comScore Unique Monthly Visitors"
              name=""
              type="number"
              size="small"
            /> */}
        {/* </Stack> */}
        {/* </Grid> */}
        {/* <FormDivider>Corporate Demographics</FormDivider> */}
        {/* <Grid item xs={6}> */}
        {/* <Stack spacing={1}> */}
        {/* Legal Name */}
        {/* <TextFieldElement
              label="Legal Name"
              name="demographics.legalName"
              type="number"
              size="small"
            /> */}
        {/* Industry */}
        {/* <AutocompleteElement
              label="Industry"
              name="demographics.industry"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.Industry}
            /> */}
        {/* Annual Revenue */}
        {/* <TextFieldElement
              label="Annual Revenue"
              name="demographics.annualRevenue"
              type="number"
              size="small"
            /> */}
        {/* Employees */}
        {/* <TextFieldElement
              label="Employees"
              name="demographics.employees"
              type="number"
              size="small"
            /> */}
        {/* Location Type */}
        {/* <TextFieldElement
              label="Location Type"
              name="demographics.locationType"
              size="small"
            /> */}
        {/* Ownership */}
        {/* <AutocompleteElement
              label="Ownership"
              name="demographics.ownership"
              autocompleteProps={{ size: "small" }}
              options={menuOptions.Ownership}
            /> */}
        {/* </Stack> */}
        {/* </Grid> */}
        {/* <Grid item xs={6}> */}
        {/* <Stack spacing={1}> */}
        {/* Tax Exempt */}
        {/* <CheckboxElement
              label="Tax Exempt"
              name="demographics.taxExpemt"
              size="small"
            /> */}
        {/* Tax Exempt ID */}
        {/* <TextFieldElement
              label="Tax Exempt ID"
              name="demographics.taxExemptID"
              size="small"
            /> */}
        {/* Ticker Symbol */}
        {/* <TextFieldElement
              label="Ticker Symbol"
              name="demographics.tickerSymbol"
              size="small"
            /> */}
        {/* SIC Code */}
        {/* <TextFieldElement
              label="SIC Code"
              name="demographics.sicCode"
              size="small"
            /> */}
        {/* SIC Description */}
        {/* <TextFieldElement
              label="SIC Description"
              name="demographics.sicDescription"
              size="small"
            /> */}
        {/* </Stack> */}
        {/* </Grid> */}
        {/* <FormDivider>Customer Contract Information</FormDivider> */}
        {/* <Grid item xs={6}> */}
        {/* <Stack spacing={1}> */}
        {/* On Demand Max Contract End Date */}
        {/* <DateFnsProvider>
              <DatePickerElement
                label="On Demand Max Contract End Date"
                name=""
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider> */}
        {/* </Stack> */}
        {/* </Grid> */}
        {/* <Grid item xs={6}> */}
        {/* <Stack spacing={1}> */}
        {/* Ads Max Contract End Date */}
        {/* <DateFnsProvider>
              <DatePickerElement
                label="Ads Max Contract End Date"
                name=""
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider> */}
        {/* Optimize Max Contract End Date */}
        {/* <DateFnsProvider>
              <DatePickerElement
                label="Optimize Max Contract End Date"
                name=""
              />
            </DateFnsProvider> */}
        {/* Streams Max Contract End Date */}
        {/* <DateFnsProvider>
              <DatePickerElement
                label="Streams Max Contract End Date"
                name=""
              />
            </DateFnsProvider> */}
        {/* </Stack> */}
        {/* </Grid> */}
        {/* <FormDivider>MyWebtrends</FormDivider> */}
        {/* <Grid item xs={12}> */}
        {/* <Stack spacing={1}> */}
        {/* Support Override for Entitlement */}
        {/* <CheckboxElement
              label="Support Override for Entitlement"
              name=""
              size="small"
            /> */}
        {/* </Stack> */}
        {/* </Grid> */}
        <FormDivider>Software Entitlement Info</FormDivider>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Software Entitled Server Calls */}
            <TextFieldElement
              label="Software Entitled Server Calls"
              name="entitlement.serverCalls"
              size="small"
              InputProps={{ inputComponent: FormatNumber as any }}
            />
            {/* Software Entitled Events */}
            {/* <TextFieldElement
              label="Software Entitled Events"
              name=""
              type="number"
              size="small"
            /> */}
            {/* Software Installations */}
            <TextFieldElement
              label="Software Installations"
              name="entitlement.installations"
              type="number"
              size="small"
            />
            {/* Software Term License */}
            <CheckboxElement
              label="Software Term License"
              name="entitlement.termLicense"
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
            {/* Software Base Mnt Expiration Date */}
            <DateFnsProvider>
              <DatePickerElement
                label="Software Base Mnt Expiration Date"
                name="entitlement.baseMntExpireDate"
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider>
            {/* Software Mnt Expiration Date */}
            <DateFnsProvider>
              <DatePickerElement
                label="Software Mnt Expiration Date"
                name="entitlement.mntExpireDate"
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider>
            {/* Software Most Recent Activated Version */}
            <TextFieldElement
              label="Software Most Recent Activated Version"
              name="entitlement.activatedVersion"
              size="small"
            />
            {/* Extended Maintenance for Legacy End Date */}
            <DateFnsProvider>
              <DatePickerElement
                label="Extended Maintenance for Legacy End Date"
                name="entitlement.extMntExpireDate"
                inputProps={{ size: "small" }}
              />
            </DateFnsProvider>
          </Stack>
        </Grid>
        {/* <FormDivider>Other Product Details</FormDivider> */}
        {/* <Grid item xs={6}> */}
        {/* <Stack spacing={1}> */}
        {/* EPS Customer */}
        {/* <CheckboxElement label="EPS Customer" name="" size="small" /> */}
        {/* EPS Assigned TAM */}
        {/* <AutocompleteElement
              label="EPS Assigned TAM"
              name=""
              autocompleteProps={{ size: "small" }}
              options={[]}
            /> */}
        {/* EPS Hours Per Week */}
        {/* <TextFieldElement
              label="EPS Hours Per Week"
              name=""
              type="number"
              size="small"
            /> */}
        {/* </Stack> */}
        {/* </Grid> */}
        {/* <Grid item xs={6}> */}
        {/* <Stack spacing={1}> */}
        {/* EPS Contract End */}
        {/* <DateFnsProvider>
              <DatePickerElement label="EPS Contract End" name="" />
            </DateFnsProvider> */}
        {/* EPS Contract Start */}
        {/* <DateFnsProvider>
              <DatePickerElement label="EPS Contract Start" name="" />
            </DateFnsProvider> */}
        {/* EPS Hours Per Month */}
        {/* <TextFieldElement
              label="EPS Hours Per Month"
              name=""
              type="number"
              size="small"
            /> */}
        {/* </Stack> */}
        {/* </Grid> */}
        {/* <FormDivider>System Information</FormDivider> */}
        {/* <Grid item xs={12}> */}
        {/* <Stack spacing={1}> */}
        {/* ODUI Notification Processed */}
        {/* <CheckboxElement
              label="ODUI Notification Processed"
              name=""
              size="small"
            /> */}
        {/* </Stack> */}
        {/* </Grid> */}
      </Grid>
    </FormWrapper>
  );
};
