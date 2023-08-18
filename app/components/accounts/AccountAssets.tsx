import React from "react";
import { DataTable } from "../DataTable";
import { ButtonNav } from "../ButtonNav";

const getAssets = async (accountID: string) => {
  // TODO: Retrieve license keys for provided account
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  //   return res.json();
  return [{ id: "1", licenseKey: "MOJ18-5C6RW-3PRPR-D9AIL-SIKX1" }];
};

export default async function AccountAssets({ accountID }: AccountAssetsProps) {
  const accountAssets = (await getAssets(accountID)) || [];

  return (
    <>
      <ButtonNav size="small" path={`/accounts/new/${accountID}/asset/`}>
        New
      </ButtonNav>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading assets...</p>}>
          <DataTable
            rows={accountAssets}
            columnDefType="accountAssets"
            // TODO: Update field name for account number
            queryField="id"
            queryValue={accountID}
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface AccountAssetsProps {
  accountID: string;
}
