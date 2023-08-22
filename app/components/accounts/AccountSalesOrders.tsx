import React from "react";
import { DataTable } from "../DataTable";
import { ButtonNav } from "../navigation/ButtonNav";

const getSalesOrders = async (accountID: string) => {
  // TODO: Retrieve sales orders for provided account
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function AccountSalesOrders({
  accountID,
}: AccountSalesOrdersProps) {
  const accountSalesOrders = (await getSalesOrders(accountID)) || [];

  return (
    <>
      <ButtonNav size="small" path={`/accounts/new/${accountID}/sales-order/`}>
        New
      </ButtonNav>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading sales orders...</p>}>
          <DataTable
            rows={accountSalesOrders}
            columnDefType="accountSalesOrders"
            // TODO: Update field name for account number
            queryField="id"
            queryValue={accountID}
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface AccountSalesOrdersProps {
  accountID: string;
}
