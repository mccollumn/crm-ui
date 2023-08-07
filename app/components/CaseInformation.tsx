import { Button, Grid, Typography } from "@mui/material";
import InfoList from "./InfoList";

const CaseInformation = ({ caseInfoLeft, caseInfoRight }: any) => {
  return (
    <div>
      <Button variant="contained" size="small" sx={{ m: 1 }}>
        Edit
      </Button>
      <Typography>
        <Grid container>
          <Grid item xs={6}>
            <InfoList items={caseInfoLeft} />
          </Grid>
          <Grid item xs={6}>
            <InfoList items={caseInfoRight} />
          </Grid>
        </Grid>
      </Typography>
    </div>
  );
};

export default CaseInformation;
