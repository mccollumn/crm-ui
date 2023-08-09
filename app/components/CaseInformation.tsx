import { Button, Grid, Typography } from "@mui/material";
import InfoList from "./InfoList";

const CaseInformation = ({ caseInfoLeft, caseInfoRight }: any) => {
  return (
    <>
      <Button variant="contained" size="small" sx={{ m: 1 }}>
        Edit
      </Button>
      <Grid container>
        <Grid item xs={6}>
          <InfoList items={caseInfoLeft} />
        </Grid>
        <Grid item xs={6}>
          <InfoList items={caseInfoRight} />
        </Grid>
      </Grid>
    </>
  );
};

export default CaseInformation;
