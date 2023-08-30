import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ButtonNav } from "../navigation/ButtonNav";
import { InformationSection } from "../InformationSection";
import { CaseData } from "../../types/cases";
import formatDate from "@/app/utils/formatDate";
import { getCaseData } from "@/app/utils/getData";

const CaseInformation = async ({ caseID }: CaseInformationProps) => {
  const caseInfo = await getCaseInfo(caseID);
  if (!caseInfo) return null;

  return (
    <>
      <ButtonNav size="small" path={`/cases/edit/${caseID}`}>
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
      {/* <Accordion defaultExpanded={true}>
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
      </Accordion> */}
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

const getCaseInfo = async (caseID: string) => {
  const caseData: CaseData = await getCaseData(caseID);
  if (!caseData) return null;
  return {
    info: {
      left: [
        { label: "Subject", value: caseData.CaseInformation.Cases_Subject },
        {
          label: "Account Name",
          value: caseData.CaseInformation.Accounts_Name,
        },
        {
          label: "Contact Name",
          value: caseData.CaseInformation.Contacts_FullName,
        },
        {
          label: "Case Origin",
          value: caseData.CaseInformation.Cases_Origin,
        },
        {
          label: "Contact Phone",
          value: caseData.CaseInformation.Cases_ContactPhone,
        },
        {
          label: "Contact Email",
          value: caseData.CaseInformation.Cases_ContactEmail,
        },
        {
          label: "Case Number",
          value: caseData.CaseInformation.Cases_CaseNumber,
        },
        {
          label: "Open Opp Value of Account",
          value: caseData.CaseInformation.Cases_OpenOppValueOfAccount,
        },
      ],
      right: [
        { label: "Status", value: caseData.CaseInformation.Cases_Status },
        {
          label: "Sub Status",
          value: caseData.CaseInformation.Cases_SubStatus,
        },
        {
          label: "Date/Time Opened",
          value: formatDate(caseData.CaseInformation.Cases_CreatedDate, true),
        },
        {
          label: "Date/Time Closed",
          value: formatDate(caseData.CaseInformation.Cases_ClosedDate, true),
        },
        {
          label: "Hibernate End Date",
          value: formatDate(
            caseData.CaseInformation.Cases_HibernateEndDate,
            true
          ),
        },
        { label: "Case Owner", value: caseData.CaseInformation.Owner_Name },
        {
          label: "Sub Owner",
          value: caseData.CaseInformation.Cases_SubOwner,
        },
        {
          label: "Is Escalated",
          value: !!Number(caseData.CaseInformation.Cases_IsEscalated) ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          ),
        },
      ],
    },
    profile: {
      left: [
        {
          label: "Product Delivary Method",
          value: caseData.CaseProfile.Cases_ProductDeliveryMethod,
        },
        {
          label: "Product Name",
          value: caseData.CaseProfile.Cases_ProductName,
        },
        {
          label: "Product Version",
          value: caseData.CaseProfile.Cases_ProductVersion,
        },
        {
          label: "Product Sub Version",
          value: caseData.CaseProfile.Cases_ProductSubVersion,
        },
        { label: "Bug Number", value: caseData.CaseProfile.Cases_BugNumber },
        {
          label: "Bug Description",
          value: caseData.CaseProfile.Cases_BugDescription,
        },
      ],
      right: [
        { label: "Case Type", value: caseData.CaseProfile.Cases_CaseType },
        { label: "Reason", value: caseData.CaseProfile.Cases_Reason },
        { label: "Category", value: caseData.CaseProfile.Cases_Category },
        { label: "Priority", value: caseData.CaseProfile.Cases_Priority },
        { label: "Severity", value: caseData.CaseProfile.Cases_Severity },
        {
          label: "Is TAM Case",
          value: !!Number(caseData.CaseProfile.Cases_IsTAMCase) ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          ),
        },
      ],
      fullWidth: [
        {
          label: "Description",
          value: caseData.CaseProfile.Cases_Description,
        },
        // { label: "Internal Comments", value: "" },
        // { label: "Visible in Self-Service Portal", value: "" },
      ],
    },
    // escalation: {
    //   left: [
    //     { label: "Escalation Status", value: "" },
    //     { label: "Escalation Source", value: "" },
    //     { label: "Web Company", value: "" },
    //     { label: "Web Name", value: "" },
    //   ],
    //   right: [
    //     { label: "Escalation Type", value: "" },
    //     { label: "Escalation Flag", value: "" },
    //     { label: "Web Phone", value: "" },
    //     { label: "Web Email", value: "" },
    //   ],
    // },
    system: {
      left: [
        {
          label: "Created By",
          value: caseData.CaseInformation.CreatedBy_Name,
        },
        {
          label: "Creation Date",
          value: formatDate(caseData.CaseInformation.Cases_CreatedDate, true),
        },
      ],
      right: [
        { label: "Last Modified By", value: "" },
        { label: "Last Modified Date", value: "" },
      ],
    },
  };
};

interface CaseInformationProps {
  caseID: string;
}

export default CaseInformation;
