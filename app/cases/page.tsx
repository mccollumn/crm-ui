import React from "react";
import { Title } from "../components/Title";
import { ButtonNav } from "../components/navigation/ButtonNav";
import { DataTable } from "../components/DataTable";
import {
  getOpenCases,
  getHibernatedCases,
  getCasesByOwner,
  getCasesByAccount,
} from "@/app/utils/getData";
import "server-only";

const Cases = async ({ contactID, accountID }: CasesProps) => {
  let rows = [];
  if (contactID) {
    rows = await getCasesByOwner(contactID);
  }
  if (accountID) {
    rows = await getCasesByAccount(accountID);
  }
  if (rows.length === 0) {
    const casesOpenListPromise = getOpenCases();
    const casesHibernatedListPromise = getHibernatedCases();
    const [casesOpenList, casesHibernatedList] = await Promise.all([
      casesOpenListPromise,
      casesHibernatedListPromise,
    ]);
    rows = [...casesOpenList, ...casesHibernatedList];
  }

  return (
    <>
      <Title title="Cases" />
      <ButtonNav path="/cases/new">New</ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<p>Loading cases...</p>}>
          <DataTable rows={rows} columnDefType="casesList" />
        </React.Suspense>
      </div>
    </>
  );
};

interface CasesProps {
  contactID?: string;
  accountID?: string;
}

export default Cases;
