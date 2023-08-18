import { Grid } from "@mui/material";
import Cases from "./cases/page";
import Contacts from "./contacts/page";
import Accounts from "./accounts/page";
import Opportunities from "./opportunities/page";

export default function Home() {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Cases />
          <Contacts />
        </Grid>
        <Grid item xs={6}>
          <Accounts />
          <Opportunities />
        </Grid>
      </Grid>
    </>
  );
}
