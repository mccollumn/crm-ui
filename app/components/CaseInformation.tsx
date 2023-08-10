import { Grid } from "@mui/material";
import { ButtonNav } from "./ButtonNav";
import InfoList from "./InfoList";
import { CaseData } from "../types/cases";

import { cases } from "../../mockData/cases";

const CaseInformation = ({ caseNumber }: CaseInformationProps) => {
  const caseData = cases.find((item) => item.id.toString() === caseNumber);
  if (!caseData) return null;

  const caseInfo = getCaseInfo(caseData);

  return (
    <>
      <ButtonNav size="small" path={`/cases/edit/${caseData.id}`}>
        Edit
      </ButtonNav>
      <Grid container>
        <Grid item xs={6}>
          <InfoList items={caseInfo.left} />
        </Grid>
        <Grid item xs={6}>
          <InfoList items={caseInfo.right} />
        </Grid>
      </Grid>
    </>
  );
};

const getCaseInfo = (caseData: CaseData) => {
  return {
    left: [
      { label: "Subject", value: caseData?.subject },
      { label: "Account Name", value: caseData?.accountName },
      {
        label: "Description",
        value: caseData.description,
      },
    ],
    right: [
      { label: "Status", value: caseData?.status },
      { label: "Sub Status", value: "Waiting on customer" },
      {
        label: "Date/Time Opened",
        value: caseData?.opened,
      },
    ],
  };
};

interface CaseInformationProps {
  caseNumber: string;
}

export default CaseInformation;
