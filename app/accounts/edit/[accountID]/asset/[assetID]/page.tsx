"use client";

import { useRouter } from "next/navigation";
import { AssetForm } from "@/app/forms/AssetForm";

const EditAsset = ({
  params,
}: {
  params: { accountID: string; assetID: string };
}) => {
  const router = useRouter();

  const accountID = params.accountID;
  const assetID = params.assetID;
  const values = getAssetData(assetID);

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
      formTitle="Edit Asset"
      onSuccess={onSuccess}
      onCancel={handleCancel}
      defaultValues={values}
    />
  );
};

const getAssetData = (assetID: string) => {
  // TODO: Retreive  data.
  return {};
};

export default EditAsset;
