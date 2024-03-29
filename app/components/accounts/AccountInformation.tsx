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
  unEscape,
} from "@/app/utils/utils";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

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
          value: unEscape(accountData.AccountDetail.Accounts_Name),
        },
        {
          label: "Alternate Account Name",
          value: unEscape(
            accountData.AccountDetail.Accounts_AlternateAccountName || ""
          ),
        },
        {
          label: "Account ID",
          value: accountData.AccountDetail.Accounts_AccountID,
        },
        {
          label: "Account Site",
          value: accountData.AccountDetail.Accounts_Site,
        },
        {
          label: "Type",
          value: accountData.AccountDetail.AccountsType_Description,
        },
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
      ],
      right: [
        { label: "Fax", value: accountData.AccountDetail.Accounts_Fax },
        { label: "Phone", value: accountData.AccountDetail.Accounts_Phone },
        {
          label: "USD Total Order Value",
          value: formatCurrency(
            accountData.TotalOrderValue.AccountsTotal_OrderValue
          ),
        },
        {
          label: "Is Federal or State",
          value: formatCheckbox(accountData.AccountDetail.Accounts_IsFedState),
        },
        {
          label: "Super Region",
          value: accountData.AccountDetail.Accounts_Super_Region,
        },
        {
          label: "MSA",
          value: formatCheckbox(accountData.AccountDetail.Accounts_MSA),
        },
      ],
    },
    address: {
      left: [
        {
          label: "Billing Address",
          value: (
            <Address
              street={unEscape(
                accountData.AddressInformation.AccountsAddress_BillingStreet
              )}
              city={unEscape(
                accountData.AddressInformation.AccountsAddress_BillingCity
              )}
              state={unEscape(
                accountData.AddressInformation.AccountsAddress_BillingState
              )}
              postalCode={unEscape(
                accountData.AddressInformation.AccountsAddress_BillingPostalCode
              )}
              country={unEscape(
                accountData.AddressInformation.AccountsAddress_BillingCountry
              )}
            />
          ),
        },
      ],
      right: [
        {
          label: "Shipping Address",
          value: (
            <Address
              street={unEscape(
                accountData.AddressInformation.AccountsAddress_ShippingStreet
              )}
              city={unEscape(
                accountData.AddressInformation.AccountsAddress_ShippingCity
              )}
              state={unEscape(
                accountData.AddressInformation.AccountsAddress_ShippingState
              )}
              postalCode={unEscape(
                accountData.AddressInformation
                  .AccountsAddress_ShippingPostalCode
              )}
              country={unEscape(
                accountData.AddressInformation.AccountsAddress_ShippingCountry
              )}
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
          value: unEscape(
            accountData.AccountCreditStatus.AccountsCredit_AutoRenewNotes
          ),
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
          value: unEscape(
            accountData.AccountCreditStatus.AccountsCredit_PORequiredNotes
          ),
        },
        {
          label: "Credit Notes",
          value: unEscape(accountData.AccountCreditStatus.AccountsCredit_Notes),
        },
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
          value: unEscape(
            accountData.Collections.AccountsCollection_Correspondence
          ),
        },
      ],
      right: [
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
          value: unEscape(
            accountData.Collections.AccountsCollection_LastConversationNote
          ),
        },
      ],
    },
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
              href={`https://crm.example.io/trialmanager/tm.aspx?trialobject=Account&trialobjectid=${accountData.AccountDetail.Accounts_AccountID}&objectType=Account&objectid=${accountData.AccountDetail.Accounts_AccountID}&objectname=${accountData.AccountDetail.Accounts_Name}`}
              target="_blank"
            >
              Trial Manager
            </Link>
          ),
        },
      ],
    },
    value: {
      left: [
        {
          label: "USD Total Analytics",
          value: formatCurrency(
            accountData.TotalOrderValue.AccountsTotal_Analytics
          ),
        },
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
    entitlements: {
      left: [
        {
          label: "Software Entitled Server Calls",
          value: formatNumber(
            accountData.SoftwareEntitlements
              .AccountsSoftware_Entitled_Server_Calls
          ),
        },
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
      ],
    },
    system: {
      left: [
        {
          label: "Created By",
          value: accountData.SystemInformation.Created_By_Name,
        },
        {
          label: "Customer Since Date",
          value: formatDate(
            accountData.SystemInformation.Accounts_CustomerSinceDate
          ),
        },
      ],
      right: [
        {
          label: "Last Modified By",
          value: accountData.SystemInformation.LastModified_By_Name,
        },
        {
          label: "Most Recent Purchase Date",
          value: formatDate(
            accountData.SystemInformation.Accounts_MostRecentPurchaseDate
          ),
        },
      ],
    },
  };
};

interface AccountInformationProps {
  accountID: string;
}

export default AccountInformation;
