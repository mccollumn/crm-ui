"use client";

import { useRouter } from "next/navigation";
import { AssetForm } from "@/app/forms/AssetForm";

const NewAsset = ({ params }: { params: { accountID: string } }) => {
  const router = useRouter();
  const accountID = params.accountID;

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
    <AssetForm
      formTitle="New Asset"
      onSuccess={onSuccess}
      onCancel={handleCancel}
    />
  );
};

export default NewAsset;
