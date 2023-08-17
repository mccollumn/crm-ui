import React from "react";
import { DataTable } from "../DataTable";

const getOpportunityProducts = async (opportunityID: string) => {
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function OpportunityProducts({
  opportunityID,
}: OpportunityProductsProps) {
  const opportunityProducts = await getOpportunityProducts(opportunityID);

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading products...</p>}>
          <DataTable
            rows={opportunityProducts}
            columnDefType="opportunityProducts"
            // TODO: Update field name for opportunity number
            queryField="id"
            queryValue={opportunityID}
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface OpportunityProductsProps {
  opportunityID: string;
}
