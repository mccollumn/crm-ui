"use client";

import { useRouter } from "next/navigation";
import { AccountForm } from "@/app/forms/AccountForm";

const EditAccount = ({ params }: { params: { accountID: string } }) => {
  const router = useRouter();

  const accountID = params.accountID;
  const values = getAccountData(accountID);

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

  return (
    <AccountForm
      formTitle="Edit Account"
      onSuccess={onSuccess}
      onCancel={handleCancel}
      defaultValues={values}
    />
  );
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
