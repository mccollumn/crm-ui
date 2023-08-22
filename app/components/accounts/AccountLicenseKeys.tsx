import React from "react";
import { DataTable } from "../DataTable";
import { ButtonNav } from "../navigation/ButtonNav";

const getLicenseKeys = async (accountID: string) => {
  // TODO: Retrieve license keys for provided account
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  //   return res.json();
  return [{ id: "1", licenseKey: "MOJ18-5C6RW-3PRPR-D9AIL-SIKX1" }];
};

export default async function AccountLicenseKeys({
  accountID,
}: AccountLicenseKeysProps) {
  const accountLicenseKeys = (await getLicenseKeys(accountID)) || [];

  return (
    <>
      <ButtonNav size="small" path={`/accounts/new/${accountID}/license-key/`}>
        New
      </ButtonNav>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading license keys...</p>}>
          <DataTable
            rows={accountLicenseKeys}
            columnDefType="accountLicenseKeys"
            // TODO: Update field name for account number
            queryField="id"
            queryValue={accountID}
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface AccountLicenseKeysProps {
  accountID: string;
}
