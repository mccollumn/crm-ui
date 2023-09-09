import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContactInformation from "@/app/components/contacts/ContactInformation";
import Opportunities from "@/app/opportunities/page";
import Cases from "@/app/cases/page";
import ContactHistory from "@/app/components/contacts/ContactHistory";

const getContactAccountID = (contactID: string) => {
  // TODO: request account number
  return "";
};

const ContactView = ({ params }: { params: { contactID: string } }) => {
  const contactID = params.contactID;
  // TODO: Finish this when API is available
  const contactData = {};
  const contactName = "Mr. Customer";

  return (
    <div>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contact-info-content"
          id="contact-info-header"
        >
          <Typography variant="h6">{contactName}</Typography>
        </AccordionSummary>
        <AccordionDetails id="contact-info-content">
          <ContactInformation contactID={contactID} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contact-opportunities-content"
          id="contact-opportunities-header"
        >
          <Typography variant="h6">Opportunities</Typography>
        </AccordionSummary>
        <AccordionDetails id="contact-opportunities-content">
          <Opportunities accountID={getContactAccountID(contactID)} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contact-cases-content"
          id="contact-cases-header"
        >
          <Typography variant="h6">Cases</Typography>
        </AccordionSummary>
        <AccordionDetails id="contact-cases-content">
          <Cases contactID={contactID} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contact-attachments-content"
          id="contact-attachments-header"
        >
          <Typography variant="h6">Attachments</Typography>
        </AccordionSummary>
        <AccordionDetails id="contact-attachments-content">
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contact-history-content"
          id="contact-history-header"
        >
          <Typography variant="h6">Contact History</Typography>
        </AccordionSummary>
        <AccordionDetails id="contact-history-content">
          <ContactHistory contactID={contactID} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ContactView;
