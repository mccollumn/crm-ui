import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataTable } from "../DataTable";
import { getCaseCommentSearchResults } from "@/app/utils/getData";
import { CaseCommentResult } from "@/app/types/search";

const CaseCommentResults = async ({ query }: CaseCommentResultsProps) => {
  const caseComments: { "Case Comments": CaseCommentResult[] } =
    await getCaseCommentSearchResults(query);
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="case-comment-search-section-content"
        id="case-comment-search-section-header"
      >
        <Typography variant="h6">Case Comments</Typography>
      </AccordionSummary>
      <AccordionDetails id="case-comment-search-section-content">
        <div style={{ width: "100%" }}>
          <React.Suspense fallback={<>Loading case comments...</>}>
            <DataTable
              rows={caseComments["Case Comments"]}
              columnDefType="caseCommentSearchResults"
            />
          </React.Suspense>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default CaseCommentResults;

interface CaseCommentResultsProps {
  query: string;
}
