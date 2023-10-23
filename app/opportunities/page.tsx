import * as React from "react";
import { Title } from "../components/Title";
import { ButtonNav } from "../components/navigation/ButtonNav";
import { DataTable } from "../components/DataTable";
import {
  getOpenOpportunitiesByAccount,
  getOpenOpportunities,
  getWonOpportunitiesByAccount,
  getDeadOpportunitiesByAccount,
  getWonOpportunities,
  getDeadOpportunities,
} from "../utils/getData";
import "server-only";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Opportunities({
  accountID,
  noTitle = false,
}: OpportunitiesProps) {
  let openOpportunitiesPromise;
  let wonOpportunitiesPromise;
  let deadOpportunitiesPromise;
  if (accountID) {
    openOpportunitiesPromise = getOpenOpportunitiesByAccount(accountID);
    wonOpportunitiesPromise = getWonOpportunitiesByAccount(accountID);
    deadOpportunitiesPromise = getDeadOpportunitiesByAccount(accountID);
  } else {
    openOpportunitiesPromise = getOpenOpportunities();
    wonOpportunitiesPromise = getWonOpportunities();
    deadOpportunitiesPromise = getDeadOpportunities();
  }
  const [openOpportunities, wonOpportunities, deadOpportunities] =
    await Promise.all([
      openOpportunitiesPromise,
      wonOpportunitiesPromise,
      deadOpportunitiesPromise,
    ]);
  const opportunitiesList = [
    ...openOpportunities,
    ...wonOpportunities,
    ...deadOpportunities,
  ];

  return (
    <>
      {!noTitle && <Title title="Opportunities" />}
      <ButtonNav path="/opportunities/new">New</ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<p>Loading opportunities...</p>}>
          <DataTable
            rows={opportunitiesList}
            columnDefType="opportunitiesList"
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface OpportunitiesProps {
  accountID?: string;
  noTitle?: boolean;
}
