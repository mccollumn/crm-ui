import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CaseComments from "@/app/components/CaseComments";
import CaseInformation from "@/app/components/CaseInformation";
import CaseEmails from "@/app/components/CaseEmails";
import CaseHistory from "@/app/components/CaseHistory";

const CaseView = ({ params }: { params: { caseNumber: string } }) => {
  const caseNumber = params.caseNumber;

  return (
    <div>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="case-info-content"
          id="case-info-header"
        >
          <Typography variant="h6">{`Case ${caseNumber}`}</Typography>
        </AccordionSummary>
        <AccordionDetails id="case-info-content">
          <CaseInformation caseNumber={caseNumber} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="case-comments-content"
          id="case-comments-header"
        >
          <Typography variant="h6">Case Comments</Typography>
        </AccordionSummary>
        <AccordionDetails id="case-comments-content">
          <CaseComments caseNumber={caseNumber} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="case-emails-content"
          id="case-emails-header"
        >
          <Typography variant="h6">Emails</Typography>
        </AccordionSummary>
        <AccordionDetails id="case-emails-content">
          <CaseEmails caseNumber={caseNumber} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="case-attachments-content"
          id="case-attachments-header"
        >
          <Typography variant="h6">Attachments</Typography>
        </AccordionSummary>
        <AccordionDetails id="case-attachments-content">
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="case-history-content"
          id="case-history-header"
        >
          <Typography variant="h6">Case History</Typography>
        </AccordionSummary>
        <AccordionDetails id="case-history-content">
          <CaseHistory caseNumber={caseNumber} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CaseView;
