import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataTable } from "../DataTable";
import { getOpportunitySearchResults } from "@/app/utils/getData";
import { OpportunityResult } from "@/app/types/search";

const OpportunityResults = async ({ query }: OpportunityResultsProps) => {
  const opportunities: { Opportunities: OpportunityResult[] } =
    await getOpportunitySearchResults(query);
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="opportunity-search-section-content"
        id="opportunity-search-section-header"
      >
        <Typography variant="h6">Opportunities</Typography>
      </AccordionSummary>
      <AccordionDetails id="opportunity-search-section-content">
        <div style={{ width: "100%" }}>
          <React.Suspense fallback={<>Loading opportunities...</>}>
            <DataTable
              rows={opportunities.Opportunities}
              columnDefType="opportunitiesList"
            />
          </React.Suspense>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default OpportunityResults;

interface OpportunityResultsProps {
  query: string;
}
