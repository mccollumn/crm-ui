import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataTable } from "../DataTable";
import { getAccountSearchResults } from "@/app/utils/getData";
import { AccountResult } from "@/app/types/search";

const AccountResults = async ({ query }: AccountResultsProps) => {
  const accounts: { Accounts: AccountResult[] } = await getAccountSearchResults(
    query
  );
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="account-search-section-content"
        id="account-search-section-header"
      >
        <Typography variant="h6">Accounts</Typography>
      </AccordionSummary>
      <AccordionDetails id="account-search-section-content">
        <div style={{ width: "100%" }}>
          <React.Suspense fallback={<>Loading accounts...</>}>
            <DataTable rows={accounts.Accounts} columnDefType="accountsList" />
          </React.Suspense>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccountResults;

interface AccountResultsProps {
  query: string;
}
