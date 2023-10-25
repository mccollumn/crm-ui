import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpportunityContactRoles from "@/app/components/opportunities/OpportunityContactRole";
import { getQuoteData } from "@/app/utils/getData";
import { unEscape } from "@/app/utils/utils";
import QuoteInformation from "@/app/components/quotes/QuoteInformation";
import QuoteProducts from "@/app/components/quotes/QuoteProducts";
import QuoteFulfillment from "@/app/components/quotes/QuoteFulfillment";
import Loading from "@/app/loading";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const QuoteView = async ({
  params,
}: {
  params: { opportunityID: string; quoteID: string };
}) => {
  const opportunityID = params.opportunityID;
  const quoteID = params.quoteID;
  const quoteData = await getQuoteData(quoteID);
  const opportunityName = unEscape(quoteData?.QuoteDetail?.Opportunities_Name);

  return (
    <div>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="opportunity-info-content"
          id="opportunity-info-header"
        >
          <Typography variant="h6">{opportunityName}</Typography>
        </AccordionSummary>
        <AccordionDetails id="opportunity-info-content">
          <React.Suspense fallback={<Loading label="information" />}>
            <QuoteInformation quoteID={quoteID} />
          </React.Suspense>
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
          <React.Suspense fallback={<Loading label="contact roles" />}>
            <OpportunityContactRoles opportunityID={opportunityID} />
          </React.Suspense>
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
          <React.Suspense fallback={<Loading label="products" />}>
            <QuoteProducts quoteID={quoteID} />
          </React.Suspense>
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
          <React.Suspense fallback={<Loading label="fulfillment" />}>
            <QuoteFulfillment quoteID={quoteID} />
          </React.Suspense>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default QuoteView;
