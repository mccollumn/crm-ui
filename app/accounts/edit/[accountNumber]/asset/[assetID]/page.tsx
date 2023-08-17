"use client";

import React from "react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AssetForm, INITIAL_DATA } from "@/app/forms/AssetForm";

const EditAsset = ({
  params,
}: {
  params: { accountNumber: string; assetID: string };
}) => {
  const router = useRouter();

  const accountNumber = params.accountNumber;
  const assetID = params.assetID;
  const [data, setData] = React.useState(getAssetData(accountNumber, assetID));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", data);
    // PUT data
    // Verify successful response
    router.push(`/accounts/view/${accountNumber}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <AssetForm {...data} setData={setData} formTitle="Edit Asset" />
    </form>
  );
};

const getAssetData = (accountNumber: string, assetID: string) => {
  // TODO: Retreive order data.
  return { id: "1" } || INITIAL_DATA;
};

export default EditAsset;
