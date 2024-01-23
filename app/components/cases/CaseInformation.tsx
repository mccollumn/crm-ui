import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ButtonNav } from "../navigation/ButtonNav";
import { InformationSection } from "../InformationSection";
import { CaseData } from "../../types/cases";
import {
  formatCheckbox,
  formatCurrency,
  formatDate,
  unEscape,
} from "@/app/utils/utils";
import { getCaseData } from "@/app/utils/getData";
import Link from "next/link";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

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
        {
          label: "Subject",
          value: unEscape(caseData.CaseInformation.Cases_Subject),
        },
        {
          label: "Account Name",
          value: (
            <Link
              href={`/accounts/view/${caseData.CaseInformation.Cases_AccountID}`}
            >
              {unEscape(caseData.CaseInformation.Accounts_Name)}
            </Link>
          ),
        },
        {
          label: "Contact Name",
          value: (
            <Link
              href={`/contacts/view/${caseData.CaseInformation.Cases_ContactId}`}
            >
              {unEscape(caseData.CaseInformation.Contacts_FullName)}
            </Link>
          ),
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
          value: (
            <Link
              href={`mailto:${caseData.CaseInformation.Cases_ContactEmail}`}
            >
              {caseData.CaseInformation.Cases_ContactEmail}
            </Link>
          ),
        },
        {
          label: "Case Number",
          value: caseData.CaseInformation.Cases_CaseNumber,
        },
        {
          label: "Open Opp Value of Account",
          value: formatCurrency(
            caseData.CaseInformation.Cases_OpenOppValueOfAccount
          ),
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
          value: formatDate(caseData.CaseInformation.Cases_CreatedDate, {
            time: true,
          }),
        },
        {
          label: "Date/Time Closed",
          value: formatDate(caseData.CaseInformation.Cases_ClosedDate, {
            time: true,
          }),
        },
        {
          label: "Hibernate End Date",
          value: formatDate(caseData.CaseInformation.Cases_HibernateEndDate),
        },
        { label: "Case Owner", value: caseData.CaseInformation.Owner_Name },
        {
          label: "Sub Owner",
          value: caseData.CaseInformation.Cases_SubOwner,
        },
        {
          label: "Is Escalated",
          value: formatCheckbox(caseData.CaseInformation.Cases_IsEscalated),
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
          value: unEscape(caseData.CaseProfile.Cases_BugDescription || ""),
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
          value: formatCheckbox(caseData.CaseProfile.Cases_IsTAMCase),
        },
      ],
      fullWidth: [
        {
          label: "Description",
          value: unEscape(caseData.CaseProfile.Cases_Description || ""),
        },
      ],
    },
    system: {
      left: [
        {
          label: "Created By",
          value: caseData.CaseInformation.CreatedBy_Name,
        },
        {
          label: "Creation Date",
          value: formatDate(caseData.CaseInformation.Cases_CreatedDate),
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
