import * as React from "react";
import { Title } from "../components/Title";
import { ButtonNav } from "../components/ButtonNav";
import { DataTable } from "../components/DataTable";
import "server-only";

const getContacts = async () => {
  const res = await fetch("https://dev.to/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // return res.json();
  return [{ id: "1", contactName: "Mr. Customer" }];
};

export default async function Contacts({ accountNumber = "*" }: ContactsProps) {
  const contactsList = await getContacts();

  return (
    <>
      <Title title="Contacts" />
      <ButtonNav path="/contacts/new">New</ButtonNav>
      <div style={{ height: 400, width: "100%" }}>
        <React.Suspense fallback={<p>Loading contacts...</p>}>
          <DataTable
            rows={contactsList}
            columnDefType="contactsList"
            // TODO: Update this filed name with correct value for account number
            queryField="id"
            queryValue={accountNumber}
          />
        </React.Suspense>
      </div>
    </>
  );
}

interface ContactsProps {
  accountNumber?: string;
}
