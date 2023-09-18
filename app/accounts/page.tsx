import * as React from "react";
import { Title } from "../components/Title";
import { ButtonNav } from "../components/navigation/ButtonNav";
import { DataTable } from "../components/DataTable";
import { getAccounts } from "@/app/utils/getData";
import "server-only";

const Accounts = async () => {
  const accountsList = await getAccounts();

  return (
    <>
      <Title title="Accounts" />
      <ButtonNav path="/accounts/new">New</ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<p>Loading accounts...</p>}>
          <DataTable rows={accountsList} columnDefType="accountsList" />
        </React.Suspense>
      </div>
    </>
  );
};

export default Accounts;
