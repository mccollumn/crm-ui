import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ButtonNav } from "../navigation/ButtonNav";
import { InformationSection } from "../InformationSection";
import { AccountData } from "../../types/accounts";
import { getAccountData } from "@/app/utils/getData";
import { Address } from "../Address";
import Link from "next/link";
import {
  formatDate,
  formatCurrency,
  formatCheckbox,
  formatNumber,
} from "@/app/utils/utils";

const AccountInformation = async ({ accountID }: AccountInformationProps) => {
  const accountInfo = await getAccountInfo(accountID);
  if (!accountInfo) return null;

  return (
    <>
      <ButtonNav size="small" path={`/accounts/edit/${accountID}`}>
        Edit
      </ButtonNav>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-info-section-content"
          id="account-info-section-header"
        >
          <Typography variant="h6">Account Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-info-section-content">
          <InformationSection
            itemsLeft={accountInfo.info.left}
            itemsRight={accountInfo.info.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-address-section-content"
          id="account-address-section-header"
        >
          <Typography variant="h6">Address Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-address-section-content">
          <InformationSection
            itemsLeft={accountInfo.address.left}
            itemsRight={accountInfo.address.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-credit-section-content"
          id="account-credit-section-header"
        >
          <Typography variant="h6">Account Credit Status</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-credit-section-content">
          <InformationSection
            itemsLeft={accountInfo.credit.left}
            itemsRight={accountInfo.credit.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-collections-section-content"
          id="account-collections-section-header"
        >
          <Typography variant="h6">Collections</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-collections-section-content">
          <InformationSection
            itemsLeft={accountInfo.collections.left}
            itemsRight={accountInfo.collections.right}
          />
        </AccordionDetails>
      </Accordion>
      {/* <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-additional-section-content"
          id="account-additional-section-header"
        >
          <Typography variant="h6">Additional Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-additional-section-content">
          <InformationSection
            itemsLeft={accountInfo.additional.left}
            itemsRight={accountInfo.additional.right}
          />
        </AccordionDetails>
      </Accordion> */}
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-links-section-content"
          id="account-links-section-header"
        >
          <Typography variant="h6">Web Links</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-links-section-content">
          {/* TODO: Create links section component */}
          <InformationSection
            itemsLeft={accountInfo.links.left}
            itemsRight={accountInfo.links.right}
          />
        </AccordionDetails>
      </Accordion>
      {/* <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-intacct-section-content"
          id="account-intacct-section-header"
        >
          <Typography variant="h6">Intacct Info</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-intacct-section-content">
          <InformationSection
            itemsLeft={accountInfo.intacct.left}
            itemsRight={accountInfo.intacct.right}
          />
        </AccordionDetails>
      </Accordion> */}
      {/* <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-products-section-content"
          id="account-products-section-header"
        >
          <Typography variant="h6">
            Total Order Value of Products Owned
          </Typography>
        </AccordionSummary>
        <AccordionDetails id="account-products-section-content">
          <InformationSection
            itemsLeft={accountInfo.products.left}
            itemsRight={accountInfo.products.right}
          />
        </AccordionDetails>
      </Accordion> */}
      {/* <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-additional2-section-content"
          id="account-additional2-section-header"
        >
          <Typography variant="h6">Additional Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-additional2-section-content">
          <InformationSection
            itemsLeft={accountInfo.additional2.left}
            itemsRight={accountInfo.additional2.right}
          />
        </AccordionDetails>
      </Accordion> */}
      {/* <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-demographics-section-content"
          id="account-demographics-section-header"
        >
          <Typography variant="h6">Corporate Demographics</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-demographics-section-content">
          <InformationSection
            itemsLeft={accountInfo.demographics.left}
            itemsRight={accountInfo.demographics.right}
          />
        </AccordionDetails>
      </Accordion> */}
      {/* <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-contract-section-content"
          id="account-contract-section-header"
        >
          <Typography variant="h6">Customer Contract Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-contract-section-content">
          <InformationSection
            itemsLeft={accountInfo.contract.left}
            itemsRight={accountInfo.contract.right}
          />
        </AccordionDetails>
      </Accordion> */}
      {/* <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-mywebtrends-section-content"
          id="account-mywebtrends-section-header"
        >
          <Typography variant="h6">MyWebtrends</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-mywebtrends-section-content">
          <InformationSection
            itemsLeft={accountInfo.mywebtrends.left}
            itemsRight={accountInfo.mywebtrends.right}
          />
        </AccordionDetails>
      </Accordion> */}
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-entitlements-section-content"
          id="account-entitlements-section-header"
        >
          <Typography variant="h6">Software Entitlements Info</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-entitlements-section-content">
          <InformationSection
            itemsLeft={accountInfo.entitlements.left}
            itemsRight={accountInfo.entitlements.right}
          />
        </AccordionDetails>
      </Accordion>
      {/* <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-products-section-content"
          id="account-products-section-header"
        >
          <Typography variant="h6">Other Product Details</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-products-section-content">
          <InformationSection
            itemsLeft={accountInfo.products.left}
            itemsRight={accountInfo.products.right}
          />
        </AccordionDetails>
      </Accordion> */}
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-system-section-content"
          id="account-system-section-header"
        >
          <Typography variant="h6">System Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-system-section-content">
          <InformationSection
            itemsLeft={accountInfo.system.left}
            itemsRight={accountInfo.system.right}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const getAccountInfo = async (accountID: string) => {
  const accountData: AccountData = await getAccountData(accountID);
  if (!accountData) return null;
  return {
    info: {
      left: [
        { label: "Account Owner", value: accountData.AccountDetail.OwnerName },
        {
          label: "Account Name",
          value: accountData.AccountDetail.Accounts_Name,
        },
        {
          label: "Alternate Account Name",
          value: accountData.AccountDetail.Accounts_AlternateAccountName,
        },
        {
          label: "Account ID",
          value: accountData.AccountDetail.Accounts_AccountID,
        },
        {
          label: "Account Site",
          value: accountData.AccountDetail.Accounts_Site,
        },
        // { label: "Parent Account", value: "" },
        // { label: "Account Record Type", value: "" },
        {
          label: "Type",
          value: accountData.AccountDetail.AccountsType_Description,
        },
        // { label: "Type Last Change Date", value: "" },
        // { label: "Vertical", value: "" },
        // { label: "Sector", value: "" },
        {
          label: "Website",
          value: (
            <Link
              href={accountData.AccountDetail.Accounts_Website || ""}
              target="_blank"
            >
              {accountData.AccountDetail.Accounts_Website}
            </Link>
          ),
        },
        // { label: "Misc. Info", value: "" },
        // { label: "Migrate to New Org", value: "" },
        // { label: "Migration External ID", value: "" },
      ],
      right: [
        // { label: "Client Health Status", value: "" },
        // { label: "Client Health", value: "" },
        // {
        //   label: "Client Unhealthy Reason",
        //   value: "",
        // },
        // { label: "Client Unhealthy Reason Other", value: "" },
        { label: "Fax", value: accountData.AccountDetail.Accounts_Fax },
        { label: "Phone", value: accountData.AccountDetail.Accounts_Phone },
        // { label: "Target Account Type", value: "" },
        // { label: "Global Account", value: "" },
        // { label: "Account Size", value: "" },
        {
          label: "USD Total Order Value",
          value: formatCurrency(
            accountData.TotalOrderValue.AccountsTotal_OrderValue
          ),
        },
        {
          label: "Is Federal or State",
          // value: !!Number(accountData.AccountDetail.Accounts_IsFedState) ? (
          //   <CheckBoxIcon />
          // ) : (
          //   <CheckBoxOutlineBlankIcon />
          // ),
          value: formatCheckbox(accountData.AccountDetail.Accounts_IsFedState),
        },
        // { label: "Territory", value: "" },
        // { label: "Region", value: "" },
        {
          label: "Super Region",
          value: accountData.AccountDetail.Accounts_Super_Region,
        },
        {
          label: "MSA",
          value: formatCheckbox(accountData.AccountDetail.Accounts_MSA),
        },
        // { label: "Partner Status", value: "" },
      ],
    },
    address: {
      left: [
        {
          label: "Billing Address",
          value: (
            <Address
              street={
                accountData.AddressInformation.AccountsAddress_BillingStreet
              }
              city={accountData.AddressInformation.AccountsAddress_BillingCity}
              state={
                accountData.AddressInformation.AccountsAddress_BillingState
              }
              postalCode={
                accountData.AddressInformation.AccountsAddress_BillingPostalCode
              }
              country={
                accountData.AddressInformation.AccountsAddress_BillingCountry
              }
            />
          ),
        },
      ],
      right: [
        {
          label: "Shipping Address",
          value: (
            <Address
              street={
                accountData.AddressInformation.AccountsAddress_ShippingStreet
              }
              city={accountData.AddressInformation.AccountsAddress_ShippingCity}
              state={
                accountData.AddressInformation.AccountsAddress_ShippingState
              }
              postalCode={
                accountData.AddressInformation
                  .AccountsAddress_ShippingPostalCode
              }
              country={
                accountData.AddressInformation.AccountsAddress_ShippingCountry
              }
            />
          ),
        },
      ],
    },
    credit: {
      left: [
        {
          label: "Credit Last Modified",
          value: formatDate(
            accountData.AccountCreditStatus.AccountsCredit_Last_Modified
          ),
        },
        {
          label: "Credit Status",
          value: accountData.AccountCreditStatus.AccountsCredit_Status,
        },
        {
          label: "Credit Denied Reason",
          value: accountData.AccountCreditStatus.AccountsCredit_DeniedReason,
        },
        // { label: "Credit Global Fortune 500", value: "". },
        // { label: "Auto Renew OD", value: "" },
        // { label: "OD Cancellation Notice", value: "" },
        {
          label: "Credit Hold",
          value: formatCheckbox(
            accountData.AccountCreditStatus.AccountsCredit_Hold
          ),
        },
        {
          label: "Credit Hold Reason",
          value: accountData.AccountCreditStatus.AccountsCredit_HoldReason,
        },
        {
          label: "Auto Renewal Notes",
          value: accountData.AccountCreditStatus.AccountsCredit_AutoRenewNotes,
        },
      ],
      right: [
        {
          label: "Credit Limit",
          value: accountData.AccountCreditStatus.AccountsCredit_Limit,
        },
        {
          label: "PO Required",
          value: formatCheckbox(
            accountData.AccountCreditStatus.AccountsCredit_PORequired
          ),
        },
        {
          label: "PO Required Notes",
          value: accountData.AccountCreditStatus.AccountsCredit_PORequiredNotes,
        },
        {
          label: "Credit Notes",
          value: accountData.AccountCreditStatus.AccountsCredit_Notes,
        },
        // { label: "No Accounting Communication", value: "" },
        {
          label: "Auto Renew OP",
          value: formatCheckbox(
            accountData.AccountCreditStatus.AccountsCredit_AutoRenewOP
          ),
        },
        {
          label: "OP Cancellation Notice",
          value:
            accountData.AccountCreditStatus
              .AccountsCredit_OPCancellationNoticeDel,
        },
      ],
    },
    collections: {
      left: [
        {
          label: "Collections Contact",
          value: accountData.Collections.Contact_Fullname,
        },
        {
          label: "Collection Status",
          value: accountData.Collections.CollectionStatus_Description,
        },
        {
          label: "Collections Past Due Amount",
          value: formatCurrency(
            accountData.Collections.AccountsCollection_PastDueAmount
          ),
        },
        {
          label: "Anticipated Suspension Date",
          value: formatDate(
            accountData.Collections.AccountsCollection_AnticipatedSuspDate
          ),
        },
        {
          label: "Passed to Debt Collection Date",
          value: formatDate(
            accountData.Collections.AccountsCollection_PassedToCollectionDate
          ),
        },
        {
          label: "Collections Correspondence",
          value: accountData.Collections.AccountsCollection_Correspondence,
        },
      ],
      right: [
        // { label: "Credit Hold", value: "" },
        // { label: "Support Account Alert", value: "" },
        // { label: "No Technical Support", value: "" },
        // { label: "Service Suspended", value: "" },
        {
          label: "Services to be Suspended",
          value:
            accountData.Collections.AccountsCollection_ServicesToBeSuspended,
        },
        {
          label: "Service Suspension Date",
          value: formatDate(
            accountData.Collections.AccountsCollection_ServiceSuspensionDate
          ),
        },
        {
          label: "Last Conversation Note",
          value:
            accountData.Collections.AccountsCollection_LastConversationNote,
        },
      ],
    },
    // additional: {
    //   left: [
    //     { label: "Analytics Vendor", value: "" },
    //     { label: "Optimize Vendor", value: "" },
    //     { label: "Big Data Connector", value: "" },
    //     { label: "Email Vendor", value: "" },
    //     { label: "Description", value: "" },
    //   ],
    //   right: [
    //     { label: "Analytics Vendor Contract End", value: "" },
    //     { label: "Optimize Vendor Contract End", value: "" },
    //     { label: "Health Check", value: "" },
    //     { label: "SharePoint Site", value: "" },
    //   ],
    // },
    links: {
      left: [
        {
          label: "List of Countries, States & Provinces",
          value: (
            <Link href="/accounts/geo" target="_blank">
              List of Countries, States & Provinces
            </Link>
          ),
        },
      ],
      right: [
        // We don't use the SalesForce account IDs anymore that Trial Manager expects.
        // I'm leaving the link for now, until it's confirmed that Trial Manager isn't needed.
        {
          label: "Trial Manager",
          value: (
            <Link
              href={`https://crm.webtrends.io/trialmanager/tm.aspx?trialobject=Account&trialobjectid=${accountData.AccountDetail.Accounts_AccountID}&objectType=Account&objectid=${accountData.AccountDetail.Accounts_AccountID}&objectname=${accountData.AccountDetail.Accounts_Name}`}
              target="_blank"
            >
              Trial Manager
            </Link>
          ),
        },
      ],
    },
    // intacct: {
    //   left: [{ label: "Intacct Customer ID", value: "" }],
    //   right: [{ label: "Intacct Location", value: "" }],
    // },
    value: {
      left: [
        {
          label: "USD Total Analytics",
          value: formatCurrency(
            accountData.TotalOrderValue.AccountsTotal_Analytics
          ),
        },
        // { label: "USD Total VDM", value: "" },
        // { label: "USD Total Optimize", value: "" },
        {
          label: "USD Total Services",
          value: formatCurrency(
            accountData.TotalOrderValue.AccountsTotal_Services
          ),
        },
        {
          label: "USD Total Consulting",
          value: formatCurrency(
            accountData.TotalOrderValue.AccountsTotal_Consulting
          ),
        },
      ],
      right: [
        // { label: "USD Total Ads", value: "" },
        // { label: "USD Total Apps", value: "" },
        {
          label: "USD Total Training",
          value: formatCurrency(
            accountData.TotalOrderValue.AccountsTotal_Training
          ),
        },
        {
          label: "USD Total Partner Products",
          value: formatCurrency(
            accountData.TotalOrderValue.AccountsTotal_PartnerProducts
          ),
        },
        {
          label: "USD Total Other",
          value: formatCurrency(
            accountData.TotalOrderValue.AccountsTotal_Other
          ),
        },
      ],
    },
    // additional2: {
    //   left: [
    //     { label: "OP Customer", value: "" },
    //     { label: "Annual Server Calls", value: "" },
    //     { label: "Alexa Ranking", value: "" },
    //     { label: "Alexa Ranking Top 10,000", value: "" },
    //     { label: "eCommerce", value: "" },
    //     { label: "Monthly Ad Spend", value: "" },
    //   ],
    //   right: [
    //     { label: "comScore Annual Page Views", value: "" },
    //     { label: "comScore Daily Visitors", value: "" },
    //     { label: "comScore Ranking", value: "" },
    //     { label: "comScore Unique Monthly Visitors", value: "" },
    //   ],
    // },
    // demographics: {
    //   left: [
    //     { label: "Legal Name", value: "" },
    //     { label: "Industry", value: "" },
    //     { label: "Annual Revenue", value: "" },
    //     { label: "Employees", value: "" },
    //     { label: "Location Type", value: "" },
    //     { label: "Ownership", value: "" },
    //   ],
    //   right: [
    //     { label: "Tax Exempt", value: "" },
    //     { label: "Tax Exempt ID", value: "" },
    //     { label: "Ticker Symbol", value: "" },
    //     { label: "SIC Code", value: "" },
    //     { label: "SIC Description", value: "" },
    //   ],
    // },
    // contract: {
    //   left: [
    //     { label: "On Demand Max Contract End Date", value: "" },
    //     { label: "Ads Max Contract End Date", value: "" },
    //   ],
    //   right: [
    //     { label: "Optimize Max Contract End Date", value: "" },
    //     { label: "Streams Max Contract End Date", value: "" },
    //   ],
    // },
    // mywebtrends: {
    //   left: [{ label: "Has Entitlements", value: "" }],
    //   right: [{ label: "Support Override for Entitlement", value: "" }],
    // },
    entitlements: {
      left: [
        {
          label: "Software Entitled Server Calls",
          value: formatNumber(
            accountData.SoftwareEntitlements
              .AccountsSoftware_Entitled_Server_Calls
          ),
        },
        // { label: "Software Entitled Events", value: "" },
        {
          label: "Software Installations",
          value:
            accountData.SoftwareEntitlements.AccountsSoftware_Installations,
        },
        {
          label: "Software Term License",
          value: formatCheckbox(
            accountData.SoftwareEntitlements.AccountsSoftware_Term_License
          ),
        },
      ],
      right: [
        {
          label: "Software Base Mnt Expiration Date",
          value: formatDate(
            accountData.SoftwareEntitlements
              .AccountsSoftware_Base_Mnt_Expiration_Date
          ),
        },
        {
          label: "Software Mnt Expiration Date",
          value: formatDate(
            accountData.SoftwareEntitlements
              .AccountsSoftware_Mnt_Expiration_Date
          ),
        },
        {
          label: "Software Most Recent Activated Version",
          value:
            accountData.SoftwareEntitlements
              .AccountsSoftware_Most_Recent_Activated_Version,
        },
        // { label: "Extended Maintenance for Legacy End Date", value: "" },
      ],
    },
    // products: {
    //   left: [
    //     { label: "EPS Customer", value: "" },
    //     { label: "EPS Assigned TAM", value: "" },
    //     { label: "EPS Hours Per Week", value: "" },
    //   ],
    //   right: [
    //     { label: "EPS Contract End", value: "" },
    //     { label: "EPS Contract Start", value: "" },
    //     { label: "EPS Hours Per Month", value: "" },
    //   ],
    // },
    system: {
      left: [
        { label: "Created By", value: "" },
        { label: "Customer Since Date", value: "" },
        { label: "ODUI Notification Processed", value: "" },
      ],
      right: [
        { label: "Last Modified By", value: "" },
        { label: "Most Recent Purchase Date", value: "" },
      ],
    },
  };
};

interface AccountInformationProps {
  accountID: string;
}

export default AccountInformation;
