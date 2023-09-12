import { Grid } from "@mui/material";
import InfoList from "./InfoList";

export const InformationSection = ({
  itemsLeft = [],
  itemsRight = [],
  itemsFullWidth = [],
}: InformationSectionProps) => {
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

interface InformationSectionProps {
  itemsLeft?: Array<any>;
  itemsRight?: Array<any>;
  itemsFullWidth?: Array<any>;
}
