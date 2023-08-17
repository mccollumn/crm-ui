"use client";

import React from "react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AssetForm, INITIAL_DATA } from "@/app/forms/AssetForm";

const NewAsset = ({ params }: { params: { accountNumber: string } }) => {
  const router = useRouter();
  const accountNumber = params.accountNumber;
  const [data, setData] = React.useState(INITIAL_DATA);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", data);
    // POST data
    // Verify successful response
    router.push(`/accounts/view/${accountNumber}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <AssetForm {...data} setData={setData} formTitle="New Asset" />
    </form>
  );
};

export default NewAsset;
