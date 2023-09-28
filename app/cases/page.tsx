import React from "react";
import { Title } from "../components/Title";
import { ButtonNav } from "../components/navigation/ButtonNav";
import { DataTable } from "../components/DataTable";
import {
  getOpenCases,
  getHibernatedCases,
  getCasesByOwner,
  getCasesByAccount,
  getCasesByContact,
} from "@/app/utils/getData";
import "server-only";

const Cases = async ({
  ownerID,
  accountID,
  contactID,
  noTitle = false,
}: CasesProps) => {
  const rows = await getRows(ownerID, accountID, contactID);

  return (
    <>
      {!noTitle && <Title title="Cases" />}
      <ButtonNav path="/cases/new">New</ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<p>Loading cases...</p>}>
          <DataTable rows={rows} columnDefType="casesList" />
        </React.Suspense>
      </div>
    </>
  );
};

const getRows = async (
  ownerID?: string,
  accountID?: string,
  contactID?: string
) => {
  if (ownerID) {
    return await getCasesByOwner(ownerID);
  }
  if (accountID) {
    return await getCasesByAccount(accountID);
  }
  if (contactID) {
    return await getCasesByContact(contactID);
  }
  const casesOpenListPromise = getOpenCases();
  const casesHibernatedListPromise = getHibernatedCases();
  const [casesOpenList, casesHibernatedList] = await Promise.all([
    casesOpenListPromise,
    casesHibernatedListPromise,
  ]);
  return [...casesOpenList, ...casesHibernatedList];
};

interface CasesProps {
  ownerID?: string;
  accountID?: string;
  contactID?: string;
  noTitle?: boolean;
}

export default Cases;
