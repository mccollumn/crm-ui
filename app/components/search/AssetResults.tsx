import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataTable } from "../DataTable";
import { getAssetSearchResults } from "@/app/utils/getData";
import { AssetResult } from "@/app/types/search";

const AssetResults = async ({ query }: AssetResultsProps) => {
  const assets: { Assets: AssetResult[] } = await getAssetSearchResults(query);
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="asset-search-section-content"
        id="asset-search-section-header"
      >
        <Typography variant="h6">Assets</Typography>
      </AccordionSummary>
      <AccordionDetails id="asset-search-section-content">
        <div style={{ width: "100%" }}>
          <React.Suspense fallback={<>Loading accounts...</>}>
            <DataTable
              rows={assets.Assets}
              columnDefType="assetSearchResults"
            />
          </React.Suspense>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default AssetResults;

interface AssetResultsProps {
  query: string;
}
