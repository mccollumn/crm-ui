"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

import { cases } from "@/mockData/cases";

export default function CaseHistory({ caseNumber }: CaseHistoryProps) {
  const router = useRouter();
  const thisCase = cases.find((item) => item.id.toString() === caseNumber);

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      type: "dateTime",
    },
    {
      field: "field",
      headerName: "Field",
    },
    { field: "user", headerName: "User" },
    { field: "original", headerName: "Original Value", flex: 1 },
    {
      field: "new",
      headerName: "New Value",
      flex: 1,
    },
  ];

  const rows = thisCase?.comments || [];

  return (
    <div>
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

interface CaseHistoryProps {
  caseNumber: string;
}
