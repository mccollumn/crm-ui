import React from "react";
import { DataTable } from "../DataTable";
import { ButtonNav } from "../navigation/ButtonNav";
import { getSalesOrdersByAccount } from "@/app/utils/getData";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function AccountSalesOrders({
  accountID,
}: AccountSalesOrdersProps) {
  const accountSalesOrders = await getSalesOrdersByAccount(accountID);

  return (
    <>
      <ButtonNav size="small" path={`/accounts/new/${accountID}/sales-order/`}>
        New
      </ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<p>Loading sales orders...</p>}>
          <DataTable
            rows={accountSalesOrders}
            columnDefType="accountSalesOrders"
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface AccountSalesOrdersProps {
  accountID: string;
}
