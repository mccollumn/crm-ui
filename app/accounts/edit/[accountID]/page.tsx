import { AccountForm } from "@/app/forms/account/AccountForm";
import { getAccountData, getMenuItems } from "@/app/utils/getData";
import { createAccountFormData } from "@/app/forms/account/accountFormUtils";

const EditAccount = async ({ params }: { params: { accountID: string } }) => {
  const accountID = params.accountID;
  const accountDataPromise = getAccountData(accountID);
  const menuItemsPromise = getMenuItems();
  const [accountData, menuItems] = await Promise.all([
    accountDataPromise,
    menuItemsPromise,
  ]);
  const accountName = accountData?.AccountDetail?.Accounts_Name;
  const values = await createAccountFormData(accountData);

  return (
    <AccountForm
      formTitle={`Edit Account - ${accountName}`}
      defaultValues={values}
      menuItems={menuItems}
      accountData={accountData}
    />
  );
};

export default EditAccount;
