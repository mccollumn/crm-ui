"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { cases } from "@/mockData/cases";

export default function CaseEmails({ caseNumber }: CaseEmailsProps) {
  const router = useRouter();
  const thisCase = cases.find((item) => item.id.toString() === caseNumber);

  const columns: GridColDef[] = [
    {
      field: "subject",
      headerName: "Subject",
      renderCell: (params) => {
        return <Link href="\contacts">{params.value}</Link>;
      },
      flex: 1,
    },
    {
      field: "from",
      headerName: "From Address",
      renderCell: (params) => {
        return <Link href={`mailto:${params.value}`}>{params.value}</Link>;
      },
    },
    { field: "to", headerName: "To Adress" },
    { field: "date", headerName: "Message Date", type: "dateTime" },
    {
      field: "status",
      headerName: "Status",
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

interface CaseEmailsProps {
  caseNumber: string;
}
