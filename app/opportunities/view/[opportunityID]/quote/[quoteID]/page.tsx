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
import { getOpportunityData, getQuoteData } from "@/app/utils/getData";
import { unEscape } from "@/app/utils/utils";
import QuoteInformation from "@/app/components/quotes/QuoteInformation";
import QuoteProducts from "@/app/components/quotes/QuoteProducts";
import QuoteFulfillment from "@/app/components/quotes/QuoteFulfillment";

const QuoteView = async ({
  params,
}: {
  params: { opportunityID: string; quoteID: string };
}) => {
  const opportunityID = params.opportunityID;
  const quoteID = params.quoteID;
  // const opportunityData = await getOpportunityData(opportunityID);
  const quoteData = await getQuoteData(quoteID);
  const opportunityName = unEscape(quoteData?.QuoteDetail?.Opportunities_Name);

  return (
    <div>
      {/* TODO: All this needs to be updated. Was copied from opportunities. */}
      {/* Contacts, Products, Fulfillment */}
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-info-content"
          id="opportunity-info-header"
        >
          <Typography variant="h6">{opportunityName}</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-info-content">
          <QuoteInformation quoteID={quoteID} />
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="quote-products-content"
          id="quote-products-header"
        >
          <Typography variant="h6">Products</Typography>
        </AccordionSummary>
        <AccordionDetails id="quote-products-content">
          <QuoteProducts quoteID={quoteID} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="quote-fulfillment-content"
          id="quote-fulfillment-header"
        >
          <Typography variant="h6">Quote Fulfillment</Typography>
        </AccordionSummary>
        <AccordionDetails id="quote-fulfillment-content">
          <QuoteFulfillment quoteID={quoteID} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default QuoteView;
