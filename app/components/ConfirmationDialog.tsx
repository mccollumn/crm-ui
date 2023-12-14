import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ButtonStyled, ButtonStyledProps } from "./navigation/ButtonStyled";

const ConfirmationDialog = ({
  onClose,
  onConfirm,
  open,
  title,
  cancelText = "Cancel",
  cancelButtonProps,
  confirmText = "OK",
  confirmButtonProps,
  content,
  ...props
}: ConfirmationDialogRawProps) => {
  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onConfirm();
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: "80%" } }}
      maxWidth="xs"
      open={open}
      {...props}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        <ButtonStyled autoFocus color={"inherit"} onClick={handleCancel}>
          {cancelText}
        </ButtonStyled>
        <ButtonStyled onClick={handleOk} {...confirmButtonProps}>
          {confirmText}
        </ButtonStyled>
      </DialogActions>
    </Dialog>
  );
};

interface ConfirmationDialogRawProps {
  title: string;
  open: boolean;
  onClose: (value?: string) => void;
  onConfirm: () => void;
  content?: React.ReactNode;
  cancelText?: string;
  cancelButtonProps?: ButtonStyledProps;
  confirmText?: string;
  confirmButtonProps?: ButtonStyledProps;
  id?: string;
  keepMounted?: boolean;
}

export default ConfirmationDialog;
