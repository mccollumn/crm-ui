"use client";

import { useRouter } from "next/navigation";
import { AccountForm } from "@/app/forms/AccountForm";

const NewAccount = () => {
  const router = useRouter();

  const onSuccess = async (values: any) => {
    console.log("Success values", values);
    // TODO:
    // PUT data
    const data = await fetch("/accounts/api/new/");
    // Verify successful response
    // Get ID
    const accountID = "1";
    router.push(`/accounts/view/${accountID}`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <AccountForm
      formTitle="New Account"
      onSuccess={onSuccess}
      onCancel={handleCancel}
    />
  );
};

export default NewAccount;
