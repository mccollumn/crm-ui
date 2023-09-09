import React from "react";
import { DataTable } from "../DataTable";
import { ButtonNav } from "../navigation/ButtonNav";
import { getAccountData } from "@/app/utils/getData";

const AccountAssets = async ({ accountID }: AccountAssetsProps) => {
  const accountData = await getAccountData(accountID);
  const accountAssets = accountData?.Assets || [];

  return (
    <>
      <ButtonNav size="small" path={`/accounts/new/${accountID}/asset/`}>
        New
      </ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<p>Loading assets...</p>}>
          <DataTable rows={accountAssets} columnDefType="accountAssets" />
        </React.Suspense>
      </div>
    </>
  );
};

interface AccountAssetsProps {
  accountID: string;
}

export default AccountAssets;
