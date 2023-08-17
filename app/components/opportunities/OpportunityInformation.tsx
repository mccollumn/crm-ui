import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ButtonNav } from "../ButtonNav";
import { InformationSection } from "../InformationSection";
import { OpportunityData } from "@/app/types/opportunities";

const getOpportunityData = (opportunityID: string) => {
  // TODO: Retreive contact data
  return { id: "0018Z00002eltWLQAY", name: "Mr Customer" };
};

const OpportunityInformation = ({
  opportunityID,
}: OpportunityInformationProps) => {
  const opportunityData = getOpportunityData(opportunityID);
  if (!opportunityData) return null;

  const opportunityInfo = getContactInfo(opportunityData);

  return (
    <>
      <ButtonNav
        size="small"
        path={`/opportunities/edit/${opportunityData.id}`}
      >
        Edit
      </ButtonNav>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-info-section-content"
          id="opportunity-info-section-header"
        >
          <Typography variant="h6">Opportunity Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-info-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.info.left}
            itemsRight={opportunityInfo.info.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-overview-section-content"
          id="opportunity-overview-section-header"
        >
          <Typography variant="h6">Webtrends Solution Overview</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-overview-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.overview.left}
            itemsRight={opportunityInfo.overview.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-renewal-section-content"
          id="opportunity-renewal-section-header"
        >
          <Typography variant="h6">Renewal Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-renewal-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.renewal.left}
            itemsRight={opportunityInfo.renewal.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-additional-section-content"
          id="opportunity-additional-section-header"
        >
          <Typography variant="h6">Additional Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-additional-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.additional.fullWidth}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-win_loss-section-content"
          id="opportunity-win_loss-section-header"
        >
          <Typography variant="h6">Win/Loss/Competitive Detail</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-win_loss-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.win_loss.left}
            itemsRight={opportunityInfo.win_loss.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-partner-section-content"
          id="opportunity-partner-section-header"
        >
          <Typography variant="h6">Partner Details</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-partner-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.partner.left}
            itemsRight={opportunityInfo.partner.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-links-section-content"
          id="opportunity-links-section-header"
        >
          <Typography variant="h6">Custom Links</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-links-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.links.left}
            itemsRight={opportunityInfo.links.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-se-section-content"
          id="opportunity-se-section-header"
        >
          <Typography variant="h6">Solutions engineering</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-se-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.se.left}
            itemsRight={opportunityInfo.se.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-clarizen-section-content"
          id="opportunity-clarizen-section-header"
        >
          <Typography variant="h6">Clarizen Project Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-clarizen-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.clarizen.left}
            itemsRight={opportunityInfo.clarizen.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-marketing-section-content"
          id="opportunity-marketing-section-header"
        >
          <Typography variant="h6">Marketing Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-marketing-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.marketing.left}
            itemsRight={opportunityInfo.marketing.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-commission-section-content"
          id="opportunity-commission-section-header"
        >
          <Typography variant="h6">Commission Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-commission-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.commission.left}
            itemsRight={opportunityInfo.commission.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-stage-section-content"
          id="opportunity-stage-section-header"
        >
          <Typography variant="h6">Stage Tracking Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-stage-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.stage.left}
            itemsRight={opportunityInfo.stage.right}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-system-section-content"
          id="opportunity-system-section-header"
        >
          <Typography variant="h6">System Information</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-system-section-content">
          <InformationSection
            itemsLeft={opportunityInfo.system.left}
            itemsRight={opportunityInfo.system.right}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const getContactInfo = (contactData: OpportunityData) => {
  return {
    info: {
      left: [
        { label: "Opportunity Owner", value: "" },
        { label: "Opportunity Name", value: "" },
        { label: "Account Name", value: "" },
        { label: "Opportunity Type", value: "" },
        { label: "Product", value: "" },
        { label: "Product Family", value: "" },
        { label: "Interest", value: "" },
        { label: "Contains New Business", value: "" },
        { label: "Account Type", value: "" },
        { label: "Ops Audit", value: "" },
        { label: "Order Exception", value: "" },
        { label: "Order Exception Notes", value: "" },
        { label: "Split Opportunity", value: "" },
        { label: "Quarter Bank", value: "" },
        { label: "Fast Notes/Next Steps", value: "" },
        { label: "Optimize Product Type", value: "" },
        { label: "Migration External ID", value: "" },
      ],
      right: [
        { label: "Opportunity Record Type", value: "" },
        { label: "Amount", value: "" },
        { label: "Stage", value: "" },
        { label: "Close Date", value: "" },
        { label: "Probability (%)", value: "" },
        { label: "Forecast Status", value: "" },
        { label: "Expected Revenue", value: "" },
        { label: "Term (months)", value: "" },
        { label: "Multi-Year Year 1 Amount", value: "" },
        { label: "1st Year Contract Amount", value: "" },
        { label: "1st Year Expected Amount", value: "" },
        { label: "MSA", value: "" },
        { label: "CHAMPP", value: "" },
      ],
    },
    overview: {
      left: [
        { label: "PF Analytics On Demand", value: "" },
        { label: "PF Analytics On Premises", value: "" },
        { label: "PF VDM / Segments", value: "" },
        { label: "PF Optimize", value: "" },
        { label: "PF Streams", value: "" },
        { label: "PF Ads", value: "" },
        { label: "PF Services", value: "" },
        { label: "PF Other", value: "" },
      ],
      right: [
        { label: "PF Site analytics", value: "" },
        { label: "PF SharePoint Site", value: "" },
        { label: "PF SharePoint Intranet", value: "" },
        { label: "PF Mobile", value: "" },
        { label: "PF Facebook", value: "" },
        { label: "PF Social Analytics", value: "" },
        { label: "PF EPS", value: "" },
        { label: "PF Digital Intelligence", value: "" },
        { label: "PF SAP", value: "" },
      ],
    },
    renewal: {
      left: [
        { label: "Baseline Renewal Amount", value: "" },
        { label: "Services Renewal Amount", value: "" },
        { label: "Total Baseline", value: "" },
        { label: "Multi-Year Add Back", value: "" },
        { label: "Renewal Growth Percentage", value: "" },
        { label: "Renewal Growth Results", value: "" },
      ],
      right: [
        { label: "Baseline Renewal Date", value: "" },
        { label: "Renewal Status", value: "" },
        { label: "Renewal Status Comments & Next Steps", value: "" },
        { label: "Resell", value: "" },
      ],
    },
    additional: {
      fullWidth: [
        { label: "Opportunity Notes", value: "" },
        { label: "Compelling Event", value: "" },
      ],
    },
    win_loss: {
      left: [
        { label: "Winner", value: "" },
        { label: "Current/Prior Vendor", value: "" },
        { label: "Win Type", value: "" },
        { label: "Competitors", value: "" },
        { label: "Business Value of Solution to Customer", value: "" },
        { label: "Change from Renewal Baseline Reason", value: "" },
      ],
      right: [
        { label: "Primary Win/Loss Reason", value: "" },
        { label: "Primary Win/Loss Detail", value: "" },
        { label: "Secondary Win/Loss Reason", value: "" },
        { label: "Secondary Win/Loss Detail", value: "" },
        { label: "Additional Win/Loss Details", value: "" },
      ],
    },
    partner: {
      left: [
        { label: "Originating Partner", value: "" },
        { label: "Fulfilling Partner", value: "" },
        { label: "Referring Partner", value: "" },
      ],
      right: [
        { label: "Influencing Partner", value: "" },
        { label: "Channel Deal", value: "" },
      ],
    },
    links: {
      left: [
        {
          label: "18 Character Contact ID",
          value:
            "https://webtrends.lightning.force.com/servlet/servlet.Integration?lid=00b400000018LuX&eid=0031W00002d6IULQA2&ic=1",
        },
        {
          label: "Trial Manager",
          value:
            "https://webtrends.lightning.force.com/servlet/servlet.Integration?lid=00b30000000iZGr&eid=0068Z00001VJmTkQAL&ic=1",
        },
      ],
      right: [
        {
          label: "Old Quote Manager",
          value:
            "https://webtrends.lightning.force.com/servlet/servlet.Integration?lid=00b400000018I7S&eid=0068Z00001VJmTkQAL&ic=1",
        },
      ],
    },
    se: {
      left: [
        { label: "SE Involved", value: "" },
        { label: "Product Fit", value: "" },
        { label: "SE Engagement", value: "" },
      ],
      right: [
        { label: "SE Next Steps", value: "" },
        { label: "SE Comments", value: "" },
      ],
    },
    clarizen: {
      left: [
        { label: "Project Trigger Type", value: "" },
        { label: "Parent Project ID", value: "" },
      ],
      right: [
        { label: "Order Number", value: "" },
        { label: "Order Date", value: "" },
      ],
    },
    marketing: {
      left: [
        { label: "Lead Source", value: "" },
        { label: "Initial Contact Email", value: "" },
        { label: "Original Campaign Source", value: "" },
      ],
      right: [
        { label: "Primary Campaign Source", value: "" },
        { label: "Marketing Generated", value: "" },
        { label: "Sourced from Data.com", value: "" },
      ],
    },
    commission: {
      left: [
        { label: "Sales Rep ID", value: "" },
        { label: "Commission Category", value: "" },
        { label: "SharePoint Overlay Contributor", value: "" },
        { label: "Exception", value: "" },
      ],
      right: [
        { label: "Commission Comments", value: "" },
        { label: "OD Switcher", value: "" },
        { label: "Multi-Year Uplift", value: "" },
      ],
    },
    stage: {
      left: [
        { label: "Converted from Lead ID", value: "" },
        { label: "Stage 1 Date", value: "" },
        { label: "Stage 2 Date", value: "" },
        { label: "Stage 3 Date", value: "" },
        { label: "Stage 4 Date", value: "" },
        { label: "Stage 5 Date", value: "" },
      ],
      right: [
        { label: "Conversion Date", value: "" },
        { label: "Most Recent Stage 1", value: "" },
        { label: "Most Recent Stage 2", value: "" },
        { label: "Most Recent Stage 3", value: "" },
        { label: "Most Recent Stage 4", value: "" },
        { label: "Most Recent Stage 5", value: "" },
      ],
    },
    system: {
      left: [
        { label: "Opportunity Territory", value: "" },
        { label: "Holdover Expiration", value: "" },
        { label: "Type", value: "" },
        { label: "Refresh Product Family", value: "" },
        { label: "Created By", value: "" },
      ],
      right: [
        { label: "Territory Override", value: "" },
        { label: "Territory Tracker", value: "" },
        { label: "Deal Alert Sent", value: "" },
        { label: "Quote Submitted", value: "" },
        { label: "Do Not Run Trigger Test", value: "" },
        { label: "Last Modified By", value: "" },
      ],
    },
  };
};

interface OpportunityInformationProps {
  opportunityID: string;
}

export default OpportunityInformation;
