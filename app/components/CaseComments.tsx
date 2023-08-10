"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckBox } from "@mui/icons-material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { ButtonNav } from "./ButtonNav";

import { cases } from "@/mockData/cases";

export default function CaseComments({ caseNumber }: CaseCommentsProps) {
  const router = useRouter();
  const thisCase = cases.find((item) => item.id.toString() === caseNumber);

  const columns: GridColDef[] = [
    {
      field: "user",
      headerName: "User",
      renderCell: (params) => {
        return <Link href="\contacts">{params.value}</Link>;
      },
    },
    {
      field: "public",
      headerName: "Public",
      renderCell: (params) => {
        let publicComment;
        if (thisCase?.comments) {
          const comment = thisCase?.comments.find(
            (comment) => comment.id === params.row.id
          );
          publicComment = comment?.public || false;
        }
        return publicComment ? <CheckBox /> : <CheckBoxOutlineBlankIcon />;
      },
    },
    { field: "createDate", headerName: "Created Date" },
    { field: "comment", headerName: "Comment", flex: 1 },
    {
      field: "editLink",
      headerName: "Edit",
      renderCell: (params) => {
        return (
          <Link href={`/cases/view/${thisCase?.id}/comment/${params.row.id}`}>
            Edit
          </Link>
        );
      },
    },
  ];

  const rows = thisCase?.comments || [];

  return (
    <div>
      <ButtonNav size="small" path={`/cases/view/${caseNumber}/comment/new`}>
        New
      </ButtonNav>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // onRowClick={() => console.log("click")}
          // checkboxSelection
        />
      </div>
    </div>
  );
}

interface CaseCommentsProps {
  caseNumber: string;
}
