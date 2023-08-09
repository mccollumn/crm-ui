import { Button, Grid, Typography } from "@mui/material";
import InfoList from "./InfoList";

import { cases } from "../../mockData/cases";
import Link from "next/link";

const CaseInformation = ({ caseNumber }: CaseInformationProps) => {
  const caseData = cases.find((item) => item.id.toString() === caseNumber);

  const caseInfoLeft = [
    { label: "Subject", value: caseData?.subject },
    { label: "Account Name", value: <Link href="/">{caseData?.account}</Link> },
    {
      label: "Description",
      value:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    },
  ];
  const caseInfoRight = [
    { label: "Status", value: caseData?.status },
    { label: "Sub Status", value: "Waiting on customer" },
    {
      label: "Date/Time Opened",
      value: caseData?.opened,
    },
  ];
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

interface CaseInformationProps {
  caseNumber: string;
}
