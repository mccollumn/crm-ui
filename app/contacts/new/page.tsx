import { ContactForm } from "@/app/forms/contact/ContactForm";
import { createContactFormData } from "@/app/forms/contact/contactFormUtils";
import { getAccountData, getMenuItems } from "@/app/utils/getData";

const NewContact = async ({
  searchParams,
}: {
  searchParams: { accountID: string };
}) => {
  const accountID = searchParams.accountID;
  const accountData = accountID ? await getAccountData(accountID) : null;
  const menuItems = await getMenuItems();
  const values = await createContactFormData({ accountData });

  return (
    <ContactForm
      formTitle="New Contact"
      defaultValues={values}
      menuItems={menuItems}
    />
  );
};

export default NewContact;
