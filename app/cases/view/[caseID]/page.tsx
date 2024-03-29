import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CaseComments from "@/app/components/cases/CaseComments";
import CaseInformation from "@/app/components/cases/CaseInformation";
import CaseEmails from "@/app/components/cases/CaseEmails";
import CaseHistory from "@/app/components/cases/CaseHistory";
import { getCaseData } from "@/app/utils/getData";
import Loading from "@/app/loading";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const CaseView = async ({ params }: { params: { caseID: string } }) => {
  const caseID = params.caseID;
  const caseData = await getCaseData(caseID);
  const caseNumber = caseData?.CaseInformation.Cases_CaseNumber;

  return (
    <div>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="case-info-content"
          id="case-info-header"
        >
          <Typography
            component={"h1"}
            fontSize={"h6.fontSize"}
            fontWeight={"bold"}
          >{`Case ${caseNumber}`}</Typography>
        </AccordionSummary>
        <AccordionDetails id="case-info-content">
          <React.Suspense fallback={<Loading label="information" />}>
            <CaseInformation caseID={caseID} />
          </React.Suspense>
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
          <React.Suspense fallback={<Loading label="case comments" />}>
            <CaseComments caseID={caseID} />
          </React.Suspense>
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
          <React.Suspense fallback={<Loading label="case emails" />}>
            <CaseEmails caseID={caseID} />
          </React.Suspense>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
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
      </Accordion> */}
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="case-history-content"
          id="case-history-header"
        >
          <Typography variant="h6">Case History</Typography>
        </AccordionSummary>
        <AccordionDetails id="case-history-content">
          <CaseHistory caseID={caseID} />
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
};

export default CaseView;
