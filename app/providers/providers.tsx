"use client";

import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ session, children }: any) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </SessionProvider>
  );
};
