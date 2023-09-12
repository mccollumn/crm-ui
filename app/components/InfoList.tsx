import { Box, Typography } from "@mui/material";
import InfoItem from "./InfoItem";

const InfoList = ({ items }: InfoListProps) => {
  return (
    <Box
      sx={{
        ml: "2rem",
        mr: "2rem",
        // height: "100vh",
      }}
    >
      {[...items].map((item) => (
        <InfoItem label={item.label} key={item.label}>
          <Typography sx={{ whiteSpace: "pre-wrap" }}>{item.value}</Typography>
        </InfoItem>
      ))}
    </Box>
  );
};

interface InfoListProps {
  items: any;
}

export default InfoList;
