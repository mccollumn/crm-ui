"use client";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { CheckBox } from "@mui/icons-material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Link from "next/link";
import React from "react";

type columnDefTypes =
  | "casesList"
  | "caseHistory"
  | "caseEmails"
  | "caseComments";

type ColumnDefs = {
  [key: string]: GridColDef[];
};

export const DataTable = ({
  rows,
  columnDefType,
  data,
  ...props
}: DataTableProps) => {
  /**
   * Column def configs are here, rather than being passed down from the parent, because MUI doesn't support server components yet.
   * Defining them here allows the parent to be a server component and fetch data server-side.
   * https://mui.com/material-ui/guides/next-js-app-router/
   */
  const [columnDefs, setColumnDefs] = React.useState<ColumnDefs>({
    casesList: [
      {
        field: "id",
        headerName: "Case Number",
        width: 130,
        renderCell: (params) => {
          return (
            <Link href={`/cases/view/${params.value}`}>{params.value}</Link>
          );
        },
      },
      { field: "subject", headerName: "Subject", flex: 1 },
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
        valueGetter: (params: GridValueGetterParams) => new Date(params.value),
      },
    ],
    caseHistory: [
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
    ],
    caseEmails: [
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
    ],
    caseComments: [
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
          if (data?.comments) {
            const comment = data?.comments.find(
              (comment: any) => comment.id === params.row.id
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
            <Link href={`/cases/edit/${data?.id}/comment/${params.row.id}`}>
              Edit
            </Link>
          );
        },
      },
    ],
  });

  return (
    <DataGrid
      rows={rows}
      columns={columnDefs[columnDefType]}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      //   paginationMode="server"
      {...props}
    />
  );
};

interface DataTableProps {
  /**
   * DataGrid row data
   */
  rows: any[];
  /**
   * Column definitions to use
   */
  columnDefType: columnDefTypes;
  /**
   * Additional data needed to render the DataGrid
   * e.g. case data for custom cell renders
   */
  data?: any;
}
