import { LicenseKeyForm } from "@/app/forms/licenseKey/LicenseKeyForm";
import { createLicenseKeyFormData } from "@/app/forms/licenseKey/licenseKeyFormUtils";
import { getLicenseKeyData, getMenuItems } from "@/app/utils/getData";

const EditLicenseKey = async ({
  params,
}: {
  params: { accountID: string; licenseKey: string };
}) => {
  const accountID = params.accountID;
  const licenseKey = params.licenseKey;
  const licenseKeyDataPromise = getLicenseKeyData(licenseKey);
  const menuItemsPromise = getMenuItems();
  const [licenseKeyData, menuItems] = await Promise.all([
    licenseKeyDataPromise,
    menuItemsPromise,
  ]);
  const values = await createLicenseKeyFormData(accountID, licenseKeyData);

  return (
    <LicenseKeyForm
      formTitle="Edit License Key"
      defaultValues={values}
      menuItems={menuItems}
    />
  );
};

export default EditLicenseKey;
