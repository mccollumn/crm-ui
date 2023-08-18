"use client";

import { useRouter } from "next/navigation";
import { LicenseKeyForm } from "@/app/forms/LicenseKeyForm";

const NewLicenseKey = ({ params }: { params: { accountID: string } }) => {
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
    <LicenseKeyForm
      formTitle="New License Key"
      onSuccess={onSuccess}
      onCancel={handleCancel}
    />
  );
};

export default NewLicenseKey;
