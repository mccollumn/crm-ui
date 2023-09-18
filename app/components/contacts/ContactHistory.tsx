import React from "react";
import { DataTable } from "../DataTable";
import { getContactData } from "@/app/utils/getData";

const ContactHistory = async ({ contactID }: ContactHistoryProps) => {
  const contactData = await getContactData(contactID);
  const rows = contactData?.CaseHistory || [];

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading contact history...</p>}>
          <DataTable rows={rows} columnDefType="contactHistory" />
        </React.Suspense>
      </div>
    </>
  );
};

interface ContactHistoryProps {
  contactID: string;
}

export default ContactHistory;
