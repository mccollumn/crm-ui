import { Box, styled } from "@mui/material";

const BoxStyled = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "lightGray",
  borderRadius: "4px",
  padding: ".5rem",
  margin: "auto",
}));

export const FormDivider = ({ children, ...props }: any) => {
  return <BoxStyled {...props}>{children}</BoxStyled>;
};
