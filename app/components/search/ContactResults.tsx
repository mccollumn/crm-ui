import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataTable } from "../DataTable";
import { getContactSearchResults } from "@/app/utils/getData";
import { ContactResult } from "@/app/types/search";

const ContactResults = async ({ query }: ContactResultsProps) => {
  const contacts: { Contacts: ContactResult[] } = await getContactSearchResults(
    query
  );
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="contact-search-section-content"
        id="contact-search-section-header"
      >
        <Typography variant="h6">Contacts</Typography>
      </AccordionSummary>
      <AccordionDetails id="contact-search-section-content">
        <div style={{ width: "100%" }}>
          <React.Suspense fallback={<>Loading contacts...</>}>
            <DataTable rows={contacts.Contacts} columnDefType="contactsList" />
          </React.Suspense>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ContactResults;

interface ContactResultsProps {
  query: string;
}
