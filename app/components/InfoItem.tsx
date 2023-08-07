"use client";

import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledItem = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  width: "100%",
  justifyContent: "left",
  position: "relative",
  //   padding: theme.spacing(1),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  textTransform: "none",
  textAlign: "left",
  borderBottom: "1px solid lightgray",
}));

const InfoItem = ({ children, label }: InfoItemProps) => {
  return (
    <StyledItem>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={3}>
          <Typography>{label}:</Typography>
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </StyledItem>
  );
};

interface InfoItemProps {
  children: any;
  label: string;
}

export default InfoItem;
