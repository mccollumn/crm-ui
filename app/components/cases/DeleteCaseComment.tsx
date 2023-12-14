import React from "react";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "../ConfirmationDialog";
import { Typography } from "@mui/material";
import { isSuccessfulResponse } from "@/app/utils/utils";
import { DeleteItemProps } from "@/app/types/types";

const DeleteCaseComment = ({ item, open, handleClose }: DeleteItemProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    const data = { CaseComments_ID: item.CaseComments_ID };
    const request = new Request("/api/cases/delete/comment", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const response = await fetch(request);

    if (!(await isSuccessfulResponse(response))) {
      router.push("/error");
      return;
    }

    handleClose();
    router.refresh();
  };

  return (
    <ConfirmationDialog
      id="delete-case=comment"
      title="Confirm Deletion"
      confirmText="Delete"
      confirmButtonProps={{ color: "error" }}
      content={<Typography>{`Delete case comment?`}</Typography>}
      onClose={handleClose}
      onConfirm={handleDelete}
      open={open}
      keepMounted
    />
  );
};

export default DeleteCaseComment;
