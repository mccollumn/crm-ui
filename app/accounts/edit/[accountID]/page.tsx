"use client";

import { useRouter } from "next/navigation";
import { AccountForm } from "@/app/forms/AccountForm";

const EditAccount = ({ params }: { params: { accountID: string } }) => {
  const router = useRouter();

  const accountID = params.accountID;
  const values = getAccountData(accountID);

  const onSuccess = (values: any) => {
    console.log("Success values", values);
    // TODO:
    // PUT data
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

const getAccountData = (accountID: string) => {
  // TODO: Retreive data. Just returning initial data for now.
  return {};
};

export default EditAccount;
