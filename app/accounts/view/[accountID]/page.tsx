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
import { getAccountData } from "@/app/utils/getData";
import Cases from "@/app/cases/page";
import Loading from "@/app/loading";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const AccountView = async ({ params }: { params: { accountID: string } }) => {
  const accountID = params.accountID;
  const accountData = await getAccountData(accountID);
  const accountName = accountData.AccountDetail.Accounts_Name;

  return (
    <div>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-info-content"
          id="account-info-header"
        >
          <Typography variant="h6">{accountName}</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-info-content">
          <React.Suspense fallback={<Loading label="information" />}>
            <AccountInformation accountID={accountID} />
          </React.Suspense>
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
          <React.Suspense fallback={<Loading label="contacts" />}>
            <Contacts accountID={accountID} noTitle />
          </React.Suspense>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-cases-content"
          id="account-cases-header"
        >
          <Typography variant="h6">Cases</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-cases-content">
          <React.Suspense fallback={<Loading label="cases" />}>
            <Cases accountID={accountID} noTitle />
          </React.Suspense>
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
          <React.Suspense fallback={<Loading label="opportunities" />}>
            <Opportunities accountID={accountID} noTitle />
          </React.Suspense>
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
          <React.Suspense fallback={<Loading label="sales orders" />}>
            <AccountSalesOrders accountID={accountID} />
          </React.Suspense>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
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
      </Accordion> */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-assets-content"
          id="account-assets-header"
        >
          <Typography variant="h6">Assets</Typography>
        </AccordionSummary>
        <AccordionDetails id="account-assets-content">
          <React.Suspense fallback={<Loading label="assets" />}>
            <AccountAssets accountID={accountID} />
          </React.Suspense>
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
          <React.Suspense fallback={<Loading label="license keys" />}>
            <AccountLicenseKeys accountID={accountID} />
          </React.Suspense>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccountView;
