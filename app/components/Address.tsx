import { Box, Typography } from "@mui/material";
import Link from "next/link";

export const Address = ({
  street,
  city,
  state,
  postalCode,
  country,
}: AddressProps) => {
  const address = encodeURI(
    `${street}, ${city}, ${state} ${postalCode}, ${country}`
  );
  return (
    <Box>
      <Link href={`https://www.google.com/maps/?q=${address}`} target="_blank">
        <Typography>{street}</Typography>
        <Typography>{`${city}, ${state} ${postalCode}`}</Typography>
        <Typography>{country}</Typography>
      </Link>
    </Box>
  );
};

interface AddressProps {
  street?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
}
