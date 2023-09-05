import React from "react";
import { Title } from "../components/Title";
import { ButtonNav } from "../components/navigation/ButtonNav";
import { DataTable } from "../components/DataTable";
import { getOpenCases, getHibernatedCases, preload } from "@/app/utils/getData";
import "server-only";

const Cases = async () => {
  const casesOpenListPromise = getOpenCases();
  const casesHibernatedListPromise = getHibernatedCases();
  const [casesOpenList, casesHibernatedList] = await Promise.all([
    casesOpenListPromise,
    casesHibernatedListPromise,
  ]);

  return (
    <>
      <Title title="Cases" />
      <ButtonNav path="/cases/new">New</ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<p>Loading cases...</p>}>
          <DataTable
            rows={[...casesOpenList, ...casesHibernatedList]}
            columnDefType="casesList"
          />
        </React.Suspense>
      </div>
    </>
  );
};

export default Cases;
