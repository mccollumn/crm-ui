import React from "react";
import { DataTable } from "../DataTable";
import { ButtonNav } from "../ButtonNav";

const getSalesInvoices = async (accountNumber: string) => {
  // TODO: Retrieve sales invoices for provided account
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function AccountSalesInvoices({
  accountNumber,
}: AccountSalesInvoicesProps) {
  const accountSalesInvoices = (await getSalesInvoices(accountNumber)) || [];

  return (
    <>
      <ButtonNav
        size="small"
        path={`/accounts/new/${accountNumber}/sales-invoice/`}
      >
        New
      </ButtonNav>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading sales invoices...</p>}>
          <DataTable
            rows={accountSalesInvoices}
            columnDefType="accountSalesInvoices"
            // TODO: Update field name for account number
            queryField="id"
            queryValue={accountNumber}
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface AccountSalesInvoicesProps {
  accountNumber: string;
}
