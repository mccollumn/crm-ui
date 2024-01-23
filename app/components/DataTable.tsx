"use client";

import React from "react";
import {
  DataGrid,
  GridColDef,
  GridFilterInputDate,
  GridFilterInputDateProps,
  GridFilterItem,
  GridFilterModel,
  GridFilterOperator,
  GridSortModel,
  GridToolbar,
  GridValueGetterParams,
  getGridDateOperators,
} from "@mui/x-data-grid";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  ContentCopy,
  EditNote,
  DeleteForever,
} from "@mui/icons-material";
import Link from "next/link";
import { DatePicker } from "@mui/x-date-pickers";
import DateFnsProvider from "../providers/DateFnsProvider";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import useDeleteItem from "./useDeleteItem";
import { getZonedDate } from "../utils/utils";

type columnDefTypes =
  | "casesList"
  | "caseHistory"
  | "caseEmails"
  | "caseComments"
  | "accountsList"
  | "contactsList"
  | "opportunitiesList"
  | "accountSalesOrders"
  | "accountSalesInvoices"
  | "accountLicenseKeys"
  | "accountAssets"
  | "contactHistory"
  | "opportunityQuotes"
  | "opportunityContactRoles"
  | "opportunityActivities"
  | "opportunityProducts"
  | "opportunityStages"
  | "quoteProducts"
  | "quoteFulfillment"
  | "assetSearchResults"
  | "caseCommentSearchResults";

type ColumnDefs = {
  [key: string]: GridColDef[];
};

