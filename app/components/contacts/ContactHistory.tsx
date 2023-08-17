import React from "react";
import { DataTable } from "../DataTable";

import { cases } from "@/mockData/cases";

const getContactHistory = async (contactID: string) => {
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function ContactHistory({
  contactID,
}: ContactHistoryProps) {
  const contactHistory = await getContactHistory(contactID);

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading contact history...</p>}>
          <DataTable rows={contactHistory} columnDefType="contactHistory" />
        </React.Suspense>
      </div>
    </>
  );
}

interface ContactHistoryProps {
  contactID: string;
}
