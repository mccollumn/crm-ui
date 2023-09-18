import { Box, Typography } from "@mui/material";
import Link from "next/link";

export function Address({
  street,
  city,
  state,
  postalCode,
  country,
}: AddressProps) {
  const args = arguments[0];
  if (Object.values(args).every((value) => value === null)) return null;

  const address: { [key: string]: string } = {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  };
  Object.keys(args).forEach((key) => {
    const value = args[key];
    if (value) {
      address[key] = value;
    }
  });

  const addressStr = encodeURI(
    `${address.street}, ${address.city}, ${address.state} ${address.postalCode}, ${address.country}`
  );
  return (
    <Box>
      <Link
        href={`https://www.google.com/maps/?q=${addressStr}`}
        target="_blank"
      >
        <Typography>{address.street}</Typography>
        <Typography>{`${address.city}, ${address.state} ${address.postalCode}`}</Typography>
        <Typography>{address.country}</Typography>
      </Link>
    </Box>
  );
}

interface AddressProps {
  street?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
}
