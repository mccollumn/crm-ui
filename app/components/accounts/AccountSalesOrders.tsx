import React from "react";
import { DataTable } from "../DataTable";
import { ButtonNav } from "../ButtonNav";

const getSalesOrders = async (accountNumber: string) => {
  // TODO: Retrieve sales orders for provided account
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function AccountSalesOrders({
  accountNumber,
}: AccountSalesOrdersProps) {
  const accountSalesOrders = (await getSalesOrders(accountNumber)) || [];

  return (
    <>
      <ButtonNav
        size="small"
        path={`/accounts/new/${accountNumber}/sales-order/`}
      >
        New
      </ButtonNav>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading sales orders...</p>}>
          <DataTable
            rows={accountSalesOrders}
            columnDefType="accountSalesOrders"
            // TODO: Update field name for account number
            queryField="id"
            queryValue={accountNumber}
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface AccountSalesOrdersProps {
  accountNumber: string;
}
