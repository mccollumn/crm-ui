"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AccountForm } from "@/app/forms/AccountForm";

const EditAccount = ({ params }: { params: { accountID: string } }) => {
  const router = useRouter();
  const [values, setValues] = React.useState<{} | null>(null);
  const accountID = params.accountID;

  React.useEffect(() => {
    (async () => {
      const data = await getAccountData(accountID);
      setValues(data);
    })();
  }, [accountID]);
  console.log("EditAccount");

  const onSuccess = async (values: any) => {
    console.log("Success values", values);
    // TODO:
    // PUT data
    const data = await fetch(`/accounts/api/${accountID}/update/`);
    // Verify successful response
    router.push(`/accounts/view/${accountID}`);
  };

  const handleCancel = () => {
    router.back();
  };

  if (values) {
    return (
      <AccountForm
        formTitle="Edit Account"
        onSuccess={onSuccess}
        onCancel={handleCancel}
        defaultValues={values}
      />
    );
  }
  return <div>Loading...</div>;
};

const getAccountData = async (accountID: string) => {
  // TODO: Retreive data. Just returning initial data for now.
  const data = await fetch(
    `${process.env.API_ENDPOINT}/accounts/api/${accountID}`
  );
  // return data || {};
  return {};
};

export default EditAccount;
