import * as React from "react";
import { Title } from "../components/Title";
import { ButtonNav } from "../components/navigation/ButtonNav";
import { DataTable } from "../components/DataTable";
import { getContactsByAccount, getContacts } from "../utils/getData";
import "server-only";

const Contacts = async ({ accountID }: ContactsProps) => {
  let contactsList = [];
  if (accountID) {
    contactsList = await getContactsByAccount(accountID);
  } else {
    contactsList = await getContacts();
  }

  return (
    <>
      <Title title="Contacts" />
      <ButtonNav path="/contacts/new">New</ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<p>Loading contacts...</p>}>
          <DataTable rows={contactsList} columnDefType="contactsList" />
        </React.Suspense>
      </div>
    </>
  );
};

interface ContactsProps {
  accountID?: string;
}

export default Contacts;
