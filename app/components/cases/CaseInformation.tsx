import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ButtonNav } from "../ButtonNav";
import { InformationSection } from "../InformationSection";
import { CaseData } from "../../types/cases";

import { cases } from "../../../mockData/cases";

const CaseInformation = ({ caseNumber }: CaseInformationProps) => {
  const caseData = cases.find((item) => item.id.toString() === caseNumber);
  if (!caseData) return null;

  const caseInfo = getCaseInfo(caseData);

  return (
    <>
      <ButtonNav size="small" path={`/cases/edit/${caseData.id}`}>
        Edit
      </ButtonNav>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="case-info-section-content"
          id="case-info-section-header"
        >
          <Typography variant="h6">Case Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="case-info-section-content">
          <InformationSection
            itemsLeft={caseInfo.info.left}
            itemsRight={caseInfo.info.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="case-profile-section-content"
          id="case-profile-section-header"
        >
          <Typography variant="h6">Case Profile</Typography>
        </AccordionSummary>
        <AccordionDetails id="case-profile-section-content">
          <InformationSection
            itemsLeft={caseInfo.profile.left}
            itemsRight={caseInfo.profile.right}
            itemsFullWidth={caseInfo.profile.fullWidth}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="case-escalation-section-content"
          id="case-escalation-section-header"
        >
          <Typography variant="h6">Case Escalation Details</Typography>
        </AccordionSummary>
        <AccordionDetails id="case-escalation-section-content">
          <InformationSection
            itemsLeft={caseInfo.escalation.left}
            itemsRight={caseInfo.escalation.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="case-system-section-content"
          id="case-system-section-header"
        >
          <Typography variant="h6">System Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="case-system-section-content">
          <InformationSection
            itemsLeft={caseInfo.system.left}
            itemsRight={caseInfo.system.right}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const getCaseInfo = (caseData: CaseData) => {
  return {
    info: {
      left: [
        { label: "Subject", value: caseData?.subject },
        { label: "Account Name", value: caseData?.accountName },
        { label: "Contact Name", value: "" },
        { label: "Case Origin", value: "" },
        { label: "Contact Phone", value: "" },
        { label: "Contact Email", value: "" },
        { label: "Case Number", value: "" },
        { label: "Open Opp Value of Account", value: "" },
      ],
      right: [
        { label: "Status", value: caseData?.status },
        { label: "Sub Status", value: "Waiting on customer" },
        {
          label: "Date/Time Opened",
          value: caseData?.opened,
        },
        { label: "Date/Time Closed", value: "" },
        { label: "Hibernate End Date", value: "" },
        { label: "Case Owner", value: "" },
        { label: "Sub Owner", value: "" },
        { label: "Is Escalated", value: "" },
      ],
    },
    profile: {
      left: [
        { label: "Product Delivary Method", value: "" },
        { label: "Product Name", value: "" },
        { label: "Product Version", value: "" },
        { label: "Product Sub Version", value: "" },
        { label: "Bug Number", value: "" },
        { label: "Bug Description", value: "" },
        // { label: "Description", value: caseData.description },
        // { label: "Internal Comments", value: "" },
        // { label: "Visible in Self-Service Portal", value: "" },
      ],
      right: [
        { label: "Case Type", value: "" },
        { label: "Reason", value: "" },
        { label: "Category", value: "" },
        { label: "Priority", value: "" },
        { label: "Severity", value: "" },
        { label: "Is TAM Case", value: "" },
      ],
      fullWidth: [
        { label: "Description", value: caseData.description },
        { label: "Internal Comments", value: "" },
        { label: "Visible in Self-Service Portal", value: "" },
      ],
    },
    escalation: {
      left: [
        { label: "Escalation Status", value: "" },
        { label: "Escalation Source", value: "" },
        { label: "Web Company", value: "" },
        { label: "Web Name", value: "" },
      ],
      right: [
        { label: "Escalation Type", value: "" },
        { label: "Escalation Flag", value: "" },
        { label: "Web Phone", value: "" },
        { label: "Web Email", value: "" },
      ],
    },
    system: {
      left: [{ label: "Created By", value: "" }],
      right: [{ label: "Last Modified By", value: "" }],
    },
  };
};

interface CaseInformationProps {
  caseNumber: string;
}

export default CaseInformation;
