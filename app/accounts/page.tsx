import * as React from "react";
import { Title } from "../components/Title";
import { ButtonNav } from "../components/ButtonNav";
import { DataTable } from "../components/DataTable";
import "server-only";

const getAccounts = async () => {
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // return res.json();
  return [{ id: "1", accountName: "Some account" }];
};

export default async function Accounts() {
  const accountsList = await getAccounts();

  return (
    <>
      <Title title="Accounts" />
      <ButtonNav path="/accounts/new">New</ButtonNav>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading accounts...</p>}>
          <DataTable rows={accountsList} columnDefType="accountsList" />
        </React.Suspense>
      </div>
    </>
  );
}