export const DataTable = ({
  rows,
  columnDefType,
  data,
  filterModel,
  sortModel,
  ...props
}: DataTableProps) => {
  const router = useRouter();
  const { DeleteItemDialog, deleteStatus } = useDeleteItem();

  /**
   * Column def configs are here, rather than being passed down from the parent,
   * so that the parent components can be rendered server-side.
   */
  const [columnDefs, setColumnDefs] = React.useState<ColumnDefs>({
    casesList: [
      {
        field: "Cases_CaseNumber",
        headerName: "Case Number",
        width: 75,
        renderCell: (params) => {
          return (
            <Link href={`/cases/view/${params.row.Cases_ID}`}>
              {params.value}
            </Link>
          );
        },
      },
      { field: "Cases_Subject", headerName: "Subject", flex: 1 },
      {
        field: "Accounts_Name",
        headerName: "Account Name",
        flex: 1,
        renderCell: (params) => {
          return (
            <Link href={`/accounts/view/${params.row.Cases_AccountID}`}>
              {params.value}
            </Link>
          );
        },
      },
      {
        field: "Contacts_FullName",
        headerName: "Contact Name",
        flex: 1,
        renderCell: (params) => {
          return (
            <Link href={`/contacts/view/${params.row.Cases_ContactId}`}>
              {params.value}
            </Link>
          );
        },
      },
      {
        field: "Cases_Status",
        headerName: "Status",
        width: 80,
      },
      {
        field: "Cases_CreatedDate",
        headerName: "Opened",
        width: 160,
        type: "dateTime",
        valueGetter: displayDate,
      },
      {
        field: "Cases_LastModifiedDate",
        headerName: "Last Modified",
        width: 160,
        type: "dateTime",
        valueGetter: displayDate,
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
        field: "EmailMessages_Subject",
        headerName: "Subject",
        flex: 1,
      },
      {
        field: "EmailMessages_FromAddress",
        headerName: "From Address",
        width: 175,
        renderCell: (params) => {
          return <Link href={`mailto:${params.value}`}>{params.value}</Link>;
        },
      },
      { field: "to", headerName: "To Adress", width: 175 },
      {
        field: "EmailMessages_MessageDate",
        headerName: "Message Date",
        type: "dateTime",
        width: 150,
        valueGetter: displayDate,
      },
      {
        field: "EmailMessages_Status",
        headerName: "Status",
        width: 50,
      },
    ],
    caseComments: [
      {
        field: "CreatedBy_Name",
        headerName: "User",
        width: 150,
      },
      {
        field: "CaseComments_IsPublic",
        headerName: "Public",
        width: 50,
        renderCell: (params) => {
          let publicComment;
          if (data?.CaseComments.length > 0) {
            const comment = data.CaseComments.find(
              (comment: any) =>
                comment.CaseComments_ID === params.row.CaseComments_ID
            );
            publicComment = Number(comment?.CaseComments_IsPublic) || false;
          }
          return publicComment ? <CheckBox /> : <CheckBoxOutlineBlank />;
        },
      },
      {
        field: "CaseComments_CreatedDate",
        headerName: "Created Date",
        type: "dateTime",
        width: 150,
        valueGetter: displayDate,
      },
      { field: "CaseComments_CommentBody", headerName: "Comment", flex: 1 },
      {
        field: "editLink",
        headerName: "Edit",
        width: 50,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() =>
                router.push(
                  `/cases/edit/${data?.CaseInformation.Cases_ID}/comment/${params.row.CaseComments_ID}`
                )
              }
            >
              <EditNote />
            </IconButton>
          );
        },
      },
      {
        field: "deleteLink",
        headerName: "Delete",
        width: 50,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={() => deleteStatus.caseComment.handleClick(params.row)}
            >
              <DeleteForever />
            </IconButton>
          );
        },
      },
    ],
    accountsList: [
      {
        field: "Accounts_Name",
        headerName: "Account Name",
        flex: 1,
        renderCell: (params) => {
          return (
            <Link href={`/accounts/view/${params.id}`}>{params.value}</Link>
          );
        },
      },
      {
        field: "Accounts_Site",
        headerName: "Account Site",
        width: 150,
      },
      {
        field: "AccountsType_Description",
        headerName: "Type",
        width: 150,
      },
      {
        field: "AccountsAddress_BillingCountry",
        headerName: "Billing Country",
        width: 120,
      },
      {
        field: "Accounts_Super_Region",
        headerName: "Super Region",
        width: 120,
      },
    ],
    accountSalesOrders: [
      {
        field: "SalesOrders_Name",
        headerName: "Sales Order Number",
        flex: 1,
      },
      {
        field: "Account_Name",
        headerName: "Account",
        flex: 1,
        renderCell: (params) => {
          return (
            <Link href={`/accounts/view/${params.row.SalesOrders_AccountID}`}>
              {params.value}
            </Link>
          );
        },
      },
      {
        field: "SalesOrders_Date",
        headerName: "Date",
        type: "date",
        width: 150,
        valueGetter: displayDate,
      },
      {
        field: "SalesOrders_DocumentNumber",
        headerName: "Document Number",
        width: 150,
      },
      {
        field: "SalesOrders_DocumentType",
        headerName: "Document Type",
      },
      {
        field: "SalesOrders_IsChannel",
        headerName: "Is Channel",
        type: "boolean",
        renderCell: (params) => {
          return params.value === "0" ? <CheckBoxOutlineBlank /> : <CheckBox />;
        },
      },
      {
        field: "Quotes_Name",
        headerName: "Quote",
        width: 150,
      },
      {
        field: "SalesOrders_Total",
        headerName: "Total",
        type: "number",
        valueFormatter: (params) => `$${Number(params.value).toLocaleString()}`,
      },
      {
        field: "editLink",
        headerName: "Edit",
        width: 50,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() =>
                router.push(
                  `/accounts/edit/${data?.id}/sales-order/${params.row.id}`
                )
              }
            >
              <EditNote />
            </IconButton>
          );
        },
      },
    ],
    accountSalesInvoices: [
      {
        field: "invoiceName",
        headerName: "Sales Invoice Name",
        flex: 1,
      },
      {
        field: "accountName",
        headerName: "Account",
      },
      {
        field: "date",
        headerName: "Date",
      },
      {
        field: "docNumber",
        headerName: "Document Number",
      },
      {
        field: "terms",
        headerName: "Terms",
      },
      {
        field: "total",
        headerName: "Total",
      },
      {
        field: "status",
        headerName: "Payment Status",
      },
      {
        field: "editLink",
        headerName: "Edit",
        width: 50,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() =>
                router.push(
                  `/accounts/edit/${data?.id}/sales-invoice/${params.row.id}`
                )
              }
            >
              <EditNote />
            </IconButton>
          );
        },
      },
    ],
    accountAssets: [
      {
        field: "Assets_Name",
        headerName: "Asset Name",
        flex: 1,
      },
      {
        field: "Assets_SerialNumber",
        headerName: "Serial Number",
        width: 250,
      },
      {
        field: "Assets_SupportPlanEnd",
        headerName: "Support Plan End",
        type: "date",
        valueGetter: displayDate,
      },
      {
        field: "Assets_SupportPlanType",
        headerName: "Support Plan Type",
      },
      {
        field: "Assets_Quantity",
        headerName: "Quantity",
      },
      {
        field: "Assets_PageViews",
        headerName: "Page Views",
        valueFormatter: (params) => Number(params.value).toLocaleString(),
      },
      {
        field: "Assets_Status",
        headerName: "Status",
      },
      {
        field: "editLink",
        headerName: "Edit",
        width: 50,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() =>
                router.push(
                  `/accounts/edit/${data.AccountDetail.Accounts_AccountID}/asset/${params.id}`
                )
              }
            >
              <EditNote />
            </IconButton>
          );
        },
      },
    ],
    accountLicenseKeys: [
      {
        field: "LicenseKeys_Name",
        headerName: "License Key",
        flex: 1,
      },
      { field: "LicenseKeys_KeyType", headerName: "Type" },
      { field: "LicenseKeys_Status", headerName: "Status" },
      {
        field: "LicenseKeys_PageViews",
        headerName: "Page Views",
        valueFormatter: (params) => Number(params.value).toLocaleString(),
      },
      {
        field: "LicenseKeys_MostRecentActivatedVersion",
        headerName: "Activated Version",
      },
      {
        field: "LicenseKeys_AnniversaryDate",
        headerName: "Anniversary Date",
        type: "date",
        valueGetter: displayDate,
      },
      { field: "LicenseKeys_SystemStatus", headerName: "System Status" },
      {
        field: "LicenseKeys_KeyCreatedDate",
        headerName: "Creation Date",
        type: "date",
        valueGetter: displayDate,
      },
      { field: "LicenseKeys_ParentKey", headerName: "Parent Key", width: 250 },
      {
        field: "editLink",
        headerName: "Edit",
        width: 50,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() =>
                router.push(
                  `/accounts/edit/${data.AccountDetail.Accounts_AccountID}/license-key/${params.id}`
                )
              }
            >
              <EditNote />
            </IconButton>
          );
        },
      },
    ],
    contactsList: [
      {
        field: "Contacts_Name",
        headerName: "Name",
        flex: 1,
        renderCell: (params) => {
          return (
            <Link href={`/contacts/view/${params.id}`}>{params.value}</Link>
          );
        },
      },
      {
        field: "Contacts_Title",
        headerName: "Title",
        flex: 1,
      },
      {
        field: "Accounts_Name",
        headerName: "Account Name",
        flex: 1,
        renderCell: (params) => {
          return (
            <Link href={`/accounts/view/${params.row.Contacts_AccountId}`}>
              {params.value}
            </Link>
          );
        },
      },
      {
        field: "Contacts_Email",
        headerName: "Email",
        width: 200,
        renderCell: (params) => {
          return <Link href={`mailto:${params.value}`}>{params.value}</Link>;
        },
      },
      {
        field: "Contacts_CreatedDate",
        headerName: "Created",
        width: 75,
        type: "date",
        valueGetter: displayDate,
      },
      {
        field: "Contacts_LastActivityDate",
        headerName: "Last Activity",
        width: 75,
        type: "date",
        valueGetter: displayDate,
      },
    ],
    contactHistory: [
      {
        field: "date",
        headerName: "Date",
        flex: 1,
      },
      {
        field: "field",
        headerName: "Field",
      },
      {
        field: "user",
        headerName: "User",
      },
      {
        field: "originalValue",
        headerName: "Original Value",
      },
      {
        field: "newValue",
        headerName: "New Value",
      },
    ],
    opportunitiesList: [
      {
        field: "Opportunities_Name",
        headerName: "Opportunity Name",
        flex: 1,
        renderCell: (params) => {
          return (
            <Link href={`/opportunities/view/${params.id}`}>
              {params.value}
            </Link>
          );
        },
      },
      {
        field: "Account_Name",
        headerName: "Account Name",
        flex: 1,
        renderCell: (params) => {
          return (
            <Link href={`/accounts/view/${params.row.Opportunities_AccountId}`}>
              {params.value}
            </Link>
          );
        },
      },
      {
        field: "Opportunities_StageName",
        headerName: "Stage",
        width: 150,
      },
      {
        field: "Opportunities_Amount",
        headerName: "Amount",
        type: "number",
        valueFormatter: (params) => `$${Number(params.value).toLocaleString()}`,
      },
      {
        field: "Opportunities_ForecastStatus",
        headerName: "Forecast Status",
      },
      {
        field: "Opportunities_CloseDate",
        headerName: "Close Date",
        type: "date",
        valueGetter: displayDate,
      },
      {
        field: "Opportunities_OpportunityType",
        headerName: "Opportunity Type",
      },
      {
        field: "Opportunities_ProductFamily",
        headerName: "Product",
      },
    ],
    opportunityQuotes: [
      {
        field: "Quotes_Name",
        headerName: "Quote ID",
        flex: 1,
        renderCell: (params) => {
          return (
            <Link
              href={`/opportunities/view/${data.OpportunityDetail.Opportunities_ID}/quote/${params.id}`}
            >
              {params.value}
            </Link>
          );
        },
      },
      {
        field: "Quotes_Status",
        headerName: "Status",
        width: 175,
      },
      {
        field: "Quotes_CurrencyCode",
        headerName: "Currency Code",
      },
      {
        field: "Quotes_TotalPrice",
        headerName: "Total Price",
        type: "number",
        valueFormatter: (params) => `$${Number(params.value).toLocaleString()}`,
      },
      {
        field: "Quotes_USDTotalPrice",
        headerName: "USD Total Price",
        type: "number",
        valueFormatter: (params) => `$${Number(params.value).toLocaleString()}`,
      },
      {
        field: "Quotes_ValidThrough",
        headerName: "Valid Through",
        type: "date",
        valueGetter: displayDate,
      },
      {
        field: "Quotes_USDTotalOneYearAmount",
        headerName: "USD Total One Year Amount",
        width: 175,
        type: "number",
        valueFormatter: (params) => `$${Number(params.value).toLocaleString()}`,
      },
      {
        field: "Quotes_Primary",
        headerName: "Primary",
        width: 50,
        renderCell: (params) => {
          return params.value === "0" ? <CheckBoxOutlineBlank /> : <CheckBox />;
        },
      },
      {
        field: "editLink",
        headerName: "Edit",
        width: 50,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() =>
                router.push(
                  `/opportunities/edit/${data?.OpportunityDetail.Opportunities_ID}/quote/${params.id}`
                )
              }
            >
              <EditNote />
            </IconButton>
          );
        },
      },
      {
        field: "copyLink",
        headerName: "Copy",
        width: 50,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <IconButton
              aria-label="copy"
              color="primary"
              onClick={() =>
                router.push(
                  `/opportunities/clone/${data?.OpportunityDetail.Opportunities_ID}/quote/${params.row.Quotes_ID}`
                )
              }
            >
              <ContentCopy />
            </IconButton>
          );
        },
      },
    ],
    opportunityContactRoles: [
      {
        field: "Contacts_Name",
        headerName: "Contact Name",
        flex: 1,
        renderCell: (params) => {
          return (
            <Link href={`/contacts/view/${params.id}`}>{params.value}</Link>
          );
        },
      },
      {
        field: "OpportunityContactRoles_Role",
        headerName: "Role",
        width: 200,
      },
      {
        field: "OpportunityContactRoles_IsPrimary",
        headerName: "Primary",
        renderCell: (params) => {
          return params.value === "0" ? <CheckBoxOutlineBlank /> : <CheckBox />;
        },
      },
      {
        field: "Contacts_Phone",
        headerName: "Phone",
        width: 150,
      },
      {
        field: "Contacts_Email",
        headerName: "Email",
        width: 200,
      },
      {
        field: "editLink",
        headerName: "Edit",
        width: 50,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() =>
                router.push(
                  `/opportunities/edit/${data?.OpportunityDetail.Opportunities_ID}/contact-role/${params.id}`
                )
              }
            >
              <EditNote />
            </IconButton>
          );
        },
      },
    ],
    opportunityActivities: [
      {
        field: "subject",
        headerName: "Subject",
        flex: 1,
        renderCell: (params) => {
          return (
            <Link
              href={`/opportunities/view/${data.id}/activity/${params.row.id}`}
            >
              {params.value}
            </Link>
          );
        },
      },
      {
        field: "name",
        headerName: "Name",
      },
      {
        field: "task",
        headerName: "Task",
      },
      {
        field: "dueDate",
        headerName: "Due Date",
      },
      {
        field: "statud",
        headerName: "Status",
      },
      {
        field: "priority",
        headerName: "Priority",
      },
      {
        field: "assignedTo",
        headerName: "Assigned To",
      },
      {
        field: "editLink",
        headerName: "Edit",
        width: 50,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() =>
                router.push(
                  `/opportunities/edit/${data?.id}/activity/${params.row.id}`
                )
              }
            >
              <EditNote />
            </IconButton>
          );
        },
      },
    ],
    opportunityProducts: [
      {
        field: "Product_Name",
        headerName: "Product",
        flex: 1,
      },
      {
        field: "OpportunityLineItems_ProductCode",
        headerName: "Product Code",
        width: 200,
      },
      {
        field: "OpportunityLineItems_Quantity",
        headerName: "Quantity",
        type: "number",
      },
      {
        field: "OpportunityLineItems_Discount",
        headerName: "Discount",
        type: "number",
        valueFormatter: (params) => `${Number(params.value).toLocaleString()}%`,
      },
      {
        field: "OpportunityLineItems_UnitPrice",
        headerName: "Sales Price",
        type: "number",
        valueFormatter: (params) => `$${Number(params.value).toLocaleString()}`,
      },
      {
        field: "OpportunityLineItems_TotalPrice",
        headerName: "Total Price",
        type: "number",
        valueFormatter: (params) => `$${Number(params.value).toLocaleString()}`,
      },
      {
        field: "editLink",
        headerName: "Edit",
        width: 50,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() =>
                router.push(
                  `/opportunities/edit/${data?.OpportunityDetail.Opportunities_ID}/product/${params.id}`
                )
              }
            >
              <EditNote />
            </IconButton>
          );
        },
      },
    ],
    opportunityStages: [
      {
        field: "stage",
        headerName: "Stage",
        flex: 1,
      },
      {
        field: "amount",
        headerName: "Amount",
      },
      {
        field: "probability",
        headerName: "Probability (%)",
      },
      {
        field: "expectedRevenue",
        headerName: "Expected Revenue",
      },
      {
        field: "closeDate",
        headerName: "Close Date",
      },
      {
        field: "lastModifiedBy",
        headerName: "Last Modified By",
      },
      {
        field: "lastModified",
        headerName: "Last Modified",
      },
    ],
    quoteProducts: [
      {
        field: "QuoteProducts_Name",
        headerName: "Line Item ID",
      },
      {
        field: "QuoteProducts_ProductCode",
        headerName: "Product Code",
        width: 150,
      },
      {
        field: "Product2_Name",
        headerName: "Product",
        flex: 1,
      },
      {
        field: "QuoteProducts_SaleType",
        headerName: "Sale Type",
      },
      {
        field: "QuoteProducts_Quantity",
        headerName: "Quantity",
      },
      {
        field: "QuoteProducts_UOM",
        headerName: "UOM",
        width: 50,
      },
      {
        field: "QuoteProducts_UnitListPrice",
        headerName: "Unit List Price",
        type: "number",
        valueFormatter: (params) => `$${Number(params.value).toLocaleString()}`,
      },
      {
        field: "QuoteProducts_Discount",
        headerName: "Discount",
        type: "number",
        valueFormatter: (params) => `${Number(params.value).toLocaleString()}%`,
      },
      {
        field: "QuoteProducts_TotalSalePrice",
        headerName: "Total Sales Price",
        type: "number",
        valueFormatter: (params) => `$${Number(params.value).toLocaleString()}`,
      },
      {
        field: "QuoteProducts_Term",
        headerName: "Term",
        width: 50,
      },
      {
        field: "QuoteProducts_EndDate",
        headerName: "End Date",
        type: "date",
        valueGetter: displayDate,
      },
      {
        field: "QuoteProducts_SKUGroup",
        headerName: "SKU Group",
        width: 150,
      },
      {
        field: "QuoteProducts_ProductFamily",
        headerName: "Product Family",
      },
      {
        field: "editLink",
        headerName: "Edit",
        width: 50,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() =>
                router.push(
                  `/opportunities/edit/${data?.OpportunityDetail.Opportunities_ID}/quote/${params.row.QuoteProducts_QuoteID}/product/${params.id}`
                )
              }
            >
              <EditNote />
            </IconButton>
          );
        },
      },
      {
        field: "copyLink",
        headerName: "Copy",
        width: 50,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <IconButton
              aria-label="copy"
              color="primary"
              onClick={() =>
                router.push(
                  `/opportunities/clone/${data?.OpportunityDetail.Opportunities_ID}/quote/${params.row.QuoteProducts_QuoteID}/product/${params.id}`
                )
              }
            >
              <ContentCopy />
            </IconButton>
          );
        },
      },
      {
        field: "deleteLink",
        headerName: "Delete",
        width: 50,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={() => deleteStatus.quoteProduct.handleClick(params.row)}
            >
              <DeleteForever />
            </IconButton>
          );
        },
      },
    ],
    quoteFulfillment: [
      {
        field: "QuoteFulfillment_Name",
        headerName: "Fulfillment Name",
        flex: 1,
      },
      {
        field: "QuoteFulfillment_LicenseKeyID",
        headerName: "License Key",
        flex: 1,
        valueFormatter(params) {
          return data?.LicenseKeyDetail?.LicenseKeys_Name || "";
        },
      },
      {
        field: "QuoteFulfillment_FulfillmentDate",
        headerName: "Fulfillment Date",
        type: "date",
        valueGetter: displayDate,
      },
      {
        field: "editLink",
        headerName: "Edit",
        width: 50,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          return (
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() =>
                router.push(
                  `/opportunities/edit/${data?.QuoteDetail.Quotes_OpportunityID}/quote/${data.QuoteDetail.Quotes_ID}/fulfillment/${params.id}`
                )
              }
            >
              <EditNote />
            </IconButton>
          );
        },
      },
    ],
    assetSearchResults: [
      {
        field: "Accounts_Name",
        headerName: "Account Name",
        renderCell: (params) => {
          return (
            <Link href={`/accounts/view/${params.row.Assets_AccountID}`}>
              {params.value}
            </Link>
          );
        },
        flex: 1,
      },
      {
        field: "Assets_Name",
        headerName: "Asset Name",
        flex: 1,
      },
      {
        field: "Assets_SerialNumber",
        headerName: "Serial Number",
        flex: 1,
      },
    ],
    caseCommentSearchResults: [
      {
        field: "CaseComments_CaseID",
        headerName: "Case Number",
        renderCell: (params) => {
          return (
            <Link href={`/cases/view/${params.row.CaseComments_CaseID}`}>
              {params.value}
            </Link>
          );
        },
      },
      { field: "CaseComments_CommentBody", headerName: "Comment", flex: 1 },
      { field: "Owner_Name", headerName: "Owner" },
      {
        field: "CaseComments_CreatedDate",
        headerName: "Created Date",
        type: "dateTime",
        width: 150,
        valueGetter: displayDate,
      },
    ],
  });

  const rowIDs = {
    casesList: "Cases_ID",
    caseHistory: "",
    caseEmails: "EmailMessages_ID",
    caseComments: "CaseComments_ID",
    accountsList: "Accounts_AccountID",
    contactsList: "Contacts_ID",
    opportunitiesList: "Opportunities_ID",
    accountSalesOrders: "SalesOrders_ID",
    accountSalesInvoices: "",
    accountLicenseKeys: "LicenseKeys_ID",
    accountAssets: "Assets_ID",
    contactHistory: "",
    opportunityQuotes: "Quotes_ID",
    opportunityContactRoles: "OpportunityContactRoles_ID",
    opportunityActivities: "",
    opportunityProducts: "OpportunityLineItems_ID",
    opportunityStages: "",
    quoteProducts: "QuoteProducts_ID",
    quoteFulfillment: "QuoteFulfillment_ID",
    assetSearchResults: "Assets_ID",
    caseCommentSearchResults: "CaseComments_ID",
  };

  const columns = React.useMemo(
    () =>
      columnDefs[columnDefType].map((col) => {
        const dateOperators = getGridDateOperators();
        return col.type === "date"
          ? {
              ...col,
              filterOperators: [...dateOperators, datesBetweenOperator],
            }
          : col;
      }),
    [columnDefType, columnDefs]
  );

  React.useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <>
      <DeleteItemDialog deleteStatus={deleteStatus} />
      <DataGrid
        rows={rows}
        columns={columnDefs[columnDefType]}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            csvOptions: { fileName: columnDefType },
          },
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          filter: {
            ...(filterModel && { filterModel: filterModel }),
          },
          sorting: {
            ...(sortModel && { sortModel: sortModel }),
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        getRowId={(row) => row[rowIDs[columnDefType]]}
        {...props}
        autoHeight
      />
    </>
  );
};

