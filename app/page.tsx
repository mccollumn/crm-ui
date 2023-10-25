import React from "react";
import { Grid } from "@mui/material";
import Cases from "./cases/page";
import Contacts from "./contacts/page";
import Accounts from "./accounts/page";
import Opportunities from "./opportunities/page";
import Loading from "./loading";

const Home = () => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <React.Suspense fallback={<Loading label="cases" />}>
            <Cases />
          </React.Suspense>
          <React.Suspense fallback={<Loading label="contacts" />}>
            <Contacts />
          </React.Suspense>
        </Grid>
        <Grid item xs={6}>
          <React.Suspense fallback={<Loading label="accounts" />}>
            <Accounts />
          </React.Suspense>
          <React.Suspense fallback={<Loading label="opportunities" />}>
            <Opportunities />
          </React.Suspense>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
