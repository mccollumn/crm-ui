"use client";

import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountData } from "../types/accounts";
import { formatDate, isObjectEmpty } from "../utils/utils";
import { useTheme } from "@mui/material/styles";
import { isFuture } from "date-fns";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BoxStyled = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
  width: "20%",
  marginRight: "2rem",
}));

export const SupportStatus = ({ accountID }: SupportStatusProps) => {
  const theme = useTheme();
  const [supportType, setSupportType] = React.useState<string>();
  const [supportEndDate, setSupportEndDate] = React.useState<string>("Unkown");

  React.useEffect(() => {
    const getAccountData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/accounts/${accountID}`
      );
      const accountData: { data: AccountData } = await response.json();
      const accountStatusSummary = accountData.data?.AccountStatusSummary;
      setSupportType(
        isObjectEmpty(accountStatusSummary)
          ? "Unknown"
          : accountStatusSummary.Assets_SupportPlanType || ""
      );
      setSupportEndDate(
        isObjectEmpty(accountStatusSummary)
          ? "Unknown"
          : formatDate(accountStatusSummary.Assets_SupportPlanEnd) || ""
      );
    };
    if (accountID) {
      getAccountData();
    }
  }, [accountID]);

  const style = {
    backgroundColor: isFuture(new Date(supportEndDate))
      ? theme.palette.success.light
      : theme.palette.warning.light,
  };

  if (!supportType) {
    return null;
  }

  return (
    <BoxStyled sx={style}>
      <Grid container>
        <Grid xs={6}>
          <Typography>Support Type: {supportType}</Typography>
        </Grid>
        <Grid xs={6}>
          <Typography>End Date: {supportEndDate}</Typography>
        </Grid>
      </Grid>
    </BoxStyled>
  );
};

interface SupportStatusProps {
  accountID: string | null | undefined;
}