// TODO: This component will need to be completed for date range filtering.
// Only DataGrid Pro allows multiple filters.
// https://mui.com/x/react-data-grid/filtering/customization/#multiple-values-operator
const InputDates = (props: GridFilterInputDateProps) => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "end",
        height: 48,
        pl: "20px",
      }}
    >
      <DateFnsProvider>
        <DatePicker label="Start" />
        <DatePicker label="End" />
      </DateFnsProvider>
    </Box>
  );
};

const datesBetweenOperator: GridFilterOperator = {
  label: "is between",
  value: "between",
  getApplyFilterFn: (filterItem: GridFilterItem) => {
    if (!Array.isArray(filterItem.value) || filterItem.value.length !== 2) {
      return null;
    }
    if (filterItem.value[0] == null || filterItem.value[1] == null) {
      return null;
    }

    return ({ value }) => {
      return (
        value !== null &&
        filterItem.value[0] <= value &&
        value <= filterItem.value[1]
      );
    };
  },
  InputComponent: GridFilterInputDate,
  InputComponentProps: { type: "date" },
};

const displayDate = (params: GridValueGetterParams) => {
  if (!params.value) return null;
  return getZonedDate(params.value);
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
  /**
   * MUI Data Grid filter model that will be used to initialize the grid.
   * https://mui.com/x/react-data-grid/filtering/#pass-filters-to-the-data-grid
   */
  filterModel?: GridFilterModel;
  /**
   * MUI Data Grid sort model that will be used to initialize the grid.
   * https://mui.com/x/react-data-grid/sorting/#pass-sorting-rules-to-the-data-grid
   */
  sortModel?: GridSortModel;
  /**
   * All other props
   */
  [key: string]: any;
}
