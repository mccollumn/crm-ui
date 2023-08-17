"use client";

import React from "react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LicenseKeyForm, INITIAL_DATA } from "@/app/forms/LicenseKeyForm";

const EditLicenseKey = ({
  params,
}: {
  params: { accountNumber: string; licenseKey: string };
}) => {
  const router = useRouter();

  const accountNumber = params.accountNumber;
  const licenseKey = params.licenseKey;
  const [data, setData] = React.useState(
    getLicenseKeyData(accountNumber, licenseKey)
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", data);
    // PUT data
    // Verify successful response
    router.push(`/accounts/view/${accountNumber}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <LicenseKeyForm
        {...data}
        setData={setData}
        formTitle="Edit License Key"
      />
    </form>
  );
};

const getLicenseKeyData = (accountNumber: string, licenseKey: string) => {
  // TODO: Retreive order data.
  return { id: "1" } || INITIAL_DATA;
};

export default EditLicenseKey;
