import * as React from "react";
import { Title } from "../components/Title";
import { ButtonNav } from "../components/navigation/ButtonNav";
import { DataTable } from "../components/DataTable";
import { getAccounts } from "@/app/utils/getData";
import "server-only";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const Accounts = async ({ noTitle = false }) => {
  const accountsList = await getAccounts();

  return (
    <>
      {!noTitle && <Title title="Accounts" />}
      <ButtonNav path="/accounts/new">New</ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<>Loading accounts...</>}>
          <DataTable
            rows={accountsList}
            columnDefType="accountsList"
            filterModel={{
              items: [
                {
                  field: "AccountsType_Description",
                  operator: "equals",
                  value: "Customer",
                },
              ],
            }}
          />
        </React.Suspense>
      </div>
    </>
  );
};

export default Accounts;
