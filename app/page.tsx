import { Grid } from "@mui/material";
import { preload } from "./utils/getData";
import Cases from "./cases/page";
import Contacts from "./contacts/page";
import Accounts from "./accounts/page";
import Opportunities from "./opportunities/page";

export default function Home() {
  // Preload the items that will be displayed
  //TODO: Call preload() for each list
  preload("");

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
