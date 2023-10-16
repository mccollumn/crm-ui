import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpportunityInformation from "@/app/components/opportunities/OpportunityInformation";
import OpportunityQuotes from "@/app/components/opportunities/OpportunityQuotes";
import OpportunityContactRoles from "@/app/components/opportunities/OpportunityContactRole";
import OpportunityActivities from "@/app/components/opportunities/OpportunityActivities";
import OpportunityProducts from "@/app/components/opportunities/OpportunityProducts";
import OpportunityStage from "@/app/components/opportunities/OpportunityStage";
import { getOpportunityData } from "@/app/utils/getData";
import { unEscape } from "@/app/utils/utils";

const OpportunityView = async ({
  params,
}: {
  params: { opportunityID: string };
}) => {
  const opportunityID = params.opportunityID;
  const opportunityData = await getOpportunityData(opportunityID);
  const opportunityName = unEscape(
    opportunityData?.OpportunityDetail?.Opportunities_Name
  );

  return (
    <>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-info-content"
          id="opportunity-info-header"
        >
          <Typography variant="h6">{opportunityName}</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-info-content">
          <OpportunityInformation opportunityID={opportunityID} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-quotes-content"
          id="opportunity-quotes-header"
        >
          <Typography variant="h6">Quotes</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-quotes-content">
          <OpportunityQuotes opportunityID={opportunityID} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-contact-roles-content"
          id="opportunity-contact-roles-header"
        >
          <Typography variant="h6">Contact Roles</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-contact-roles-content">
          <OpportunityContactRoles opportunityID={opportunityID} />
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-activities-content"
          id="opportunity-activities-header"
        >
          <Typography variant="h6">Activity</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-activities-content">
          <OpportunityActivities opportunityID={opportunityID} />
        </AccordionDetails>
      </Accordion> */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-products-content"
          id="opportunity-products-header"
        >
          <Typography variant="h6">Products</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-products-content">
          <OpportunityProducts opportunityID={opportunityID} />
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-stage-content"
          id="opportunity-stage-header"
        >
          <Typography variant="h6">Stage History</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-stage-content">
          <OpportunityStage opportunityID={opportunityID} />
        </AccordionDetails>
      </Accordion> */}
    </>
  );
};

export default OpportunityView;
