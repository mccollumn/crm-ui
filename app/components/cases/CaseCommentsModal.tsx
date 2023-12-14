"use client";

import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CaseComment } from "@/app/types/cases";
import { formatDate } from "@/app/utils/utils";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  DeleteForever,
  EditNote,
  Close,
  ExpandMore,
} from "@mui/icons-material";
import { ButtonNav } from "../navigation/ButtonNav";
import useDeleteItem from "../useDeleteItem";

const CaseCommentsModal = ({
  caseComments,
  caseNumber,
}: CaseCommentsModalProps) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonNav size="small" path="" onClick={handleOpen}>
        View All
      </ButtonNav>
      <Dialog open={open} fullWidth maxWidth="lg">
        <DialogTitle>
          <Typography>
            <strong>
              {`Case ${caseNumber ? `${caseNumber} ` : ""}Comments`}
            </strong>
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          {caseComments.sort(sortDescendingDate).map((comment) => {
            return (
              <Accordion defaultExpanded={true} key={comment.CaseComments_ID}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`case-comment-${comment.CaseComments_ID}-content`}
                  id={`case-comment-${comment.CaseComments_ID}-header`}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    width="100%"
                    marginRight="50%"
                  >
                    <Typography>
                      <strong>
                        Created by: {comment.CreatedBy_Name} (
                        {formatDate(comment.CaseComments_CreatedDate, {
                          time: true,
                        })}
                        )
                      </strong>
                    </Typography>
                    <PublicCheckbox
                      isPublic={!!Number(comment.CaseComments_IsPublic)}
                    />
                  </Stack>
                </AccordionSummary>
                <AccordionDetails
                  id={`case-comment-${comment.CaseComments_ID}-content`}
                >
                  <Stack direction="row" spacing={2}>
                    <TextField
                      multiline
                      fullWidth
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      value={comment.CaseComments_CommentBody}
                    />
                    <ButtonBox comment={comment} />
                  </Stack>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </DialogContent>
      </Dialog>
    </>
  );
};

const PublicCheckbox = ({ isPublic }: PublicCheckboxProps) => {
  return (
    <Stack direction="row" spacing={2}>
      <Typography>Public</Typography>
      {isPublic ? <CheckBox /> : <CheckBoxOutlineBlank />}
    </Stack>
  );
};

const ButtonBox = ({ comment }: ButtonBoxProps) => {
  const { DeleteItemDialog, deleteStatus } = useDeleteItem();
  return (
    <>
      <DeleteItemDialog deleteStatus={deleteStatus} />
      <Box>
        <Stack spacing={1}>
          <ButtonNav
            path={`/cases/edit/${comment.CaseComments_CaseID}/comment/${comment.CaseComments_ID}`}
            startIcon={<EditNote />}
            size="small"
          >
            Edit
          </ButtonNav>
          <ButtonNav
            path=""
            onClick={() => deleteStatus.caseComment.handleClick(comment)}
            startIcon={<DeleteForever />}
            size="small"
          >
            Delete
          </ButtonNav>
        </Stack>
      </Box>
    </>
  );
};

const sortDescendingDate = (a: CaseComment, b: CaseComment) => {
  const dateA = new Date(a.CaseComments_CreatedDate);
  const dateB = new Date(b.CaseComments_CreatedDate);
  if (dateA < dateB) {
    return 1;
  }
  if (dateA > dateB) {
    return -1;
  }
  return 0;
};

interface PublicCheckboxProps {
  isPublic: boolean;
}
interface CaseCommentsModalProps {
  caseComments: CaseComment[];
  caseNumber?: string;
}

interface ButtonBoxProps {
  comment: CaseComment;
}

export default CaseCommentsModal;
