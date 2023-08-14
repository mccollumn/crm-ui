import { Grid } from "@mui/material";
import InfoList from "./InfoList";

export const CaseInformationSection = ({
  itemsLeft = [],
  itemsRight = [],
  itemsFullWidth = [],
}: CaseInformationSectionProps) => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <InfoList items={itemsLeft} />
      </Grid>
      <Grid item xs={6}>
        <InfoList items={itemsRight} />
      </Grid>
      <Grid item xs={12}>
        <InfoList items={itemsFullWidth} />
      </Grid>
    </Grid>
  );
};

interface CaseInformationSectionProps {
  itemsLeft?: Array<any>;
  itemsRight?: Array<any>;
  itemsFullWidth?: Array<any>;
}
