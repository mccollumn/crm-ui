import * as React from "react";
import { Title } from "../components/Title";
import { ButtonNav } from "../components/navigation/ButtonNav";
import { DataTable } from "../components/DataTable";
import { getContactsByAccount, getContacts } from "../utils/getData";
import "server-only";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const Contacts = async ({ accountID, noTitle = false }: ContactsProps) => {
  let contactsList = [];
  if (accountID) {
    contactsList = await getContactsByAccount(accountID);
  } else {
    contactsList = await getContacts();
  }

  return (
    <>
      {!noTitle && <Title title="Contacts" />}
      <ButtonNav path="/contacts/new">New</ButtonNav>
      <div style={{ width: "100%" }}>
        <React.Suspense fallback={<>Loading contacts...</>}>
          <DataTable rows={contactsList} columnDefType="contactsList" />
        </React.Suspense>
      </div>
    </>
  );
};

interface ContactsProps {
  accountID?: string;
  noTitle?: boolean;
}

export default Contacts;
