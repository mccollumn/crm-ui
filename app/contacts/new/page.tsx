import { ContactForm } from "@/app/forms/contact/ContactForm";
import { createContactFormData } from "@/app/forms/contact/contactFormUtils";
import { getMenuItems } from "@/app/utils/getData";

const NewContact = async () => {
  const menuItems = await getMenuItems();
  const values = await createContactFormData();

  return (
    <ContactForm
      formTitle="New Contact"
      defaultValues={values}
      menuItems={menuItems}
    />
  );
};

export default NewContact;
