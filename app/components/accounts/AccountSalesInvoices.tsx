import React from "react";
import { DataTable } from "../DataTable";
import { ButtonNav } from "../navigation/ButtonNav";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const getSalesInvoices = async (accountID: string) => {
  // TODO: Retrieve sales invoices for provided account
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function AccountSalesInvoices({
  accountID,
}: AccountSalesInvoicesProps) {
  const accountSalesInvoices = (await getSalesInvoices(accountID)) || [];

  return (
    <>
      <ButtonNav
        size="small"
        path={`/accounts/new/${accountID}/sales-invoice/`}
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
            queryValue={accountID}
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface AccountSalesInvoicesProps {
  accountID: string;
}
