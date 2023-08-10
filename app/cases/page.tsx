"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

import { cases } from "../../mockData/cases";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Case Number",
    width: 130,
    renderCell: (params) => {
      return <Link href={`/cases/view/${params.value}`}>{params.value}</Link>;
    },
  },
  { field: "subject", headerName: "Subject", width: 250 },
  { field: "accountName", headerName: "Account Name", width: 250 },
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
    valueGetter: (params: GridValueGetterParams) => new Date(params.value),
  },
];

const rows = cases;

export default function DataTable() {
  const router = useRouter();

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        sx={{ m: 1 }}
        onClick={() => router.push("/cases/new")}
      >
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
          paginationMode="server"
          // onRowClick={() => console.log("click")}
          // checkboxSelection
        />
      </div>
    </div>
  );
}
