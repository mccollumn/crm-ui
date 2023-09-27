import { LicenseKeyForm } from "@/app/forms/licenseKey/LicenseKeyForm";
import { createLicenseKeyFormData } from "@/app/forms/licenseKey/licenseKeyFormUtils";
import { getMenuItems } from "@/app/utils/getData";

const NewLicenseKey = async ({ params }: { params: { accountID: string } }) => {
  const accountID = params.accountID;
  const menuItems = await getMenuItems();
  const values = await createLicenseKeyFormData(accountID);

  return (
    <LicenseKeyForm
      formTitle="New License Key"
      defaultValues={values}
      menuItems={menuItems}
      accountID={accountID}
    />
  );
};

export default NewLicenseKey;
