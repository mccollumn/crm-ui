"use client";

import { useRouter } from "next/navigation";
import { LicenseKeyForm } from "@/app/forms/LicenseKeyForm";

const EditLicenseKey = ({
  params,
}: {
  params: { accountID: string; licenseKey: string };
}) => {
  const router = useRouter();

  const accountID = params.accountID;
  const licenseKey = params.licenseKey;
  const values = getLicenseKeyData(accountID, licenseKey);

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
      formTitle="Edit License Key"
      onSuccess={onSuccess}
      onCancel={handleCancel}
      defaultValues={values}
    />
  );
};

const getLicenseKeyData = (accountID: string, licenseKey: string) => {
  // TODO: Retreive order data.
  return {};
};

export default EditLicenseKey;
