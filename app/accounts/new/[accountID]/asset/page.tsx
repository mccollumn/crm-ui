import { AssetForm } from "@/app/forms/asset/AssetForm";
import { createAssetFormData } from "@/app/forms/asset/assetFormUtils";
import { getMenuItems } from "@/app/utils/getData";

const NewAsset = async ({ params }: { params: { accountID: string } }) => {
  const accountID = params.accountID;
  const menuItems = await getMenuItems();
  const values = await createAssetFormData(accountID);

  return (
    <AssetForm
      formTitle="New Asset"
      defaultValues={values}
      menuItems={menuItems}
    />
  );
};

export default NewAsset;
