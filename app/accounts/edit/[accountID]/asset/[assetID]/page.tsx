import { AssetForm } from "@/app/forms/asset/AssetForm";
import { createAssetFormData } from "@/app/forms/asset/assetFormUtils";
import { getAssetData, getMenuItems } from "@/app/utils/getData";

const EditAsset = async ({
  params,
}: {
  params: { accountID: string; assetID: string };
}) => {
  const accountID = params.accountID;
  const assetID = params.assetID;
  const assetDataPromise = getAssetData(assetID);
  const menuItemsPromise = getMenuItems();
  const [assetData, menuItems] = await Promise.all([
    assetDataPromise,
    menuItemsPromise,
  ]);
  const values = await createAssetFormData(accountID, assetData);

  return (
    <AssetForm
      formTitle="Edit Asset"
      defaultValues={values}
      menuItems={menuItems}
    />
  );
};

export default EditAsset;
