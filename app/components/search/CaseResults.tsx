import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataTable } from "../DataTable";
import { getCaseSearchResults } from "@/app/utils/getData";
import { CaseResult } from "@/app/types/search";

const CaseResults = async ({ query }: CaseResultsProps) => {
  const cases: { Cases: CaseResult[] } = await getCaseSearchResults(query);
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="case-search-section-content"
        id="case-search-section-header"
      >
        <Typography variant="h6">Cases</Typography>
      </AccordionSummary>
      <AccordionDetails id="case-search-section-content">
        <div style={{ width: "100%" }}>
          <React.Suspense fallback={<>Loading cases...</>}>
            <DataTable rows={cases.Cases} columnDefType="casesList" />
          </React.Suspense>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default CaseResults;

interface CaseResultsProps {
  query: string;
}
