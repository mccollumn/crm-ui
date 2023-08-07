"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";
import Button from "@mui/material/Button";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Case Number",
    width: 130,
    renderCell: (params) => {
      return <Link href="\cases\view">{params.value}</Link>;
    },
  },
  { field: "subject", headerName: "Subject", width: 250 },
  { field: "account", headerName: "Account Name", width: 250 },
  {
    field: "status",
    headerName: "Status",
    width: 90,
  },
  {
    field: "opened",
    headerName: "Opened",
    description: "This column has a value getter and is not sortable.",
    width: 180,
    type: "dateTime",
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  {
    id: 735109,
    subject: "We're confused",
    account: "Kaiser",
    status: "Open",
    opened: new Date("8/2/2023 10:12 AM"),
  },
  {
    id: 744068,
    subject: "Stuff is broken",
    account: "Needy Customer",
    status: "Closed",
    opened: new Date("5/19/2021 1:40 PM"),
  },
  {
    id: 758711,
    subject: "Help!",
    account: "Cool customer",
    status: "Open",
    opened: new Date("7/17/2023 6:58 AM"),
  },
  {
    id: 721906,
    subject: "Upgrade to 9.5",
    account: "Microsoft",
    status: "Open",
    opened: new Date("8/4/2023 11:10 AM"),
  },
];

export default function DataTable() {
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
