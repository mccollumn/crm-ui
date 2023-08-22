import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ButtonNav } from "../ButtonNav";
import { InformationSection } from "../InformationSection";
import { AccountData } from "../../types/accounts";

import { cases } from "../../../mockData/cases";

const getAccountData = (accountID: string) => {
  // TODO: Retreive account data
  return { id: "0018Z00002eltWLQAY", accountName: "Super Awesome Account" };
};

const AccountInformation = ({ accountID }: AccountInformationProps) => {
  const accountData = getAccountData(accountID);
  if (!accountData) return null;

  const accountInfo = getAccountInfo(accountData);

  return (
    <>
      <ButtonNav size="small" path={`/accounts/edit/${accountData.id}`}>
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
      <Accordion defaultExpanded={true}>
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
      </Accordion>
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
      <Accordion defaultExpanded={true}>
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
      </Accordion>
      <Accordion defaultExpanded={true}>
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
      </Accordion>
      <Accordion defaultExpanded={true}>
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
      </Accordion>
      <Accordion defaultExpanded={true}>
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
      </Accordion>
      <Accordion defaultExpanded={true}>
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
      </Accordion>
      <Accordion defaultExpanded={true}>
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
      </Accordion>
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
      <Accordion defaultExpanded={true}>
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
      </Accordion>
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

const getAccountInfo = (accountData: AccountData) => {
  return {
    info: {
      left: [
        { label: "Account Owner", value: "" },
        { label: "Account Name", value: "" },
        { label: "Alternate Account Name", value: "" },
        { label: "Account Site", value: "" },
        { label: "Parent Account", value: "" },
        { label: "Account Record Type", value: "" },
        { label: "Type", value: "" },
        { label: "Type Last Change Date", value: "" },
        { label: "Vertical", value: "" },
        { label: "Sector", value: "" },
        { label: "Website", value: "" },
        { label: "Misc. Info", value: "" },
        { label: "Migrate to New Org", value: "" },
        { label: "Migration External ID", value: "" },
      ],
      right: [
        { label: "Client Health Status", value: "" },
        { label: "Client Health", value: "" },
        {
          label: "Client Unhealthy Reason",
          value: "",
        },
        { label: "Client Unhealthy Reason Other", value: "" },
        { label: "Fax", value: "" },
        { label: "Phone", value: "" },
        { label: "Target Account Type", value: "" },
        { label: "Global Account", value: "" },
        { label: "Account Size", value: "" },
        { label: "USD Total Order Value", value: "" },
        { label: "Is Federal", value: "" },
        { label: "Is State", value: "" },
        { label: "Territory", value: "" },
        { label: "Region", value: "" },
        { label: "Super Region", value: "" },
        { label: "MSA", value: "" },
        { label: "Partner Status", value: "" },
      ],
    },
    address: {
      left: [{ label: "Billing Address", value: "" }],
      right: [{ label: "Shipping Address", value: "" }],
    },
    credit: {
      left: [
        { label: "Credit Last Modified", value: "" },
        { label: "Credit Status", value: "" },
        { label: "Credit Denied Reason", value: "" },
        { label: "Credit Global Fortune 500", value: "" },
        { label: "Auto Renew OD", value: "" },
        { label: "OD Cancellation Notice", value: "" },
        { label: "Auto Renewal Notes", value: "" },
      ],
      right: [
        { label: "Credit Limit", value: "" },
        { label: "PO Required", value: "" },
        { label: "PO Required Notes", value: "" },
        { label: "Credit Notes", value: "" },
        { label: "No Accounting Communication", value: "" },
        { label: "Auto Renew OP", value: "" },
        { label: "OP Cancellation Noticen", value: "" },
      ],
    },
    collections: {
      left: [
        { label: "Collections Contact", value: "" },
        { label: "Collection Status", value: "" },
        { label: "Collections Past Due Amount", value: "" },
        { label: "Anticipated Suspension Date", value: "" },
        { label: "Passed to Debt Collection Date", value: "" },
        { label: "Collections Correspondence", value: "" },
      ],
      right: [
        { label: "Credit Hold", value: "" },
        { label: "Support Account Alert", value: "" },
        { label: "No Technical Support", value: "" },
        { label: "Service Suspended", value: "" },
        { label: "Services to be Suspended", value: "" },
        { label: "Service Suspension Date", value: "" },
        { label: "Last Conversation Note", value: "" },
      ],
    },
    additional: {
      left: [
        { label: "Analytics Vendor", value: "" },
        { label: "Optimize Vendor", value: "" },
        { label: "Big Data Connector", value: "" },
        { label: "Email Vendor", value: "" },
        { label: "Description", value: "" },
      ],
      right: [
        { label: "Analytics Vendor Contract End", value: "" },
        { label: "Optimize Vendor Contract End", value: "" },
        { label: "Health Check", value: "" },
        { label: "SharePoint Site", value: "" },
      ],
    },
    links: {
      left: [
        {
          label: "List of Countries, States & Provinces",
          value:
            "https://webtrends.lightning.force.com/servlet/servlet.Integration?lid=00b30000000isOG&eid=0018Z00002eltWLQAY&ic=1",
        },
        {
          label: "18 Character Account ID",
          value:
            "https://webtrends.lightning.force.com/servlet/servlet.Integration?lid=00b400000018KS3&eid=0018Z00002eltWLQAY&ic=1",
        },
      ],
      right: [
        {
          label: "Trial Manager",
          value:
            "https://webtrends.lightning.force.com/servlet/servlet.Integration?lid=00b30000000jD7Q&eid=0018Z00002eltWLQAY&ic=1",
        },
      ],
    },
    intacct: {
      left: [{ label: "Intacct Customer ID", value: "" }],
      right: [{ label: "Intacct Location", value: "" }],
    },
    value: {
      left: [
        { label: "USD Total Analytics", value: "" },
        { label: "USD Total VDM", value: "" },
        { label: "USD Total Optimize", value: "" },
        { label: "USD Total Services", value: "" },
      ],
      right: [
        { label: "USD Total Ads", value: "" },
        { label: "USD Total Apps", value: "" },
        { label: "USD Total Other", value: "" },
      ],
    },
    additional2: {
      left: [
        { label: "OP Customer", value: "" },
        { label: "Annual Server Calls", value: "" },
        { label: "Alexa Ranking", value: "" },
        { label: "Alexa Ranking Top 10,000", value: "" },
        { label: "eCommerce", value: "" },
        { label: "Monthly Ad Spend", value: "" },
      ],
      right: [
        { label: "comScore Annual Page Views", value: "" },
        { label: "comScore Daily Visitors", value: "" },
        { label: "comScore Ranking", value: "" },
        { label: "comScore Unique Monthly Visitors", value: "" },
      ],
    },
    demographics: {
      left: [
        { label: "Legal Name", value: "" },
        { label: "Industry", value: "" },
        { label: "Annual Revenue", value: "" },
        { label: "Employees", value: "" },
        { label: "Location Type", value: "" },
        { label: "Ownership", value: "" },
      ],
      right: [
        { label: "Tax Exempt", value: "" },
        { label: "Tax Exempt ID", value: "" },
        { label: "Ticker Symbol", value: "" },
        { label: "SIC Code", value: "" },
        { label: "SIC Description", value: "" },
      ],
    },
    contract: {
      left: [
        { label: "On Demand Max Contract End Date", value: "" },
        { label: "Ads Max Contract End Date", value: "" },
      ],
      right: [
        { label: "Optimize Max Contract End Date", value: "" },
        { label: "Streams Max Contract End Date", value: "" },
      ],
    },
    mywebtrends: {
      left: [{ label: "Has Entitlements", value: "" }],
      right: [{ label: "Support Override for Entitlement", value: "" }],
    },
    entitlements: {
      left: [
        { label: "Software Entitled Server Calls", value: "" },
        { label: "Software Entitled Events", value: "" },
        { label: "Software Installations", value: "" },
        { label: "Software Term License", value: "" },
      ],
      right: [
        { label: "Software Base Mnt Expiration Date", value: "" },
        { label: "Software Mnt Expiration Date", value: "" },
        { label: "Software Most Recent Activated Version", value: "" },
        { label: "Extended Maintenance for Legacy End Date", value: "" },
      ],
    },
    products: {
      left: [
        { label: "EPS Customer", value: "" },
        { label: "EPS Assigned TAM", value: "" },
        { label: "EPS Hours Per Week", value: "" },
      ],
      right: [
        { label: "EPS Contract End", value: "" },
        { label: "EPS Contract Start", value: "" },
        { label: "EPS Hours Per Month", value: "" },
      ],
    },
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
