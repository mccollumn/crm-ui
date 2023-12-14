import React from "react";
import DeleteQuoteProduct from "./quotes/DeleteQuoteProduct";
import DeleteCaseComment from "./cases/DeleteCaseComment";
import { CaseComment } from "../types/cases";

const useDeleteItem = () => {
  const defaultStatus = {
    quoteProduct: {
      item: {},
      open: false,
      handleClick(item: { [key: string]: string | null }) {
        setDeleteStatus({
          ...deleteStatus,
          quoteProduct: { ...deleteStatus.quoteProduct, item, open: true },
        });
      },
      handleClose() {
        setDeleteStatus({
          ...deleteStatus,
          quoteProduct: { ...deleteStatus.quoteProduct, open: false },
        });
      },
    },
    caseComment: {
      item: {},
      open: false,
      handleClick(item: CaseComment) {
        setDeleteStatus({
          ...deleteStatus,
          caseComment: { ...deleteStatus.caseComment, item, open: true },
        });
      },
      handleClose() {
        setDeleteStatus({
          ...deleteStatus,
          caseComment: { ...deleteStatus.caseComment, open: false },
        });
      },
    },
  };
  const [deleteStatus, setDeleteStatus] = React.useState(defaultStatus);

  return {
    DeleteItemDialog,
    deleteStatus,
  };
};

const DeleteItemDialog = ({
  deleteStatus,
}: {
  [key: string]: deleteStatusProps;
}) => {
  return (
    <>
      <DeleteQuoteProduct
        item={deleteStatus.quoteProduct.item}
        open={deleteStatus.quoteProduct.open}
        handleClose={deleteStatus.quoteProduct.handleClose}
      />
      <DeleteCaseComment
        item={deleteStatus.caseComment.item}
        open={deleteStatus.caseComment.open}
        handleClose={deleteStatus.caseComment.handleClose}
      />
    </>
  );
};

type deleteStatusProps = {
  [key: string]: {
    item: any;
    open: boolean;
    handleClick: (item: any) => void;
    handleClose: () => void;
  };
};

export default useDeleteItem;
