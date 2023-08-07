import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import CaseComments from "@/app/components/CaseComments";
import CaseInformation from "@/app/components/CaseInformation";

const CaseView = () => {
  const caseInfoLeft = [
    { label: "Subject", value: "We're confused" },
    { label: "Account Name", value: <Link href="/">Kaiser</Link> },
    {
      label: "Description",
      value:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    },
  ];
  const caseInfoRight = [
    { label: "Status", value: "Open" },
    { label: "Sub Status", value: "Waiting on customer" },
    {
      label: "Date/Time Opened",
      value: "8/2/2023 10:12 AM",
    },
  ];

  return (
    <div>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Case Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CaseInformation
            caseInfoLeft={caseInfoLeft}
            caseInfoRight={caseInfoRight}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h6">Case Comments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CaseComments />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography variant="h6">Emails</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CaseView;
