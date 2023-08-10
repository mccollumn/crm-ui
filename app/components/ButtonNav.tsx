"use client";

import { ButtonProps } from "@mui/material";
import { ButtonStyled } from "./ButtonStyled";
import { useRouter } from "next/navigation";

export const ButtonNav = ({ path, children, ...props }: ButtonNavProps) => {
  const router = useRouter();
  return (
    <ButtonStyled onClick={() => router.push(path)} {...props}>
      {children}
    </ButtonStyled>
  );
};

interface ButtonNavProps extends ButtonProps {
  path: string;
  children: any;
}
