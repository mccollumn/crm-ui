import { AccountForm } from "@/app/forms/account/AccountForm";
import { createAccountFormData } from "@/app/forms/account/accountFormUtils";
import { getMenuItems } from "@/app/utils/getData";

const NewAccount = async () => {
  const menuItems = await getMenuItems();
  const values = await createAccountFormData();

  return (
    <AccountForm
      formTitle="New Account"
      defaultValues={values}
      menuItems={menuItems}
    />
  );
};

export default NewAccount;
