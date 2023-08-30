import React from "react";
import { Title } from "../components/Title";
import { ButtonNav } from "../components/navigation/ButtonNav";
import { DataTable } from "../components/DataTable";
import { getOpenCases } from "@/app/utils/getData";
import "server-only";

const Cases = async () => {
  const casesList = await getOpenCases();

  return (
    <>
      <Title title="Cases" />
      <ButtonNav path="/cases/new">New</ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<p>Loading cases...</p>}>
          <DataTable rows={casesList} columnDefType="casesList" />
        </React.Suspense>
      </div>
    </>
  );
};

export default Cases;
