import React from "react";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "../ConfirmationDialog";
import { Typography } from "@mui/material";
import { isSuccessfulResponse } from "@/app/utils/utils";
import { DeleteItemProps } from "@/app/types/types";

const DeleteQuoteProduct = ({ item, open, handleClose }: DeleteItemProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    const data = { QuoteProducts_ID: item.QuoteProducts_ID };
    const request = new Request("/api/quote_products/delete", {
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
      id="delete-quote-product"
      title="Confirm Deletion"
      confirmText="Delete"
      confirmButtonProps={{ color: "error" }}
      content={
        <Typography>{`Delete the product "${item.Product2_Name}"?`}</Typography>
      }
      onClose={handleClose}
      onConfirm={handleDelete}
      open={open}
      keepMounted
    />
  );
};

export default DeleteQuoteProduct;
