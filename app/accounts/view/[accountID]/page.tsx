import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountInformation from "@/app/components/accounts/AccountInformation";
import Contacts from "@/app/contacts/page";
import Opportunities from "@/app/opportunities/page";
import AccountSalesOrders from "@/app/components/accounts/AccountSalesOrders";
import AccountSalesInvoices from "@/app/components/accounts/AccountSalesInvoices";
import AccountLicenseKeys from "@/app/components/accounts/AccountLicenseKeys";
import AccountAssets from "@/app/components/accounts/AccountAssets";

const getAccountName = (accountID: string) => {
  // TODO: request account name
  return "Account Name";
};

const AccountView = ({ params }: { params: { accountID: string } }) => {
  const accountID = params.accountID;

  return (
    <div>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-info-content"
          id="account-info-header"
        >
          <Typography variant="h6">{getAccountName(accountID)}</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-info-content">
          <AccountInformation accountID={accountID} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-contacts-content"
          id="account-contacts-header"
        >
          <Typography variant="h6">Contacts</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-contacts-content">
          <Contacts accountID={accountID} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-opportunities-content"
          id="account-opportunities-header"
        >
          <Typography variant="h6">Opportunities</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-opportunities-content">
          <Opportunities accountID={accountID} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-orders-content"
          id="account-orders-header"
        >
          <Typography variant="h6">Sales Orders</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-orders-content">
          <AccountSalesOrders accountID={accountID} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-invoices-content"
          id="account-invoices-header"
        >
          <Typography variant="h6">Sales Invoices</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-invoices-content">
          <AccountSalesInvoices accountID={accountID} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-assets-content"
          id="account-assets-header"
        >
          <Typography variant="h6">Assets</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-assets-content">
          <AccountAssets accountID={accountID} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-keys-content"
          id="account-keys-header"
        >
          <Typography variant="h6">License Keys</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-keys-content">
          <AccountLicenseKeys accountID={accountID} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccountView;