import React from "react";
import { Typography } from "@mui/material";
import AccountResults from "../components/search/AccountResults";
import CaseResults from "../components/search/CaseResults";
import CaseCommentResults from "../components/search/CaseCommentResults";
import Loading from "../loading";
import ContactResults from "../components/search/ContactResults";
import OpportunityResults from "../components/search/OpportunityResults";
import AssetResults from "../components/search/AssetResults";

const SearchResults = async ({
  searchParams,
}: {
  searchParams: { q: string; category: string };
}) => {
  const query = searchParams.q;
  const category = searchParams.category;

  return (
    <>
      <Typography>
        Search results for <strong>&quot;{query}&quot;</strong> in{" "}
        <strong>{category}</strong>
      </Typography>
      {category === "accounts" && (
        <React.Suspense fallback={<Loading label="accounts" />}>
          <AccountResults query={query} />
        </React.Suspense>
      )}
      {category === "cases" && (
        <React.Suspense fallback={<Loading label="cases" />}>
          <CaseResults query={query} />
        </React.Suspense>
      )}
      {category === "comments" && (
        <React.Suspense fallback={<Loading label="case comments" />}>
          <CaseCommentResults query={query} />
        </React.Suspense>
      )}
      {category === "contacts" && (
        <React.Suspense fallback={<Loading label="contacts" />}>
          <ContactResults query={query} />
        </React.Suspense>
      )}
      {category === "opportunities" && (
        <React.Suspense fallback={<Loading label="opportunities" />}>
          <OpportunityResults query={query} />
        </React.Suspense>
      )}
      {category === "assets" && (
        <React.Suspense fallback={<Loading label="assets" />}>
          <AssetResults query={query} />
        </React.Suspense>
      )}
    </>
  );
};

export default SearchResults;
