import React from "react";
import { DataTable } from "../DataTable";
import { ButtonNav } from "../navigation/ButtonNav";
import { getAccountData } from "@/app/utils/getData";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const AccountLicenseKeys = async ({ accountID }: AccountLicenseKeysProps) => {
  const accountData = await getAccountData(accountID);
  const accountLicenseKeys = accountData?.LicenseKeys || [];

  return (
    <>
      <ButtonNav size="small" path={`/accounts/new/${accountID}/license-key/`}>
        New
      </ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<p>Loading license keys...</p>}>
          <DataTable
            rows={accountLicenseKeys}
            columnDefType="accountLicenseKeys"
            data={accountData}
          />
        </React.Suspense>
      </div>
    </>
  );
};

interface AccountLicenseKeysProps {
  accountID: string;
}

export default AccountLicenseKeys;
