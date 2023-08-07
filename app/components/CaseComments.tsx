"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";
import Button from "@mui/material/Button";
import { CheckBox } from "@mui/icons-material";

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
      return <CheckBox />;
    },
  },
  { field: "createDate", headerName: "Created Date" },
  { field: "comment", headerName: "Comment", flex: 1 },
  {
    field: "editLink",
    headerName: "Edit",
    renderCell: (params) => {
      return <Link href="\cases\edit_comment">Edit</Link>;
    },
  },
];

const rows = [
  {
    id: 1,
    user: "Nick",
    public: "",
    createDate: new Date(),
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    id: 2,
    user: "Nick",
    public: "",
    createDate: new Date(),
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
];

export default function CaseComments() {
  return (
    <div>
      <Button variant="contained" size="small" sx={{ m: 1 }}>
        New
      </Button>
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
          onRowClick={() => console.log("click")}
          // checkboxSelection
        />
      </div>
    </div>
  );
}
