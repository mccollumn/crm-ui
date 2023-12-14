import React from "react";
import { DataTable } from "../DataTable";
import { getContactData } from "@/app/utils/getData";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const ContactHistory = async ({ contactID }: ContactHistoryProps) => {
  const contactData = await getContactData(contactID);
  // const rows = contactData?.CaseHistory || [];

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<>Loading contact history...</>}>
          <DataTable rows={[]} columnDefType="contactHistory" />
        </React.Suspense>
      </div>
    </>
  );
};

interface ContactHistoryProps {
  contactID: string;
}

export default ContactHistory;
